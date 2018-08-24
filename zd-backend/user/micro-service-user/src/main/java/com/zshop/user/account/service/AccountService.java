package com.zshop.user.account.service;


import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.service.BaseService;
import com.zshop.core.page.Page;
import com.zshop.user.account.entity.Account;

/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:27:41
 */
public interface AccountService extends BaseService<Account, Integer> {

	/**
	 * 列表
	 * @param result
	 * @param page
	 * @param searchKeys
	 */
	void list(ResultData result, Page<Account> page,String searchKeys);

	/**
	 * 新增/修改初始化
	 * @param result
	 * @param id
	 */
	void init(ResultData result,Integer id);

	/**
	 * 添加保存
	 * @param result
	 * @param entity
	 */
	void addSave(ResultData result, Account entity);

	/**
	 * 修改保存
	 * @param result
	 * @param entity
	 */
	void updateSave(ResultData result, Account entity);

	/**
	 * 详情
	 * @param result
	 * @param id
	 */
	void findById( ResultData result, Integer id);

	/**
	 * 根据ids删除
	 * @param result
	 * @param ids
	 */
	void deleteByIds(ResultData result, Integer[] ids);

	/**
	 * 根据id删除
	 * @param result
	 * @param id
	 */
	void deleteById(ResultData result, Integer id);

	/**
	 * 验证账号密码
	 * @param resultData
	 * @param account
	 */
	void verifyAccount(ResultData resultData,Account account);
}
