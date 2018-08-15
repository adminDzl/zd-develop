package com.zshop.core.base.filter;

/**
 * 定义@JsonView的过滤类型
 * @author huangga
 *
 */
public class FilterType {
	
	//后台管理接口 过滤类型
	public interface ADMIN{}
	
	//前端用户接口 过滤类型
	public interface FRONT{}
	
	//接口 过滤类型
	public interface OPEN{}
}
