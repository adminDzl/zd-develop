package com.zshop.car.driver.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.car.driver.entity.CarDriver;

/**
 * @Description: 司机信息表
 * @author: Administrator
 * @date: 2018-04-19 10:39:19
 */
public interface CarDriverService extends BaseService<CarDriver, String> {
	
	/**
	 * 列表
	 * @param request
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<CarDriver> page,String searchKeys);
	
	/**
	 * 新增/修改初始化
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void init(ResultData result,String id);

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void addSave(ResultData result, CarDriver entity);
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, CarDriver entity);
	
	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 * @return
	 */
	void findById( ResultData result, String id);
	
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

	/**
	 * 查询司机列表
	 * @param result
	 * @param userId 用户id
	 * @return
	 */
	void driverList(ResultData result);
}
