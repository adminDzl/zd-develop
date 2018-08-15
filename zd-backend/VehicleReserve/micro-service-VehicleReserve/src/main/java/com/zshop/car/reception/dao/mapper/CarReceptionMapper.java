package com.zshop.car.reception.dao.mapper;

import com.zshop.car.reception.entity.CarReception;
import com.zshop.core.base.mapper.BaseMapper;

import java.util.Map;

/**
 * @Description: 订单派单表
 * @author: Administrator
 * @date: 2018-04-10 17:44:39
 */
public interface CarReceptionMapper extends BaseMapper<CarReception,String>{

    /**
     * 根据条件修改
     * @param paramMap
     * @return
     */
    int updateWithIfByMap(Map<String, Object> paramMap);
}
