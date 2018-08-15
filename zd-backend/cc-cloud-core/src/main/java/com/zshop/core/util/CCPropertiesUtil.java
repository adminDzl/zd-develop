package com.zshop.core.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import com.zshop.core.log.LogUtil;

/**
 * @ClassName: PropertiesUtil
 * @Description: properties 资源文件操作工具类。
 * @author lyf
 * @date 2014年4月23日 下午4:40:35
 */
public class CCPropertiesUtil {

	private final static LogUtil log = LogUtil.getLogger(CCPropertiesUtil.class);

	private CCPropertiesUtil() {

	}

	/**
	 * 根据key获取对应的属性值
	 * @param file 资源文件的File对象
	 * @param key 要获取的属性key值
	 * @return
	 */
	public static String getValueByKey(File file, String key) {
		try {
			Properties properties = new Properties();
			properties.load(new FileInputStream(file));
			return properties.getProperty(key);
			
		} catch (Throwable e) {
			log.error("", e);
		}
		return null;
	}

	/**
	 * 根据key获取对应的属性值
	 * @param filePath 资源文件路径
	 * @param key 要获取的属性key值
	 * @return
	 */
	public static String getValueByKey(String filePath, String key) {
		Enumeration<URL> resouces;
		try {
			resouces = CCPropertiesUtil.class.getClassLoader().getResources(filePath);
			if (null != resouces) {
				for (Enumeration<URL> tmp = resouces; tmp.hasMoreElements();) {
					URL url = tmp.nextElement();
					Properties properties = new Properties();
					properties.load(url.openStream());

					Object reulst = properties.get(key);
					if (null != reulst) {
						return reulst.toString();
					}
				}
			}
		} catch (IOException e) {
			log.error("读取资源文件[" + filePath + "]失败!!!", e);
		}

		return null;
	}
	
	/**
	 * 获取Properties文件的Properties对象
	 * @param file 资源文件File对象
	 * @return Properties
	 */
	public static Properties getProperties(File file) {
		Properties prop = null;
		try {
			prop = new Properties();
			InputStream in = new FileInputStream(file);
			prop.load(in);
			return prop;
			
		} catch (IOException e) {
			log.error("", e);
		}
		return null;
	}
	
	public static Properties load(String filePath){
		return load(filePath, "UTF-8");
	}
	
	public static Properties load(String filePath,String charset) {
		
		Properties res = new Properties();
		try {
			res.load(new InputStreamReader(CCPropertiesUtil.class.getClassLoader().getResourceAsStream(filePath), charset));
		} catch (IOException e) {
			log.error("PropertiesUtil.load() is error");
			e.printStackTrace();
		}
		return res;
	}

	/**
	 * 获取资源文件所有key和value值
	 * @param filePath 资源文件路径，如：errror_code/zh_CN/error_code_zh_CN.properties
	 * @return Map<String, String> 
	 */
	public static Map<String, String> getPropertie(String filePath) {
		Map<String, String> map = new HashMap<String, String>();
		Enumeration<URL> resouces;
		try {
			resouces = CCPropertiesUtil.class.getClassLoader().getResources(filePath);
			if (null != resouces) {
				for (Enumeration<URL> tmp = resouces; tmp.hasMoreElements();) {
					URL url = tmp.nextElement();
					readControllerCfg(url, map);
				}
			}
			
		} catch (IOException e) {
			log.error("读取资源文件[" + filePath + "]失败!!!", e);
		}
		return map;
	}

	/**
	 * 获取资源文件所有key和value值
	 * @param url 资源文件的URL连接
	 * @param map 将资源文件的key、value都添加到这个map中
	 * @throws IOException
	 */
	private static void readControllerCfg(URL url, Map<String, String> map) throws IOException {
		Properties properties = new Properties();
		properties.load(url.openStream());
		if (null != properties) {
			Set<Entry<Object, Object>> entrySet = properties.entrySet();
			for (Entry<Object, Object> entry : entrySet) {
				String value = String.valueOf(entry.getValue());
				if (null != value) {
					map.put(entry.getKey().toString(), value);
				}
			}
		}
	}

	/**
	 * 将数据写入到资源文件中
	 * @param path 资源文件路径
	 * @param key key值
	 * @param value value值
	 */
	public static void writerValue(String path, String key, String value) {
		Properties prop = null;
		try {
			prop = new Properties();
			InputStream in = CCPropertiesUtil.class.getClassLoader().getResourceAsStream(path);
			prop.load(in);
			prop.put(key, value);
			
			URL url = CCPropertiesUtil.class.getClassLoader().getResource(path);
			File file = new File(url.getFile());
			FileOutputStream out = new FileOutputStream(file);
			prop.store(out, "");
			
		} catch (IOException e) {
			log.error("", e);
		}
	}

	/**
	 * 将数据写入到资源文件中
	 * @param file 资源文件的File对象
	 * @param key key值
	 * @param value value值
	 */
	public static void writerValue(File file, String key, String value) {
		Properties prop = null;
		try {
			prop = new Properties();
			InputStream in = new FileInputStream(file);
			prop.load(in);
			prop.put(key, value);

			FileOutputStream out = new FileOutputStream(file);
			prop.store(out, "");
			
		} catch (IOException e) {
			log.error("", e);
		}
	}

}
