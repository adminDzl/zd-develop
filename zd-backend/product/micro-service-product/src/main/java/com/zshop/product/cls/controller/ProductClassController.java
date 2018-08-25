package com.zshop.product.cls.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.product.cls.service.ProductClassService;
import com.zshop.product.cls.entity.ProductClass;


/**
 * @Description: 商品类别
 * @author: Enzo
 * @date: 2018-08-25 11:03:17
 */
@RestController
@RequestMapping("product/productclass")
public class ProductClassController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductClassService productClassService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<ProductClass> page,String searchKeys){
		ResultData result=new ResultData();
		productClassService.list(result,page,searchKeys);

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
		productClassService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(ProductClass entity){
		ResultData result=new ResultData();
		productClassService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(ProductClass entity){
		ResultData result=new ResultData();
		productClassService.updateSave(result,entity);
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
		productClassService.findById(result,id);
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
		productClassService.deleteById(result,id);
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
		Integer[] splitIds=CCStringUtils.splitToInteger(ids,",");
		productClassService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
