package com.zshop.product.main.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.product.main.entity.MainProduct;

/**
 * @Description: 商品主表
 * @author: Enzo
 * @date: 2018-08-12 19:19:27
 */
public interface MainProductService extends BaseService<MainProduct, Integer> {
	
	/**
	 * 列表
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<MainProduct> page,String searchKeys);
	
	/**
	 * 新增/修改初始化
	 * @param result
	 * @param id
	 * @return
	 */
	void init(ResultData result,Integer id);

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void addSave(ResultData result, MainProduct entity);
	
	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, MainProduct entity);
	
	/**
	 * 详情
	 * @param result
	 * @param id
	 * @return
	 */
	void findById( ResultData result, Integer id);
	
	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 * @return
	 */
	void deleteByIds(ResultData result, Integer[] ids);
	
	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 * @return
	 */
	void deleteById(ResultData result, Integer id);
}
