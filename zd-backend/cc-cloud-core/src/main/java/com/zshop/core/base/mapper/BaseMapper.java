package com.zshop.core.base.mapper;

import java.util.List;
import java.util.Map;


/**
 * 基础Mapper,xml文件中不需要实例化接口
 * @author huangga
 *
 * @param <T>
 * @param <PK>
 */
public interface BaseMapper<T, PK> {

	  int insert(T paramT);

	  int insertBatch(Map<String, Object> paramMap);

	  int deleteById(PK paramPK);

	  int deleteByIds(PK[] paramArrayOfPK);

	  int deleteByMap(Map<String, Object> paramMap);
	  
	  int logicDelete(PK paramPK);

	  int logicDeleteByIds(PK[] paramArrayOfPK);
	  
	  int update(T entity);
	  
	  int updateWithIf(T entity);

	  int updateBatch(Map<String, Object> paramMap);

	  T findById(PK id);
	  
	  T findOneByMap(Map<String, Object> paramMap);

	  List<T> findListByMap(Map<String, Object> paramMap);

	  List<T> list(Map<String, Object> paramMap);

	  int findCountByMap(Map<String, Object> paramMap);
}