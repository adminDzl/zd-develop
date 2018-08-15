package com.zshop.core.util;

import org.apache.commons.lang3.StringUtils;

import com.zshop.core.log.LogUtil;

/**
 * @描述: 自定义的字符串工具类。 
 * @author fangwj
 * @date 2018年6月25日
 */
public class CCUrlUtil {
	
	private static final LogUtil log = LogUtil.getLogger(CCUrlUtil.class);
	
	/**
	 * 在url后拼接参数
	 * @param url
	 * @param paramName 参数名
	 * @param paramValue 参数值
	 */
	public static String addParamater(String url,String paramName,String paramValue) {
		if(StringUtils.isNotBlank(url)) {
			if(url.indexOf("?")==-1) {
				url+="?"+paramName+"="+paramValue;
			}else {
				url+="&"+paramName+"="+paramValue;
			}
		}
		return url;
	}
}
