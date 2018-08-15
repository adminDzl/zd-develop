package com.zshop.cloud.filter.authority.service;

import com.netflix.zuul.context.RequestContext;

/**
 * 权限验证服务
 * @author huangga
 *
 */
public interface AuthService {

	/**
	 * 请求权限校验
	 * @param context
	 */
	void doAuthority(RequestContext context)throws Exception ;
	
	/**
	 * 登录验证：Token是否有效
	 * @param context
	 */
	void doLoginAuthority(RequestContext context)throws Exception ; 
	
	/**
	 * 园区之间权限验证
	 * @param context
	 */
	void doParkAuthority(RequestContext context)throws Exception ; 

}
