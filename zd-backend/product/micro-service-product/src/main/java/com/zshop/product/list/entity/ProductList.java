package com.zshop.product.list.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 商品列表
 * @author: Administrator
 * @date: 2018-08-10 14:39:20
 */
@Setter
@Getter
public class ProductList implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 
	 */
	private String id;	
	/**
	 * 商品编号
	 */
	private String productCode;	
	/**
	 * 商品名称
	 */
	private String productName;	
	/**
	 * 商品价格
	 */
	private String productPrice;	
	/**
	 * 商品描述，提供模糊搜索
	 */
	private String productDesc;	
	/**
	 * 商品条形码
	 */
	private String productBarCode;	
	/**
	 * 商品库存数量
	 */
	private Integer productStockCount;	
	/**
	 * 商品类型名称
	 */
	private Integer productTypeName;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 创建人id
	 */
	private Integer createBy;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 状态（1：正常，-1：删除）
	 */
	private String status1;	



}

