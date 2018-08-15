package common;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Properties;

import common.util.PropertiesUtil;
import common.util.StringUtil;

/*
 * 配置
 */
public class GeneratorConfig {
	
	public static String STRINF = "String";
	public static String INTERGER = "Integer";
	
	public String templetePath; //模板路径
	public String javaPath;   	//代码包总路径
	public String javaPathTest;  //测试代码包
	
	public String appPath; 	//应用根目录绝对路径
	
	/*数据库表、表主键ID类型*/
	public String tableName;
	public String tablePKType; // 表主键ID类型
	
	/*类名称*/
	public String className; // 类名称
	public String lowerClassName; // 所有小写的类名称
	public String firstLowerClassName; //首字母小写的类名称
	
	/*是否创建：1 创建，0 不创建*/
	public String controllerFlag;
	public String serviceFlag;
	public String mapperDaoFlag;
	public String mapperXmlFlag;
	public String entityFlag;
	public String outFlag;
	
	public String testFlag;
	
	/**
	 * 1:复杂的mapper.xml
	 * 2:简单的mapper.xml
	 */
	public String mapperMode; 

	public String description; // 类描述
	public String author; // 创建作者
	public String packageUrl; // 类的包路径
	public String date;  //创建时间

	public GeneratorConfig() {
		Properties res = PropertiesUtil.load("gen.properties");
		templetePath = res.getProperty("gen.templetePath");
		javaPath = res.getProperty("gen.javaPath");
		javaPathTest = res.getProperty("gen.javaPathTest");
		
		appPath = getAppRootPath();
		
		controllerFlag = value(res, "gen.controllerFlag", "0");
		serviceFlag = value(res, "gen.serviceFlag", "0");
		mapperDaoFlag = value(res, "gen.mapperDaoFlag", "0");
		mapperXmlFlag = value(res, "gen.mapperXmlFlag", "0");
		entityFlag = value(res, "gen.entityFlag", "0");
		outFlag = value(res, "gen.outFlag", "0");
		
		testFlag = value(res, "gen.testFlag", "0");
		mapperMode = value(res, "gen.createMode", "0");
		
		author = value(res, "gen.author", System.getProperty("user.name"));
		
		date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
	}
	
	public void refreshConfig() {

		if(null != className && !className.isEmpty()){
			lowerClassName = className.toLowerCase();
			firstLowerClassName = StringUtil.getFirstLower(className);
		}
		
	}
	
	/**
	 * 若读取properties配置文件返回值为空，则返回默认值
	 * @param res
	 * @param key 
	 * @param defaultValue  默认值
	 * @return
	 */
	private static String value(Properties res,String key,String defaultValue){
		String temp = res.getProperty(key);
		return temp !=null && !temp.isEmpty() ? temp : defaultValue;
	}
	
	/*
	 * 方法一：获取应用根目录路径
	 */
	public static String getAppRootPath(String filePath) {
		String path = GeneratorConfig.class.getClassLoader().getResource(filePath).getFile();
		return  new File(path).getParentFile().getParentFile().getParentFile().getAbsolutePath().replaceAll("%20", " ");
	}
	/*
	 * 方法二：获取应用根目录路径
	 */
	public static String getAppRootPath() {
		return System.getProperty("user.dir");
	}

	
}
