package common.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Properties;

import common.GeneratorConfig;

public class PropertiesUtil {
	
	private static final String CHARSET_UTF = "UTF-8";
	private static final String CHARSET_GBK = "GBK";
	

	public static Properties load(String filePath){
		return load(filePath, CHARSET_UTF);
	}
	
	public static Properties load(String filePath,String charset) {
		
		Properties res = new Properties();
		try {
			res.load(new InputStreamReader(GeneratorConfig.class.getClassLoader().getResourceAsStream(filePath), charset));
		} catch (IOException e) {
			System.out.println("PropertiesUtil.load() is error");
			e.printStackTrace();
		}
		return res;
	}
	
}
