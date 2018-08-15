package com.zshop.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

/**
 * 微服务网关
 * @author huangga
 *
 */
@ComponentScan(basePackages= {"com.zshop"})
@EnableZuulProxy  //开启网关，默认开启Hystrix断路器
@EnableEurekaClient //向服务中心注册
@EnableFeignClients
@SpringBootApplication
public class ZuulApplication {

	@Bean
	@LoadBalanced //开启ribbon负载均衡
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ZuulApplication.class, args);
	}

}
