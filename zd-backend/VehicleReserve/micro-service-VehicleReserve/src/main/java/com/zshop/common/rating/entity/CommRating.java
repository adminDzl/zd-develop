package com.zshop.common.rating.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * @Description: 评价记录表
 * @author: Administrator
 * @date: 2018-04-27 14:44:28
 */
public class CommRating implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 
	 */
	private String id;	
	/**
	 * 园区id
	 */
	private String parkId;	
	/**
	 * 业务类型 （1：餐饮，2：用车，3：会议室，4：报修，5：放行）
	 */
	private String type1;	
	/**
	 * 订单id
	 */
	private String orderId;	
	/**
	 * 评分类型(0：星；1：分）
	 */
	private String ratingType;	
	/**
	 * 评分
	 */
	private Integer ratingScore;	
	/**
	 * 标题
	 */
	private String title;	
	/**
	 * 评价描述
	 */
	private String ratingDesc;	
	/**
	 * 评价文件路径（相对路径，多个以;隔开）
	 */
	private String ratingFileUrl;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 评价详情
	 */
	private String ratingSrc;	
	/**
	 * 创建人
	 */
	private String createBy;	
	/**
	 * 创建人名称
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 修改人
	 */
	private String updateBy;	
	/**
	 * 修改时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 状态1
	 */
	private String status1;	
	/**
	 * 状态2
	 */
	private String status2;	
	/**
	 * 扩展字段1
	 */
	private String ext1;	
	/**
	 * 扩展字段2
	 */
	private String ext2;	
	/**
	 * 扩展字段3
	 */
	private String ext3;	
	/**
	 * 扩展字段4
	 */
	private String ext4;	
	/**
	 * 扩展字段5
	 */
	private String ext5;	
	/**
	 * 扩展字段6
	 */
	private String ext6;

	/**
	 * 评价附件列表
	 */
	private List<String> ratingFileUrlList;


 	public void setId(String id){	
 		this.id=id;	
 	}	
 
 	public String getId(){	
 		return this.id;	
 	}	
 
 	public void setParkId(String parkId){	
 		this.parkId=parkId;	
 	}	
 
 	public String getParkId(){	
 		return this.parkId;	
 	}	
 
 	public void setType1(String type1){	
 		this.type1=type1;	
 	}	
 
 	public String getType1(){	
 		return this.type1;	
 	}	
 
 	public void setOrderId(String orderId){	
 		this.orderId=orderId;	
 	}	
 
 	public String getOrderId(){	
 		return this.orderId;	
 	}	
 
 	public void setRatingType(String ratingType){	
 		this.ratingType=ratingType;	
 	}	
 
 	public String getRatingType(){	
 		return this.ratingType;	
 	}	
 
 	public void setRatingScore(Integer ratingScore){	
 		this.ratingScore=ratingScore;	
 	}	
 
 	public Integer getRatingScore(){	
 		return this.ratingScore;	
 	}	
 
 	public void setTitle(String title){	
 		this.title=title;	
 	}	
 
 	public String getTitle(){	
 		return this.title;	
 	}	
 
 	public void setRatingDesc(String ratingDesc){	
 		this.ratingDesc=ratingDesc;	
 	}	
 
 	public String getRatingDesc(){	
 		return this.ratingDesc;	
 	}	
 
 	public void setRatingFileUrl(String ratingFileUrl){	
 		this.ratingFileUrl=ratingFileUrl;	
 	}	
 
 	public String getRatingFileUrl(){	
 		return this.ratingFileUrl;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
 	}	
 
 	public void setRatingSrc(String ratingSrc){	
 		this.ratingSrc=ratingSrc;	
 	}	
 
 	public String getRatingSrc(){	
 		return this.ratingSrc;	
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
 
 	public void setStatus1(String status1){	
 		this.status1=status1;	
 	}	
 
 	public String getStatus1(){	
 		return this.status1;	
 	}	
 
 	public void setStatus2(String status2){	
 		this.status2=status2;	
 	}	
 
 	public String getStatus2(){	
 		return this.status2;	
 	}	
 
 	public void setExt1(String ext1){	
 		this.ext1=ext1;	
 	}	
 
 	public String getExt1(){	
 		return this.ext1;	
 	}	
 
 	public void setExt2(String ext2){	
 		this.ext2=ext2;	
 	}	
 
 	public String getExt2(){	
 		return this.ext2;	
 	}	
 
 	public void setExt3(String ext3){	
 		this.ext3=ext3;	
 	}	
 
 	public String getExt3(){	
 		return this.ext3;	
 	}	
 
 	public void setExt4(String ext4){	
 		this.ext4=ext4;	
 	}	
 
 	public String getExt4(){	
 		return this.ext4;	
 	}	
 
 	public void setExt5(String ext5){	
 		this.ext5=ext5;	
 	}	
 
 	public String getExt5(){	
 		return this.ext5;	
 	}	
 
 	public void setExt6(String ext6){	
 		this.ext6=ext6;	
 	}	
 
 	public String getExt6(){	
 		return this.ext6;	
 	}

	public List<String> getRatingFileUrlList() {
		return ratingFileUrlList;
	}

	public void setRatingFileUrlList(List<String> ratingFileUrlList) {
		this.ratingFileUrlList = ratingFileUrlList;
	}
}

