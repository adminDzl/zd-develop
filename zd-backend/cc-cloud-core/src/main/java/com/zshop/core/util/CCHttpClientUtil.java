package com.zshop.core.util;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.util.PublicSuffixMatcher;
import org.apache.http.conn.util.PublicSuffixMatcherLoader;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.zshop.core.log.LogUtil;


/**
 * HttpClient工具类
 * @author tanqiang
 *
 */

public class CCHttpClientUtil {
	private static final LogUtil log = LogUtil.getLogger(CCHttpClientUtil.class);
    private static RequestConfig requestConfig = RequestConfig.custom()  
            .setSocketTimeout(15000)  
            .setConnectTimeout(15000)  
            .setConnectionRequestTimeout(15000)  
            .build();  
      
    /** 
     * 发送 post请求
     * @param url 请求地址 
     */  
    public static Map<String, Object> sendHttpPost(String url) {  
        HttpPost httpPost = new HttpPost(url);// 创建httpPost    
        return sendHttpPost(httpPost);  
    }  
      
    /** 
     * 发送 post请求 
     * @param url 请求地址 
     * @param params 请求参数(格式:key1=value1&key2=value2) 
     */  
    public static Map<String, Object> sendHttpPost(String url, String params) {  
        HttpPost httpPost = new HttpPost(url);// 创建httpPost    
        try {  
            //设置参数  
            StringEntity stringEntity = new StringEntity(params, "UTF-8");  
            stringEntity.setContentType("application/x-www-form-urlencoded");  
            httpPost.setEntity(stringEntity);  
        } catch (Exception e) {  
        	log.error(e.toString());
        }  
        return sendHttpPost(httpPost);  
    }  
      
