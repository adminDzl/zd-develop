package common.sqlgen;



import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.db.ColumnEntity;
import common.db.TableColumnData;
import common.util.StringUtil;






public class SqlCreaterUpdate  {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	static final String NEXT = CreaterUtil.NEXT;
	
	
	public static String update(TableColumnData table) throws SQLException, IOException, ClassNotFoundException{
		
		StringBuffer sb=new StringBuffer();
		
		sb.append("\t\n");
		sb.append("\t\tupdate "+table.getTableName()+" \t\n");
		sb.append("\t\t<set> \t\n");
		
		List<ColumnEntity> columns = table.getColumnList();

		// 构建插入属性
		// 构建插入属性
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey()) continue;
			sb.append("\t\t\t"+en.getName()+"=#{"+StringUtil.lineToHump(en.getName())+"},"+NEXT);
		}
		sb.delete(sb.length() - 2, sb.length());
		sb.append("\n\t\t</set> \t\n");
		sb.append("\t\twhere \n");
		sb.append("\t\tID=#{id} \t\n");
		
		return sb.toString();
	}
	
	public static String updateWithIf(TableColumnData table) throws SQLException, IOException, ClassNotFoundException{
		
		StringBuffer sb=new StringBuffer();

		sb.append("\t\n");
		sb.append("\t\tupdate "+table.getTableName()+" \t\n");
		sb.append("\t\t<set> \t\n");
		
		List<ColumnEntity> columns = table.getColumnList();
		
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey()) continue;
			sb.append("\t\t\t<if test=\" "+StringUtil.lineToHump(en.getName())+"!=null \">\t\n");
			sb.append("\t\t\t\t"+en.getName()+"=#{"+StringUtil.lineToHump(en.getName())+"},\t\n\t\t\t</if>\t\n");
		}
		sb.append("\t\t</set>\t\n");
		sb.append("\t\twhere \t\n");
		sb.append("\t\tID=#{id} \t\n");
		
		return sb.toString();
	}
	
	public static String updateBatch(TableColumnData table) throws SQLException, IOException, ClassNotFoundException{
		
		StringBuffer sb=new StringBuffer();

		sb.append("\t\n");
		sb.append("\t\tupdate "+table.getTableName()+" \t\n");
		sb.append("\t\tset \t\n");
		
		List<ColumnEntity> columns = table.getColumnList();
		
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey()) continue;
			sb.append("\t\t"+en.getName()+"=#{"+StringUtil.lineToHump(en.getName())+"},"+NEXT);
		}
		sb.delete(sb.length() - 2, sb.length());

		sb.append("\t\twhere \t\n");
		sb.append("\t\tID in \t\n");
		sb.append("\t\t<foreach collection=\"entitys\" index=\"index\" item=\"item\"  open=\"(\" separator=\",\" close=\")\" >\n");
		sb.append("\t\t\t\t#{item}\t\n");
		sb.append("\t\t</foreach>\n");

		return sb.toString();
	}
	
	public static String updateBatchWithIf(TableColumnData table) throws SQLException, IOException, ClassNotFoundException{
		
		
		
		StringBuffer sb=new StringBuffer();
		
		sb.append("\t\n");
		sb.append("\t\tupdate "+table.getTableName()+" \t\n");
		sb.append("\t\tset \t\n");
		sb.append("\t\t<trim prefix=\"\" suffix=\"\" suffixOverrides=\",\" >\n");
		
		
		List<ColumnEntity> columns = table.getColumnList();
		
		for (ColumnEntity en : columns) {
			
			// 若为主键且自动增长，若是则不生成该列
			if (en.isPrimaryKey()) continue;

			sb.append("\t\t\t<if test=\" "+StringUtil.lineToHump(en.getName())+"!=null \">\t\n");
			sb.append("\t\t\t\t"+en.getName()+"=#{"+StringUtil.lineToHump(en.getName())+"},\t\n\t\t\t</if>\t\n");
		}

		sb.append("\t\t</trim>\t\n");
		sb.append("\t\twhere \t\n");
		sb.append("\t\tID in \t\n");
		sb.append("\t\t<foreach collection=\"entitys\" index=\"index\" item=\"item\"  open=\"(\" separator=\",\" close=\")\" >\n");
		sb.append("\t\t\t\t#{item}\t\n");
		sb.append("\t\t</foreach>\n");

		return sb.toString();
	}
	
}
