	package com.zshop.common.order.service.impl;

	import com.github.pagehelper.PageHelper;
	import com.zshop.common.order.dao.mapper.CommOrderMapper;
	import com.zshop.common.order.entity.CommOrder;
	import com.zshop.common.order.service.CommOrderService;
	import com.zshop.core.base.controller.ResultData;
	import com.zshop.core.base.mapper.BaseMapper;
	import com.zshop.core.base.service.impl.BaseServiceImpl;
	import com.zshop.core.log.LogUtil;
	import com.zshop.core.page.Page;
	import com.zshop.core.page.PageUtil;
	import com.zshop.core.util.CCStringUtils;
	import org.apache.commons.lang3.StringUtils;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	import org.springframework.transaction.annotation.Propagation;
	import org.springframework.transaction.annotation.Transactional;

	import java.util.HashMap;
	import java.util.List;
	import java.util.Map;

/**
 * @Description: 订单总表
 * @author: Administrator
 * @date: 2018-04-20 17:04:44
 */
@Service
public class CommOrderServiceImpl extends BaseServiceImpl<CommOrder, String> implements CommOrderService{

	@SuppressWarnings("unused")
	private final LogUtil logger = LogUtil.getLogger(this.getClass());
	
	@Autowired
	private CommOrderMapper commOrderMapper;


	@Override
	public BaseMapper<CommOrder, String> getMapper(){
		return commOrderMapper;
	}
	
	/**
	 * 列表
	 * @param request
	 * @param response
	 * @param page
	 */
	public void list(ResultData result,Page<CommOrder> page,String searchKeys){
		Map<String, Object> mapSql=new HashMap<String, Object>();
		mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
		
		PageHelper.startPage((int)page.getPageNo(), (int)page.getPageSize());
		List<CommOrder> list = commOrderMapper.list(mapSql);
		
		PageUtil.setPageInfo(page, list);
		page.setRows(list);

		result.setMapData("page", page);
		
	}

	/**
	 * 新增/修改初始化
	 * @param request
	 * @param result
	 * @param entity
	 */
	public void init(ResultData result,String id){
		
		if(StringUtils.isNotBlank(id)) {
			result.setData(commOrderMapper.findById(id));
		}
	}

	/**
	 * 添加保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void addSave(ResultData result,CommOrder entity){
		commOrderMapper.insert(entity);
	}
	
	/**
	 * 修改保存
	 * @param request
	 * @param result
	 * @param entity
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void updateSave(ResultData result,CommOrder entity){
		commOrderMapper.updateWithIf(entity);
	}

	/**
	 * 详情
	 * @param request
	 * @param result
	 * @param id
	 */
	public void findById(ResultData result,String id){
		CommOrder entity=commOrderMapper.findById(id);
		result.setData(entity);
	}
	
	/**
	 * 根据id删除
	 * @param request
	 * @param result
	 * @param id
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteById(ResultData result,String id){
		commOrderMapper.logicDelete(id);
	}
	
	/**
	 * 根据ids删除
	 * @param request
	 * @param result
	 * @param ids
	 */
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void deleteByIds(ResultData result,String[] ids){
		commOrderMapper.logicDeleteByIds(ids);
	}

}
