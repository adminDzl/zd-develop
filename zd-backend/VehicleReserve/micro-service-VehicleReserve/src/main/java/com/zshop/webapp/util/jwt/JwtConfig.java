package com.zshop.webapp.util.jwt;


import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix="jwt")
public class JwtConfig {

	private String secret;
	private String id = "jwt";
	private int pcTtl = 12*60*60*1000;  //电脑登录的Token有效时间（毫秒）
	private int appTtl = 12*60*60*1000;  //APP端登录的Token有效时间（毫秒）
	private int parkTtl = 12*60*60*1000;  //园区登录的Token有效时间（毫秒）
	private int refreshInterval = 12*55*60*1000;  //毫秒
	private int refreshTtl = 12*60*60*1000;  //毫秒
	
	
	private int oauthTtl = 12*60*60*1000;
	private int oauthRefreshTtl = 12*60*60*1000;  //毫秒
	
	
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
	
	public int getPcTtl() {
		return pcTtl;
	}
	public void setPcTtl(int pcTtl) {
		this.pcTtl = pcTtl;
	}
	
	public int getRefreshTtl() {
		return refreshTtl;
	}
	public void setRefreshTtl(int refreshTtl) {
		this.refreshTtl = refreshTtl;
	}
	public int getOauthTtl() {
		return oauthTtl;
	}
	public void setOauthTtl(int oauthTtl) {
		this.oauthTtl = oauthTtl;
	}
	public int getOauthRefreshTtl() {
		return oauthRefreshTtl;
	}
	public void setOauthRefreshTtl(int oauthRefreshTtl) {
		this.oauthRefreshTtl = oauthRefreshTtl;
	}
	public int getAppTtl() {
		return appTtl;
	}
	public void setAppTtl(int appTtl) {
		this.appTtl = appTtl;
	}
	public int getParkTtl() {
		return parkTtl;
	}
	public void setParkTtl(int parkTtl) {
		this.parkTtl = parkTtl;
	}

	
	
}
