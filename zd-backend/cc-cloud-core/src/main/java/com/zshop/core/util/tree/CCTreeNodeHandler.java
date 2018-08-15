package com.zshop.core.util.tree;

public abstract class CCTreeNodeHandler<T>{
	public abstract String getId(T t);
	public abstract String getName(T t);
	public abstract String getParentId(T t);
	public abstract String getType(T t);
	public Object getPrototypeEntity(T t) {
		return null;
	};
}