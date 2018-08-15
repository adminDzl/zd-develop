package com.zshop.core.exception.type;

public class LoginOutExceptions  extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private Object data;

	public LoginOutExceptions() {
		super();
	}

	public LoginOutExceptions(String message) {
		super(message);
	}
	
	public LoginOutExceptions(Throwable cause) {
		super(cause);
	}

	public LoginOutExceptions(String message, Throwable cause) {
		super(message, cause);
	}
	
	public LoginOutExceptions(String message, Object data) {
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