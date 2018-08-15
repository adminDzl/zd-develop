package com.zshop.product.main.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 商品主表
 * @author: Enzo
 * @date: 2018-08-12 19:19:27
 */
@Setter
@Getter
public class MainProduct implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 商品ID
	 */
	private Integer id;	
	/**
	 * 商品名称
	 */
	private String productName;	
	/**
	 * 品牌ID
	 */
	private Integer brandId;	
	/**
	 * 分类ID
	 */
	private Integer classId;	
	/**
	 * 是否删除0:不删除，1：删除
	 */
	private Integer isDel;	
	/**
	 * 创建人
	 */
	private String createBy;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 更新人
	 */
	private String updateBy;	
	/**
	 * 更新时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 所对应的kz_business主键
	 */
	private Integer bid;	
	/**
	 * 
	 */
	private String param1;	
	/**
	 * 
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

