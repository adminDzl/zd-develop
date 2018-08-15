package com.zshop.product.main.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.product.main.service.MainProductService;
import com.zshop.product.main.entity.MainProduct;


/**
 * @Description: 商品主表
 * @author: Enzo
 * @date: 2018-08-12 19:19:27
 */
@RestController
@RequestMapping("product/main")
public class MainProductController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private MainProductService mainProductService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<MainProduct> page,String searchKeys){
		ResultData result=new ResultData();
		mainProductService.list(result,page,searchKeys);

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
		mainProductService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(MainProduct entity){
		ResultData result=new ResultData();
		mainProductService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(MainProduct entity){
		ResultData result=new ResultData();
		mainProductService.updateSave(result,entity);
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
		mainProductService.findById(result,id);
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
		mainProductService.deleteById(result,id);
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
//		mainProductService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