    /** 
     * 发送 post请求 
     * @param url 请求地址 
     * @param paramMap 请求参数 
     */  
    public static Map<String, Object> sendHttpPost(String url, Map<String, String> paramMap) {  
        HttpPost httpPost = new HttpPost(url);// 创建httpPost    
        // 创建参数队列    
        List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();  
        for (String key : paramMap.keySet()) {
            nameValuePairs.add(new BasicNameValuePair(key, paramMap.get(key)));  
        }  
        try {  
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "UTF-8"));  
        } catch (Exception e) {  
        	log.error(e.toString());
        }  
        return sendHttpPost(httpPost);  
    }  

    /** 
     * 发送 post请求（带文件） 
     * @param url 请求地址 
     * @param paramMap 请求参数 
     * @param fileList 附件
     */  
    public static Map<String, Object> sendHttpPost(String url, Map<String, String> paramMap, List<File> fileList) {  
        HttpPost httpPost = new HttpPost(url);// 创建httpPost    
        MultipartEntityBuilder meBuilder = MultipartEntityBuilder.create();  
        for (String key : paramMap.keySet()) {  
            meBuilder.addPart(key, new StringBody(paramMap.get(key), ContentType.TEXT_PLAIN));  
        }  
        for(File file : fileList) {  
            FileBody fileBody = new FileBody(file);  
            meBuilder.addPart("files", fileBody);  
        }  
        HttpEntity reqEntity = meBuilder.build();  
        httpPost.setEntity(reqEntity);  
        return sendHttpPost(httpPost);  
    }  
      
    /** 
     * 发送Post请求 
     * @param httpPost 
     * @return 
     */  
    private static Map<String, Object> sendHttpPost(HttpPost httpPost) {  
        CloseableHttpClient httpClient = null;
        CloseableHttpResponse response = null;
        HttpEntity entity = null;
        String responseData = null;
        Map<String, Object> resultMap = null;
        try {  
            // 创建默认的httpClient实例.
            httpClient = HttpClients.createDefault();
            httpPost.setConfig(requestConfig);
            // 执行请求
            response = httpClient.execute(httpPost); 
            entity = response.getEntity();  
            responseData = EntityUtils.toString(entity, "UTF-8");  
            if(StringUtils.isNotBlank(responseData)){
				resultMap = CCJsonUtil.jsonToMap(responseData);
			}
            
        } catch (Exception e) {  
        	log.error(e.toString());
        } finally {  
            try {  
                // 关闭连接,释放资源  
                if (response != null) {  
                    response.close();  
                }  
                if (httpClient != null) {  
                    httpClient.close();  
                }  
            } catch (IOException e) {  
            	log.error(e.toString());
            }  
        }  
        return resultMap;  
    }  
  
    /** 
     * 发送 get请求 
     * @param url 
     */  
    public static Map<String, Object> sendHttpGet(String url) {  
        HttpGet httpGet = new HttpGet(url);// 创建get请求  
        return sendHttpGet(httpGet);  
    }  
      
    /** 
     * 发送 get请求Https 
     * @param url 
     */  
    public static Map<String, Object> sendHttpsGet(String url) {  
        HttpGet httpGet = new HttpGet(url);// 创建get请求  
        return sendHttpsGet(httpGet);  
    }  
      
    /** 
     * 发送Get请求 
     * @param httpPost 
     * @return 
     */  
    private static Map<String, Object> sendHttpGet(HttpGet httpGet) {  
        CloseableHttpClient httpClient = null;  
        CloseableHttpResponse response = null;  
        HttpEntity entity = null;  
        String responseData = null;
        Map<String, Object> resultMap = null;
        try {  
            // 创建默认的httpClient实例.  
            httpClient = HttpClients.createDefault();  
            httpGet.setConfig(requestConfig);  
            // 执行请求  
            response = httpClient.execute(httpGet);  
            entity = response.getEntity();  
            responseData = EntityUtils.toString(entity, "UTF-8");  
            if(StringUtils.isNotBlank(responseData)){
				resultMap = CCJsonUtil.jsonToMap(responseData);
			}
            
        } catch (Exception e) {  
        	log.error(e.toString());
        } finally {  
            try {  
                // 关闭连接,释放资源  
                if (response != null) {  
                    response.close();  
                }  
                if (httpClient != null) {  
                    httpClient.close();  
                }  
            } catch (IOException e) {  
            	log.error(e.toString());
            }  
        }  
        return resultMap;  
    }  
      
    /** 
     * 发送Get请求Https 
     * @param httpPost 
     * @return 
     */  
    private static Map<String, Object> sendHttpsGet(HttpGet httpGet) {  
        CloseableHttpClient httpClient = null;  
        CloseableHttpResponse response = null;  
        HttpEntity entity = null;
        String responseData = null;
        Map<String, Object> resultMap = null;
        try {  
            // 创建默认的httpClient实例.  
            PublicSuffixMatcher publicSuffixMatcher = PublicSuffixMatcherLoader.load(new URL(httpGet.getURI().toString()));  
            DefaultHostnameVerifier hostnameVerifier = new DefaultHostnameVerifier(publicSuffixMatcher);  
            httpClient = HttpClients.custom().setSSLHostnameVerifier(hostnameVerifier).build();  
            httpGet.setConfig(requestConfig);  
            // 执行请求  
            response = httpClient.execute(httpGet);  
            entity = response.getEntity();
            responseData = EntityUtils.toString(entity, "UTF-8");
            if(StringUtils.isNotBlank(responseData)){
				resultMap = CCJsonUtil.jsonToMap(responseData);
			}
            
        } catch (Exception e) {  
        	log.error(e.toString());
        } finally {  
            try {  
                // 关闭连接,释放资源  
                if (response != null) {  
                    response.close();  
                }  
                if (httpClient != null) {  
                    httpClient.close();  
                }  
            } catch (IOException e) {  
            	log.error(e.toString());
            }  
        }  
        return resultMap;  
    }
    
//    public static void main(String[] args) {
////		String url = "http://test.smarti.wiseyq.com/smarti/mobile/login.json";
////		List<NameValuePair> nvps = new ArrayList<NameValuePair>();
////		nvps.add(new BasicNameValuePair("userName", "18129956775"));
////		nvps.add(new BasicNameValuePair("password", "12345678"));
////		Map<String, Object> map = post(url, nvps);
////		System.out.println(map.toString());
//		
//		String url = "http://test.smarti.wiseyq.com/smarti/mobile/login.json";
//		Map<String, String> paramMap = new HashMap<String, String>();
//		paramMap.put("userName", "18129956775");
//		paramMap.put("password", "12345678");
//		Map<String, Object> map = sendHttpPost(url, paramMap);
//		System.out.println(map.toString());
//		
//		
////		String url = "http://test.smarti.wiseyq.com/smarti/mobile/login.json";
////		User user = new User();
////		user.setUserName("18129956775");
////		user.setPassword("12345678");
////		Map<String, Object> map = post(url, user);
////		System.out.println(map.toString());
//		
//
//	}
}
