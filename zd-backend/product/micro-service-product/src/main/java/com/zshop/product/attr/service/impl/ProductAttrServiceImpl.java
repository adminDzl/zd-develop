package com.zshop.product.attr.service.impl;

import com.github.pagehelper.PageHelper;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.log.LogUtil;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import com.zshop.product.attr.dao.mapper.ProductAttrMapper;
import com.zshop.product.attr.entity.ProductAttr;
import com.zshop.product.attr.service.ProductAttrService;
import com.zshop.product.attrval.dao.mapper.ProductAttrValueMapper;
import com.zshop.product.attrval.entity.ProductAttrValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-15 20:01:47
 */
@Service
public class ProductAttrServiceImpl extends BaseServiceImpl<ProductAttr, Integer> implements ProductAttrService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductAttrMapper productAttrMapper;

	@Autowired
	private ProductAttrValueMapper productAttrValueMapper;

	
	@Override
	public BaseMapper<ProductAttr, Integer> getMapper(){
		return productAttrMapper;
	}

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	@Override
	public void list(ResultData result,Page<ProductAttr> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		mapSql.put("isDel",0);
		page.setPageSize(productAttrMapper.getCount());
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<ProductAttr> list = productAttrMapper.list(mapSql);
		
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
			result.setData(productAttrMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false,rollbackFor = Exception.class)
	public void addSave(ResultData result,ProductAttr entity,HttpServletRequest request){
		entity.setCreateTime(new Date());
		entity.setUpdateTime(new Date());
		entity.setAttrValue(request.getParameter("attrValues"));
		int row = productAttrMapper.insert(entity);
		String[] productAttrValues = request.getParameter("attrValues").split(",");
		if (row != 0) {
			int id = entity.getId();
			for(int i = 0; i< productAttrValues.length;i++){
				ProductAttrValue productAttrValue = new ProductAttrValue();
				productAttrValue.setAttrId(id);
				productAttrValue.setAttrValue(productAttrValues[i]);
				productAttrValue.setCreateTime(new Date());
				productAttrValue.setUpdateTime(new Date());
				productAttrValueMapper.insert(productAttrValue);
			}
		}
	}

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false,rollbackFor = Exception.class)
	public void updateSave(ResultData result,ProductAttr entity,HttpServletRequest request){
		entity.setUpdateTime(new Date());
		productAttrMapper.updateWithIf(entity);

	}

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	@Override
	public void findById(ResultData result,Integer id){
		ProductAttr entity=productAttrMapper.findById(id);
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
		productAttrMapper.logicDelete(id);
	}

	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		productAttrMapper.logicDeleteByIds(ids);
	}

}
