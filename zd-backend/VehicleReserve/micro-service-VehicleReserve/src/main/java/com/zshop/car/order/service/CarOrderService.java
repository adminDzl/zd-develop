package com.zshop.car.order.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.car.order.entity.CarOrder;

import java.util.Date;

/**
 * @Description: 用车订单表
 * @author: Administrator
 * @date: 2018-04-11 17:29:44
 */
public interface CarOrderService extends BaseService<CarOrder, String> {
	
	/**
	 * 列表
	 * @param result
	 * @param page
	 * @return
	 */
	void list(ResultData result, Page<CarOrder> page,String searchKeys,String userId);
	
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
	void addSave(ResultData result, CarOrder entity);
	
	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 * @return
	 */
	void updateSave(ResultData result, CarOrder entity);
	
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
	 * 订单列表
	 * @param result
	 * @param page
	 * @param searchKeys 关键词
	 * @param orderStatus 订单状态
	 * @param orderTimeBegin 申请时间
	 * @param orderTimeEnd 申请时间
	 */
	void orderList(ResultData result, Page<CarOrder> page, String searchKeys, String orderStatus, Date orderTimeBegin, Date orderTimeEnd);

	/**
	 * 申请用车
	 * @param result
	 * @param entity
	 */
	void addOrder(ResultData result, CarOrder entity);

	/**
	 * 取消订单
	 * @param result
	 * @param orderId 订单id
	 * @param userId 用户id
	 */
	void deleteOrder(ResultData result, String orderId);

	/**
	 * 获取用车订单详情
	 * @param result 返回数据
	 * @param id 订单id
	 * @param userId 用户id
	 * @param parkId 园区id
	 * @return
	 */
	void orderInfo(ResultData result,String id);

	/**
	 * 审批用车订单（通过/驳回）
	 * @param orderId 订单id
	 * @param orderStatus 订单状态
	 * @param repulseReason 驳回理由
	 */
	void updateOrderStatus(ResultData result, String orderId, String orderStatus,String repulseReason);

	/**
	 * 司机接单、到底出发地、用车完成
	 * @param result
	 * @param orderId 订单id
	 * @param userId 用户id
	 * @param orderStatus 订单状态
	 */
	void orderReceiving(ResultData result,String orderId, String orderStatus);


	/**
	 * 评价订单
	 * @param result
	 * @param orderId 订单id
	 * @param ratingScore 评分
	 * @param ratingDesc 评价描述
	 */
	void addRating(ResultData result,String orderId, Integer ratingScore,String ratingDesc);
}
