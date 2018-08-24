package com.zshop.webapp.config.aop;

import org.springframework.context.annotation.Configuration;

/**
 * AOP配置：
 * 1、proxyTargetClass=true：使用CGLIB动态代理。
 * 2、exposeProxy=true：支持使用AopContext.currentProxy()方式来进行同类调用
 * 
 * 建议在Spring容器和SpringMVC容器中都声明
 * 
 * Spring boot 可在配置文件中配置
 * @author huangga
 *
 */
@Configuration
//@EnableAspectJAutoProxy(exposeProxy=true,proxyTargetClass=true)
public class AopConfig {
	
}
