package ##{srcPack}##.controller;


import com.zshop.core.log.LogUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.base.controller.ResultData;
import com.zshop.core.page.Page;
import com.zshop.core.util.CCStringUtils;
import ##{srcPack}##.service.##{domainObjectName}##Service;
import ##{srcPack}##.entity.##{domainObjectName}##;


/**
 * @Description: ##{description}##
 * @author: ##{author}##
 * @date: ##{date}##
 */
@RestController
@RequestMapping("/##{requestMappingName}##")
public class ##{domainObjectName}##Controller{
	
	private final  LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private ##{domainObjectName}##Service ##{firstLowerDomainObjectName}##Service;
	
	/**
	 * 列表
	 * @param page
	 * @param searchKeys
	 * @return
	 */
	@GetMapping(value="/list")
	public ResultData list(Page<##{domainObjectName}##> page,String searchKeys){
		ResultData result=new ResultData();
		##{firstLowerDomainObjectName}##Service.list(result,page,searchKeys);

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
		##{firstLowerDomainObjectName}##Service.init(result,id);
		return result;
	}
	
	/**
	 * 添加保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/addSave")
	public ResultData addSave(##{domainObjectName}## entity){
		ResultData result=new ResultData();
		##{firstLowerDomainObjectName}##Service.addSave(result,entity);
		return result;
	}
	
	/**
	 * 修改保存
	 * @param entity
	 * @return
	 */
	@PostMapping(value="/updateSave")
	public ResultData updateSave(##{domainObjectName}## entity){
		ResultData result=new ResultData();
		##{firstLowerDomainObjectName}##Service.updateSave(result,entity);
		return result;
	}
	
	/**
	 * 详情
	 * @param id
	 * @return
	 */
	@GetMapping(value="/findById")
	public ResultData findById(##{tablePrimaryKeyType}## id){		
		ResultData result=new ResultData();
		##{firstLowerDomainObjectName}##Service.findById(result,id);
		return result;
	}
	
	/**
	 * 根据id删除
	 * @param ids
	 * @return
	 */
	@PostMapping(value="/deleteById")
	public ResultData deleteById(##{tablePrimaryKeyType}## id){		
		ResultData result=new ResultData();
		##{firstLowerDomainObjectName}##Service.deleteById(result,id);
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
		##{tablePrimaryKeyType}##[] splitIds=CCStringUtils.##{splitMethod}##(ids," ");		
		##{firstLowerDomainObjectName}##Service.deleteByIds(result,splitIds);
		return result;
	}
	
	

}
