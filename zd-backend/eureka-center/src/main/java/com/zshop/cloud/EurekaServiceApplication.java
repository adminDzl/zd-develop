package com.zshop.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;


/**
 * 启动服务注册中心
 * @author huangga
 *
 */
@EnableEurekaServer //开启注册中心
@SpringBootApplication
public class EurekaServiceApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(EurekaServiceApplication.class, args);
	}

}
