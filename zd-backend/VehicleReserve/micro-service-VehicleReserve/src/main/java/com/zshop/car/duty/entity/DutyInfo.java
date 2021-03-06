package com.zshop.car.duty.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;


/**
 * @Description: 职务信息表
 * @author: Administrator
 * @date: 2018-04-28 21:19:02
 */
public class DutyInfo implements Serializable{
	
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
	 * 职务名称
	 */
	private String dutyName;	
	/**
	 * 职务排序
	 */
	private Integer dutySort;	
	/**
	 * 职务状态
	 */
	private String dutyStatus;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 创建人id
	 */
	private String createBy;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 修改人id
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
 
 	public void setDutyName(String dutyName){	
 		this.dutyName=dutyName;	
 	}	
 
 	public String getDutyName(){	
 		return this.dutyName;	
 	}	
 
 	public void setDutySort(Integer dutySort){	
 		this.dutySort=dutySort;	
 	}	
 
 	public Integer getDutySort(){	
 		return this.dutySort;	
 	}	
 
 	public void setDutyStatus(String dutyStatus){	
 		this.dutyStatus=dutyStatus;	
 	}	
 
 	public String getDutyStatus(){	
 		return this.dutyStatus;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
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
 

}

