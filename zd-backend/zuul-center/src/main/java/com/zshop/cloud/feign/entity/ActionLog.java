package com.zshop.cloud.feign.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * @Description: 操作日志表
 * @author: zgx
 * @date: 2018-03-23 10:16:25
 */
public class ActionLog implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 数据项id
	 */
	private String id;	
	/**
	 * 所属园区
	 */
	private String park;	
	/**
	 * url路径
	 */
	private String url;	
	/**
	 * 请求方式
	 */
	private String method;	
	/**
	 * 请求参数
	 */
	private String parameter;	
	/**
	 * 操作表名
	 */
	private String tbName;	
	/**
	 * 表操作类型，0:create 1:query 2:update 3:delete
	 */
	private String tbMethod;	
	/**
	 * 操作表的sql语句
	 */
	private String tbSql;	
	/**
	 * 请求用户
	 */
	private String requestBy;	
	/**
	 * 请求IP地址
	 */
	private String requestIp;	
	/**
	 * 请求结果，0:成功, 1:失败
	 */
	private String result;	
	/**
	 * 请求时间
	 */
	private String duration;	
	/**
	 * 失败信息
	 */
	private String errorMessage;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 创建时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 创建人
	 */
	private String createBy;	
	/**
	 * 更新时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 更新人
	 */
	private String updateBy;	
	/**
	 * 状态： 1 正常 -1 删除
	 */
	private String status1;	
	/**
	 * 状态
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
 
 	public void setPark(String park){	
 		this.park=park;	
 	}	
 
 	public String getPark(){	
 		return this.park;	
 	}	
 
 	public void setUrl(String url){	
 		this.url=url;	
 	}	
 
 	public String getUrl(){	
 		return this.url;	
 	}	
 
 	public void setMethod(String method){	
 		this.method=method;	
 	}	
 
 	public String getMethod(){	
 		return this.method;	
 	}	
 
 	public void setParameter(String parameter){	
 		this.parameter=parameter;	
 	}	
 
 	public String getParameter(){	
 		return this.parameter;	
 	}	
 
 	public void setTbName(String tbName){	
 		this.tbName=tbName;	
 	}	
 
 	public String getTbName(){	
 		return this.tbName;	
 	}	
 
 	public void setTbMethod(String tbMethod){	
 		this.tbMethod=tbMethod;	
 	}	
 
 	public String getTbMethod(){	
 		return this.tbMethod;	
 	}	
 
 	public void setTbSql(String tbSql){	
 		this.tbSql=tbSql;	
 	}	
 
 	public String getTbSql(){	
 		return this.tbSql;	
 	}	
 
 	public void setRequestBy(String requestBy){	
 		this.requestBy=requestBy;	
 	}	
 
 	public String getRequestBy(){	
 		return this.requestBy;	
 	}	
 
 	public void setRequestIp(String requestIp){	
 		this.requestIp=requestIp;	
 	}	
 
 	public String getRequestIp(){	
 		return this.requestIp;	
 	}	
 
 	public void setResult(String result){	
 		this.result=result;	
 	}	
 
 	public String getResult(){	
 		return this.result;	
 	}	
 
 	public void setDuration(String duration){	
 		this.duration=duration;	
 	}	
 
 	public String getDuration(){	
 		return this.duration;	
 	}	
 
 	public void setErrorMessage(String errorMessage){	
 		this.errorMessage=errorMessage;	
 	}	
 
 	public String getErrorMessage(){	
 		return this.errorMessage;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
 	}	
 
 	public void setCreateTime(Date createTime){	
 		this.createTime=createTime;	
 	}	
 
 	public Date getCreateTime(){	
 		return this.createTime;	
 	}	
 
 	public void setCreateBy(String createBy){	
 		this.createBy=createBy;	
 	}	
 
 	public String getCreateBy(){	
 		return this.createBy;	
 	}	
 
 	public void setUpdateTime(Date updateTime){	
 		this.updateTime=updateTime;	
 	}	
 
 	public Date getUpdateTime(){	
 		return this.updateTime;	
 	}	
 
 	public void setUpdateBy(String updateBy){	
 		this.updateBy=updateBy;	
 	}	
 
 	public String getUpdateBy(){	
 		return this.updateBy;	
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