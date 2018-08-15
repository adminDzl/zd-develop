package com.zshop.car.leaderorder.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.leaderorder.service.CarLeaderOrderService;
import com.zshop.car.leaderorder.entity.CarLeaderOrder;


/**
 * @Description: 用车订单领导关系表
 * @author: Administrator
 * @date: 2018-04-10 17:43:43
 */
@RestController
@RequestMapping("car/carleaderorder")
public class CarLeaderOrderController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CarLeaderOrderService carLeaderOrderService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<CarLeaderOrder> page,String searchKeys){
		ResultData result=new ResultData();
		carLeaderOrderService.list(result,page,searchKeys);

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
		carLeaderOrderService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(CarLeaderOrder entity){
		ResultData result=new ResultData();
		carLeaderOrderService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(CarLeaderOrder entity){
		ResultData result=new ResultData();
		carLeaderOrderService.updateSave(result,entity);
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
		carLeaderOrderService.findById(result,id);
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
		carLeaderOrderService.deleteById(result,id);
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
		carLeaderOrderService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
