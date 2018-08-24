package com.zshop.product.attr.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.product.attr.service.ProductAttrService;
import com.zshop.product.attr.entity.ProductAttr;

import javax.servlet.http.HttpServletRequest;


/**
 * @Description: 商品规格
 * @author: Enzo
 * @date: 2018-08-23 14:15:06
 */
@RestController
@RequestMapping("product/productattr")
public class ProductAttrController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductAttrService productAttrService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<ProductAttr> page,String searchKeys){
		ResultData result=new ResultData();
		productAttrService.list(result,page,searchKeys);

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
		productAttrService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(ProductAttr entity, HttpServletRequest request){
		ResultData result=new ResultData();
		productAttrService.addSave(result,entity,request);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(ProductAttr entity,HttpServletRequest request){
		ResultData result=new ResultData();
		productAttrService.updateSave(result,entity,request);
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
		productAttrService.findById(result,id);
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
		productAttrService.deleteById(result,id);
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
		productAttrService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
