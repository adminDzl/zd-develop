package com.zshop.core.base.constant;

public interface BaseTypes {
	//有效
	String VALID="1";
	//无效
	String INVALID="-1";

	//非系统生成，可以删除
	String EDITABLE = "1";
	//系统生成，不可删除
	String NOT_EDITABLE = "2";
	
	//使用fromId查询关联
	int BY_FROM_ID = 1;
	//使用toId查询关联
	int BY_TO_ID = 2;
	
	String LOGIN_FROM_PC="PC";
	String LOGIN_FROM_APP="APP";
	String LOGIN_FROM_PARK="PARK";
	String LOGIN_FROM_WX_MINI="WXMINI";
	
	//关联分类:resource资源相关 permission:权限相关
	String DETAIL_CATEGORY_RESOURCE="resource";
	String DETAIL_CATEGORY_PERMISSION="permission";
	//来源 APP PC Wechat
	String DETAIL_FROM_SOURCE_APP="APP";
	String DETAIL_FROM_SOURCE_PC="PC";
	String DETAIL_FROM_SOURCE_WEIXIN="WeiXin";
	//图片:picture 文件:file 详情url:detail 图片与文件: PF 图片与详情url: PD 文件与详情url: FD
	String DETAIL_RESOURCE_PICTURE="picture";
	String DETAIL_RESOURCE_FILE="file";
	String DETAIL_RESOURCE_DETAIL="detail";
	String DETAIL_RESOURCE_PICTURE_FILE="PF";
	String DETAIL_RESOURCE_PICTURE_DETAIL="PD";
	String DETAIL_RESOURCE_FILE_DETAIL="FD";
	
	//表示请求内容不存在的错误码
	String ERROR_CODE_NOT_EXIST="NOT_EXIST";
	//表示请求内容已失效的错误码
	String ERROR_CODE_EXPIRED="EXPIRED";
}
