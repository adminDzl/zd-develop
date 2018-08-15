package com.zshop.product.list.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;


/**
 * @Description: 商品列表
 * @author: Administrator
 * @date: 2018-08-10 14:39:20
 */
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


 	public void setId(String id){	
 		this.id=id;	
 	}	
 
 	public String getId(){	
 		return this.id;	
 	}	
 
 	public void setProductCode(String productCode){	
 		this.productCode=productCode;	
 	}	
 
 	public String getProductCode(){	
 		return this.productCode;	
 	}	
 
 	public void setProductName(String productName){	
 		this.productName=productName;	
 	}	
 
 	public String getProductName(){	
 		return this.productName;	
 	}	
 
 	public void setProductPrice(String productPrice){	
 		this.productPrice=productPrice;	
 	}	
 
 	public String getProductPrice(){	
 		return this.productPrice;	
 	}	
 
 	public void setProductDesc(String productDesc){	
 		this.productDesc=productDesc;	
 	}	
 
 	public String getProductDesc(){	
 		return this.productDesc;	
 	}	
 
 	public void setProductBarCode(String productBarCode){	
 		this.productBarCode=productBarCode;	
 	}	
 
 	public String getProductBarCode(){	
 		return this.productBarCode;	
 	}	
 
 	public void setProductStockCount(Integer productStockCount){	
 		this.productStockCount=productStockCount;	
 	}	
 
 	public Integer getProductStockCount(){	
 		return this.productStockCount;	
 	}	
 
 	public void setProductTypeName(Integer productTypeName){	
 		this.productTypeName=productTypeName;	
 	}	
 
 	public Integer getProductTypeName(){	
 		return this.productTypeName;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
 	}	
 
 	public void setCreateBy(Integer createBy){	
 		this.createBy=createBy;	
 	}	
 
 	public Integer getCreateBy(){	
 		return this.createBy;	
 	}	
 
 	public void setCreateTime(Date createTime){	
 		this.createTime=createTime;	
 	}	
 
 	public Date getCreateTime(){	
 		return this.createTime;	
 	}	
 
 	public void setStatus1(String status1){	
 		this.status1=status1;	
 	}	
 
 	public String getStatus1(){	
 		return this.status1;	
 	}	
 

}

