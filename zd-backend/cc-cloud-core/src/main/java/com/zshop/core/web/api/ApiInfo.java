package com.zshop.core.web.api;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @Description: 接口信息实体
 * @author: luffyjet
 * @date: 2017-12-16 18:54:41
 */
public class ApiInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
		
	/**
	 * 表id
	 */
	private String id;	
	/**
	 * 请求类型：GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS
	 */
	private String requestType;	
	/**
	 * api地址
	 */
	private String apiUrl;	
	/**
	 * 接口名称
	 */
	private String apiName;	
	/**
	 * 权限key
	 */
	private String permission;	
	/**
	 * 接口使用范围：0 内外 1 外部 , 2 内部
	 */
	private String apiScope;	
	/**
	 * 验证类型：anon 不验证，login 登录，auth token验证
	 */
	private String verificationType;
	/**
	 * 标签，用于同个模组内区分，如baseinfo的不同controller
	 */
	private String tagName;	
	/**
	 * 接口组名称
	 */
	private String groupName;	
	/**
	 * 微服务名称
	 */
	private String microServiceName;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 创建人
	 */
	private String createBy;	
	/**
	 * 更新时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 更新人
	 */
	private String updateBy;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public String getApiUrl() {
		return apiUrl;
	}
	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}
	public String getApiName() {
		return apiName;
	}
	public void setApiName(String apiName) {
		this.apiName = apiName;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
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
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getMicroServiceName() {
		return microServiceName;
	}
	public void setMicroServiceName(String microServiceName) {
		this.microServiceName = microServiceName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
}

