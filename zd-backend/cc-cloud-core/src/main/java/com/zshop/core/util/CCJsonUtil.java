package com.zshop.core.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.zshop.core.log.LogUtil;

/**
 * @Description: Json解析工具类，基于jackson2.0+ 实现
 */
public class CCJsonUtil {
	
	private static final LogUtil log = LogUtil.getLogger(CCJsonUtil.class);
	
	private static ObjectMapper objectMapper;
	
	static{
		objectMapper = new ObjectMapper();
		objectMapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false);  //开启@jsonView功能
		
		//1、序列化配置:java --> Json
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);//去掉默认的时间戳格式  
        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));//设置为中国上海时区 
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));//日期的统一格式 
        objectMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);  
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);  
        //objectMapper.setSerializationInclusion(Include.NON_NULL);//空值不序列化
		
        
		//2、反序列化配置:Json --> java
		objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //忽略JSON中多余的的属性
        objectMapper.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);//反序列化时，属性不存在的兼容处理  
        objectMapper.configure(Feature.ALLOW_SINGLE_QUOTES, true);//允许使用单引号
        
        objectMapper.configure(Feature.ALLOW_UNQUOTED_FIELD_NAMES, true); //运行参数未加引号		
        objectMapper.configure(Feature.ALLOW_COMMENTS, true);
        objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
		
	}
	
	public static ObjectMapper getObjectMapper(){
		return objectMapper;
	}
	
	
	
	/**
	 * 将json字符串转换为相应的泛型对象。
	 * <ul>
	 * 	<li>
	 * 		(1)转换为普通JavaBean：jsonToObject(json, Student.class)
	 * 	</li>
	 * 	<li>
	 * 		(2)转换为简单类型的List：jsonToObject(json, List.class)
	 * 	</li>
	 * 	<li>
	 * 		(2)转换为数组：jsonToObject(json, Student[].class)
	 * 	</li>
	 * 	<li>
	 * 		(3)转换为Map：jsonToObject(json, Map.class)
	 *  </li>
	 * </ul>
	 * 
	 * @param jsonStr json字符串数据
	 * @param valueType 要转换的类型
	 * @return T对应的范型对象
	 */
	public static <T> T jsonToObject(String jsonStr, Class<T> valueType) {
		objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		try {
			return objectMapper.readValue(jsonStr, valueType);
			
		} catch (Exception e) {
			log.error(e.toString());
		}
		return null;
	}
	
	/**
	 * 将json字符串转换成Map
	 * 
	 * @param jsonStr json字符串数据
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> jsonToMap(String jsonStr) {
		return jsonToObject(jsonStr, Map.class);
	}

	/**
	 * 将json字符串转换为相应的泛型对象（可以是复杂类型）列表。</br>
	 * 例如转换为Student列表：jsonToList(json, Student.class)</br>
	 * @param <T>
	 * 
	 * @param jsonStr json字符串数据
	 * @param valueType 要转换的JavaBean类型
	 * @return
	 */
	public static <T> List<T> jsonToList(String jsonStr, Class<T> valueType) {
		
		JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, valueType); 
		
		try {
			return objectMapper.readValue(jsonStr, javaType);
		} catch (Exception e) {
			log.error(e.toString());
		}
		return new ArrayList<T>();
	}
	

	/**
	 * 将json字符串转换为相应的复杂泛型对象。</br>
	 * 例如转换为List&lt;Student&gt;：jsonToTypeReference(json1, new TypeReference&lt;List&lt;Student&gt;&gt;(){});</br>
	 * 
	 * @param jsonStr json字符串数据
	 * @param typeReference 要转换的复杂类型
	 * @return
	 */
	public static <T> T jsonToTypeReference(String jsonStr, TypeReference<T> typeReference) {
		try {
			return objectMapper.readValue(jsonStr, typeReference);
			
		} catch (JsonParseException e) {
			log.error(e.toString());
		} catch (JsonMappingException e) {
			log.error(e.toString());
		} catch (IOException e) {
			log.error(e.toString());
		}
		return null;
	}
	
	/**
	 * 把JavaBean转换为json字符串
	 * <ul>
	 * 	<li>
	 * 		(1)、普通对象转换：writeToJson(student)
	 * 	</li>
	 * 	<li>
	 * 		(2)、List转换：writeToJson(list)
	 * 	</li>
	 * 	<li>
	 * 		(3)、Map转换：writeToJson(map)
	 * 	</li>
	 * </ul>
	 * 
	 * @param object JavaBean对象
	 * @return json字符串
	 */
	public static String writeToJson(Object object) {
		try {
			return objectMapper.writeValueAsString(object);
		} catch (Exception e) {
			log.error(e.toString());
		}
		return null;
	}
	/**
	 * 
	 * @param object 需转换对象
	 * @param filterName 拦截器名称：@JsonFilter("myFilter")
	 * @param except 拦截匹配值
	 * @return
	 */
	public static String writeToJsonWithFilter(Object object,String filterName,String except){
		
		FilterProvider filters = new SimpleFilterProvider().addFilter(filterName,SimpleBeanPropertyFilter.filterOutAllExcept(except));  
		objectMapper.setFilterProvider(filters);
		String jsonStr = null;
		 try {
			 jsonStr = objectMapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			log.error(e.toString());
		}  
		return jsonStr;
	}
	
	/**
	 * map 转换成string
	 * @param jsonMap
	 * @return
	 */
	public static String map2Json(Map<String, Object> jsonMap) {

		String json = "";

		try {

			ObjectMapper objectMapper = new ObjectMapper();

			// convert Map string to JSON
			json = objectMapper.writeValueAsString(jsonMap);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}
}
