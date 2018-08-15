package com.zshop.core.message;
import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.support.PropertiesLoaderUtils;


public class SmsConfig {
	

	public static String sendInviteRegisterMsg;
	public static String sendRegisterCodeMsg;	
	public static String sendResetPasswordMsg;
	public static String messageCenterRemind;
	public static String signature;
	
	public static String alidayuURl;
	
	static{
		try {
			Properties configParam = PropertiesLoaderUtils.loadAllProperties("sms/sms-config.properties");
			sendInviteRegisterMsg = configParam.getProperty("sendInviteRegisterMsg");
			sendRegisterCodeMsg = configParam.getProperty("sendRegisterCodeMsg");
			sendResetPasswordMsg = configParam.getProperty("sendResetPasswordMsg");
			messageCenterRemind = configParam.getProperty("messageCenterRemind");
			signature = configParam.getProperty("signature");
			alidayuURl=configParam.getProperty("alidayuURl");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
