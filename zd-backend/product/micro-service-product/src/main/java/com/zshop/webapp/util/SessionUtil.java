package com.zshop.webapp.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.zshop.core.exception.type.LoginOutExceptions;
import com.zshop.core.util.CCJsonUtil;
import com.zshop.webapp.config.base.SystemConfig;
import com.zshop.webapp.util.jwt.JwtUtil;

import io.jsonwebtoken.Claims;

/**
 * 保存会话信息
 * 用户id、用户名称、园区id
 * @author huangga
 *
 */
@Component
public class SessionUtil {

	@Autowired
	private JwtUtil jwt;
	
	@Autowired
	private SystemConfig config;
	

	public String getParkId(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		
		String parkId = config.getLocalPark();
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
	public String getCompanyId(){
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
	public String getLoginUserId(){
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
	public String getLoginUserName(){
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
	public String getLoginFrom(){
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
	public String getToken(){
		ServletRequestAttributes ra= (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request =  ra.getRequest();
		String token = request.getHeader("Authorization");
		return token;
	}
	
	public Map<String,String> getLoginUserInfo(HttpServletRequest request){
		Map<String,String>map=new HashMap<String,String>();
		String userId=null;
		String orgId=null;
		String parkId = config.getLocalPark();
		String token = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(token)) {
			try {
				Map<String, Object> tokenInfo = parseToken(token);
				userId = (String)tokenInfo.get("userId");
				parkId = (String)tokenInfo.get("parkId");
				orgId = (String)tokenInfo.get("orgId");
			} catch (Exception e) {
				throw new LoginOutExceptions("系统登录超时，请重新登录！");
			}
		}
		map.put("userId", userId);
		map.put("parkId", parkId);
		map.put("orgId", orgId);
		return map;
	}
	
	private Map<String, Object> parseToken(String token) throws Exception {
		Claims claims = jwt.parseJWT(token);
 		String json = claims.getSubject();
		Map<String, Object> map = CCJsonUtil.jsonToMap(json);
		return map;
	}


	
}
