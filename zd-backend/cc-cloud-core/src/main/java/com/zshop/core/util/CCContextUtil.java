package com.zshop.core.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.zshop.core.log.LogUtil;

/**
 * @描述 应用上下文工具类，用于获取Request、Session。
 * 该工具类基于RequestContextHolder实现，注意：当有文件上传时，无法通过request获取到值。
 * @author huangga
 *
 */
public class CCContextUtil {

	private static final LogUtil log = LogUtil.getLogger(CCContextUtil.class);
	/**
	 * 项目名称
	 */
	private static String projectName;
	
	/**
	 * @描述: 获取spring上下文
	 * @return
	 */
	public static ApplicationContext getSpringContext() {
		ApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();
		return ctx;
	}
	/**
	 * 获取请求request。
	 * @return
	 */
	public static HttpServletRequest getRequest() {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		return servletRequestAttributes.getRequest();
	}
	/**
	 * 获取session
	 * @return
	 */
	public static HttpSession getSession() {
		return getRequest().getSession();
	}
	
	/**
	 * 获取资源绝对路径
	 * @param path
	 * @return
	 */
	public static String getRealPath(String path) {
		return getRequest().getServletContext().getRealPath(path);
	}
	/**
	 * 获取应用URL地址
	 * @return
	 */
	public static String getWebRootPath() {
		HttpServletRequest request = getRequest();
		String webRootPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ request.getContextPath();
		return webRootPath;
	}
	/**
	 * 获取项目名称
	 * @param request
	 * @return
	 */
	public static String getProjectName(HttpServletRequest request){
		if(null==projectName){
			projectName = request.getContextPath();
			if(StringUtils.isNotBlank(projectName)){
				projectName = projectName.substring(1, projectName.length());
			}
		}
		return projectName;
	}
	
	/**
	 * 获取客户端IP地址
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("http_client_ip");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		// 如果是多级代理，那么取第一个ip为客户ip
		if (ip != null && ip.indexOf(",") != -1) {
			ip = ip.substring(ip.lastIndexOf(",") + 1, ip.length()).trim();
		}
		return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
	}
	
	public static boolean checkAgentIsMobile(String ua) {  

	    String[] agent = { "Android", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser" };  
	    boolean flag = false;  
	    if (!ua.contains("Windows NT") || (ua.contains("Windows NT") && ua.contains("compatible; MSIE 9.0;"))) {  
	        // 排除 苹果桌面系统  
	        if (!ua.contains("Windows NT") && !ua.contains("Macintosh")) {  
	            for (String item : agent) {  
	                if (ua.contains(item)) {  
	                    flag = true;  
	                    break;  
	                }  
	            }  
	        }  
	    }  
	    return flag;  
	}  
	
	/**
	 * 根据类型获取对象实例，该类型应该由spring加载。
	 * @param clazz bean类型
	 * @return
	 */
	public static <T> T getBean(Class<T> clazz) {
		try {
			ApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();
			return ctx.getBean(clazz);
		} catch (Exception e) {
			log.error(e.toString());
			try {
				return RequestContextUtils.findWebApplicationContext(getRequest()).getBean(clazz);
			} catch (Exception e1) {
			}
		}
		return null;
	}
	
	/**
	 * 根据提供的bean名称得到对应于指定类型的服务类
	 * @param name bean名称
	 * @param clazz 返回的bean类型,若类型不匹配,将抛出异常
	 */
	public static <T> T getBean(Class<T> clazz, String name) {
		try {
			ApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();
			return ctx.getBean(name, clazz);
		} catch (Exception e) {
			log.error(e.toString());
			try {
				return RequestContextUtils.findWebApplicationContext(getRequest()).getBean(name, clazz);
			} catch (Exception e1) {
			}
		}
		return null;
	}
	
}
