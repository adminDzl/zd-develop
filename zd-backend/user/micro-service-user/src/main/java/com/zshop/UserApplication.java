package com.zshop;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

/**
 * 服务消费者，从服务注册中心获取服务
 * @author huangga
 *
 */
@ComponentScan(basePackages= {"com.zshop"})
@EnableFeignClients //使用Feign客户端，自带Ribbon负载均衡
@EnableHystrixDashboard //开启断路器监控
@EnableEurekaClient //向服务中心注册
@SpringCloudApplication
public class UserApplication {
	
	@Bean
	@LoadBalanced //开启ribbon负载均衡
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	public static void main(String[] args) {
		
		SpringApplication.run(UserApplication.class, args);
		
	}

}
