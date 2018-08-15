package com.zshop.webapp.config.base;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "user")
public class UserConfig {

	/*
	 * 用户默认密码
	 */
	private String defaultPassword;
	
	/*
	 * 用户默认头像
	 */
	private String defaultPhotoUrl;
	
	

	public String getDefaultPassword() {
		return defaultPassword;
	}

	public void setDefaultPassword(String defaultPassword) {
		this.defaultPassword = defaultPassword;
	}

	public String getDefaultPhotoUrl() {
		return defaultPhotoUrl;
	}

	public void setDefaultPhotoUrl(String defaultPhotoUrl) {
		this.defaultPhotoUrl = defaultPhotoUrl;
	}
	

	
}
