package com.zshop.car.driver.service.impl;

import java.util.*;

import com.zshop.car.CarConstant;
import com.zshop.core.log.LogUtil;

import com.zshop.core.security.SessionUtil;
import com.zshop.core.util.CCUUID;
import com.zshop.feign.UserPrimissionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.util.CCStringUtils;
import com.github.pagehelper.PageHelper;
import com.zshop.core.base.controller.ResultData;

import com.zshop.car.driver.dao.mapper.CarDriverMapper;
import com.zshop.car.driver.entity.CarDriver;
import com.zshop.car.driver.service.CarDriverService;

/**
 * @Description: 司机信息表
 * @author: Administrator
 * @date: 2018-04-19 10:39:19
 */
@Service
public class CarDriverServiceImpl extends BaseServiceImpl<CarDriver, String> implements CarDriverService {

    @SuppressWarnings("unused")
    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private CarDriverMapper carDriverMapper;

    @Autowired
    private UserPrimissionService userPrimissionService;

    @Override
    public BaseMapper<CarDriver, String> getMapper() {
        return carDriverMapper;
    }

    /**
     * 列表
     *
     * @param page
     */
    @Override
    public void list(ResultData result, Page<CarDriver> page, String searchKeys) {
        Map<String, Object> mapSql = new HashMap<String, Object>();
        mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        String parkId = SessionUtil.getParkId();
        mapSql.put("status1", "1");
        mapSql.put("parkId", parkId);


        PageHelper.startPage((int) page.getPageNo(), (int) page.getPageSize());
        List<CarDriver> list = carDriverMapper.list(mapSql);

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
            result.setData(carDriverMapper.findById(id));
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
    public void addSave(ResultData result, CarDriver entity) {

        // 添加司机先判断该用户是否存在司机记录
        Map<String, Object> sqlMap = new HashMap<String, Object>();
        sqlMap.put("userId", entity.getUserId());
        CarDriver carDriver = carDriverMapper.findOneByMap(sqlMap);

        if (null != carDriver) {
            result.setResult(false);
            result.setMessage("该用户已存在司机记录");
            return;
        }

        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();

        entity.setId(CCUUID.getUUID());
        entity.setParkId(parkId);

        entity.setCreateBy(userId);
        entity.setCreateTime(new Date());
        entity.setRunNumber(0);
        entity.setOffsiteCount(0);
        entity.setStatus1("1");

        carDriverMapper.insert(entity);
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
    public void updateSave(ResultData result, CarDriver entity) {
        carDriverMapper.updateWithIf(entity);
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
        CarDriver entity = carDriverMapper.findById(id);
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
        carDriverMapper.logicDelete(id);
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
        carDriverMapper.logicDeleteByIds(ids);
    }

    /**
     * 查询司机列表
     *
     * @param result
     * @return
     */
    @Override
    public void driverList(ResultData result) {
        // 查询当前用户是否拥有权限查询司机信息
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();

        // 车辆类型集合
        List<String> carTypeList = new ArrayList<>();

        if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH)) {
            // 拥有小车权限则查询小车司机
            carTypeList.add("1");
        }
        if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {
            // 拥有中巴权限则查询小车司机
            carTypeList.add("2");
        }
        /**这块考虑做成配置，例如后面添加大巴或其他车辆类型的时候又要改代码**/

        Map<String, Object> mapSql = new HashMap<String, Object>();
        //mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        mapSql.put("carTypeList", carTypeList);
        mapSql.put("parkId", parkId);
        mapSql.put("status1", "1");

        List<CarDriver> list = carDriverMapper.list(mapSql);

        Map<String, Object> map = new HashMap<String, Object>();

        List<Map<String, Object>> smallCarList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> midCarList = new ArrayList<Map<String, Object>>();

        for (CarDriver carDriver : list) {

            if ("1".equals(carDriver.getCarType())) {

                // 小车司机集合
                Map<String, Object> driverMap = new HashMap<String, Object>();

                driverMap.put("driverId", carDriver.getId());
                driverMap.put("driverName", carDriver.getDriverName());
                driverMap.put("driverPhone", carDriver.getDriverPhone());
                driverMap.put("carNumber", carDriver.getCarNumber());
                driverMap.put("carType", carDriver.getCarType());
                driverMap.put("driverStatus", carDriver.getDriverStatus());
                smallCarList.add(driverMap);

            } else {

                // 中巴司机集合

                Map<String, Object> midMap = new HashMap<String, Object>();

                Map<String, Object> driverMap = new HashMap<String, Object>();
                driverMap.put("driverId", carDriver.getId());
                driverMap.put("driverName", carDriver.getDriverName());
                driverMap.put("driverPhone", carDriver.getDriverPhone());
                driverMap.put("carNumber", carDriver.getCarNumber());
                driverMap.put("carType", carDriver.getCarType());
                driverMap.put("driverStatus", carDriver.getDriverStatus());
                midCarList.add(driverMap);
            }
        }

        map.put("smallCarList", smallCarList);
        map.put("midCarList", midCarList);

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
