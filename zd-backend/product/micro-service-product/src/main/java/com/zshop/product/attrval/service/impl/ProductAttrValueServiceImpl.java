package com.zshop.product.attrval.service.impl;

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

import com.zshop.product.attrval.dao.mapper.ProductAttrValueMapper;
import com.zshop.product.attrval.entity.ProductAttrValue;
import com.zshop.product.attrval.service.ProductAttrValueService;

/**
 * @Description: 商品规格属性
 * @author: Enzo
 * @date: 2018-08-19 19:36:58
 */
@Service
public class ProductAttrValueServiceImpl extends BaseServiceImpl<ProductAttrValue, Integer> implements ProductAttrValueService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductAttrValueMapper productAttrValueMapper;
	
	@Override
	public BaseMapper<ProductAttrValue, Integer> getMapper(){
		return productAttrValueMapper;
	}

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	@Override
	public void list(ResultData result,Page<ProductAttrValue> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<ProductAttrValue> list = productAttrValueMapper.list(mapSql);
		
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
			result.setData(productAttrValueMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,ProductAttrValue entity){
		productAttrValueMapper.insert(entity);
	}

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,ProductAttrValue entity){
		productAttrValueMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	@Override
	public void findById(ResultData result,Integer id){
		ProductAttrValue entity=productAttrValueMapper.findById(id);
		result.setData(entity);
	}

	@Override
	public void findByAttrId(ResultData result, Integer attrId) {
		List<ProductAttrValue> list=productAttrValueMapper.findByAttrId(attrId);
		result.setData(list);
	}

	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,Integer id){
		productAttrValueMapper.logicDelete(id);
	}

	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		productAttrValueMapper.logicDeleteByIds(ids);
	}

}
