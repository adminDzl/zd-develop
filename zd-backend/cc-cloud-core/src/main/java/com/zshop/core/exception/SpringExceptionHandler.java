package com.zshop.core.exception;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zshop.core.exception.type.LoginOutExceptions;
import com.zshop.core.exception.type.ParameterException;
import com.zshop.core.exception.type.TypeException;
import com.zshop.core.util.CCContextUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.exception.type.BusinessException;
import com.zshop.core.log.LogUtil;

/**
 * 基于@ExceptionHandler 方式的全局异常处理类。
 * 
 * 注意：若Spring容器无法扫描到该类，则需在applicationContext.xml中添加配置
 * <bean class="com.zshop.core.exception.SpringExceptionHandler" />
 * 
 * 
 * 
 * @author huangga
 */
@ControllerAdvice
public class SpringExceptionHandler {
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());

	/**
	 * 处理无法识别的异常
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler(Throwable.class)
	@ResponseBody
	public ResultData handleException(Throwable ex, HttpServletRequest request) {
		
		printSysLog(CCContextUtil.getProjectName(request), "未知异常", ex);
		
		ResultData result = new ResultData();
		result.setResult(false);
		result.setMessage(StringUtils.isBlank(ex.getMessage()) ? "系统异常" : ex.getMessage());
		return result;
	}
	
	
	/**
	 * 处理 Exception异常
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public ResultData handleException(Exception ex, HttpServletRequest request) {
		
		printSysLog(CCContextUtil.getProjectName(request), TypeException.type(ex), ex);
		
		ResultData result = new ResultData();
		result.setResult(false);
		result.setMessage(TypeException.type(ex));
		return result;
	}


	/**
	 * 参数异常处理。
	 */
	@ExceptionHandler(ParameterException.class)
	@ResponseBody
	public ResultData handleException(ParameterException e, HttpServletRequest request) {
		
		printUserLog("ParameterException  errorMessage:"+e.getMessage());
		
		ResultData result = new ResultData();
		result.setResult(false);
		
		StringBuilder sb = new StringBuilder();  
		if(e.getErrors()!=null){
			Errors errors = e.getErrors();
			if(errors.hasErrors()){
				List<ObjectError> error = errors.getAllErrors();  
	            for (ObjectError err : error) {  
	                sb.append(err.getDefaultMessage()+";");
	            }
			}
		}
		result.setMessage(e.getMessage()+sb.toString());
		result.setData(e.getData());
		return result;
	}
	
	/**
	 * 业务异常处理。处理controller层抛出的 BusinessException异常
	 */
	@ExceptionHandler(BusinessException.class)
	@ResponseBody
	public ResultData handleException(BusinessException e,HttpServletRequest request) {
		
		printUserLog("BusinessException  errorMessage:"+e.getMessage());
		
		ResultData result = new ResultData();
		result.setResult(false);
		result.setMessage(e.getMessage());
		result.setData(e.getData());
		return result;
	}
	/**
	 * 登录超时异常处理。
	 */
	@ExceptionHandler(LoginOutExceptions.class)
	@ResponseBody
	public ResultData handleException(LoginOutExceptions e,HttpServletRequest request) {

		ResultData result = new ResultData();
		result.setResult(false);
		result.setMessage(e.getMessage());
		result.setData("loginout");
		return result;
	}
	
	/**
	 * 用户操作异常
	 * @param projectName
	 * @param ex
	 */
	private void printUserLog(String message){
		logger.info(message);
	}
	/**
	 * 系统异常
	 * @param projectName
	 * @param unkownErrorMessage
	 * @param e
	 */
	private void printSysLog(String projectName, String message, Throwable e) {
		logger.error(projectName,message, e);
	}

}
