package common.sqlgen;



import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.db.ColumnEntity;
import common.db.TableColumnData;
import common.util.StringUtil;





public class SqlCreaterSelect  {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	static final String NEXT = CreaterUtil.NEXT;
	
	
	public static String find(TableColumnData table) throws SQLException, IOException, ClassNotFoundException{
		
		StringBuffer sb=new StringBuffer();
		
		sb.append("\t\t\n");
		sb.append("\t\tselect  \t\n");
		
		List<ColumnEntity> columns = table.getColumnList();
		
		for (ColumnEntity en : columns) {
			sb.append("\t\t\ta."+en.getName()+" "+StringUtil.lineToHump(en.getName())+","+NEXT);
		}
		sb.delete(sb.length() - 2, sb.length());
		
		sb.append("\n\t\tfrom "+table.getTableName()+" a"+"\t\n");
		
		return sb.toString();
	}
	
}
