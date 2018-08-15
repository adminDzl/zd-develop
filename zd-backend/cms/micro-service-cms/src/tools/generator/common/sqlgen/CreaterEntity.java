package common.sqlgen;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonFormat;

import common.util.StringUtil;

public class CreaterEntity {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String entity(Connection conn, String tabName) throws SQLException, IOException, ClassNotFoundException {

		StringBuffer sb = new StringBuffer();
		StringBuffer sbGetAndSet = new StringBuffer();

		// ResultSet rs=conn.createStatement().executeQuery(" select * from
		// "+tabName+" where 1=2 ");
		ResultSet rs = conn.createStatement().executeQuery("show full columns from " + tabName + "");

		ResultSetMetaData rsmd = rs.getMetaData();

		Map<String, String> mapType = new HashMap<String, String>();
		Map<String, String> mapRemark = new HashMap<String, String>();

		List<String> strs = new ArrayList<String>();
		// for(int i=1;i<rsmd.getColumnCount()+1;i++){
		// strs[i-1]=rsmd.getColumnName(i);
		// mapType.put(strs[i-1], rsmd.getColumnTypeName(i));
		// mapRemark.put(strs[i-1], rsmd.getColumnLabel(i));
		// }

		while (rs.next()) {
			strs.add(rs.getString("Field"));
			mapType.put(rs.getString("Field"), rs.getString("Type"));
			mapRemark.put(rs.getString("Field"), rs.getString("Comment"));
		}

		sb.append("\t\n");

		String javaType = "";
		String javaName = "";
		String javaReamek = "";

		for (String str : strs) {

			javaType = sqlType2JavaType(str.toLowerCase(), mapType.get(str));
			javaName = StringUtil.lineToHump(str.toLowerCase());
			javaReamek = mapRemark.get(str);

			sb.append("	/**\n");
			sb.append("	 * " + javaReamek + "\n");
			sb.append("	 */\n");
			if("Date".equals(javaType)){
				sb.append("	@JsonFormat(pattern=\"yyyy-MM-dd HH:mm:ss\",timezone=\"GMT+8\")\n");
			}
			sb.append("	private " + javaType + " ");
			sb.append(javaName + ";\t\n");

			sbGetAndSet.append(
					" \tpublic void set" + getFirstUpper(javaName) + "(" + javaType + " " + javaName + "){\t\n");
			sbGetAndSet.append(" \t\tthis." + javaName + "=" + javaName + ";\t\n");
			sbGetAndSet.append(" \t}\t\n");
			sbGetAndSet.append(" \n");
			sbGetAndSet.append(" \tpublic " + javaType + " get" + getFirstUpper(javaName) + "(){\t\n");
			sbGetAndSet.append(" \t\treturn this." + javaName + ";\t\n");
			sbGetAndSet.append(" \t}\t\n");
			sbGetAndSet.append(" \n");
		}

		return sb.toString() + "\n\n" + sbGetAndSet.toString();
	}

	/**
	 * 
	 * @param sqlType
	 * @return
	 */
	private static String sqlType2JavaType(String key, String sqlType) {
		if (sqlType.toLowerCase().startsWith("double")) {
			return "double";
		} else if (sqlType.toLowerCase().startsWith("float")) {
			return "float";
		} else if (sqlType.equalsIgnoreCase("blob")) {
			return "byte[]";
		} else if (sqlType.equalsIgnoreCase("blob")) {
			return "byte[]";
		} else if (sqlType.equalsIgnoreCase("char") || sqlType.equalsIgnoreCase("nvarchar2")
				|| sqlType.equalsIgnoreCase("varchar2")) {
			return "String";
		} else if (sqlType.equalsIgnoreCase("date") || sqlType.equalsIgnoreCase("timestamp")
				|| sqlType.equalsIgnoreCase("timestamp with local time zone")
				|| sqlType.equalsIgnoreCase("timestamp with time zone")
				|| sqlType.equalsIgnoreCase("datetime")) {
			return "Date";
		} else if (sqlType.toLowerCase().startsWith("number")) {
			return "long";
		} else if (sqlType.equalsIgnoreCase("varchar")) {
			return "String";
		} else if (sqlType.toLowerCase().startsWith("int")) {
//			if (key.toLowerCase().endsWith("_code") || key.toLowerCase().endsWith("_id")
//					|| key.toLowerCase().equals("id"))
				return "Integer";
//			else
//				return "int";
		}

		return "String";
	}

	public static String getFirstLower(String str) {

		return str.subSequence(0, 1).toString().toLowerCase() + str.subSequence(1, str.length());

	}

	public static String getFirstUpper(String str) {

		return str.subSequence(0, 1).toString().toUpperCase() + str.subSequence(1, str.length());

	}

}
