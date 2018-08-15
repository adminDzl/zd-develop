package com.zshop.cloud.feign.entity;

import java.io.Serializable;

public class PermissionInfo implements Serializable{
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * id
	 */
	private String id;	
	/**
	 * 名称
	 */
	private String name;	
	/**
	 * 过滤URL前缀
	 */
	private String url;	
	/**
	 * 执行动作
	 */
	private String type;	
	/**
	 * 排序
	 */
	private Integer orderNo;	
	/**
	 * 备注
	 */
	private String remark;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(Integer orderNo) {
		this.orderNo = orderNo;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}	
	
	
    
    
	
}
