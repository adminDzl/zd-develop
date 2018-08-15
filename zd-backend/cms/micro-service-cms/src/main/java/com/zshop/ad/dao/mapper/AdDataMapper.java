package com.zshop.ad.dao.mapper;

import com.zshop.ad.entity.AdData;
import com.zshop.core.base.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Description: 广告数据
 * @author: Enzo
 * @date: 2018-08-13 11:35:38
 */
@Mapper
public interface AdDataMapper extends BaseMapper<AdData,Integer>{
	
}
