package com.zshop.core.web.swagger;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.zshop.core.log.LogUtil;
import com.zshop.core.util.CCDateUtil;
import com.zshop.core.web.api.ApiCache;
import com.zshop.core.web.api.ApiExtra;
import com.zshop.core.web.api.ApiInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.google.common.base.Optional;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;
import springfox.documentation.swagger.common.SwaggerPluginSupport;

@Component
@Order(SwaggerPluginSupport.SWAGGER_PLUGIN_ORDER + 9)
public class ApiCachePlugin implements OperationBuilderPlugin {
	private final LogUtil logger = LogUtil.getLogger(ApiCachePlugin.class);

	@Autowired
	private ApiCache scanned;
	private Map<String,ApiInfo> scannedUrls = new HashMap<String,ApiInfo>(100);

	@Value("${spring.application.name}")
	private String microServiceName;

	@Override
	public void apply(OperationContext context) {
		String httpMethod = context.httpMethod().name();
		String urlPattern = context.requestMappingPattern();
		String groupName = context.getDocumentationContext().getGroupName();
		//默认标签使用controller名(context.getGroupName())
		String tagName = context.getGroupName();
		Optional<Api> controllerAnnotation = context.findControllerAnnotation(Api.class);
		if(controllerAnnotation.isPresent()) {
			//有Api注解则用注解的tags名作为标签
			String[] tags = controllerAnnotation.get().tags();
			if(tags!=null&&tags.length>0) {
				tagName = tags[0];
			}
		}

		if(scannedUrls.keySet().contains(urlPattern)) {
			//已经扫描过的Api如果未有组名，则设置其组名
			ApiInfo e = scannedUrls.get(urlPattern);
			if(StringUtils.isBlank(e.getGroupName())) {
				setGroupName(groupName, e);
			}
			//已有组名，当前组名为ccapi或ccpublic则覆盖其组名
			else {
				if(groupName.equals(SwaggerConfig.GROUP_API)||groupName.equals(SwaggerConfig.GROUP_PUBLIC)) {
					setGroupName(groupName, e);
				}
			}
			return;
		}
		Optional<ApiOperation> swaggerAnnotation = context.findAnnotation(ApiOperation.class);
		String apiName = "";
		String remark = "";
		if (swaggerAnnotation.isPresent()) {
			apiName = swaggerAnnotation.get().value();
			remark = swaggerAnnotation.get().notes();
		}
		
		Optional<ApiExtra> customAnnotation = context.findAnnotation(ApiExtra.class);
		String permission = "";
		
		String createBy = "";
		Date createTime = new Date();
		String updateBy = "";
		Date updateTime = new Date();
		if (customAnnotation.isPresent()) {
			permission = customAnnotation.get().permission();
			createBy = customAnnotation.get().creator();
			String createTimeStr = customAnnotation.get().updateTime();
			updateBy = customAnnotation.get().updator();
			String updateTimeStr = customAnnotation.get().updateTime();
			try {
				if(StringUtils.isNotBlank(createTimeStr)) {
					createTime = CCDateUtil.YMDFormatter.parse(createTimeStr);
				}
				if(StringUtils.isNotBlank(updateTimeStr)) {
					updateTime = CCDateUtil.YMDFormatter.parse(updateTimeStr);
				}
			} catch (ParseException e) {
				logger.debug("invalid date:"+updateTimeStr+"("+urlPattern+")");
			}
		}

		ApiInfo apiInfo = new ApiInfo();
		apiInfo.setRequestType(httpMethod);
		apiInfo.setApiUrl(urlPattern);
		apiInfo.setApiName(apiName);
		apiInfo.setTagName(tagName);
		setGroupName(groupName, apiInfo);
		apiInfo.setMicroServiceName(microServiceName);
		
		apiInfo.setPermission(permission);
		if(urlPattern!=null&&urlPattern.startsWith(SwaggerConfig.GROUP_API_PREFIX)) {
			apiInfo.setApiScope(SwaggerConfig.API_SCOPE_INNER);
		}else {
			apiInfo.setApiScope(SwaggerConfig.API_SCOPE_OUTER);
		}
		apiInfo.setCreateBy(createBy);
		apiInfo.setCreateTime(createTime);
		apiInfo.setUpdateBy(updateBy);
		apiInfo.setUpdateTime(updateTime);
		apiInfo.setRemark(remark);

    	//apiInfo.setExt1("#!/"+tagName.replace("-", "45"));
		scanned.add(apiInfo);
		scannedUrls.put(apiInfo.getApiUrl(), apiInfo);
	}

	private void setGroupName(String groupName, ApiInfo e) {
		//组名不为"全部"时设置组名。扫描组别为"全部"时视为未分组，不设置组名
		if(!SwaggerConfig.GROUP_ALL.equals(groupName)) {
			e.setGroupName(groupName);
		}
	}

	@Override
	public boolean supports(DocumentationType delimiter) {
		return SwaggerPluginSupport.pluginDoesApply(delimiter);
	}
}