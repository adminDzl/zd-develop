package com.zshop.user.account.dao.mapper;

import com.zshop.user.account.entity.Account;
import com.zshop.core.base.mapper.BaseMapper;

/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:27:41
 */
public interface AccountMapper extends BaseMapper<Account,Integer>{

    Account findAccountByAccountAndPassword(Account account);
}
