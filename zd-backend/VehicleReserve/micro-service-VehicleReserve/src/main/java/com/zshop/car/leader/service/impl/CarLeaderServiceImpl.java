package com.zshop.car.leader.service.impl;

import com.github.pagehelper.PageHelper;
import com.zshop.car.CarConstant;
import com.zshop.car.leader.dao.mapper.CarLeaderMapper;
import com.zshop.car.leader.entity.CarLeader;
import com.zshop.car.leader.service.CarLeaderService;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.log.LogUtil;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.security.SessionUtil;
import com.zshop.core.util.CCStringUtils;
import com.zshop.core.util.CCUUID;
import com.zshop.feign.UserPrimissionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @Description: 领导信息表
 * @author: Administrator
 * @date: 2018-04-28 21:39:17
 */
@Service
public class CarLeaderServiceImpl extends BaseServiceImpl<CarLeader, String> implements CarLeaderService {

    @SuppressWarnings("unused")
    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private CarLeaderMapper carLeaderMapper;

    @Autowired
    private UserPrimissionService userPrimissionService;

    @Override
    public BaseMapper<CarLeader, String> getMapper() {
        return carLeaderMapper;
    }

    /**
     * 列表
     *
     * @param page
     */
    @Override
    public void list(ResultData result, Page<CarLeader> page, CarLeader entity, String searchKeys) {
        Map<String, Object> mapSql = new HashMap<String, Object>();
        mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        mapSql.put("status1",entity.getStatus1());
        String parkId = SessionUtil.getParkId();
        mapSql.put("pakeId", parkId);

        PageHelper.startPage((int) page.getPageNo(), (int) page.getPageSize());
        List<CarLeader> list = carLeaderMapper.list(mapSql);

        PageUtil.setPageInfo(page, list);
        page.setRows(list);

        result.setMapData("page", page);

    }

    /**
     * 新增/修改初始化
     *
     * @param request
     * @param result
     * @param entity
     */
    @Override
    public void init(ResultData result, String id) {

        if (StringUtils.isNotBlank(id)) {
            result.setData(carLeaderMapper.findById(id));
        }
    }

    /**
     * 添加保存
     *
     * @param request
     * @param result
     * @param entity
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void addSave(ResultData result, CarLeader entity) {

        // 添加判断该用户是否有领导记录
//        Map<String,Object> sqlMap = new HashMap<String,Object>();
//        sqlMap.put("userId",entity.getUserId());
//
//        CarLeader carLeader = carLeaderMapper.findOneByMap(sqlMap);
//
//        if(null!=carLeader){
//            result.setResult(false);
//            result.setMessage("该用户已存在领导记录");
//            return;
//        }

        entity.setId(CCUUID.getUUID());
        entity.setParkId(SessionUtil.getParkId());

        entity.setCreateBy(SessionUtil.getLoginUserId());
        entity.setCreateTime(new Date());
        entity.setStatus1("1");

        carLeaderMapper.insert(entity);
    }

    /**
     * 修改保存
     *
     * @param request
     * @param result
     * @param entity
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateSave(ResultData result, CarLeader entity) {
        carLeaderMapper.updateWithIf(entity);
    }

    /**
     * 详情
     *
     * @param request
     * @param result
     * @param id
     */
    @Override
    public void findById(ResultData result, String id) {
        CarLeader entity = carLeaderMapper.findById(id);
        result.setData(entity);
    }

    /**
     * 根据id删除
     *
     * @param request
     * @param result
     * @param id
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteById(ResultData result, String id) {
        carLeaderMapper.logicDelete(id);
    }

    /**
     * 根据ids删除
     *
     * @param request
     * @param result
     * @param ids
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteByIds(ResultData result, String[] ids) {
        carLeaderMapper.logicDeleteByIds(ids);
    }


    /**
     * 查询领导人列表
     *
     * @param result
     * @return
     */
    @Override
    public void leaderList(ResultData result, String searchKeys) {
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();
        Map<String, Object> mapSql = new HashMap<String, Object>();
        //mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        mapSql.put("status1","1");
        mapSql.put("parkId",parkId);

        // 判断当前用户是否拥有权限
        if (!checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_APPLY)) {
            result.setMessage("该用户没有申请用车权限");
            result.setResult(false);
            return;
        }

        List<CarLeader> list = carLeaderMapper.list(mapSql);

        Map<String, Object> map = new LinkedHashMap<>();
        if (null != list && list.size() > 0) {
            for (CarLeader leader : list) {
                if (!map.containsKey(leader.getLeaderDuty())) {
                    List<Map<String, Object>> leaderNameList = new ArrayList<>();

                    Map<String, Object> leaderMap = new HashMap<String, Object>();
                    leaderMap.put("id", leader.getId());
                    leaderMap.put("leaderName", leader.getLeaderName());

                    leaderNameList.add(leaderMap);

                    map.put(leader.getLeaderDuty(), leaderNameList);

                } else {
                    List<Map<String, Object>> leaderNameList = (List<Map<String, Object>>) map.get(leader.getLeaderDuty());

                    Map<String, Object> leaderMap = new HashMap<String, Object>();
                    leaderMap.put("id", leader.getId());
                    leaderMap.put("leaderName", leader.getLeaderName());

                    leaderNameList.add(leaderMap);
                    map.put(leader.getLeaderDuty(), leaderNameList);

                }
            }
        }
        result.setData(map);
    }

    /**
     * 判断当前用户是否拥有权限
     *
     * @param userId
     * @param parkId
     * @param permission
     * @return 有权限返回true，无权限返回false
     */
    public boolean checkPrivs(String userId, String parkId, String permission) {

        boolean flag = false;

        // 获取当前用户权限
        Set<String> userPrivs = userPrimissionService.userPrivs();

        if (null != userPrivs && userPrivs.contains(permission)) {
            flag = true;
        }
        return flag;
    }
}
