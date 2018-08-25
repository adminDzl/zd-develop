package com.zshop.product.cls.dao.mapper;

import com.zshop.product.cls.entity.ProductClass;
import com.zshop.core.base.mapper.BaseMapper;

/**
 * @Description: 商品类别
 * @author: Enzo
 * @date: 2018-08-25 11:03:17
 */
public interface ProductClassMapper extends BaseMapper<ProductClass,Integer>{
	int getCount();
}
