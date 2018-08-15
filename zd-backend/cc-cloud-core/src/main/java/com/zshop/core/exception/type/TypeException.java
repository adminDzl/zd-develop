package com.zshop.core.exception.type;

import java.io.IOException;
import java.rmi.RemoteException;
import java.sql.SQLException;

/**
 * 定义不同异常类型返回给前端的提示。
 * @author huangga
 *
 */
public class TypeException {

	public static String type(Exception e) {
		String massage = "";
		
		if(e instanceof IOException){ 
    		massage = "文件操作出错!";
        }else if(e instanceof SQLException){ 
    		massage =  "数据库错误(SQL异常)!";
        }else if(e instanceof RemoteException){  
        	massage =  "远程端口调用(RMI)错误!";
        }else if(e instanceof java.net.ConnectException){  
    		massage =  "服务器无法连接到数据库!";
        }else if(e instanceof RuntimeException){  
    		massage =  "系统运行错误!";
        }else if(e instanceof Exception){
    		massage =  "系统错误!";
        }else{   
    		massage =  "未知错误!";
        }
		return massage;
	}
	
}
