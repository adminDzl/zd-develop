package com.zshop.core.security;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zshop.core.exception.type.LoginOutExceptions;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.zshop.core.exception.type.BusinessException;
import com.zshop.core.security.jwt.JwtUtil;
import com.zshop.core.util.CCJsonUtil;

import io.jsonwebtoken.Claims;

/**
 * 保存会话信息
 * 用户id、用户名称、园区id
 * @author huangga
 *
 */
public class SessionUtil {
	/**
	 * 获取当前园区id
	 */
	public static String getParkId(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		String parkId = null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				parkId = (String)tokenInfo.get("parkId");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return parkId;
	}
	/**
	 * 获取非空的当前园区id(get not null parkId)
	 */
	public static String getNNParkId(){
		String parkId = getParkId();
		if(parkId == null) {
			throw new BusinessException("当前用户未加入园区！");
		}
		return parkId;
	}
	public static String getCompanyId(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String companyId = null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				Object orgId = tokenInfo.get("orgId");
				if(orgId!=null) {
					companyId = (String)orgId;
				}
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return companyId;
	}
	public static String getNNCompanyId(){
		String companyId = getCompanyId();
		if(companyId == null) {
			throw new BusinessException("当前用户未加入公司！");
		}
		return companyId;
	}
	public static String getDeptId(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String deptId = null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				deptId = (String) tokenInfo.get("deptId");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return deptId;
	}
	public static String getLoginUserId(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String userId=null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				userId = (String)tokenInfo.get("userId");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return userId;
	}
	public static String getLoginUserName(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String userName=null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				userName = (String)tokenInfo.get("userName");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return userName;
	}
	public static String getLoginFrom(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String userName=null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				userName = (String)tokenInfo.get("grant");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		return userName;
	}
	public static String getToken(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		String token = request.getHeader("Authorization");
		return token;
	}
	
	public static Map<String,String> getLoginUserInfo(HttpServletRequest request){
		Map<String,String>map=new HashMap<String,String>();
		String userId=null;
		String orgId=null;
		String parkId = null;
		String deptId = null;
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				userId = (String)tokenInfo.get("userId");
				parkId = (String)tokenInfo.get("parkId");
				orgId = (String)tokenInfo.get("orgId");
				deptId = (String)tokenInfo.get("deptId");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		map.put("userId", userId);
		map.put("parkId", parkId);
		map.put("orgId", orgId);
		map.put("deptId", deptId);
		return map;
	}
	
	private static Map<String, Object> parseToken(String token) throws Exception {
		Claims claims = JwtUtil.parseJWT(token);
 		String json = claims.getSubject();
		Map<String, Object> map = CCJsonUtil.jsonToMap(json);
		return map;
	}
	
	
	
}
