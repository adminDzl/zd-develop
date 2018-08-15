package com.zshop.core.page;

import java.util.List;

import com.github.pagehelper.PageInfo;

/**
 * 系统分页工具类
 */
public class PageUtil{

	/**
	 * 使用Mybatis分页工具设置分页信息
	 */
	public static <T> void setPageInfo(Page<T> page,List<T> list) {
		
		PageInfo<T> p=new PageInfo<T>(list);
		page.setTotal(p.getTotal()); 
		initPage(page);

	}
	
	/**
	 * 计算分页数据
	 * @param page
	 */
	private static <T> void initPage(Page<T> page) {
		long pageCount = 0L;
	    if (page.getTotal() != 0L) {
	    	pageCount = (page.getTotal() - 1L) / page.getPageSize() + 1L;
	    	page.setPageCount(pageCount);
	    }

	    if (pageCount != 0L) {
	    	if (page.getPageNo() > pageCount) {
	    		page.setPageNo(pageCount);
	    	}
	    	if (page.getPageNo() < 1L) {
	    		page.setPageNo(1L);
	    	}
	    } 
	}
	
}
