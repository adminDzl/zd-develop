package com.zshop.core.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


/**
 * 防篡改，标识
 * @author huangga
 *
 */
public class ShaUtil {
	
	/** 
	   * 传入文本内容，返回 SHA-256 串 
	   *  
	   * @param strText 
	   * @return 
	   */  
	  public static String SHA256(final String strText){  
	    return SHA(strText, "SHA-256");  
	  }  
	  
	  /** 
	   * 传入文本内容，返回 SHA-512 串 
	   *  
	   * @param strText 
	   * @return 
	   */  
	  public static String SHA512(final String strText){  
	    return SHA(strText, "SHA-512");  
	  }  
	
	 /**
     *  利用java原生的摘要实现SHA256加密
     * @return 加密后的报文
     */
    public static String SHA(String str,String type){
        MessageDigest messageDigest;
        String encodeStr = "";
        try {
            messageDigest = MessageDigest.getInstance(type);
            messageDigest.update(str.getBytes("UTF-8"));
            encodeStr = byteToHex(messageDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encodeStr;
    }

    /**
     * 将byte转为16进制
     * @param bytes
     * @return
     */
    private static String byteToHex(byte[] bytes){
        StringBuffer stringBuffer = new StringBuffer();
        String temp = null;
        for (int i=0;i<bytes.length;i++){
            temp = Integer.toHexString(bytes[i] & 0xFF);
            if (temp.length()==1){
                //1得到一位的进行补0操作
                stringBuffer.append("0");
            }
            stringBuffer.append(temp);
        }
        return stringBuffer.toString();
    }
}
