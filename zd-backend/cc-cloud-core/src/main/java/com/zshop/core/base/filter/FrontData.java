package com.zshop.core.base.filter;

import com.fasterxml.jackson.annotation.JsonView;
import com.zshop.core.base.controller.ResultData;

/**
 * 前端用户接口过滤
 * @author huangga
 *
 */
public class FrontData extends ResultData{
	
	@JsonView(FilterType.FRONT.class)
	@Override
	public boolean isResult() {
		return result;
	}

	@JsonView(FilterType.FRONT.class)
	@Override
	public String getMessage() {
		return message;
	}
	
	@JsonView(FilterType.FRONT.class)
	@Override
	public Object getData() {
		return data;
	}
}
