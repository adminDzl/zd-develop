package com.zshop.core.util.tree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zshop.core.exception.type.BusinessException;

public class CCTreeUtil {
	private static final Logger logger = LoggerFactory.getLogger(CCTreeUtil.class);
	/**
	 * 列表转树形结构
	 * @param list
	 * @param handler
	 * @return
	 */
	public static <T> List<CCTreeNode> parse(List<T> list,CCTreeNodeHandler<T> handler) {
		Map<String,CCTreeNode> idToObj = new HashMap<String,CCTreeNode>();
		for(T t:list) {
			CCTreeNode node = new CCTreeNode();
			node.setPrototypeEntity(handler.getPrototypeEntity(t));
			node.setId(handler.getId(t));
			node.setName(handler.getName(t));
			node.setParentId(handler.getParentId(t));
			node.setType(handler.getType(t));
			idToObj.put(node.getId(), node);
		}
		//添加children
		List<CCTreeNode> resultList = new ArrayList<CCTreeNode>();
		for(T t:list) {
			String id = handler.getId(t);
			String parentId = handler.getParentId(t);
			CCTreeNode node = idToObj.get(id);
			if(StringUtils.isNotBlank(parentId)) {
				CCTreeNode parentNode = idToObj.get(parentId);
				if(parentNode!=null) {
					parentNode.getChildren().add(node);
					node.setParent(parentNode);
					continue;
				}else {
					logger.info("Node with wrong parentId detected:"+node.getId()+","+node.getName()+","+node.getParentId());
				}
			}else {
				logger.info("Node with no parentId detected:"+node.getId()+","+node.getName()+","+node.getParentId());
			}
			//找不到上级则认为该记录无上级，以免数据丢失
			node.setParentId(null);
			resultList.add(node);
		}
		return resultList;
	}
	/**
	 * 遍历整个树
	 * @param list
	 * @param e
	 */
	public static void foreach(List<CCTreeNode> list,CCTreeNodeExecutor e) {
		Map<String,Object> execution = new HashMap<String,Object>();
		for(CCTreeNode node:list) {
			try {
				e.execute(node,execution);
			}catch(Exception exc) {
				exc.printStackTrace();
				throw new BusinessException(node.getName()+"处理失败");
			}
			List<CCTreeNode> children = node.getChildren();
			foreach(children,e,execution);
		}
	}
	public static void foreach(List<CCTreeNode> list,CCTreeNodeExecutor e, Map<String,Object> execution) {
		for(CCTreeNode node:list) {
			e.execute(node,execution);
			List<CCTreeNode> children = node.getChildren();
			foreach(children,e,execution);
		}
	}
}

