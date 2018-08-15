package com.zshop.core.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.zshop.core.exception.type.BusinessException;

/**
 * HttpServletRequest 与 HttpServletResponse 工具类
 * @author huangga
 *
 */
public class CCServletUtil {

	
	
	/**
	 * Response返回值
	 * @param request
	 * @param response
	 * @param data
	 */
	public static void response(ServletRequest request, ServletResponse response,String data) {
		
		response.setContentType("application/json; charset=utf-8");  
		response.setCharacterEncoding("UTF-8");  

	    PrintWriter out = null;  
	    try {  
	    	out = response.getWriter();   
	        out.append(data);  
	        out.flush();
	    } catch (IOException e) {  
	    	throw new BusinessException("返回异常!"+e.getMessage());
	    } finally {  
	        if (out != null) {  
	            out.close();  
	        }  
	    }  
		
	}
	
}
