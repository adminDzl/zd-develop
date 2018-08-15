package common.sqlgen;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.db.ColumnEntity;
import common.db.TableColumnData;
import common.util.StringUtil;

/**
 * 插入SQL语句生成类
 * 
 * @author huangga
 * 
 */
public class SqlCreaterInsert {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	static final String LEFT = CreaterUtil.LEFT;
	static final String NEXT = CreaterUtil.NEXT;
	static final String LN = CreaterUtil.LN;

	/**
	 * 单条插入 insert into table (id,...) values (#{id},...);
	 * 
	 */
	public static String insert(TableColumnData tableData) throws SQLException, IOException, ClassNotFoundException {

		StringBuffer sb = new StringBuffer();

		sb.append(LEFT + NEXT);
		sb.append(LEFT + "insert into " + tableData.getTableName() + NEXT);
		sb.append(LEFT + "(" + NEXT);

		List<ColumnEntity> columns = tableData.getColumnList();

		// 构建插入属性
		for (ColumnEntity en : columns) {

			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement())
				continue;

			sb.append(LEFT + "\t" + en.getName() + "," + NEXT);
		}
		// 删除最后一个逗号
		sb.delete(sb.length() - 2, sb.length());
		sb.append("\n");

		sb.append(LEFT + ")" + NEXT);
		sb.append(LEFT + "values\t" + NEXT);
		sb.append(LEFT + "(\t" + NEXT);

		for (ColumnEntity en : columns) {

			if (en.isPrimaryKey() && en.isAutoInctement())
				continue;

			sb.append(LEFT + "\t#{" + StringUtil.lineToHump(en.getName().toLowerCase()) + "}," + NEXT);
		}

		sb.delete(sb.length() - 2, sb.length());
		sb.append("\n");

		sb.append(LEFT + ")\t" + NEXT);

		return sb.toString();
	}

	/**
	 * 插入语句,为每个属性添加if判断
	 * 
	 * insert into table ( <if test=""> id, </if> ... ) values ( <if test="">
	 * #{id}, </if> ... );
	 * 
	 */
	public static String insertWithIf(TableColumnData tableData) throws SQLException, IOException, ClassNotFoundException {

		StringBuffer sb = new StringBuffer();

		sb.append(LN);
		sb.append("\t\tinsert into " + tableData.getTableName() + " \t\n\t\t<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\" >\n");

		List<ColumnEntity> columns = tableData.getColumnList();

		// 构建插入属性
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement()) continue;
			
			sb.append("\t\t\t<if test=\" " + StringUtil.lineToHump(en.getName().toLowerCase()) + "!=null \">\t\n");
			sb.append("\t\t\t\t" + en.getName() + ",\t\n\t\t\t</if>\t\n");
		}
		sb.append("\t\t</trim>\t\n");
		sb.append("\t\tvalues\t\n");
		sb.append("\t\t<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\" >\t\n");

		// 构建插入属性
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement()) continue;
			
			sb.append("\t\t\t<if test=\" " + StringUtil.lineToHump(en.getName().toLowerCase()) + "!=null \">\t\n");
			sb.append("\t\t\t\t#{" + StringUtil.lineToHump(en.getName().toLowerCase()) + "},\t\n\t\t\t</if>\t\n");
		}
		sb.append("\t\t</trim>\t\n");

		return sb.toString();
	}

	/**
	 * 批量插入语句
	 * 
	 * @param conn
	 * @param tabName
	 */
	public static String insertBatch(TableColumnData table) throws SQLException, IOException, ClassNotFoundException {

		StringBuffer sb = new StringBuffer();
		sb.append("\t\n");
		sb.append("\t\tinsert into " + table.getTableName() + " \t\n");
		sb.append("\t\t(\t\n");

		List<ColumnEntity> columns = table.getColumnList();

		// 构建插入属性
		for (ColumnEntity en : columns) {

			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement())
				continue;

			sb.append(LEFT + "\t" + en.getName() + "," + NEXT);
		}
		// 删除最后一个逗号
		sb.delete(sb.length() - 2, sb.length());
		sb.append("\n");
		sb.append("\t\t)\n");
		sb.append("\t\tvalues\t\n");

		sb.append("\t\t<foreach collection=\"entitys\" index=\"index\" item=\"item\" separator=\",\" >\n");
		sb.append("\t\t(\n");
		
		for (ColumnEntity en : columns) {

			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement())
				continue;
			sb.append("\t\t\t#{item." + StringUtil.lineToHump(en.getName().toLowerCase()) + "},"+NEXT);
		}
		sb.delete(sb.length() - 2, sb.length());
		sb.append("\t\t)\n");
		sb.append("\t\t</foreach>\n");

		return sb.toString();
	}

	/**
	 * 批量插入，且判断插入值
	 */
	public static String insertBatchWithIf(TableColumnData table) throws SQLException, IOException, ClassNotFoundException {

		StringBuffer sb = new StringBuffer();

		sb.append("\t\n");
		sb.append("\t\tinsert into " + table.getTableName() + " \t\n");
		sb.append("\t\t<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\" >\n");

		List<ColumnEntity> columns = table.getColumnList();

		// 构建插入属性
		// 构建插入属性
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement()) continue;
			
			sb.append("\t\t\t<if test=\" " + StringUtil.lineToHump(en.getName().toLowerCase()) + "!=null \">\t\n");
			sb.append("\t\t\t\t" + en.getName() + ",\t\n\t\t\t</if>\t\n");
		}
		sb.append("\t\t</trim>\t\n");
		sb.append("\t\tvalues\t\n");

		sb.append("\t\t<foreach collection=\"entitys\" index=\"index\" item=\"item\"  separator=\",\"  >\n");
		sb.append("\t\t<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\" >\n");
		
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey() && en.isAutoInctement()) continue;
			
			sb.append("\t\t\t<if test=\" " + StringUtil.lineToHump(en.getName().toLowerCase()) + "!=null \">\t\n");
			sb.append("\t\t\t#{item." + StringUtil.lineToHump(en.getName().toLowerCase()) + "},\t\n\t\t\t</if>\t\n");
		}
		sb.append("\t\t</trim>\t\n");
		sb.append("\t\t</foreach>\n");

		return sb.toString();

	}

}
