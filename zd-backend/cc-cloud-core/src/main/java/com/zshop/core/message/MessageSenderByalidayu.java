package com.zshop.core.message;

import java.io.IOException;
import java.nio.charset.UnsupportedCharsetException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.zshop.core.util.CCJsonUtil;

/**
 * 
 * @ClassName: MessageSenderByalidayu 
 * @描述: 调用公司统一的短信发送服务
 * @author Administrator
 * @date 2015年12月11日 下午5:49:12
 */
@SuppressWarnings("deprecation")
public class MessageSenderByalidayu {
	//测试环境
	//public static String url="http://192.168.0.81:8080/message/message/sendMessage.json";
	
	//正式环境
	public static String url = SmsConfig.alidayuURl;
	
	@SuppressWarnings("resource")
	public static void send(String mobile, String msg) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("mobile", mobile);
			map.put("content", msg);
			map.put("systemCode", "ccplus");
			map.put("systemName","智慧园区APP");
			DefaultHttpClient httpClient = new DefaultHttpClient();
			if(null == url){
				url = "http://sms.app.yuanqu.cc/message/message/sendMessage.json";
			}
			HttpPost httpPost = new HttpPost(url);
			
			StringEntity entity = new StringEntity(CCJsonUtil.map2Json(map), "utf-8");
			entity.setContentEncoding("UTF-8");
			entity.setContentType("application/json");
			httpPost.setEntity(entity);
			HttpResponse result = httpClient.execute(httpPost);
			String resData = EntityUtils.toString(result.getEntity());
		} catch (UnsupportedCharsetException e) {		
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		MessageSenderByalidayu.send("18129956775", "你的验证码为");
	}
}
