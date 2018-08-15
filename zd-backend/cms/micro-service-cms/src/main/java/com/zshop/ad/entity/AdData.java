package com.zshop.ad.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @Description: 广告数据
 * @author: Enzo
 * @date: 2018-08-13 11:35:38
 */
@Setter
@Getter
public class AdData implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
		
	/**
	 * 广告ID
	 */
	private Integer id;	
	/**
	 * 广告长标题
	 */
	private String adFullTitle;	
	/**
	 * 广告短标题
	 */
	private String adShortTitle;	
	/**
	 * 广告类型(1:图片类型, 2:文字类型)
	 */
	private Integer adType;	
	/**
	 * 图片URL
	 */
	private String adImgUrl;	
	/**
	 * 文字内容
	 */
	private String adContent;	
	/**
	 * 排序序号
	 */
	private Integer adSn;	
	/**
	 * 点击次数
	 */
	private Integer adCCount;	
	/**
	 * 关注次数
	 */
	private Integer adFCount;	
	/**
	 * 描述
	 */
	private String adDesc;	
	/**
	 * 链接类型(0:无链接 1:外部链接 2:内部链接)
	 */
	private Integer adLinkType;	
	/**
	 * 链接URL
	 */
	private String adLink;	
	/**
	 * 状态(0:未启用 1:启用)
	 */
	private Integer adState;	
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
	 * 
	 */
	private String param1;	
	/**
	 * 
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

}

