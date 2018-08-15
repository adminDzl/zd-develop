package com.zshop.car.duty.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zshop.core.log.LogUtil;

import com.zshop.core.security.SessionUtil;
import com.zshop.core.util.CCUUID;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import com.github.pagehelper.PageHelper;
import com.zshop.core.base.controller.ResultData;

import com.zshop.car.duty.dao.mapper.DutyInfoMapper;
import com.zshop.car.duty.entity.DutyInfo;
import com.zshop.car.duty.service.DutyInfoService;

/**
 * @Description: 职务信息表
 * @author: Administrator
 * @date: 2018-04-28 21:19:02
 */
@Service
public class DutyInfoServiceImpl extends BaseServiceImpl<DutyInfo, String> implements DutyInfoService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private DutyInfoMapper dutyInfoMapper;
	
	@Override
	public BaseMapper<DutyInfo, String> getMapper(){
		return dutyInfoMapper;
	}
	
	/**
	 * 列表
	 * @param request
	 * @param response
	 * @param page
	 */
	@Override
	public void list(ResultData result, Page<DutyInfo> page, String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

		String parkId = SessionUtil.getParkId();
		mapSql.put("pakeId", parkId);
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<DutyInfo> list = dutyInfoMapper.list(mapSql);
		
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
	@Override
	public void init(ResultData result, String id){
		
		if(StringUtils.isNotBlank(id)) {
			result.setData(dutyInfoMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,DutyInfo entity){


		entity.setId(CCUUID.getUUID());
		entity.setDutyStatus("1");
		entity.setParkId(SessionUtil.getParkId());
		entity.setCreateBy(SessionUtil.getLoginUserId());
		entity.setCreateTime(new Date());

		dutyInfoMapper.insert(entity);
	}
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,DutyInfo entity){
		dutyInfoMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 */
	@Override
	public void findById(ResultData result, String id){
		DutyInfo entity=dutyInfoMapper.findById(id);
		result.setData(entity);
	}
	
	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param id
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,String id){
		dutyInfoMapper.logicDelete(id);
	}
	
	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,String[] ids){
		dutyInfoMapper.logicDeleteByIds(ids);
	}

}
