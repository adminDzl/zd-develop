package com.zshop.common.order.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 订单总表
 * @author: Administrator
 * @date: 2018-04-20 17:04:44
 */
public class CommOrder implements Serializable{
	
	private static final long serialVersionUID = 1L;


	/**
	 * 
	 */
	private String id;	
	/**
	 * 订单是否已完成
	 */
	private String isDone;	
	/**
	 * 园区id
	 */
	private String parkId;	
	/**
	 * 业务类型 （1：餐饮，2：用车，3：会议室，4：报修，5：放行）
	 */
	private String type1;	
	/**
	 * 业务类型名称
	 */
	private String type1Name;	
	/**
	 * 列表订单类型（0：所有，1：我创建的，2：待处理）
	 */
	private String type2;	
	/**
	 * 列表订单类型名称
	 */
	private String type2Name;	
	/**
	 * 订单编号
	 */
	private String orderNo;	
	/**
	 * 订单id
	 */
	private String orderId;	
	/**
	 * 订单状态（根据不同业务类型进行区分）
	 */
	private String orderStatus;	
	/**
	 * 图片url（相对路径）
	 */
	private String imgUrl;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 状态1
	 */
	private String status1;	
	/**
	 * 状态2
	 */
	private String status2;	
	/**
	 * 创建人id
	 */
	private String createBy;	
	/**
	 * 创建人名称
	 */
	private String createName;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 修改人id（业务处理后进行更新）
	 */
	private String updateBy;	
	/**
	 * 修改时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 待处理类型（0：角色；1：用户；2：权限），默认为2
	 */
	private String waithandleType;	
	/**
	 * 待处理唯一编码值，默认为权限值（若待处理类型为0，则为角色ID；若待处理类型为1，则为用户ID；若待处理类型为2，则为权限值）
	 */
	private String waithandleId;	
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
	 * 订单详情url（用扩展字段ext1表示）
	 */
	private String url;


 	public void setId(String id){	
 		this.id=id;	
 	}	
 
 	public String getId(){	
 		return this.id;	
 	}	
 
 	public void setIsDone(String isDone){	
 		this.isDone=isDone;	
 	}	
 
 	public String getIsDone(){	
 		return this.isDone;	
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
 
 	public void setType1Name(String type1Name){	
 		this.type1Name=type1Name;	
 	}	
 
 	public String getType1Name(){	
 		return this.type1Name;	
 	}	
 
 	public void setType2(String type2){	
 		this.type2=type2;	
 	}	
 
 	public String getType2(){	
 		return this.type2;	
 	}	
 
 	public void setType2Name(String type2Name){	
 		this.type2Name=type2Name;	
 	}	
 
 	public String getType2Name(){	
 		return this.type2Name;	
 	}	
 
 	public void setOrderNo(String orderNo){	
 		this.orderNo=orderNo;	
 	}	
 
 	public String getOrderNo(){	
 		return this.orderNo;	
 	}	
 
 	public void setOrderId(String orderId){	
 		this.orderId=orderId;	
 	}	
 
 	public String getOrderId(){	
 		return this.orderId;	
 	}	
 
 	public void setOrderStatus(String orderStatus){	
 		this.orderStatus=orderStatus;	
 	}	
 
 	public String getOrderStatus(){
 		return this.orderStatus;
 	}	
 
 	public void setImgUrl(String imgUrl){	
 		this.imgUrl=imgUrl;	
 	}	
 
 	public String getImgUrl(){	
 		return this.imgUrl;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
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
 
 	public void setCreateBy(String createBy){	
 		this.createBy=createBy;	
 	}	
 
 	public String getCreateBy(){	
 		return this.createBy;	
 	}	
 
 	public void setCreateName(String createName){	
 		this.createName=createName;	
 	}	
 
 	public String getCreateName(){	
 		return this.createName;	
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
 
 	public void setWaithandleType(String waithandleType){	
 		this.waithandleType=waithandleType;	
 	}	
 
 	public String getWaithandleType(){	
 		return this.waithandleType;	
 	}	
 
 	public void setWaithandleId(String waithandleId){	
 		this.waithandleId=waithandleId;	
 	}	
 
 	public String getWaithandleId(){	
 		return this.waithandleId;	
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

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}

