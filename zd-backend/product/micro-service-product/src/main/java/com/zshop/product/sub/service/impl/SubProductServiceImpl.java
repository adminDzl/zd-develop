package com.zshop.product.sub.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.zshop.product.sub.dao.mapper.SubProductMapper;
import com.zshop.product.sub.entity.SubProduct;
import com.zshop.product.sub.service.SubProductService;

/**
 * @Description: 子商品表
 * @author: Enzo
 * @date: 2018-08-14 20:25:22
 */
@Service
public class SubProductServiceImpl extends BaseServiceImpl<SubProduct, Integer> implements SubProductService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private SubProductMapper subProductMapper;
	
	@Override
	public BaseMapper<SubProduct, Integer> getMapper(){
		return subProductMapper;
	}

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	@Override
	public void list(ResultData result,Page<SubProduct> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<SubProduct> list = subProductMapper.list(mapSql);
		
		PageUtil.setPageInfo(page, list);
		page.setRows(list);

		result.setMapData("page", page);
		
	}

	/**
	 * 新增/修改初始化
	 * @param result
	 * @param id
	 */
	@Override
	public void init(ResultData result,Integer id){
		
		if(id!=null) {
			result.setData(subProductMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,SubProduct entity){
		subProductMapper.insert(entity);
	}

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,SubProduct entity){
		subProductMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	@Override
	public void findById(ResultData result,Integer id){
		SubProduct entity=subProductMapper.findById(id);
		result.setData(entity);
	}

	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,Integer id){
		subProductMapper.logicDelete(id);
	}

	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		subProductMapper.logicDeleteByIds(ids);
	}

}
