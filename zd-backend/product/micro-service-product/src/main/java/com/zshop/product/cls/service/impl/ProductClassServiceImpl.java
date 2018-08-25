package com.zshop.product.cls.service.impl;

import java.util.Date;
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

import com.zshop.product.cls.dao.mapper.ProductClassMapper;
import com.zshop.product.cls.entity.ProductClass;
import com.zshop.product.cls.service.ProductClassService;

/**
 * @Description: 商品类别
 * @author: Enzo
 * @date: 2018-08-25 11:03:17
 */
@Service
public class ProductClassServiceImpl extends BaseServiceImpl<ProductClass, Integer> implements ProductClassService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductClassMapper productClassMapper;
	
	@Override
	public BaseMapper<ProductClass, Integer> getMapper(){
		return productClassMapper;
	}
	
	@Override
	public void list(ResultData result,Page<ProductClass> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<>(5);
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		mapSql.put("isDel",0);
		page.setPageSize(productClassMapper.getCount());
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<ProductClass> list = productClassMapper.list(mapSql);
		PageUtil.setPageInfo(page, list);
		page.setRows(list);
		result.setMapData("page", page);
		
	}

	@Override
	public void init(ResultData result,Integer id){
		
		if(id!=null) {
			result.setData(productClassMapper.findById(id));
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,ProductClass entity){
		entity.setCreateTime(new Date());
		entity.setUpdateTime(new Date());
		productClassMapper.insert(entity);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false,rollbackFor = Exception.class)
	public void updateSave(ResultData result,ProductClass entity){
		productClassMapper.updateWithIf(entity);
	}

	@Override
	public void findById(ResultData result,Integer id){
		ProductClass entity=productClassMapper.findById(id);
		result.setData(entity);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,Integer id){
		productClassMapper.logicDelete(id);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		productClassMapper.logicDeleteByIds(ids);
	}

}
