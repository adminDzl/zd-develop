package com.zshop.core.util.tree;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CCTreeNode{
	private String id;
	private String name;
	private String parentId;
	private String type;
	@JsonIgnore
	private CCTreeNode parent;
	private Object prototypeEntity;
	private List<CCTreeNode> children=new ArrayList<CCTreeNode>(0);
	private Object data=new ArrayList<Object>(0);
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public CCTreeNode getParent() {
		return parent;
	}
	public void setParent(CCTreeNode parent) {
		this.parent = parent;
	}
	public Object getPrototypeEntity() {
		return prototypeEntity;
	}
	public void setPrototypeEntity(Object prototypeEntity) {
		this.prototypeEntity = prototypeEntity;
	}
	public List<CCTreeNode> getChildren() {
		return children;
	}
	public void setChildren(List<CCTreeNode> children) {
		this.children = children;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}