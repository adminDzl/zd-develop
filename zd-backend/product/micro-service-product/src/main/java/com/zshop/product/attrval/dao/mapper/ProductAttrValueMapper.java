package com.zshop.product.attrval.dao.mapper;

import com.zshop.product.attrval.entity.ProductAttrValue;
import com.zshop.core.base.mapper.BaseMapper;

import java.util.List;

/**
 * @Description: 商品规格属性
 * @author: Enzo
 * @date: 2018-08-19 19:36:58
 */
public interface ProductAttrValueMapper extends BaseMapper<ProductAttrValue,Integer>{
    /**
     * 详情
     * @param attrId
     * @return
     */
	List<ProductAttrValue> findByAttrId(Integer attrId);
}
