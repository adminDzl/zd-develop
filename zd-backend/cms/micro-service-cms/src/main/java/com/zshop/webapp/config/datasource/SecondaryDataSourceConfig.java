package com.zshop.webapp.config.datasource;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.alibaba.druid.pool.DruidDataSource;
import com.zshop.webapp.config.datasource.druid.DruidProperties;

/**
 * 第二个数据源配置类
 * 
 * 1、MapperScan注解指定mapper.xml扫描路径。编写SQL可同时支持传统的xml模式和注解模式（其它版本需测试）。
 * 2、配置多源数据库时，分别指定扫描Mapper的包路径
 * 3、开启事务 EnableTransactionManagement
 * @author huangga
 *
 */

//@Configuration
//@MapperScan(basePackages= {"com.zshop.*.*.dao.mapper"})
//@EnableTransactionManagement
//@EnableConfigurationProperties(DruidProperties.class)
public class SecondaryDataSourceConfig {

	@Autowired
	private DruidProperties properties;
	
	public SecondaryDataSourceConfig(DruidProperties properties) {
		this.properties = properties;
	}
	
	/**
	 * 配置数据库连接
	 * @return
	 */
	@Primary
	@Bean(name = "secondaryDataSource")
	public DruidDataSource dataSource() throws Exception{
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(properties.getDriverClassName());
        dataSource.setUrl(properties.getUrl());
        dataSource.setUsername(properties.getUsername());
        dataSource.setPassword(properties.getPassword());
        dataSource.setInitialSize(properties.getInitialSize());
        dataSource.setMinIdle(properties.getMinIdle());
        dataSource.setMaxActive(properties.getMaxActive());
        dataSource.setMaxWait(properties.getMaxWait());
        dataSource.setTimeBetweenEvictionRunsMillis(properties.getTimeBetweenEvictionRunsMillis());
        dataSource.setMinEvictableIdleTimeMillis(properties.getMinEvictableIdleTimeMillis());
        String validationQuery = properties.getValidationQuery();
        if (validationQuery != null && !"".equals(validationQuery)) {
            dataSource.setValidationQuery(validationQuery);
        }
        dataSource.setTestWhileIdle(properties.isTestWhileIdle());
        dataSource.setTestOnBorrow(properties.isTestOnBorrow());
        dataSource.setTestOnReturn(properties.isTestOnReturn());
        if(properties.isPoolPreparedStatements()){
            dataSource.setMaxPoolPreparedStatementPerConnectionSize(properties.getMaxPoolPreparedStatementPerConnectionSize());
        }
        dataSource.setFilters(properties.getFilters());//这是最关键的,否则SQL监控无法生效
        
        String connectionPropertiesStr = properties.getConnectionProperties();
        if(connectionPropertiesStr != null && !"".equals(connectionPropertiesStr)){
            Properties connectProperties = new Properties();
            String[] propertiesList = connectionPropertiesStr.split(";");
            for(String propertiesTmp:propertiesList){
                String[] obj = propertiesTmp.split("=");
                String key = obj[0];
                String value = obj[1];
                connectProperties.put(key,value);
            }
            dataSource.setConnectProperties(connectProperties);
        }
        
        dataSource.setUseGlobalDataSourceStat(properties.isUseGlobalDataSourceStat());

        return dataSource;
    }
	
	
	/**
	 * jdbcTemplate使用时需要指定数据源。如：
	 * 
	 * @Autowired
	 * @Qualifier("secondaryJdbcTemplate")
	 * protected JdbcTemplate jdbcTemplate2;
	 * 
	 * @param dataSource
	 * @return
	 */
	@Bean(name = "secondaryJdbcTemplate")
	public JdbcTemplate secondaryJdbcTemplate( @Qualifier("secondaryDataSource") DataSource dataSource) {
	    return new JdbcTemplate(dataSource);
	}
	/**
	 * 事务
	 * @param dataSource
	 * @return
	 */
	@Bean(name = "secondaryTransactionManager")
    @Primary
    public DataSourceTransactionManager secondaryTransactionManager(@Qualifier("secondaryDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
