package com.zshop.core.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.zshop.core.log.LogUtil;

/**
 * 
 * @描述: 自定义的字符串工具类。 
 * 
 * 
 *  尽可能多用{@link org.apache.commons.lang3.StringUtils} or{@link org.springframework.util.StringUtils}
 * @author malp
 * @date 2015年5月19日 上午10:05:16
 */
public class CCStringUtils {
	
	private static final LogUtil log = LogUtil.getLogger(CCStringUtils.class);
	
	public static final String EMAIL_REGEXP = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
	public static final String MOBILE_REGEXP = "^[1][3,4,5,7,8][0-9]{9,10}$";
	
	public static final String space = " ";
	public static final String comma = ",";
	

//	public static void main(String[] args) {
//		// System.out.println(getRandomChar(17));
//		String[] aa = searchKeys("a,b",comma);
//		System.out.println(aa[0]);
//	}
	
	/**
	 * 默认空格分割
	 * @param keys
	 * @return
	 */
	public static String[] searchKeys(String keys){
		return searchKeys(keys, space);
	}
	
	/**
	 * 分割字符串，返回%item%格式的数组
	 * @param keys
	 * @param split
	 * @return
	 */
	public static String[] searchKeys(String keys,String split) {
		
		String[] ret = null;
		if (null == keys || keys.isEmpty()){
			return ret;
		}
		String[] temp = keys.split(split);
		if(null == temp){
			return ret;
		}
		Set<String> set = new HashSet<String>();
		for (int i = 0; i < temp.length; i++) {
			if(null == temp[i] || temp[i].isEmpty()){
				continue;
			}
			set.add("%" + escape(temp[i]) + "%");
		}
		if(set.size()<=0){
			return ret;
		}
		return (String[]) set.toArray(new String[0]);
	}
	
	private static String escape(String str) {
		if ((str != null) && (!str.isEmpty())) {
			return str.replaceAll("_", "\\\\_").replaceAll("%", "\\\\%");
		}
		return "";
	}
	


	/**
	 * 与 StringUtils.split(str,",");功能类似
	 * @param str
	 * @param split
	 * @return
	 */
	public static String[] splitToString(String str,String split) {

		if(null == str){
			return null;
		}
		List<String> idls = new ArrayList<String>();
		String idsStr[] = str.split(split);
		for (String s : idsStr) {
			if (s != null && !s.isEmpty()){
				idls.add(s);
			}
		}
		return (idls.toArray(new String[idls.size()]));
	}
	/**
	 * 按split来分离数字字符串
	 * @param str
	 * @param split
	 * @return
	 */
	public static Integer[] splitToInteger(String str,String split) {

		if(null == str || str.isEmpty()){
			return null;
		}
		List<Integer> idls = new ArrayList<Integer>();
		String idsStr[] = str.split(split);
		for (String s : idsStr) {
			try {
				idls.add(Integer.parseInt(s));
			} catch (NumberFormatException e) {
				log.error(e.toString());
			}
		}

		if (idls == null || idls.size() <= 0){
			return null;
		}
		return (idls.toArray(new Integer[0]));
	}
	/**
	 * 获取字符串，null则返回空字符串
	 */
	public static String trim(Object o) {
		if(o==null) {
			return "";
		}else {
			return o.toString();
		}
	}
	/**
	 * 判断对象是否为null,如果是赋空字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static String checkNull(Object obj) {
		if (obj == null) {
			return "";
		}
		String s;

		if (!(obj instanceof String)) {
			s = obj.toString();

		} else {
			s = (String) obj;
		}
		if (s.length() < 1) {
			return "";
		} else {
			return s.trim();
		}
	}

	/**
	 * 判断对象是否为null,如果是赋Integer 型的0
	 * 
	 * @param obj
	 * @return
	 */
	public static Integer checkIntegerNull(Object obj) {
		String s = "";
		if (obj == null) {
			return Integer.parseInt("0");
		}
		if (obj instanceof String) {
			s = obj.toString();
			if (s.equals("")) {
				return Integer.parseInt("0");
			}

		}

		return Integer.parseInt(obj.toString());

	}

	/**
	 * 验证邮箱格式是否合法
	 * 
	 * @param email
	 * @return
	 */
	public static boolean checkIsEmail(String email) {
		Pattern pattern = Pattern.compile(EMAIL_REGEXP);
		Matcher matcher = pattern.matcher(email);
		if (matcher.matches()) {
			return true;
		}
		return false;
	}

	/**
	 * 验证手机号码格式是否合法
	 * 
	 * @param mobileNo
	 * @return
	 */
	public static boolean checkIsMobile(String mobileNo) {
		Pattern pattern = Pattern.compile(MOBILE_REGEXP);
		Matcher matcher = pattern.matcher(mobileNo);
		if (matcher.matches()) {
			return true;
		}
		return false;
	}

	public static String getFirstLower(String str) {
		return str.subSequence(0, 1).toString().toLowerCase()
				+ str.subSequence(1, str.length());
	}

	public static String getFirstUpper(String str) {
		return str.subSequence(0, 1).toString().toUpperCase()
				+ str.subSequence(1, str.length());
	}

}
