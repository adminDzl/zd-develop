package com.zshop.user.account.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;


/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:23:23
 */
public class Account implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 
	 */
	private Integer id;	
	/**
	 * 
	 */
	private String createBy;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;	
	/**
	 * 
	 */
	private String updateBy;	
	/**
	 * 
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateTime;	
	/**
	 * 所对应的zs_business主键
	 */
	private Integer bid;	
	/**
	 * 
	 */
	private String account;	
	/**
	 * 
	 */
	private String password;	
	/**
	 * 最后登录时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date lastTime;	
	/**
	 * 是否启用(1:已开通,0:未开通,2:禁用,3:已删除)
	 */
	private Integer state;	
	/**
	 * app调用时的校验(注册登录除外)，登录时生成
	 */
	private String token;	
	/**
	 * 令牌生成时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date tokenTime;	
	/**
	 * 
	 */
	private String remark;	
	/**
	 * 用户选择的页面（1、销售端  2、采购端）
	 */
	private String param1;	
	/**
	 * 企业端引导（0都没，1看完配置引导，2勾选初始化向导不显示）
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


 	public void setId(Integer id){	
 		this.id=id;	
 	}	
 
 	public Integer getId(){	
 		return this.id;	
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
 
 	public void setAccount(String account){	
 		this.account=account;	
 	}	
 
 	public String getAccount(){	
 		return this.account;	
 	}	
 
 	public void setPassword(String password){	
 		this.password=password;	
 	}	
 
 	public String getPassword(){	
 		return this.password;	
 	}	
 
 	public void setLastTime(Date lastTime){	
 		this.lastTime=lastTime;	
 	}	
 
 	public Date getLastTime(){	
 		return this.lastTime;	
 	}	
 
 	public void setState(Integer state){	
 		this.state=state;	
 	}	
 
 	public Integer getState(){	
 		return this.state;	
 	}	
 
 	public void setToken(String token){	
 		this.token=token;	
 	}	
 
 	public String getToken(){	
 		return this.token;	
 	}	
 
 	public void setTokenTime(Date tokenTime){	
 		this.tokenTime=tokenTime;	
 	}	
 
 	public Date getTokenTime(){	
 		return this.tokenTime;	
 	}	
 
 	public void setRemark(String remark){	
 		this.remark=remark;	
 	}	
 
 	public String getRemark(){	
 		return this.remark;	
 	}	
 
 	public void setParam1(String param1){	
 		this.param1=param1;	
 	}	
 
 	public String getParam1(){	
 		return this.param1;	
 	}	
 
 	public void setParam2(String param2){	
 		this.param2=param2;	
 	}	
 
 	public String getParam2(){	
 		return this.param2;	
 	}	
 
 	public void setParam3(String param3){	
 		this.param3=param3;	
 	}	
 
 	public String getParam3(){	
 		return this.param3;	
 	}	
 
 	public void setParam4(String param4){	
 		this.param4=param4;	
 	}	
 
 	public String getParam4(){	
 		return this.param4;	
 	}	
 
 	public void setParam5(String param5){	
 		this.param5=param5;	
 	}	
 
 	public String getParam5(){	
 		return this.param5;	
 	}	
 

}

