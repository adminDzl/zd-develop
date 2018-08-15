package com.zshop.car.leader.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.car.leader.entity.CarLeader;

/**
 * @Description: 领导信息表
 * @author: Administrator
 * @date: 2018-04-28 21:39:17
 */
public interface CarLeaderService extends BaseService<CarLeader, String> {
	
	/**
	 * 列表
	 * @param request
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<CarLeader> page,CarLeader entity,String searchKeys);
	
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
	void addSave(ResultData result, CarLeader entity);
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, CarLeader entity);
	
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
	 * 查询领导人列表
	 * @param result
	 * @return
	 */
	void leaderList(ResultData result, String searchKeys);
}
