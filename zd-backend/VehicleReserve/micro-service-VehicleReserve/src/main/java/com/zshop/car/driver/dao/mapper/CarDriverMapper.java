package com.zshop.car.driver.dao.mapper;

import com.zshop.car.driver.entity.CarDriver;
import com.zshop.core.base.mapper.BaseMapper;

/**
 * @Description: 司机信息表
 * @author: Administrator
 * @date: 2018-04-19 10:39:19
 */
public interface CarDriverMapper extends BaseMapper<CarDriver,String>{

    /**
     * 修改司机出车数
     * @param entity
     * @return
     */
    int updateRunNumber(CarDriver entity);
}
