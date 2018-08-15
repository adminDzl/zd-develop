package common.db;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import common.util.PropertiesUtil;

public class JdbcConnection {

	public static Connection getConection() throws SQLException, IOException, ClassNotFoundException{

		Properties res = PropertiesUtil.load("config/application-dev.properties");
//		System.out.println(res.getProperty("jdbc.driverClassName")); 
//		System.out.println(res.getProperty("jdbc.url")); 
//		System.out.println(res.getProperty("jdbc.username")); 
//		System.out.println(res.getProperty("jdbc.password")); 
		
		Class.forName(res.getProperty("spring.datasource.primary.driverClassName"));
		return DriverManager.getConnection(
				res.getProperty("spring.datasource.primary.url"), 
				res.getProperty("spring.datasource.primary.username"), 
				res.getProperty("spring.datasource.primary.password"));
//		return DriverManager.getConnection(res.getProperty("jdbc.urlCentre"), res.getProperty("jdbc.usernameCentre"), res.getProperty("jdbc.passwordCentre"));

	}
}
