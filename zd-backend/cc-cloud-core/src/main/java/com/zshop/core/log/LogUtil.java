package com.zshop.core.log;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @ClassName: Log4jUtil
 * @Description: 文件日志工具类,使用规则：Log4jUtil log = Log4jUtil.getLog4j(***.class);
 *               log.error('错误代码',e);
 * @author lyf
 * @date 2014年4月17日 下午2:33:34
 */
public class LogUtil {

	//日志容器
	private static Map<String,LogUtil>  LogMap    = new ConcurrentHashMap<String,LogUtil>();

	private Logger logger = null;

	private static final String SPRIT = "======================================================="
			+ "=======================================================================";
	private static final String CLASSNAME = "类名:";
	private static final String ERRORCODE = "错误码:";

	private LogUtil(Class clazz) {
		logger = LoggerFactory.getLogger(clazz);
	}

	/**
	 * 
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static LogUtil getLogger(Class clazz) {
		
		LogUtil log = (LogUtil) LogMap.get(clazz.toString());
		if(null == log){
			log = new LogUtil(clazz);
			LogMap.put(clazz.toString(), log);
		}
		return log;
	}

	/**
	 * 
	 * @Title: info
	 * @Description: (打印日志信息,工程中的提示信息)
	 * @throws
	 */
	public void info(String message) {
		logger.info(message);
	}

	public void info(String errorCode, Throwable e) {
		StackTraceElement ste = e.getStackTrace()[0];
		String errorMsg = ste.getClassName() + "." + ste.getMethodName() + "(line" + ste.getLineNumber() + ")："+e.getMessage();
		logger.info(ERRORCODE + errorCode, errorMsg);
	}
	
	public void info(String errorCode, String e) {
		logger.info(ERRORCODE + errorCode, e);
	}


	public void debug(String message) {
		logger.debug(message);
	}


	public void debug(String errorCode, Throwable e) {
		logger.debug(ERRORCODE+ errorCode+"\n",e);
	}

	public void error(String message) {
		logger.info(SPRIT);
		logger.error("\n" + message);
		logger.info(SPRIT);
	}
	public void error(String message,Throwable e) {
		logger.info(SPRIT);
		logger.error("\n" + message);
		logger.info(SPRIT);
	}
	
	public void error(String message,String message2) {
		logger.info(SPRIT);
		logger.error("\n" + message+"\n"+message2);
		logger.info(SPRIT);
	}

	/**
	 * 系统名称+系统异常
	 * @param projectName
	 * @param e
	 */
	public void error(String projectName,String message,Throwable e) {
		StackTraceElement ste = e.getStackTrace()[0];
		String errorMsg = ste.getClassName() + "." + ste.getMethodName() + "(line" + ste.getLineNumber() + ")："+e.getMessage();
		logger.info(SPRIT);
		logger.error("\nSystem Name："+projectName+"\nPosition:"+errorMsg+"\n"+message+"\nDetail:",e);
		logger.info(SPRIT);
	}
	/**
	 * @标题: isTraceEnabled
	 * @描述: (是否启用调试)
	 */
	public boolean isTraceEnabled() {
		return logger.isTraceEnabled();
	}

	public boolean isDebugEnabled() {
		return logger.isDebugEnabled();
	}
}
