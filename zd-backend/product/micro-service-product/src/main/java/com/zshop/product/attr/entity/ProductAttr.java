package com.zshop.product.attr.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-24 10:16:59
 */
public class ProductAttr implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 属性项ID
	 */
	private Integer id;	
	/**
	 * 属性名称
	 */
	private String attrName;	
	/**
	 * 属性值
	 */
	private String attrValue;	
	/**
	 * 属性别名
	 */
	private String aliases;	
	/**
	 * 是否显示别名（1、是  0、否）
	 */
	private Integer isAli;	
	/**
	 * 属性类型（0：SKU属性   1：扩展属性）
	 */
	private Integer attrType;	
	/**
	 * 状态,0:未启用，1：启用
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


 	public void setId(Integer id){	
 		this.id=id;	
 	}	
 
 	public Integer getId(){	
 		return this.id;	
 	}	
 
 	public void setAttrName(String attrName){	
 		this.attrName=attrName;	
 	}	
 
 	public String getAttrName(){	
 		return this.attrName;	
 	}	
 
 	public void setAttrValue(String attrValue){	
 		this.attrValue=attrValue;	
 	}	
 
 	public String getAttrValue(){	
 		return this.attrValue;	
 	}	
 
 	public void setAliases(String aliases){	
 		this.aliases=aliases;	
 	}	
 
 	public String getAliases(){	
 		return this.aliases;	
 	}	
 
 	public void setIsAli(Integer isAli){	
 		this.isAli=isAli;	
 	}	
 
 	public Integer getIsAli(){	
 		return this.isAli;	
 	}	
 
 	public void setAttrType(Integer attrType){	
 		this.attrType=attrType;	
 	}	
 
 	public Integer getAttrType(){	
 		return this.attrType;	
 	}	
 
 	public void setStatus(Integer status){	
 		this.status=status;	
 	}	
 
 	public Integer getStatus(){	
 		return this.status;	
 	}	
 
 	public void setIsDel(Integer isDel){	
 		this.isDel=isDel;	
 	}	
 
 	public Integer getIsDel(){	
 		return this.isDel;	
 	}	
 
 	public void setCreateBy(String createBy){	
 		this.createBy=createBy;	
 	}	
 
 	public String getCreateBy(){	
 		return this.createBy;	
 	}	
 
 	public void setCreateTime(Date createTime){	
 		this.createTime=createTime;	
 	}	
 
 	public Date getCreateTime(){	
 		return this.createTime;	
 	}	
 
 	public void setUpdateBy(String updateBy){	
 		this.updateBy=updateBy;	
 	}	
 
 	public String getUpdateBy(){	
 		return this.updateBy;	
 	}	
 
 	public void setUpdateTime(Date updateTime){	
 		this.updateTime=updateTime;	
 	}	
 
 	public Date getUpdateTime(){	
 		return this.updateTime;	
 	}	
 
 	public void setBid(Integer bid){	
 		this.bid=bid;	
 	}	
 
 	public Integer getBid(){	
 		return this.bid;	
 	}	
 

}

