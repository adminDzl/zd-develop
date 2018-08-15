package com.zshop.common.order.dao.mapper;

import com.zshop.common.order.entity.CommOrder;
import com.zshop.core.base.mapper.BaseMapper;

import java.util.List;
import java.util.Map;

/**
 * @Description: 订单总表
 * @author: Administrator
 * @date: 2018-04-20 17:04:44
 */
public interface CommOrderMapper extends BaseMapper<CommOrder,String>{

    /**
     * 根据订单id修改订单总表信息
     * @param entity
     * @return
     */
    int updateWithIfByOrderId(CommOrder entity);

    /**
     * 订单列表
     * @param paramMap
     * @return
     */
    List<CommOrder> orderList(Map<String, Object> paramMap);
}
