package com.zshop.cloud.filter.authority;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zshop.cloud.core.controller.ResultData;
import com.zshop.cloud.feign.TokenService;
import com.zshop.cloud.util.CCJsonUtil;
import com.zshop.cloud.util.jwt.JwtUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import io.jsonwebtoken.Claims;

/**
 * Token 续约
 * @author huangga
 *
 */
//@Component
public class TokenPostFilter extends ZuulFilter {
	
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private JwtUtil jwt;


	@Override
	public boolean shouldFilter() {
		return true;
	}
	
	@Override
	public String filterType() {
		return FilterConstants.POST_TYPE;
	}

	@Override
	public int filterOrder() {
		return FilterConstants.SEND_RESPONSE_FILTER_ORDER - 2;
	}
	
	
	@Override
	public Object run() {
		
		RequestContext context = RequestContext.getCurrentContext();
		HttpServletResponse response = context.getResponse();
		
		//获取token
		String token = getToken(context);
		
		if(!StringUtils.isBlank(token)) {
			try {
				Map<String, Object>  tokenInfo = parseToken(token);
				
				//判断是否应该生成新Token
				if(isCreateToken(tokenInfo)) {
					
					ResultData resultData = tokenService.createToken(
							(String)tokenInfo.get("userId"), 
							(String)tokenInfo.get("username"), 
							(String)tokenInfo.get("parkId"), 
							(String)tokenInfo.get("grant"));
					
					String newtoken = "";
					if(resultData.isResult()) {
						newtoken = (String)resultData.getMapData("token");
					}
					
					//创建新Token，放入请求头
					response.setHeader("token", newtoken);
				}
	        }catch (Exception e) {
				
			}
			
		}
		
		return null;
	}
	

	/**
	 * 判断是否创建新token
	 * 判断条件：若超过时间的一半时，创建新的Token
	 * @param tokenInfo
	 * @return
	 */
	private boolean isCreateToken(Map<String, Object> tokenInfo) {
		
		Date start = (Date) tokenInfo.get("iat");
		Date end = (Date) tokenInfo.get("exp");
		Date time = new Date();
		
		long iat = start.getTime();
		long exp = end.getTime();
		long now = time.getTime();
		
		Boolean flag = false;
		
		if( now > (iat + exp)/2 ) {
			flag = true;
		}
		
		return flag;
	}

	

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

    private void setFailedRequest(String body) {
        RequestContext ctx = RequestContext.getCurrentContext();
        ctx.setSendZuulResponse(false);
        
        HttpServletResponse response = ctx.getResponse();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
        ctx.setResponse(response);
        
        ResultData result = new ResultData();
        result.setResult(false);
        result.setMessage(body);
        
        ctx.setResponseBody(CCJsonUtil.writeToJson(result));  
        
    }
	
	
	
}
