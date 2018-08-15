package com.zshop.core.base.filter;

import com.fasterxml.jackson.annotation.JsonView;
import com.zshop.core.base.controller.ResultData;

/**
 * 后台管理接口过滤
 * @author huangga
 *
 */
public class AdminData extends ResultData{

	@JsonView(FilterType.ADMIN.class)
	@Override
	public boolean isResult() {
		return result;
	}

	@JsonView(FilterType.ADMIN.class)
	@Override
	public String getMessage() {
		return message;
	}
	
	@JsonView(FilterType.ADMIN.class)
	@Override
	public Object getData() {
		return data;
	}

}
