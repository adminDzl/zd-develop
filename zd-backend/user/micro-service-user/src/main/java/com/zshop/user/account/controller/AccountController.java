package com.zshop.user.account.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.user.account.service.AccountService;
import com.zshop.user.account.entity.Account;


/**
 * @Description: 账号
 * @author: Enzo
 * @date: 2018-08-17 17:27:41
 */
@RestController
@RequestMapping("user/account")
public class AccountController {

    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private AccountService accountService;

    /**
     * 列表
     *
     * @param page
     * @param searchKeys
     * @return
     */
    @GetMapping(value = "/list")
    public ResultData list(Page<Account> page, String searchKeys) {
        ResultData result = new ResultData();
        accountService.list(result, page, searchKeys);

        return result;
    }

    /**
     * 新增/修改初始化
     *
     * @param id
     * @return
     */
    @GetMapping(value = "/init")
    public ResultData init(Integer id) {
        ResultData result = new ResultData();
        accountService.init(result, id);
        return result;
    }

    /**
     * 添加保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/addSave")
    public ResultData addSave(Account entity) {
        ResultData result = new ResultData();
        accountService.addSave(result, entity);
        return result;
    }

    /**
     * 修改保存
     *
     * @param entity
     * @return
     */
    @PostMapping(value = "/updateSave")
    public ResultData updateSave(Account entity) {
        ResultData result = new ResultData();
        accountService.updateSave(result, entity);
        return result;
    }

    /**
     * 详情
     *
     * @param id
     * @return
     */
    @GetMapping(value = "/findById")
    public ResultData findById(Integer id) {
        ResultData result = new ResultData();
        accountService.findById(result, id);
        return result;
    }

    /**
     * 根据id删除
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/deleteById")
    public ResultData deleteById(Integer id) {
        ResultData result = new ResultData();
        accountService.deleteById(result, id);
        return result;
    }

    /**
     * 根据ids删除
     *
     * @param ids
     * @return
     */
    @PostMapping(value = "/deleteByIds")
    public ResultData deleteByIds(String ids) {
        ResultData result = new ResultData();
//		Integer[] splitIds=CCStringUtils.splitToString(ids," ");
//		accountService.deleteByIds(result,splitIds);
        return result;
    }

    @RequestMapping(value = "/login")
    @ResponseBody
    public ResultData login(Account account) {
        ResultData result = new ResultData();
        Account tempAccount = new Account();
        tempAccount.setAccount(account.getAccount());
        tempAccount.setPassword(account.getPassword());
        accountService.verifyAccount(result, tempAccount);
        return result;
    }

}
