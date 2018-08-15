package com.zshop.ad.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.ad.service.AdDataService;
import com.zshop.ad.entity.AdData;


/**
 * @Description: 广告数据
 * @author: Enzo
 * @date: 2018-08-13 11:35:38
 */
@RestController
@RequestMapping("cms/addata")
public class AdDataController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private AdDataService adDataService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<AdData> page,String searchKeys){
		ResultData result=new ResultData();
		adDataService.list(result,page,searchKeys);
		return result;
	}

	/**
	 * 新增/修改初始化
	 * @param id
	 * @return
	 */
	@GetMapping(value="/init")
	public ResultData init(Integer id){
		ResultData result=new ResultData();
		adDataService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(AdData entity){
		ResultData result=new ResultData();
		adDataService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(AdData entity){
		ResultData result=new ResultData();
		adDataService.updateSave(result,entity);
		return result;
	}
	
	/**
	 * 详情
	 * @param id
	 * @return
	 */
	@GetMapping(value="/findById")
	public ResultData findById(Integer id){		
		ResultData result=new ResultData();
		adDataService.findById(result,id);
		return result;
	}
	
	/**
	 * 根据id删除
	 * @param id
	 * @return
	 */
	@PostMapping(value="/deleteById")
	public ResultData deleteById(Integer id){		
		ResultData result=new ResultData();
		adDataService.deleteById(result,id);
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
//		Integer[] splitIds=CCStringUtils.splitToString(ids," ");
//		adDataService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
