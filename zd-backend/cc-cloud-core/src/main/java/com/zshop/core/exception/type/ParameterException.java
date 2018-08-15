package com.zshop.core.exception.type;

import org.springframework.validation.Errors;

/**
 * 定义参数异常
 * @author xiaopeng
 * @date 2014-06-17
 */

public class ParameterException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	
	private Object data;
	private Errors errors;
	
	public ParameterException() {
		super();
	}

	public ParameterException(String message) {
		super(message);
	}
	
	public ParameterException(Throwable cause) {
		super(cause);
	}

	public ParameterException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public ParameterException(String message,Object data) {
		super(message);
		this.data = data;
	}
	
	public ParameterException(String message,Errors errors) {
		super(message);
		this.errors = errors;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Errors getErrors() {
		return errors;
	}

	public void setErrors(Errors errors) {
		this.errors = errors;
	}

}
