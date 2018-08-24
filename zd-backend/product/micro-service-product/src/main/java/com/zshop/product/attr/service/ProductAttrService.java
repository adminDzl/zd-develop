package com.zshop.product.attr.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.product.attr.entity.ProductAttr;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-23 14:15:06
 */
public interface ProductAttrService extends BaseService<ProductAttr, Integer> {

    /**
     * 列表
     *
     * @param result
     * @param page
     * @param searchKeys
     */
    void list(ResultData result, Page<ProductAttr> page, String searchKeys);

    /**
     * 新增/修改初始化
     *
     * @param result
     * @param id
     */
    void init(ResultData result, Integer id);

    /**
     * 添加保存
     *
     * @param result
     * @param entity
     */
    void addSave(ResultData result, ProductAttr entity, HttpServletRequest request);

    /**
     * 修改保存
     *
     * @param result
     * @param entity
     */
    void updateSave(ResultData result, ProductAttr entity,HttpServletRequest request);

    /**
     * 详情
     *
     * @param result
     * @param id
     */
    void findById(ResultData result, Integer id);

    /**
     * 根据ids删除
     *
     * @param result
     * @param ids
     */
    void deleteByIds(ResultData result, Integer[] ids);

    /**
     * 根据id删除
     *
     * @param result
     * @param id
     */
    void deleteById(ResultData result, Integer id);
}
