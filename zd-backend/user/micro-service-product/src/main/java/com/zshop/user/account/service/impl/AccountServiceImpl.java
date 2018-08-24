package com.zshop.user.account.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zshop.core.log.LogUtil;

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

import com.zshop.user.account.dao.mapper.AccountMapper;
import com.zshop.user.account.entity.Account;
import com.zshop.user.account.service.AccountService;

/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:23:23
 */
@Service
public class AccountServiceImpl extends BaseServiceImpl<Account, Integer> implements AccountService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private AccountMapper accountMapper;
	
	@Override
	public BaseMapper<Account, Integer> getMapper(){
		return accountMapper;
	}
	
	/**
	 * 列表
	 * @param request
	 * @param response
	 * @param page
	 */
	public void list(ResultData result,Page<Account> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<Account> list = accountMapper.list(mapSql);
		
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
			result.setData(accountMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,Account entity){
		accountMapper.insert(entity);
	}
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,Account entity){
		accountMapper.updateWithIf(entity);
	}

	/**
	 * ��情
	 * @param request
	 * @param result
	 * @param id
	 */
	public void findById(ResultData result,Integer id){
		Account entity=accountMapper.findById(id);
		result.setData(entity);
	}
	
	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param id
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,Integer id){
		accountMapper.logicDelete(id);
	}
	
	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,Integer[] ids){
		accountMapper.logicDeleteByIds(ids);
	}

}
