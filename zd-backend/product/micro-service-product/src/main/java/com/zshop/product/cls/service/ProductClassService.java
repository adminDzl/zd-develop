package com.zshop.product.cls.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.product.cls.entity.ProductClass;

/**
 * @Description: 商品类别
 * @author: Enzo
 * @date: 2018-08-25 11:03:17
 */
public interface ProductClassService extends BaseService<ProductClass, Integer> {

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	void list(ResultData result, Page<ProductClass> page,String searchKeys);

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
	void addSave(ResultData result, ProductClass entity);

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	void updateSave(ResultData result, ProductClass entity);

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	void findById( ResultData result, Integer id);

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
