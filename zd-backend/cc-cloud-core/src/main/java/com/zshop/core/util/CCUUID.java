package com.zshop.core.util;

import java.util.UUID;

/**
 * @ClassName: UUIDGenerator
 * @描述: 生成UUID工具类
 * @author Administrator
 * @date 2016-07-06 15:09
 */
public class CCUUID {

//
//	public static void main(String[] args) {
//		System.out.println("UUID:" + CCUUID.getUUID());
//		String[] ss = CCUUID.getUUID(10);
//		for (int i = 0; i < ss.length; i++) {
//			System.out.println(ss[i]);
//		}
//	}

	/**
	 * 生成 UUID，去除"-"
	 * @return String UUID
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 生成多个UUID
	 * @param number UUID数量
	 * @return String[] 数组
	 */
	public static String[] getUUID(int number) {
		if (number < 1) {
			return null;
		}
		String[] ss = new String[number];
		for (int i = 0; i < number; i++) {
			ss[i] = getUUID();
		}
		return ss;
	}
	
	
	public static String[] chars = new String[] { "a", "b", "c", "d", "e", "f",  
        "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",  
        "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",  
        "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",  
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",  
        "W", "X", "Y", "Z" };  

	/**
	 * 生成八位的UUID
	 * @return
	 */
	public static String shortUuid() {  
		StringBuffer shortBuffer = new StringBuffer();  
		String uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; i++) {  
		    String str = uuid.substring(i * 4, i * 4 + 4);  
		    int x = Integer.parseInt(str, 16);  
		    shortBuffer.append(chars[x % 0x3E]);
		}  
		return shortBuffer.toString();
	} 
	
	

}
