package com.zshop.cloud.filter.authority;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zshop.cloud.core.controller.ResultData;
import com.zshop.cloud.core.exception.BusinessException;
import com.zshop.cloud.feign.UrlFilterService;
import com.zshop.cloud.feign.entity.PermissionInfo;
import com.zshop.cloud.filter.authority.service.AuthService;
import com.zshop.cloud.util.CCJsonUtil;
import com.zshop.cloud.util.PatternMatcher;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
/**
 * 系统权限校验
 * @author huangga
 *
 */
//@Component
public class AuthorityPreFilter extends ZuulFilter {

	private final  Logger logger = LoggerFactory.getLogger(this.getClass());


	@Autowired
	private UrlFilterService urlFilterService;
	
	@Autowired
	private PatternMatcher patternMatcher;
	
	@Autowired
	private AuthService authService;
	
	

	//拦截类型:前置拦截
	@Override
	public String filterType() {
		return FilterConstants.PRE_TYPE;
	}

	//拦截链顺序
	@Override
	public int filterOrder() {
		return 1;
	}
	
	//是否拦截
	@Override
	public boolean shouldFilter() {
		return true;
	}

	//方法
	@Override
	public Object run() {
		
		RequestContext context = RequestContext.getCurrentContext();
		HttpServletRequest request = context.getRequest();
        final String requestUri = request.getRequestURI();
        final String method = request.getMethod();
        logger.info("--------------------"+method+" "+requestUri+"------------------------");
        
        //匹配请求，返回下一步处理流程
        
        String nextStep = doMatchAndNextStep(requestUri);
        
        
        //根据下一步流程进行处理
        try {
        	doNext(context,nextStep);
        } catch (ExpiredJwtException ex) {
        	setLoginPage(); //token过期
        } catch (SignatureException ex) {
        	setFailedRequest("Client token signature error!");
        } catch (IllegalArgumentException ex) {
        	setLoginPage();
            //throw new JwtIllegalArgumentException("Client token is null or empty!");
        }catch (BusinessException e) {
        	setFailedRequest(e.getMessage());
		} catch (Exception e) {
        	setFailedRequest("other error!");
		}
		
		return null;
	}
	/**
	 * 所以人可以访问  anon
	 * 需要登录才可访问  login
	 * 需要登录，且授权  anth
	 * 
	 * @param context
	 * @param nextStep
	 * @throws Exception 
	 */
	private void doNext(RequestContext context, String nextStep) throws Exception {
		
		if (StringUtils.isBlank(nextStep)) {
			return;
		}
		
		switch (nextStep) {
		
		//不需要登录和权限
		case "anon":
			//
			break;
			
		//登录验证
		case "login":
			
			authService.doLoginAuthority(context);
			
			break;
			
		//权限验证
		case "auth": 
			
			authService.doAuthority(context);
			
			break;

		//跨园区权限验证
		case "park_auth":
			
			authService.doParkAuthority(context);
			
			break;
		//Oauth2.0权限验证
		case "oauth2": 
			
			break;
		default:
			break;
		}
		
	}

	/**
	 * 过滤请求，并返回下一步处理流程
	 * @param requestUri
	 * @return
	 */
	private String doMatchAndNextStep(String requestUri) {
		
		//请求微服务，获取所有的URL拦截路径
		List<PermissionInfo> list = urlFilterService.allUrlList();
		
		//匹配URL路径，返回处理类型
		String type = "anon";
		if(list != null) {
			for (PermissionInfo en : list) {
				if(en == null || StringUtils.isBlank(en.getUrl())) continue;
				
				if(patternMatcher.matches(en.getUrl(), requestUri)) {
					type = en.getType();
					break;
				}
				
			}
		}
		
		return type;
	}
	
    
    /**
     * 网关抛异常
     *
     * @param body
     * @param code
     */
    private void setFailedRequest(String body) {
    	logger.debug("Reporting error ({}): {}", body);
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
    
    /**
     * 网关抛异常
     *
     * @param body
     * @param code
     */
    private void setLoginPage() {
    	logger.debug("login page");
        RequestContext ctx = RequestContext.getCurrentContext();
        
        //过滤该请求，不往下级服务去转发请求，到此结束  
        ctx.setSendZuulResponse(false);
        
//        HttpServletResponse response = ctx.getResponse();
//        response.setContentType("text/html;charset=UTF-8");  
//        response.setHeader("refresh", "0;url=/admin/login.html");
//        ctx.setResponse(response);
        
        HttpServletResponse response = ctx.getResponse();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
        ctx.setResponse(response);
        
        ResultData result = new ResultData();
        result.setResult(false);
        result.setMessage("系统登录超时，请重新登录！");
        result.setData("loginout"); 
        
        ctx.setResponseBody(CCJsonUtil.writeToJson(result));  
        

        
    }

}
