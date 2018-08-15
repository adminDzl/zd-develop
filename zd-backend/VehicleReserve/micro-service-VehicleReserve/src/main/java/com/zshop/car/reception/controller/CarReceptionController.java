package com.zshop.car.reception.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.reception.service.CarReceptionService;
import com.zshop.car.reception.entity.CarReception;


/**
 * @Description: 订单派单表
 * @author: Administrator
 * @date: 2018-04-10 17:44:39
 */
@RestController
@RequestMapping("car/carreception")
public class CarReceptionController {

    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private CarReceptionService carReceptionService;

    /**
     * 列表
     *
     * @param page
     * @param searchKeys
     * @return
     */
    @GetMapping(value = "/list")
    public ResultData list(Page<CarReception> page, String searchKeys) {
        ResultData result = new ResultData();
        carReceptionService.list(result, page, searchKeys);

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
        carReceptionService.init(result, id);
        return result;
    }

    /**
     * 添加保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/addSave")
    public ResultData addSave(CarReception entity) {
        ResultData result = new ResultData();
        carReceptionService.addSave(result, entity);
        return result;
    }

    /**
     * 修改保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/updateSave")
    public ResultData updateSave(CarReception entity) {
        ResultData result = new ResultData();
        carReceptionService.updateSave(result, entity);
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
        carReceptionService.findById(result, id);
        return result;
    }

    /**
     * 根据id删除
     *
     * @return
     */
    @PostMapping(value = "/deleteById")
    public ResultData deleteById(String id) {
        ResultData result = new ResultData();
        carReceptionService.deleteById(result, id);
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
        carReceptionService.deleteByIds(result, splitIds);
        return result;
    }

    /**
     * 车辆调度员派车
     *
     * @param driverList 司机Json
     * @param orderId    订单id
     * @return
     */
    @PostMapping(value = "/addListSave")
    public ResultData addListSave(String driverList, String orderId) {
        ResultData result = new ResultData();
        carReceptionService.addListSave(result, driverList, orderId);
        return result;
    }

}
