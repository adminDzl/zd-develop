package com.zshop.car.duty.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.car.duty.service.DutyInfoService;
import com.zshop.car.duty.entity.DutyInfo;


/**
 * @Description: 职务信息表
 * @author: Administrator
 * @date: 2018-04-28 21:19:02
 */
@RestController
@RequestMapping("car/dutyinfo")
public class DutyInfoController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private DutyInfoService dutyInfoService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<DutyInfo> page,String searchKeys){
		ResultData result=new ResultData();
		dutyInfoService.list(result,page,searchKeys);

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
		dutyInfoService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(DutyInfo entity){
		ResultData result=new ResultData();
		dutyInfoService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(DutyInfo entity){
		ResultData result=new ResultData();
		dutyInfoService.updateSave(result,entity);
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
		dutyInfoService.findById(result,id);
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
		dutyInfoService.deleteById(result,id);
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
		dutyInfoService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
