package com.zshop.cloud.core.exception;

/**
 * 定义业务层的异常处理类
 * @author xiaopeng
 * @date 2014-06-17
 */
public class BusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private Object data;

	public BusinessException() {
		super();
	}

	public BusinessException(String message) {
		super(message);
	}
	
	public BusinessException(Throwable cause) {
		super(cause);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public BusinessException(String message, Object data) {
		super(message);
		this.data =data;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
	
	
}
