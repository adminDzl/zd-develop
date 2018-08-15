package com.zshop.product.main.service.impl;

import com.github.pagehelper.PageHelper;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.log.LogUtil;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import com.zshop.product.main.dao.mapper.MainProductMapper;
import com.zshop.product.main.entity.MainProduct;
import com.zshop.product.main.service.MainProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 商品主表
 * @author: Enzo
 * @date: 2018-08-12 19:19:27
 */
@Service
public class MainProductServiceImpl extends BaseServiceImpl<MainProduct, Integer> implements MainProductService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private MainProductMapper mainProductMapper;
	
	@Override
	public BaseMapper<MainProduct, Integer> getMapper(){
		return mainProductMapper;
	}

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	@Override
	public void list(ResultData result,Page<MainProduct> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<MainProduct> list = mainProductMapper.list(mapSql);
		
		PageUtil.setPageInfo(page, list);
		page.setRows(list);

		result.setMapData("page", page);
		
	}

	/**
	 * 新增/修改初始化
	 * @param result
	 * @param id
	 */
	@Override
	public void init(ResultData result,Integer id){
		
		if(id!=null) {
			result.setData(mainProductMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,MainProduct entity){
		mainProductMapper.insert(entity);
	}

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	 @Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,MainProduct entity){
		mainProductMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	@Override
	public void findById(ResultData result,Integer id){
		MainProduct entity=mainProductMapper.findById(id);
		result.setData(entity);
	}

	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,Integer id){
		mainProductMapper.logicDelete(id);
	}

	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		mainProductMapper.logicDeleteByIds(ids);
	}

}
