package com.zshop.car.leader.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.leader.service.CarLeaderService;
import com.zshop.car.leader.entity.CarLeader;


/**
 * @Description: 领导信息表
 * @author: Administrator
 * @date: 2018-04-28 21:39:17
 */
@RestController
@RequestMapping("car/carleader")
public class CarLeaderController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CarLeaderService carLeaderService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<CarLeader> page,CarLeader entity,String searchKeys){
		ResultData result=new ResultData();
		carLeaderService.list(result,page,entity,searchKeys);

		return result;
	}

	/**
	 * 新增/修改初始化
	 * @param entity
	 * @return
	 */
	@GetMapping(value="/init")
	public ResultData init(String id){
		ResultData result=new ResultData();
		carLeaderService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(CarLeader entity){
		ResultData result=new ResultData();
		carLeaderService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(CarLeader entity){
		ResultData result=new ResultData();
		carLeaderService.updateSave(result,entity);
		return result;
	}
	
	/**
	 * 详情
	 * @param id
	 * @return
	 */
	@GetMapping(value="/findById")
	public ResultData findById(String id){		
		ResultData result=new ResultData();
		carLeaderService.findById(result,id);
		return result;
	}
	
	/**
	 * 根据id删除
	 * @param ids
	 * @return
	 */
	@PostMapping(value="/deleteById")
	public ResultData deleteById(String id){		
		ResultData result=new ResultData();
		carLeaderService.deleteById(result,id);
		return result;
	}
	/**
	 * 根据ids删除
	 * @param ids
	 * @return
	 */
	@PostMapping(value="/deleteByIds")
	public ResultData deleteByIds(String ids){		
		ResultData result=new ResultData();
		String[] splitIds=CCStringUtils.splitToString(ids," ");		
		carLeaderService.deleteByIds(result,splitIds);
		return result;
	}

	/**
	 * 查询领导人列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/leaderList")
	public ResultData leaderList(String searchKeys){
		ResultData result=new ResultData();
		carLeaderService.leaderList(result,searchKeys);

		return result;
	}

}
