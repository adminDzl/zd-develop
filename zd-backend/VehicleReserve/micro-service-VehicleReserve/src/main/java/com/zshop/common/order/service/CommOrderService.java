package com.zshop.common.order.service;


import com.zshop.common.order.entity.CommOrder;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;

/**
 * @Description: 订单总表
 * @author: Administrator
 * @date: 2018-04-20 17:04:44
 */
public interface CommOrderService extends BaseService<CommOrder, String> {
	
	/**
	 * 列表
	 * @param request
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<CommOrder> page, String searchKeys);

	/**
	 * 新增/修改初始化
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void init(ResultData result, String id);

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void addSave(ResultData result, CommOrder entity);

	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, CommOrder entity);

	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 * @return
	 */
	void findById(ResultData result, String id);

	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 * @return
	 */
	void deleteByIds(ResultData result, String[] ids);

	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param ids
	 * @return
	 */
	void deleteById(ResultData result, String id);

}
