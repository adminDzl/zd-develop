package com.zshop.product.attrval.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 商品规格属性
 * @author: Enzo
 * @date: 2018-08-19 19:36:58
 */
@Setter
@Getter
public class ProductAttrValue implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 属性值ID
	 */
	private Integer id;	
	/**
	 * 属性值
	 */
	private String attrValue;	
	/**
	 * 属性值类别
	 */
	private Integer attrId;	
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

