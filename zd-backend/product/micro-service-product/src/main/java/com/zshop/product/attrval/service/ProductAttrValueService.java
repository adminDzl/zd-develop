package com.zshop.product.attrval.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.product.attrval.entity.ProductAttrValue;

/**
 * @Description: 商品规格属性
 * @author: Enzo
 * @date: 2018-08-19 19:36:58
 */
public interface ProductAttrValueService extends BaseService<ProductAttrValue, Integer> {

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	void list(ResultData result, Page<ProductAttrValue> page,String searchKeys);

	/**
	 * 新增/修改初始化
	 * @param result
	 * @param id
	 */
	void init(ResultData result,Integer id);

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	void addSave(ResultData result, ProductAttrValue entity);

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	void updateSave(ResultData result, ProductAttrValue entity);

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	void findById( ResultData result, Integer id);

	/**
	 * 详情
	 * @param result
	 * @param attrId
	 */
	void findByAttrId( ResultData result, Integer attrId);
	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */
	void deleteByIds(ResultData result, Integer[] ids);

	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 */
	void deleteById(ResultData result, Integer id);
}
