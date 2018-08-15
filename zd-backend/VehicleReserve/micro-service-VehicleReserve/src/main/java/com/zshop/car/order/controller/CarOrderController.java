package com.zshop.car.order.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.order.service.CarOrderService;
import com.zshop.car.order.entity.CarOrder;

import java.util.Date;


/**
 * @Description: 用车订单表
 * @author: Administrator
 * @date: 2018-04-11 17:29:44
 */
@RestController
@RequestMapping("car/carorder")
public class CarOrderController {

    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private CarOrderService carOrderService;

    /**
     * 列表
     *
     * @param page
     * @param searchKeys 查询关键字
     * @return
     */
    @GetMapping(value = "/list")
    public ResultData list(Page<CarOrder> page, String searchKeys, String userId) {
        ResultData result = new ResultData();
        carOrderService.list(result, page, searchKeys, userId);

        return result;
    }

    /**
     * 新增/修改初始化
     *
     * @return
     */
    @GetMapping(value = "/init")
    public ResultData init(String id) {
        ResultData result = new ResultData();
        carOrderService.init(result, id);
        return result;
    }

    /**
     * 添加保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/addSave")
    public ResultData addSave(CarOrder entity) {
        ResultData result = new ResultData();
        carOrderService.addSave(result, entity);
        return result;
    }

    /**
     * 修改保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/updateSave")
    public ResultData updateSave(CarOrder entity) {
        ResultData result = new ResultData();
        carOrderService.updateSave(result, entity);
        return result;
    }

    /**
     * 详情
     *
     * @param id
     * @return
     */
    @GetMapping(value = "/findById")
    public ResultData findById(String id) {
        ResultData result = new ResultData();
        carOrderService.findById(result, id);
        return result;
    }

    /**
     * 根据id删除
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/deleteById")
    public ResultData deleteById(String id) {
        ResultData result = new ResultData();
        carOrderService.deleteById(result, id);
        return result;
    }

    /**
     * 根据ids删除
     *
     * @param ids
     * @return
     */
    @PostMapping(value = "/deleteByIds")
    public ResultData deleteByIds(String ids) {
        ResultData result = new ResultData();
        String[] splitIds = CCStringUtils.splitToString(ids, " ");
        carOrderService.deleteByIds(result, splitIds);
        return result;
    }

    /**
     * 列表
     *
     * @param page
     * @param searchKeys 关键字
     * @param orderStatus 订单状态
     * @return
     */
    @GetMapping(value = "/orderList")
    public ResultData orderList(Page<CarOrder> page, String searchKeys, String orderStatus, Date orderTimeBegin,Date orderTimeEnd) {
        ResultData result = new ResultData();
        carOrderService.orderList(result, page, searchKeys, orderStatus,orderTimeBegin,orderTimeEnd);

        return result;
    }

    /**
     * 申请用车订单
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/addOrder")
    public ResultData addOrder(CarOrder entity) {
        ResultData result = new ResultData();
        carOrderService.addOrder(result, entity);
        return result;
    }

    /**
     * 取消订单
     *
     * @param orderId 订单id
     * @return
     */
    @PostMapping(value = "/cancelOrder")
    public ResultData cancelOrder(String orderId) {
        ResultData result = new ResultData();
        carOrderService.deleteOrder(result, orderId);
        return result;
    }

    /**
     * 根据用户 获取用车详情
     *
     * @param orderId
     * @return
     */
    @GetMapping(value = "/orderInfo")
    public ResultData orderInfo(String orderId) {
        ResultData result = new ResultData();
        carOrderService.orderInfo(result, orderId);
        return result;
    }


    /**
     * 审批用车订单（通过/驳回）
     *
     * @param orderId          订单id
     * @param orderStatus 订单状态
     * @param repulseReason 驳回理由
     * @return
     */
    @PostMapping(value = "/updateOrderStatus")
    public ResultData updateOrderStatus(String orderId, String orderStatus, String repulseReason) {

        ResultData result = new ResultData();
        carOrderService.updateOrderStatus(result, orderId, orderStatus, repulseReason);
        return result;
    }

    /**
     * 司机接单、到底出发地、用车完成
     *
     * @param orderId     订单id
     * @param orderStatus 订单状态
     * @return
     */
    @PostMapping(value = "/orderReceiving")
    public ResultData orderReceiving(String orderId, String orderStatus) {
        ResultData result = new ResultData();
        carOrderService.orderReceiving(result, orderId, orderStatus);
        return result;
    }

    /**
     * 评价订单
     *
     * @param orderId     订单id
     * @param userId      用户id
     * @param parkId      园区id
     * @param ratingScore 评分
     * @param ratingDesc  评价描述
     * @return
     */
    @PostMapping(value = "/addRating")
    public ResultData addRating(String orderId, String userId, String parkId, Integer ratingScore, String ratingDesc) {
        ResultData result = new ResultData();
        carOrderService.addRating(result, orderId, ratingScore, ratingDesc);
        return result;
    }

}
