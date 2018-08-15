package com.zshop.core.security.feign;


import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Configuration
public class FeignConfiguration {
    /**
     * 日志级别
     * @return
     */
    @Bean  
    feign.Logger.Level feignLoggerLevel() {  
        return feign.Logger.Level.BASIC;  
    }

    /**
     * 创建Feign请求拦截器，在发送请求前设置认证的token,各个微服务将token设置到环境变量中来达到通用
     * @return
     */
    @Bean
    public RequestInterceptor basicAuthRequestInterceptor() {
    	return new RequestInterceptor() {
    		private final Logger logger = LoggerFactory.getLogger(this.getClass());
    		
	        @Override
	        public void apply(RequestTemplate template) {
	            logger.debug("RequestInterceptor apply");
	            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
	            
	            HttpServletRequest request = null;
	            Enumeration<String> headerNames = null;
	            if(attributes != null) {
	                request = attributes.getRequest();
	                headerNames = request.getHeaderNames();
	            }
	            
	            if (request != null && headerNames != null) {
	                while (headerNames.hasMoreElements()) {
	                    String name = headerNames.nextElement();
	                    String values = request.getHeader(name);
	                    template.header(name, values);
	                }
	            }
	            /*StringBuffer body =new StringBuffer();
                body.append("feignClient").append("=").append(System.getProperty("spring.application.name"));
	            if(body.length()!=0) {
	                body.deleteCharAt(body.length()-1);
	                template.body(body.toString());
	                //logger.info("feign interceptor body:{}",body.toString());
	            }*/
	        }
    	};
    }
}
