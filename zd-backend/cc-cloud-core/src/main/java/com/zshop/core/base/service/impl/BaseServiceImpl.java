package com.zshop.core.base.service.impl;

import java.util.List;
import java.util.Map;

import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.BaseService;

/**
 * @ClassName: BaseServiceImpl
 * @描述: Service 工具类
 * @author chenxm
 * @date 2016年7月29日 下午2:56:24
 */
public abstract class BaseServiceImpl<T, PK> implements BaseService<T, PK> {

	public abstract BaseMapper<T, PK> getMapper();

	public int insert(T obj) {
		return getMapper().insert(obj);
	}

	public int deleteById(PK id) {
		return getMapper().deleteById(id);
	}

	public int deleteByIds(PK[] ids) {
		return getMapper().deleteByIds(ids);
	}

	public int update(T obj) {
		return getMapper().update(obj);
	}

	public List<T> findListByMap(Map<String, Object> mapSql) {
		return getMapper().findListByMap(mapSql);
	}

	public T findById(PK id) {
		return getMapper().findById(id);
	}
	
	public T findOneByMap(Map<String, Object> paramMap) {
		return getMapper().findOneByMap(paramMap);
	}


}
