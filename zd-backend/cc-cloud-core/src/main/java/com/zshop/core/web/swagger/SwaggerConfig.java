package com.zshop.core.web.swagger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * 开启Swagger2
 * 访问方式：http://localhost:3001/swagger-ui.html
 * @author huangga fangwj
 */

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Value("${swagger.enable:true}")
	public boolean isEnabled;
	public static final String GROUP_ALL="全部";
	
	public static final String GROUP_API="内部api";
	public static final String GROUP_API_PREFIX="/ccapi/";
	
	public static final String GROUP_PUBLIC="公开";
	public static final String GROUP_PUBLIC_PREFIX="/ccpublic/";

	public static final String API_SCOPE_OUTER="1";
	public static final String API_SCOPE_INNER="2";
	/**
	 * 默认加载列表，设为空让页面因加载全部api而卡住
	 * @return
	 */
	@Bean  
    public Docket defaultDocket() {
		String groupName="default";
        return new Docket(DocumentationType.SWAGGER_2) 
                .groupName(groupName).apiInfo(SwaggerConfig.apiInfo(groupName))  
                .enable(isEnabled)
                .select() 
                .apis(RequestHandlerSelectors.basePackage("com.zshop.default"))// 扫描该包下的所有需要在Swagger中展示的API，@ApiIgnore注解标注的除外
                .paths(PathSelectors.ant("/default/**"))  
                .build();  
    }  
	/**
	 * 全部
	 * @return
	 */
	@Bean  
    public Docket allDocket() {
		String groupName=GROUP_ALL;
		Tag t1=new Tag("Abondoned","已废弃");
		Tag t2=new Tag("Testing","测试中");
        return new Docket(DocumentationType.SWAGGER_2) 
                .groupName(groupName).apiInfo(SwaggerConfig.apiInfo(groupName)) 
                .tags(t1,t2)
                .enable(isEnabled)  
                .select()  
                .apis(RequestHandlerSelectors.basePackage("com.zshop"))// 扫描该包下的所有需要在Swagger中展示的API，@ApiIgnore注解标注的除外
                .paths(PathSelectors.any())  
                .build();  
    }
	/**
	 * 产生springfox ApiInfo
	 */
    public static ApiInfo apiInfo(String moduleName) {// 创建API的基本信息，这些信息会在Swagger UI中进行显示  
    	Contact t= new Contact("智慧园区","http://www.zshop.com","");
        return new ApiInfoBuilder()  
                .title("CC+架构平台微服务"+moduleName+"接口列表")// API 标题  
                .description("CC+架构平台提供的RESTful APIs")// API描述  
                .contact(t)// 联系人  
                .version("1.0.Alpha")// 版本号  
                .build();  
    }  
}
///**
// * 添加Swagger2API分组，方便使用者查看指定模块的API
// * @author fangwj
// */
//@Configuration
//public class CustomSwaggerConfig {
//
//	@Value("${swagger.enable:true}")
//	public boolean isEnabled;
//	@Bean  
//    public Docket baseinfoDocket() {
//		//设置一级分类（组名/模块名）
//		String groupName="基础模块";
//		//设置二级分类（标签/默认为控制器名）
//		Tag t1=new Tag("user","用户管理接口");
//		Tag t2=new Tag("userinfo","当前用户信息接口");
//		Tag t3=new Tag("park","园区管理接口");
//		Tag t4=new Tag("orgnization","企业管理接口");
//        return new Docket(DocumentationType.SWAGGER_2) 
//        		//设置一级分类（组名）
//                .groupName(groupName).apiInfo(SwaggerConfig.apiInfo(groupName))
//        		//设置二级分类（标签）
//                .tags(t1,t2,t3,t4)
//                .enable(isEnabled)  
//                .select()  
//                //按照包路径(.apis)或者url格式(.paths)来扫描API，@ApiIgnore注解标注的除外 //url格式用法:PathSelectors.ant("/baseinfo/**")
//                .apis(RequestHandlerSelectors.basePackage("com.zshop.baseinfo")).paths(PathSelectors.any())
//                .build();
//    }  
//	/**
//	 * 内部API，改为由项目自行注入以便自定义分组
//	 * @return
//	 */
//	@Bean  
//    public Docket ccapiDocket() {
//		String groupName=SwaggerConfig.GROUP_API;
//		Tag t1=new Tag("Abondoned","已废弃");
//		Tag t2=new Tag("Testing","测试中");
//        return new Docket(DocumentationType.SWAGGER_2) 
//                .groupName(groupName).apiInfo(SwaggerConfig.apiInfo(groupName)) 
//                .tags(t1,t2) 
//                .enable(isEnabled)  
//                .select()  
//                .apis(RequestHandlerSelectors.basePackage("com.zshop"))// 扫描该包下的所有需要在Swagger中展示的API，@ApiIgnore注解标注的除外
//                .paths(PathSelectors.ant(SwaggerConfig.GROUP_API_PREFIX+"**"))  
//                .build();  
//    }  
//	/**
//	 * 公开数据接口，改为由项目自行注入以便自定义分组
//	 * @return
//	 */
//	@Bean  
//	public Docket ccpublicDocket() {
//		String groupName=SwaggerConfig.GROUP_PUBLIC;
//		Tag t1=new Tag("Abondoned","已废弃");
//		Tag t2=new Tag("Testing","测试中");
//        return new Docket(DocumentationType.SWAGGER_2) 
//                .groupName(groupName).apiInfo(SwaggerConfig.apiInfo(groupName))  
//                .tags(t1,t2)
//                .enable(isEnabled)  
//                .select()  
//                .apis(RequestHandlerSelectors.basePackage("com.zshop"))// 扫描该包下的所有需要在Swagger中展示的API，@ApiIgnore注解标注的除外
//                .paths(PathSelectors.ant(SwaggerConfig.GROUP_PUBLIC_PREFIX+"**"))  
//                .build();  
//	}  
//}

//Api注解示例
/*@RestController
@RequestMapping("/ccapi/apiinfo")
@Api(tags="ApiInfo")
public class ApiInfoApi{
	@GetMapping(value="/permission")
	@ApiOperation(value="获取XXX",notes="")
	@ApiExtra(updateTime="2018-06-01 18:00:00",createTime="2018-06-01 18:00:00",creator="")
	@ApiImplicitParams({
		  @ApiImplicitParam(name="url",value="url路径",paramType="query",dataType="string",required = true)
	})
	public String findPermissionByUrl(String url){
		String permission = findPermissionByUrl(url);
		return permission;
	}
}*/