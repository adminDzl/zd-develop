package com.zshop.core.util;

import java.security.MessageDigest;

import org.apache.commons.lang3.StringUtils;

import com.zshop.core.log.LogUtil;


/**
 * MD5加密工具类
 * @author huangga
 *
 */
public class CCMD5 {
	
	private static final LogUtil log = LogUtil.getLogger(CCMD5.class);
	
	private final static char[] MD5_TABLE = { '0', '1', '2', '3', '4', '5', '6', '7','8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

//	
	public static void main(String[] args) {
		 try {
			System.out.println(CCMD5.encodePassword("123456", "652914"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
//	
	
	
	/**
	 * MD5 加密
	 * @param origin 字符串
	 * @return
	 */
	public static String getMd5Str(String origin) {
		if (null == origin || origin.isEmpty()) {   
			return null;
		}
		return md5(origin.getBytes());
	}
	
	/**
	 * MD5 加密
	 * @param bytes 字节数组
	 * @return
	 */
	public static String md5(byte[] bytes) {
		String ret = null;
		try {   
            //创建具有指定算法名称的信息摘要   
            MessageDigest md5 = MessageDigest.getInstance("MD5"); 
            
            //使用指定的字节数组更新摘要，然后完成摘要计算
            byte[] results = md5.digest(bytes);
            
            //字节数组-->字符串
            ret = byteArrayToHexString(results);
        } catch (Exception e) {   
        	log.error(e.toString());
            ret = null;
        }
		return ret; 
	}
	
	/**  
    * 字节数组转换成十六进制字符串 
    * @param b 字节数组  
    * @return 十六进制字符串  
    */   
    private static String byteArrayToHexString(byte[] b){
    	StringBuffer buf = new StringBuffer(b.length * 2);
		for (int i = 0; i < b.length; ++i) {
			buf.append(MD5_TABLE[(b[i] >> 4 & 0xF)]);
			buf.append(MD5_TABLE[(b[i] & 0xF)]);
		}
		return buf.toString();
    } 
    
    /**
     * MD5 加密，返回字节数组
     * 
     * @param bytes
     * @return
     */
    public static byte[] md5Digest(byte[] bytes) {
		try {
            MessageDigest md5 = MessageDigest.getInstance("MD5"); 
            return md5.digest(bytes);
		} catch (Exception e) {
			log.error(e.toString());
		}
		return null;
	}
    
    /**
	 * md5加密
	 * 
	 * @param str
	 * @return
	 */
	public static String getMd5StrBy12(String str) {
		String tempStrMd5 = getMd5Str(str);
		return StringUtils.substring(tempStrMd5,8, 20);
	}
	
	
	/**
	 * 加密用户密码
	 * @param pasword
	 * @param salt
	 * @return
	 */
	public static String encodePassword(String password, String salt) {
    	if(StringUtils.isBlank(password) || StringUtils.isBlank(salt)) {
			return null;
		}
    	
        byte[] saltBytes = salt != null ? salt.getBytes() : null;
        byte[] sourceBytes = password.getBytes();
        try {
		
            MessageDigest digest = MessageDigest.getInstance("MD5"); 
            if (salt != null) {
                digest.reset();
                digest.update(saltBytes);
            }
            byte[] hashed = digest.digest(sourceBytes);
            
            digest.reset();
            hashed = digest.digest(hashed);
        
           String passwordMd5= Hex.encodeToString(hashed);
           
           return passwordMd5;
        } catch (Exception e) {
        	log.info(e.toString());
        	return null;
		}
        
    }
}