package com.zshop.product.attr.dao.mapper;

import com.zshop.product.attr.entity.ProductAttr;
import com.zshop.core.base.mapper.BaseMapper;

/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-23 14:15:06
 */
public interface ProductAttrMapper extends BaseMapper<ProductAttr,Integer>{
	int getCount();
}
