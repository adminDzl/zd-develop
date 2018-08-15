package com.zshop.ad.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.ad.entity.AdData;

/**
 * @Description: 广告数据
 * @author: Enzo
 * @date: 2018-08-13 11:35:38
 */
public interface AdDataService extends BaseService<AdData, Integer> {

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */

	void list(ResultData result, Page<AdData> page,String searchKeys);

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
	void addSave(ResultData result, AdData entity);

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	void updateSave(ResultData result, AdData entity);

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
