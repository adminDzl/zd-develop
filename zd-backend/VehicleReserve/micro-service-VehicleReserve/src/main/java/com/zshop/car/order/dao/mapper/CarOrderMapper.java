package com.zshop.car.order.dao.mapper;

import com.zshop.car.order.entity.CarOrder;
import com.zshop.core.base.mapper.BaseMapper;

import java.util.List;
import java.util.Map;

/**
 * @Description: 用车订单表
 * @author: Administrator
 * @date: 2018-04-11 17:29:44
 */
public interface CarOrderMapper extends BaseMapper<CarOrder,String>{

    /**
     * 查询订单列表
     * @param paramMap
     * @return
     */
    List<CarOrder> orderList(Map<String, Object> paramMap);


    /**
     * 查询订单详情信息
     * @param paramMap
     * @return
     */
    CarOrder orderInfo(Map<String, Object> paramMap);
}
