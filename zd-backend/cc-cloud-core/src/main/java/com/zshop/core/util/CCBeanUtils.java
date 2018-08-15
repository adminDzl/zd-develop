package com.zshop.core.util;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;

import com.zshop.core.log.LogUtil;

/**
 * @描述 对象转换工具
 * @author fangwj
 *
 */
public class CCBeanUtils {
	private static final LogUtil log = LogUtil.getLogger(CCBeanUtils.class);
	/**
	 * @描述: 获取spring上下文
	 * @return
	 */
	public static Map<String,Object> describe(Object object) {
		try {
			Map<String,Object> resultMap = PropertyUtils.describe(object);
			return resultMap;
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			e.printStackTrace();
		}
		return new HashMap<String,Object>();
	}
}
