package com.zshop.product.sub.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 子商品表
 * @author: Enzo
 * @date: 2018-08-14 20:25:22
 */
@Setter
@Getter
public class SubProduct implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 子商品ID
	 */
	private Integer id;	
	/**
	 * 主商品编号
	 */
	private Integer mainProductId;	
	/**
	 * 商品标识
	 */
	private String productCode;	
	/**
	 * 条形码
	 */
	private String barCode;	
	/**
	 * 商品属性
	 */
	private String property;	
	/**
	 * 提交时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date postTime;	
	/**
	 * 上下架标识（1：上架，0：下架）
	 */
	private Integer onSale;	
	/**
	 * 是否审核（1：是，0：否）
	 */
	private Integer auditFlag;	
	/**
	 * 运营商强制下架标识（1：是，0：否）
	 */
	private Integer aliveflag;	
	/**
	 * 商品上架时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date onSaleTime;	
	/**
	 * 商品下架时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date offSaleTime;	
	/**
	 * 批发商品上下架
	 */
	private Integer pfOnSale;	
	/**
	 * 批发商品上架时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date pfOnSaleTime;	
	/**
	 * 批发商品下架时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date pfOffSaleTime;	
	/**
	 * 是否开发票（1、是  0、否）
	 */
	private Integer isInvoice;	
	/**
	 * 商品类型（1、自营  2、代销）
	 */
	private Integer productType;	
	/**
	 * 根据商品归属商家
	 */
	private String sourceId;	
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
	 * 商品排序值
	 */
	private Integer sort;	
	/**
	 * 是否是主SKU商品
	 */
	private Integer isMainSku;	
	/**
	 * 商品完整性 1:商品信息未完善，不能上架  0:商品信息完善，可以上架
	 */
	private String param1;	
	/**
	 * 商品佣金
	 */
	private String param2;	
	/**
	 * 默认仓库
	 */
	private String param3;	
	/**
	 * 商品销量
	 */
	private String param4;	
	/**
	 * 
	 */
	private String param5;	
	/**
	 * 区域屏蔽字段
	 */
	private String areaMask;	
	/**
	 * 自定商户屏蔽
	 */
	private String businessMask;	
	/**
	 * 等级屏蔽
	 */
	private String levelMask;	


 	public void setId(Integer id){	
 		this.id=id;	
 	}	
 
 	public Integer getId(){	
 		return this.id;	
 	}	
 
 	public void setMainProductId(Integer mainProductId){	
 		this.mainProductId=mainProductId;	
 	}	
 
 	public Integer getMainProductId(){	
 		return this.mainProductId;	
 	}	
 
 	public void setProductCode(String productCode){	
 		this.productCode=productCode;	
 	}	
 
 	public String getProductCode(){	
 		return this.productCode;	
 	}	
 
 	public void setBarCode(String barCode){	
 		this.barCode=barCode;	
 	}	
 
 	public String getBarCode(){	
 		return this.barCode;	
 	}	
 
 	public void setProperty(String property){	
 		this.property=property;	
 	}	
 
 	public String getProperty(){	
 		return this.property;	
 	}	
 
 	public void setPostTime(Date postTime){	
 		this.postTime=postTime;	
 	}	
 
 	public Date getPostTime(){	
 		return this.postTime;	
 	}	
 
 	public void setOnSale(Integer onSale){	
 		this.onSale=onSale;	
 	}	
 
 	public Integer getOnSale(){	
 		return this.onSale;	
 	}	
 
 	public void setAuditFlag(Integer auditFlag){	
 		this.auditFlag=auditFlag;	
 	}	
 
 	public Integer getAuditFlag(){	
 		return this.auditFlag;	
 	}	
 
 	public void setAliveflag(Integer aliveflag){	
 		this.aliveflag=aliveflag;	
 	}	
 
 	public Integer getAliveflag(){	
 		return this.aliveflag;	
 	}	
 
 	public void setOnSaleTime(Date onSaleTime){	
 		this.onSaleTime=onSaleTime;	
 	}	
 
 	public Date getOnSaleTime(){	
 		return this.onSaleTime;	
 	}	
 
 	public void setOffSaleTime(Date offSaleTime){	
 		this.offSaleTime=offSaleTime;	
 	}	
 
 	public Date getOffSaleTime(){	
 		return this.offSaleTime;	
 	}	
 
 	public void setPfOnSale(Integer pfOnSale){	
 		this.pfOnSale=pfOnSale;	
 	}	
 
 	public Integer getPfOnSale(){	
 		return this.pfOnSale;	
 	}	
 
 	public void setPfOnSaleTime(Date pfOnSaleTime){	
 		this.pfOnSaleTime=pfOnSaleTime;	
 	}	
 
 	public Date getPfOnSaleTime(){	
 		return this.pfOnSaleTime;	
 	}	
 
 	public void setPfOffSaleTime(Date pfOffSaleTime){	
 		this.pfOffSaleTime=pfOffSaleTime;	
 	}	
 
 	public Date getPfOffSaleTime(){	
 		return this.pfOffSaleTime;	
 	}	
 
 	public void setIsInvoice(Integer isInvoice){	
 		this.isInvoice=isInvoice;	
 	}	
 
 	public Integer getIsInvoice(){	
 		return this.isInvoice;	
 	}	
 
 	public void setProductType(Integer productType){	
 		this.productType=productType;	
 	}	
 
 	public Integer getProductType(){	
 		return this.productType;	
 	}	
 
 	public void setSourceId(String sourceId){	
 		this.sourceId=sourceId;	
 	}	
 
 	public String getSourceId(){	
 		return this.sourceId;	
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

}

