package com.zshop.cloud.filter.authority.service.auth;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import com.netflix.zuul.context.RequestContext;
import com.zshop.cloud.core.exception.BusinessException;
import com.zshop.cloud.feign.UserPrimissionService;
import com.zshop.cloud.filter.authority.service.AuthService;
import com.zshop.cloud.util.CCJsonUtil;
import com.zshop.cloud.util.PatternMatcher;
import com.zshop.cloud.util.jwt.JwtUtil;

import io.jsonwebtoken.Claims;

/**
 * 权限验证服务
 * @author huangga
 *
 */
@Component
public class AuthServiceImpl implements AuthService {
	
	private final  Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private JwtUtil jwt;
	
//	@Autowired
//	private JwtConfig jwtConfig;
	 
	@Autowired
	private PatternMatcher patternMatcher;
	
	@Autowired
	private UserPrimissionService userPrimissionService;

	@Autowired
	private StringRedisTemplate redisTemplate;
	
	/**
	 * 基于角色进行权限校验
	 */
	@Override
	public void doAuthority(RequestContext context) throws Exception{
		
		
		HttpServletRequest request = context.getRequest();
        final String requestUri = request.getRequestURI();
		
		//获取token
		String token = getToken(context);
		
		if(isLoginOut(token)) {
			throw new BusinessException("系统登录超时，请重新登录！");
		}
		
		//解析token,同时检验token时效，若解析失败则抛出异常
		Map<String, Object> tokenInfo = parseToken(token);

		String userId = (String)tokenInfo.get("userId");
		
		//非超级管理员
//		if(!"admin".equals(userId)) {
			//获取用户权限
			//List<UserPrimission> list = getPermissionIfs(userId,(String)tokenInfo.get("parkId"));
			Set<String> privs = userPrimissionService.userPrivs(userId,(String)tokenInfo.get("parkId"));
			String priv = userPrimissionService.resourcePriv(requestUri);
			//判断用户权限
//			if(!isPower(requestUri,list)) {
//				throw new BusinessException("用户无权限！"); 
//			}
			if(privs==null) {
				throw new BusinessException("权限信息为空！"); 
			}
			if(priv!=null&&!privs.contains(priv)) {
				throw new BusinessException("用户无权限！"); 
			}
//		}
	}
	

	/**
	 * 检测是否登录
	 */
	@Override
	public void doLoginAuthority(RequestContext context) throws Exception {
		
		//获取token
		String token = getToken(context);
		
		//判断是否退出登录（在redis是否有记录）
		if(isLoginOut(token)) {
			throw new BusinessException("系统登录超时，请重新登录！");
		}
		
		//判断是否有效，若无效这返回
		Map<String, Object> tokenInfo = parseToken(token);
		
	}
	/**
	 * 是否注销退出。
	 * @param token
	 * @return true 已经退出 ；false 未退出。
	 */
	private boolean isLoginOut(String token) {
		return redisTemplate.hasKey(token);
	}

	/**
	 * 园区之间权限验证
	 */
	@Override
	public void doParkAuthority(RequestContext context) throws Exception {
		
		HttpServletRequest request = context.getRequest();
        final String requestUri = request.getRequestURI();
		
		//获取token
		String token = getToken(context);
		
		if(isLoginOut(token)) {
			throw new BusinessException("系统登录超时，请重新登录！");
		}
		
		//解析token,同时检验token时效，若解析失败则抛出异常
		Map<String, Object> tokenInfo = parseToken(token);

		String userId = (String)tokenInfo.get("userId");
		String parkId = (String)tokenInfo.get("parkId");
		
		//检测园区、账号权限
		System.out.println(userId+" --- "+ parkId);
		
		//非超级管理员
//		if(!"admin".equals(userId)) {
//			//获取用户权限
//			List<UserPrimission> list = getPermissionIfs(userId,(String)tokenInfo.get("parkId"));
//			
//			//判断用户权限
//			if(!isPower(requestUri,list)) {
//				throw new BusinessException("用户无权限！"); 
//			}
//		}
		
	}
	
	

	/**
	 * 判断用户权限,有则返回true
	 * @param requestUri
	 * @param list
	 * @return
	 */
//	private boolean isPower(String requestUri, List<UserPrimission> list) {
//		
//		boolean flag = false;
//		if(list!=null &&list.size()>0) {
//			for (UserPrimission en : list) {
//				if(en == null || StringUtils.isBlank(en.getApiUrl())) continue;
//				
//				if(patternMatcher.matches(requestUri, en.getApiUrl())) {
//					flag = true;
//					break;
//				}
//				
//			}
//		}
//		return flag;
//	}
	/**
	 * 获取用户许可
	 * @param object
	 * @param object2
	 * @return
	 */
//	private List<UserPrimission> getPermissionIfs(String userId, String parkId) {
//		
//		return UserPrimissionService.userprimmission(userId, parkId);
//	}

	private Map<String, Object> parseToken(String token) throws Exception {
		Claims claims = jwt.parseJWT(token);
 		String json = claims.getSubject();
		Map<String, Object> map = CCJsonUtil.jsonToMap(json);
		map.put("iat", claims.getIssuedAt());
		map.put("exp", claims.getExpiration());
		return map;
	}

	private String getToken(RequestContext context) {
		HttpServletRequest request = context.getRequest();
		String authToken = request.getHeader("Authorization");
        if (StringUtils.isBlank(authToken)) {
            authToken = request.getParameter("token");
        }
        context.addZuulRequestHeader("Authorization", authToken);
		return authToken;
	}
	
	

	

}
