package com.zshop.webapp.config.web;

import java.util.List;

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Spring MVC web 配置类
 * @author huangga
 *
 */

public class WebConfig extends WebMvcConfigurerAdapter{

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		
		//打印消息转换类名称
		for (HttpMessageConverter<?> httpMessageConverter : converters) {
			System.out.println(httpMessageConverter.getClass().getName());
		}
		
	}
	
	
}
