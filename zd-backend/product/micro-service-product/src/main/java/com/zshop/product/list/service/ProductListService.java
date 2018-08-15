package com.zshop.product.list.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.product.list.entity.ProductList;

/**
 * @Description: 商品列表
 * @author: Administrator
 * @date: 2018-08-10 14:39:20
 */
public interface ProductListService extends BaseService<ProductList, String> {
	
	/**
	 * 列表
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<ProductList> page,String searchKeys);
	
	/**
	 * 新增/修改初始化
	 * @param result
	 * @return
	 */
	void init(ResultData result,String id);

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void addSave(ResultData result, ProductList entity);
	
	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, ProductList entity);
	
	/**
	 * 详情
	 * @param result
	 * @param id
	 * @return
	 */
	void findById( ResultData result, String id);
	
	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 * @return
	 */
	void deleteByIds(ResultData result, String[] ids);
	
	/**
	 * 根据id删除
	 * @param result
	 * @return
	 */
	void deleteById(ResultData result, String id);
}
