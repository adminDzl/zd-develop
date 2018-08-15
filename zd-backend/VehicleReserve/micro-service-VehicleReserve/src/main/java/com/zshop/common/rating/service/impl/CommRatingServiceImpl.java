package com.zshop.common.rating.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zshop.core.log.LogUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import com.github.pagehelper.PageHelper;
import com.zshop.core.base.controller.ResultData;

import com.zshop.common.rating.dao.mapper.CommRatingMapper;
import com.zshop.common.rating.entity.CommRating;
import com.zshop.common.rating.service.CommRatingService;

/**
 * @Description: 评价记录表
 * @author: Administrator
 * @date: 2018-04-27 14:44:28
 */
@Service
public class CommRatingServiceImpl extends BaseServiceImpl<CommRating, String> implements CommRatingService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CommRatingMapper commRatingMapper;
	
	@Override
	public BaseMapper<CommRating, String> getMapper(){
		return commRatingMapper;
	}
	
	/**
	 * 列表
	 * @param request
	 * @param response
	 * @param page
	 */
	public void list(ResultData result,Page<CommRating> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<CommRating> list = commRatingMapper.list(mapSql);
		
		PageUtil.setPageInfo(page, list);
		page.setRows(list);

		result.setMapData("page", page);
		
	}

	/**
	 * 新增/修改初始化
	 * @param request
	 * @param result
	 * @param entity
	 */
	public void init(ResultData result,String id){
		
		if(StringUtils.isNotBlank(id)) {
			result.setData(commRatingMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,CommRating entity){
		commRatingMapper.insert(entity);
	}
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,CommRating entity){
		commRatingMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 */
	public void findById(ResultData result,String id){
		CommRating entity=commRatingMapper.findById(id);
		result.setData(entity);
	}
	
	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param id
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,String id){
		commRatingMapper.logicDelete(id);
	}
	
	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,String[] ids){
		commRatingMapper.logicDeleteByIds(ids);
	}

}
