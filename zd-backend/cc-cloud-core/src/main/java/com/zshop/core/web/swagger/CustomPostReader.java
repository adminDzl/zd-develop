package com.zshop.core.web.swagger;

import static springfox.documentation.swagger.schema.ApiModelProperties.allowableValueFromString;

import java.util.List;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;
import com.google.common.collect.Lists;

import io.swagger.annotations.ApiOperation;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;
import springfox.documentation.swagger.common.SwaggerPluginSupport;

@Component
@Order(SwaggerPluginSupport.SWAGGER_PLUGIN_ORDER + 1)
public class CustomPostReader implements OperationBuilderPlugin {

	@Override
	public void apply(OperationContext context) {
		/*
		Optional<RestController> controllerAnnotation = context.findControllerAnnotation(RestController.class);
		if(controllerAnnotation.isPresent()) {
			context.setGroupName... ;
		}
		 */
		Optional<ApiOperation> methodAnnotation = context.findAnnotation(ApiOperation.class);
		String groupName = context.getDocumentationContext().getGroupName();
		//除了"全部"，其他分组默认不注解不添加API，以方便检查哪些没添加和隐藏不需要的接口。自定义的group默认列表为空，不显示api信息，加快页面加载
		if(!groupName.equals(SwaggerConfig.GROUP_ALL)&&!groupName.equals(SwaggerConfig.GROUP_API)&&!methodAnnotation.isPresent()) {
			context.operationBuilder().hidden(true);
		}
		//需要认证的接口自动追加token的请求头参数
		String urlPattern = context.requestMappingPattern();
		if(urlPattern!=null&&!urlPattern.startsWith("/security/")) {
			if(!urlPattern.startsWith(SwaggerConfig.GROUP_PUBLIC_PREFIX)) {
				//常规接口需要token
				context.operationBuilder().parameters(tokenParameter(context,true));
			}else {
				//公开接口可以带token可以不带
				context.operationBuilder().parameters(tokenParameter(context,false));
			}
		}
	}

	@Override
	public boolean supports(DocumentationType delimiter) {
		return SwaggerPluginSupport.pluginDoesApply(delimiter);
	}

	private List<Parameter> tokenParameter(OperationContext context,boolean required) {
		List<Parameter> parameters = Lists.newArrayList();

		Parameter tokenParam = new ParameterBuilder()
				.name("Authorization")
				.description("a JWT token")
				.defaultValue("")
				.required(required)
				.allowMultiple(false)
				.modelRef(new ModelRef("string", allowableValueFromString("")))
				.allowableValues(allowableValueFromString(""))
				.parameterType("header")
				// .parameterAccess(param.access())
				.build();

		parameters.add(tokenParam);
		return parameters;
	}
}