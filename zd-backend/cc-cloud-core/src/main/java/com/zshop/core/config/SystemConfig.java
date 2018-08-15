package com.zshop.core.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sysConfig")
public class SystemConfig {
	


	/**
	 * 用户默认密码
	 */
	private String userDefaultPassword;
	
	/**
	 * 用户默认头像
	 */
	private String userDefaultPhotoUrl;
	
	/**
	 * 本地化部署园区id
	 */
	public String localPark;
	/**
	 * 网关gatewayServiceUrl
	 */
	public String gatewayServiceUrl;
	
	
	public String getGatewayServiceUrl() {
		return gatewayServiceUrl;
	}
	public void setGatewayServiceUrl(String gatewayServiceUrl) {
		this.gatewayServiceUrl = gatewayServiceUrl;
	}
	public String getLocalPark() {
		return localPark;
	}
	public void setLocalPark(String localPark) {
		this.localPark = localPark;
	}
	public String getUserDefaultPassword() {
		return userDefaultPassword;
	}
	public void setUserDefaultPassword(String userDefaultPassword) {
		this.userDefaultPassword = userDefaultPassword;
	}
	public String getUserDefaultPhotoUrl() {
		return userDefaultPhotoUrl;
	}
	public void setUserDefaultPhotoUrl(String userDefaultPhotoUrl) {
		this.userDefaultPhotoUrl = userDefaultPhotoUrl;
	}

	
}
