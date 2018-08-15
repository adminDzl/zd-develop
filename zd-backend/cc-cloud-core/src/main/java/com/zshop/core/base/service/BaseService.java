package com.zshop.core.base.service;

import java.util.List;
import java.util.Map;


/**
 * @ClassName: BaseService 
 * @描述: 基础Service
 * @author chenxm
 * @date 2016年7月29日 下午3:24:18
 */
public interface BaseService<T, PK> {
	 
	int insert(T entiry);

	int deleteById(PK id);

	int deleteByIds(PK[] ids);
	
	int update(T paramT);

	T findById(PK id);
	
	T findOneByMap(Map<String, Object> paramMap);
	
	List<T> findListByMap(Map<String, Object> paramMap);
	
	
}
