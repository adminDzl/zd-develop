package com.zshop.util;

import java.security.MessageDigest;

/**
 * @author EnzoLuo
 * @date 8/19/2018 14:29
 */
public class Tools {
    public static String stringToMd5String(String inStr) {
        MessageDigest md5;
        byte[] md5Bytes;
        StringBuilder hexValue;
        try {
            md5 = MessageDigest.getInstance("MD5");

            byte[] byteArray = inStr.getBytes("UTF-8");
            md5Bytes = md5.digest(byteArray);
            hexValue = new StringBuilder();
        } catch (Exception e) {
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        for (byte md5Byte : md5Bytes) {
            int val = ((int) md5Byte) & 0xff;
            if (val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }


}
