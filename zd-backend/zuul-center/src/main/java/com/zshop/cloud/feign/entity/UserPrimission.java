package com.zshop.cloud.feign.entity;

import java.io.Serializable;

public class UserPrimission  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * api地址
	 */
	private String apiUrl;	
	/**
	 * 请求类型：GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS
	 */
	private String requestType;	
	/**
	 * 微服务名称
	 */
	private String microServiceName;	
	/**
	 * 接口名称
	 */
	private String apiName;	
	/**
	 * 接口使用范围：0 内外 1 外部 , 2 内部 , 
	 */
	private String apiScope;	
	/**
	 * 验证类型：1 不验证，2 登录密码，3 token验证
	 */
	private String verificationType;
	public String getApiUrl() {
		return apiUrl;
	}
	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public String getMicroServiceName() {
		return microServiceName;
	}
	public void setMicroServiceName(String microServiceName) {
		this.microServiceName = microServiceName;
	}
	public String getApiName() {
		return apiName;
	}
	public void setApiName(String apiName) {
		this.apiName = apiName;
	}
	public String getApiScope() {
		return apiScope;
	}
	public void setApiScope(String apiScope) {
		this.apiScope = apiScope;
	}
	public String getVerificationType() {
		return verificationType;
	}
	public void setVerificationType(String verificationType) {
		this.verificationType = verificationType;
	}	
	
	
	
}
