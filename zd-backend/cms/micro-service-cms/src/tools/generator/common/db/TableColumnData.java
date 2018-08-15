package common.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

/**
 * 解析数据表列信息
 * @author Home
 *
 */
public class TableColumnData {
	
	private String tableName;
	
	/**
	 * 列信息
	 */
	private List<ColumnEntity> columnList;
	
	public TableColumnData(Connection conn, String tableName) throws Exception{
		this.columnList = new ArrayList<ColumnEntity>();
		this.tableName = tableName;
		this.parseTable(conn, tableName);
	}

	private void parseTable(Connection conn, String tableName) throws Exception {
		
		System.out.println("parse table column info start...");
		//查询行来解析列信息
		String sql = "select * from " + tableName + " where 1=2;";
		ResultSet rs = conn.createStatement().executeQuery(sql);
		ResultSetMetaData metaData = rs.getMetaData(); //列的元数据
		for (int i = 1; i <= metaData.getColumnCount(); i++) {
			columnList.add(this.setEntity(metaData,i));
		}
		
		//查询列注释
		sql = "show full columns from  " + tableName + ";";
		rs = conn.createStatement().executeQuery(sql);
		while (rs.next()) {
			this.setEntity(rs);
		}
		
	}
	
	private ColumnEntity setEntity(ResultSetMetaData metaData,int i) throws Exception{
		
		ColumnEntity en = new ColumnEntity();
		en.setName(metaData.getColumnName(i));
		en.setType(metaData.getColumnType(i));
		en.setTypeName(metaData.getColumnTypeName(i));
		en.setTypeClass(metaData.getColumnClassName(i)); 
		en.setAutoInctement(metaData.isAutoIncrement(i));
		
		return en;
	}
	
	private void setEntity(ResultSet rs) throws Exception{
		
		String name = rs.getString("Field");
		String primaryKey = rs.getString("Key");
		String remark = rs.getString("Comment");
		
		for (ColumnEntity en : columnList) {
			if(en == null) continue;
			if(name.equals(en.getName())){
				en.setRemark(remark);
				en.setPrimaryKey(this.isPrimaryKey(primaryKey));
			}
		}
	}
	
	
	
	
	/**
	 * 判断是否为主键
	 * 若primaryKey = PRI 则为主键
	 * @param primaryKey
	 * @return
	 */
	private boolean isPrimaryKey(String primaryKey) {
		if("PRI".equals(primaryKey)){
			return true;
		}
		return false;
	}

	public List<ColumnEntity> getColumnList() {
		return columnList;
	}

	public String getTableName() {
		return tableName;
	}

	


}
