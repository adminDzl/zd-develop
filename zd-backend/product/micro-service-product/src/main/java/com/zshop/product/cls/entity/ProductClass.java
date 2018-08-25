package com.zshop.product.cls.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 商品类别
 * @author: Enzo
 * @date: 2018-08-25 11:03:17
 */
@Setter
@Getter
public class ProductClass implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 分类ID
	 */
	private Integer id;	
	/**
	 * 分类编号
	 */
	private String classCode;	
	/**
	 * 分类名称
	 */
	private String name;	
	/**
	 * 分类描述
	 */
	private String description;	
	/**
	 * 分类LOGO
	 */
	private String classLogo;	
	/**
	 * 分类父ID
	 */
	private Integer parentId;
	/**
	 * 排序
	 */
	private Integer sort;	
	/**
	 * 
	 */
	private Integer isRecommend;	
	/**
	 * 状态：1启用，0未启用
	 */
	private Integer status;	
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


}

