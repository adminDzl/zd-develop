package com.zshop.common.orderdetail.service.impl;

import com.github.pagehelper.PageHelper;
import com.zshop.common.orderdetail.dao.mapper.CommOrderDetailDataMapper;
import com.zshop.common.orderdetail.entity.CommOrderDetailData;
import com.zshop.common.orderdetail.service.CommOrderDetailDataService;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.log.LogUtil;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 订单操作流水表
 * @author: Administrator
 * @date: 2018-04-15 15:36:12
 */
@Service
public class CommOrderDetailDataServiceImpl extends BaseServiceImpl<CommOrderDetailData, String> implements CommOrderDetailDataService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CommOrderDetailDataMapper commOrderDetailDataMapper;
	
	@Override
	public BaseMapper<CommOrderDetailData, String> getMapper(){
		return commOrderDetailDataMapper;
	}
	
	/**
	 * 列表
	 * @param request
	 * @param response
	 * @param page
	 */
	public void list(ResultData result,Page<CommOrderDetailData> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<CommOrderDetailData> list = commOrderDetailDataMapper.list(mapSql);
		
		PageUtil.setPageInfo(page, list);
		page.setRows(list);

		result.setMapData("page", page);
		
	}

	/**
	 * 新增/修改初始化
	 * @param request
	 * @param result
	 * @param entity
	 */
	public void init(ResultData result,String id){
		
		if(StringUtils.isNotBlank(id)) {
			result.setData(commOrderDetailDataMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,CommOrderDetailData entity){
		commOrderDetailDataMapper.insert(entity);
	}
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,CommOrderDetailData entity){
		commOrderDetailDataMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 */
	public void findById(ResultData result,String id){
		CommOrderDetailData entity=commOrderDetailDataMapper.findById(id);
		result.setData(entity);
	}
	
	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param id
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,String id){
		commOrderDetailDataMapper.logicDelete(id);
	}
	
	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,String[] ids){
		commOrderDetailDataMapper.logicDeleteByIds(ids);
	}

}
