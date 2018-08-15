package common.db;

/**
 * 数据表列属性
 * @author Home
 *
 */
public class ColumnEntity {

	/**
	 * 列名称
	 */
	private String name;
	
	/**
	 * 列类型
	 */
	private Integer type;
	
	/**
	 * 列类型名称
	 */
	private String typeName;
	
	/**
	 * 对应的数据类型的类
	 */
	private String typeClass;
	
	/**
	 * 列注释
	 */
	private String remark;
	
	/**
	 * 是否主键
	 */
	private boolean isPrimaryKey;
	
	/**
	 *  是否自动递增
	 */
	private boolean isAutoInctement;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeClass() {
		return typeClass;
	}

	public void setTypeClass(String typeClass) {
		this.typeClass = typeClass;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public boolean isPrimaryKey() {
		return isPrimaryKey;
	}

	public void setPrimaryKey(boolean isPrimaryKey) {
		this.isPrimaryKey = isPrimaryKey;
	}

	public boolean isAutoInctement() {
		return isAutoInctement;
	}

	public void setAutoInctement(boolean isAutoInctement) {
		this.isAutoInctement = isAutoInctement;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
