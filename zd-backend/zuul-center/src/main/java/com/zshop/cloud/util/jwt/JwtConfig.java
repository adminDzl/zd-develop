package com.zshop.cloud.util.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix="jwt")
public class JwtConfig {

	private String secret;
	public String id = "jwt";
	public int ttl = 60*60*1000;  //millisecond
	public int refreshInterval = 55*60*1000;  //millisecond
	public int refreshTtl = 12*60*60*1000;  //millisecond
	
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getRefreshInterval() {
		return refreshInterval;
	}
	public void setRefreshInterval(int refreshInterval) {
		this.refreshInterval = refreshInterval;
	}
	public String getSecret() {
		return secret;
	}
	public void setSecret(String secret) {
		this.secret = secret;
	}
	public int getTtl() {
		return ttl;
	}
	public void setTtl(int ttl) {
		this.ttl = ttl;
	}
	public int getRefreshTtl() {
		return refreshTtl;
	}
	public void setRefreshTtl(int refreshTtl) {
		this.refreshTtl = refreshTtl;
	}
}
