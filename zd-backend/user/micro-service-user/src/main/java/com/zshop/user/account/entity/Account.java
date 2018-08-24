package com.zshop.user.account.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:27:41
 */
@Setter
@Getter
public class Account implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 
	 */
	private Integer id;	
	/**
	 * 
	 */
	private String createBy;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 
	 */
	private String updateBy;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 所对应的zs_business主键
	 */
	private Integer bid;	
	/**
	 * 
	 */
	private String account;	
	/**
	 * 
	 */
	private String password;	
	/**
	 * 最后登录时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date lastTime;	
	/**
	 * 是否启用(1:已开通,0:未开通,2:禁用,3:已删除)
	 */
	private Integer state;	
	/**
	 * app调用时的校验(注册登录除外)，登录时生成
	 */
	private String token;	
	/**
	 * 令牌生成时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date tokenTime;	
	/**
	 * 
	 */
	private String remark;	
	/**
	 * 用户选择的页面（1、销售端  2、采购端）
	 */
	private String param1;	
	/**
	 * 企业端引导（0都没，1看完配置引导，2勾选初始化向导不显示）
	 */
	private String param2;	
	/**
	 * 
	 */
	private String param3;	
	/**
	 * 
	 */
	private String param4;	
	/**
	 * 
	 */
	private String param5;	



}

