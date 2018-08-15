package com.zshop.cloud.core.controller;


import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 返回格式。标识、消息、数据
 * 指定默认过滤类型
 * @author huangga
 *
 */
public class ResultData implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 标识，成功：true，失败：false
	 */
	protected boolean result = true;
	
	/**
	 * 消息提示
	 */
	protected String message;
	
	/**
	 * 数据
	 */
	protected Object data;


	public ResultData(){
	}
	
	public ResultData(Object data){
		this.data = data;
	}
	
	public ResultData(boolean result,String message){
		this.result = result;
		this.message = message;
	}
	
	
	public boolean isResult() {
		return result;
	}
	
	public void setResult(boolean result) {
		this.result = result;
	}
	
	public String getMessage() {
		return message;
	}
	
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	public Object getData() {
		return data;
	}
	
	public void setData(Object data) {
		this.data = data;
	}
	
	
	@SuppressWarnings("unchecked")
	public void setMapData(String key,Object value) {
		
		Map<String, Object> map = null;
		if(data instanceof Map<?, ?>) {
			map = (Map<String, Object>)data;
			map.put(key, value);
		}else {
			map = new HashMap<String, Object>();
			map.put(key, value);
			data = map;
		}
	}
	
	@SuppressWarnings("unchecked")
	public Object getMapData(String key) {
		
		Object object = null;
		if(data instanceof Map<?, ?>) {
			Map<String, Object> map = (Map<String, Object>)data;
			object = map.get(key);
		}
		return object;
	}
}
