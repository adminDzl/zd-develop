package com.zshop.product.attrval.controller;


import com.zshop.core.log.LogUtil;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import com.zshop.product.attrval.service.ProductAttrValueService;
import com.zshop.product.attrval.entity.ProductAttrValue;


/**
 * @Description: 商品规格属性
 * @author: Enzo
 * @date: 2018-08-19 19:36:58
 */
@RestController
@RequestMapping("product/productattrvalue")
public class ProductAttrValueController{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ProductAttrValueService productAttrValueService;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<ProductAttrValue> page,String searchKeys){
		ResultData result=new ResultData();
		productAttrValueService.list(result,page,searchKeys);

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
		productAttrValueService.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(ProductAttrValue entity){
		ResultData result=new ResultData();
		productAttrValueService.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(ProductAttrValue entity){
		ResultData result=new ResultData();
		productAttrValueService.updateSave(result,entity);
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
		productAttrValueService.findById(result,id);
		return result;
	}

	/**
	 * 详情
	 * @param
	 * @return
	 */
	@GetMapping(value="/findByAttrId")
	public ResultData findByAttrId(Integer attrId){
		ResultData result=new ResultData();
		productAttrValueService.findByAttrId(result,attrId);
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
		productAttrValueService.deleteById(result,id);
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
//		productAttrValueService.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
