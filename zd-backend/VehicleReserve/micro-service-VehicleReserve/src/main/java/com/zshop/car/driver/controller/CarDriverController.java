package com.zshop.car.driver.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.driver.service.CarDriverService;
import com.zshop.car.driver.entity.CarDriver;


/**
 * @Description: 司机信息表
 * @author: Administrator
 * @date: 2018-04-19 10:39:19
 */
@RestController
@RequestMapping("car/cardriver")
public class CarDriverController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CarDriverService carDriverService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<CarDriver> page,String searchKeys){
		ResultData result=new ResultData();
		carDriverService.list(result,page,searchKeys);

		return result;
	}

	/**
	 * 新增/修改初始化
	 * @param id
	 * @return
	 */
	@GetMapping(value="/init")
	public ResultData init(String id){
		ResultData result=new ResultData();
		carDriverService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(CarDriver entity){
		ResultData result=new ResultData();
		carDriverService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(CarDriver entity){
		ResultData result=new ResultData();
		carDriverService.updateSave(result,entity);
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
		carDriverService.findById(result,id);
		return result;
	}
	
	/**
	 * 根据id删除
	 * @param id
	 * @return
	 */
	@PostMapping(value="/deleteById")
	public ResultData deleteById(String id){		
		ResultData result=new ResultData();
		carDriverService.deleteById(result,id);
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
		carDriverService.deleteByIds(result,splitIds);
		return result;
	}

	/**
	 * 查询司机信息
	 * @return
	 */
	@GetMapping(value = "/driverList")
	public ResultData driverList(){

		ResultData result=new ResultData();

		carDriverService.driverList(result);

		return result;
	}

	/**
	 * 新增/修改初始化
	 * @param id
	 * @return
	 */
	@GetMapping(value="/initEdit")
	public ResultData initEdit(String id){
		ResultData result=new ResultData();
		carDriverService.init(result,id);
		return result;
	}

}
