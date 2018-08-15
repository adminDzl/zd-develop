package com.zshop.core.page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 页
 * @author huangga
 *
 * @param <T>
 */
public class Page<T> implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static int DEFAULT_SIZE = 10;
	public static String LIMIT_PARAM = "limitParam";
	
	//当前页数
	private long pageNo = 1L;
	//总页数
	private long pageCount;
	//每页记录数
	private long pageSize = DEFAULT_SIZE;
	//总记录数
	private long total;
	//返回信息
	private List<T> rows = new ArrayList<T>();
	
	public long getPageNo() {
		return this.pageNo;
	}

	public void setPageNo(long pageNo) {
		this.pageNo = pageNo;
	}

	public long getPageCount(){
		return this.pageCount;
	}

	public void setPageCount(long pageCount) {
		this.pageCount = pageCount;
	}

	public long getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(long pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotal() {
		return this.total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<T> getRows() {
		return this.rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}
}
