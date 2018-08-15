package com.zshop.car.reception.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.car.reception.entity.CarReception;

/**
 * @Description: 订单派单表
 * @author: Administrator
 * @date: 2018-04-10 17:44:39
 */
public interface CarReceptionService extends BaseService<CarReception, String> {
	
	/**
	 * 列表
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<CarReception> page,String searchKeys);
	
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
	void addSave(ResultData result, CarReception entity);
	
	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, CarReception entity);
	
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

	/**
	 * 车辆调度员派车
	 * @param result
	 * @param orderId 订单id
	 */
	void addListSave(ResultData result, String driverList ,String orderId);

}
