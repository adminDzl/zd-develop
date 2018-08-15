package com.zshop.car.reception.service.impl;

import java.util.*;

import javax.annotation.Resource;

import com.zshop.car.CarConstant;
import com.zshop.car.driver.dao.mapper.CarDriverMapper;
import com.zshop.car.driver.entity.CarDriver;
import com.zshop.car.order.dao.mapper.CarOrderMapper;
import com.zshop.car.order.entity.CarOrder;
import com.zshop.common.order.dao.mapper.CommOrderMapper;
import com.zshop.common.order.entity.CommOrder;
import com.zshop.common.orderdetail.dao.mapper.CommOrderDetailDataMapper;
import com.zshop.common.orderdetail.entity.CommOrderDetailData;
import com.zshop.core.log.LogUtil;

import com.zshop.core.security.SessionUtil;
import com.zshop.core.util.CCJsonUtil;
import com.zshop.core.util.CCUUID;
import com.zshop.feign.CommonPrimissionService;
import com.zshop.feign.PushMessageService;
import com.zshop.feign.UserPrimissionService;
import com.zshop.webapp.config.base.SystemConfig;
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

import com.zshop.car.reception.dao.mapper.CarReceptionMapper;
import com.zshop.car.reception.entity.CarReception;
import com.zshop.car.reception.service.CarReceptionService;

/**
 * @Description: 订单派单表
 * @author: Administrator
 * @date: 2018-04-10 17:44:39
 */
@Service
public class CarReceptionServiceImpl extends BaseServiceImpl<CarReception, String> implements CarReceptionService {

    @SuppressWarnings("unused")
    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private UserPrimissionService userPrimissionService;

    @Autowired
    private CarReceptionMapper carReceptionMapper;

    @Autowired
    private CarOrderMapper carOrderMapper;

    @Autowired
    private CommOrderMapper commOrderMapper;

    @Autowired
    private CommOrderDetailDataMapper commOrderDetailDataMapper;

    @Autowired
    private CarDriverMapper carDriverMapper;

    @Autowired
    private PushMessageService pushMessageService;

    @Autowired
    @Resource(name = "carSystemConfig")
    private SystemConfig systemConfig;

    @Override
    public BaseMapper<CarReception, String> getMapper() {
        return carReceptionMapper;
    }


    @Autowired
    private CommonPrimissionService commonPrimissionService;

    /**
     * 列表
     *
     * @param page
     */
    public void list(ResultData result, Page<CarReception> page, String searchKeys) {
        Map<String, Object> mapSql = new HashMap<String, Object>();
        mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        PageHelper.startPage((int) page.getPageNo(), (int) page.getPageSize());
        List<CarReception> list = carReceptionMapper.list(mapSql);

        PageUtil.setPageInfo(page, list);
        page.setRows(list);

        result.setMapData("page", page);

    }

    /**
     * 新增/修改初始化
     *
     * @param result
     */
    public void init(ResultData result, String id) {

        if (StringUtils.isNotBlank(id)) {
            result.setData(carReceptionMapper.findById(id));
        }
    }

    /**
     * 添加保存
     *
     * @param result
     * @param entity
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void addSave(ResultData result, CarReception entity) {
        carReceptionMapper.insert(entity);
    }

    /**
     * 修改保存
     *
     * @param result
     * @param entity
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateSave(ResultData result, CarReception entity) {
        carReceptionMapper.updateWithIf(entity);
    }

    /**
     * 详情
     *
     * @param result
     * @param id
     */
    public void findById(ResultData result, String id) {
        CarReception entity = carReceptionMapper.findById(id);
        result.setData(entity);
    }

    /**
     * 根据id删除
     *
     * @param result
     * @param id
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteById(ResultData result, String id) {
        carReceptionMapper.logicDelete(id);
    }

    /**
     * 根据ids删除
     *
     * @param result
     * @param ids
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteByIds(ResultData result, String[] ids) {
        carReceptionMapper.logicDeleteByIds(ids);
    }

    /**
     * 车辆调度员派车、改派
     *
     * @param orderId 订单id
     */
    @Override
    public void addListSave(ResultData result, String driverList, String orderId) {

        // 获取用户资料
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();
        String userName = SessionUtil.getLoginUserName();

        // 司机信息列表
        Map<String, Object> driverListMap = CCJsonUtil.jsonToMap(driverList);

        if (null != driverListMap && driverListMap.size() > 0) {

            // 查询订单状态，判断当前订单是否可以接单
            CarOrder carOrder = carOrderMapper.findById(orderId);

            // 调度员派单只允许 已审核和已派单状态的订单
            if (null == carOrder) {
                result.setMessage("该订单为空");
                result.setResult(false);
                return;
            }

            // 正常状态为 已审批和已派单状态才允许派单和改单
            if (CarConstant.ORDER_STATUS_1.equals(carOrder.getOrderStatus()) || CarConstant.ORDER_STATUS_3.equals(carOrder.getOrderStatus())) {

                String type2 = "2";

                // 根据订单id、当前登陆用户，查询派单记录，存在派单记录为改派
                Map<String, Object> mapSql = new HashMap<String, Object>();
                mapSql.put("orderId", orderId);
                mapSql.put("operationId", userId);
//                mapSql.put("status1","1");

                List<CarReception> list = carReceptionMapper.findListByMap(mapSql);


                // 判断所选司机是否超过订单车辆数量
                int smallCarCount = 0;
                int midCarCount = 0;
                if (null != carOrder.getSmallCarNum()) {
                    smallCarCount = carOrder.getSmallCarNum();
                }
                if (null != carOrder.getMidCarNum()) {
                    midCarCount = carOrder.getMidCarNum();
                }
                List<Map<String, String>> mapList = (List<Map<String, String>>) driverListMap.get("driverList");
                // 解析司机是否为空
                if(mapList.size() < 1){
                    result.setMessage("请至少选择一个司机");
                    result.setResult(false);
                    return;
                }

                int smallDriver = 0;
                int midDriver = 0;
                for (Map<String, String> driverMap : mapList) {

                    String carType = null;
                    if (StringUtils.isNotBlank(driverMap.get("carType"))) {
                        carType = driverMap.get("carType").toString();
                    }

                    if ("1".equals(carType)) {
                        smallDriver++;
                    } else {
                        midDriver++;
                    }
                }

                if (smallDriver > 0 && smallDriver != smallCarCount) {
                    result.setResult(false);
                    result.setMessage("当前订单小车数量为" + smallCarCount + "，你选择的小车司机数量为" + smallDriver);
                    return;
                }
                if (midDriver > 0 && midDriver != midCarCount) {
                    result.setResult(false);
                    result.setMessage("当前订单中巴数量为" + midCarCount + "，你选择的中巴司机数量为" + midDriver );
                    return;
                }

                if (null != list && list.size() > 0) {
                    // 改派
                    type2 = "3";

                    // 原派单司机id集合
                    List<String> oldDriverIdList = new ArrayList<>();
                    // 改派单司机id集合
                    List<String> driverIdList = new ArrayList<>();
                    // 原派单司机和改派单司机里的集合
                    List<String> updateDriverIdList = new ArrayList<>();
                    for (CarReception carReception : list) {
                        oldDriverIdList.add(carReception.getCarDriverId());
                    }

                    //List<Map<String, String>> mapList = (List<Map<String, String>>) driverListMap.get("driverList");

                    for (int i = 0; i < driverListMap.size(); i++) {

                        // 多个司机生成多个订单与司机关系记录
                        for (Map<String, String> driverMap : mapList) {
                            String driverId = null;
                            String driverName = null;
                            String driverPhone = null;
                            String carNumber = null;
                            String carType = null;
                            if (StringUtils.isNotBlank(driverMap.get("driverId"))) {
                                driverId = driverMap.get("driverId").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("driverName"))) {
                                driverName = driverMap.get("driverName").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("driverPhone"))) {
                                driverPhone = driverMap.get("driverPhone").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("carNumber"))) {
                                carNumber = driverMap.get("carNumber").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("carType"))) {
                                carType = driverMap.get("carType").toString();
                            }

                            driverIdList.add(driverId);
                            /********* 添加新的司机接单记录 end *********/
                            if (!oldDriverIdList.contains(driverId)) {
                                CarReception entity = new CarReception();

                                entity.setId(CCUUID.getUUID());
                                entity.setParkId(carOrder.getParkId());
                                entity.setOrderId(orderId);
                                entity.setOperationId(userId);
                                entity.setCarDriverId(driverMap.get("driverId").toString());
                                entity.setDriverName(driverMap.get("driverName").toString());
                                entity.setDriverPhone(driverMap.get("driverPhone").toString());
                                entity.setCarNumber(driverMap.get("carNumber").toString());
                                entity.setCarType(carType);
                                entity.setReceptionStatus("0");
                                entity.setCreateBy(userId);
                                entity.setCreateTime(new Date());
                                entity.setStatus1("1");

                                carReceptionMapper.insert(entity);

                            } else {
                                // deleteDriverIdList.add(driverId);
                            }

                            /********* 添加订单操作流水记录begin *********/
                            CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

                            commOrderDetailData.setId(CCUUID.getUUID());
                            commOrderDetailData.setParkId(parkId);
                            commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
                            commOrderDetailData.setType2(type2);
                            commOrderDetailData.setOrderNo(carOrder.getOrderNo());
                            commOrderDetailData.setOrderId(orderId);
                            commOrderDetailData.setOrderStatus(CarConstant.ORDER_STATUS_3);
                            commOrderDetailData.setCreateBy(userId);
                            commOrderDetailData.setCreateName(userName);
                            commOrderDetailData.setCreateTime(new Date());
                            commOrderDetailData.setStatus1("1");

                            commOrderDetailDataMapper.insert(commOrderDetailData);
                            /********* 添加订单操作流水记录end *********/

                            /********* 消息推送begin *********/
                            // 消息推送，写到线程里。
                            String noticeType = CarConstant.MESSAGE_CAR_MSG;
                            String noticeTitle = "司机变更";
                            String noticeContent = "调度员已重新安排了司机";
                            String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId;
                            String simpleDesc = "";
                            String itemId = orderId;
                            String parentId = "";

                            // 发送两条，一条给司机，一条给申请人
                            pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, carOrder.getCreateBy(), parkId, handleUrlMobile, simpleDesc, itemId, parentId);
                            // 查询司机信息推送消息给司机
                            CarDriver carDriver = carDriverMapper.findById(driverId);
                            pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, carDriver.getUserId(), parkId, handleUrlMobile, simpleDesc, itemId, parentId);
                            /********* 消息推送end *********/
                        }
                    }

                    /********* 删除修改的司机接单记录 begin *********/
                    List<String> carTypeList = new ArrayList<>();
                    if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH)) {
                        carTypeList.add("1");
                    }
                    if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {
                        carTypeList.add("2");
                    }

                    List<String> deleteDriverIdList = null;
                    for (String driverId : driverIdList) {

                        // 原司机不存在改派单里则删除
                        if (!oldDriverIdList.contains(driverId)) {
                            deleteDriverIdList.add(driverId);
                        } else {
                            // 原司机存在派单里则修改修状态
                            updateDriverIdList.add(driverId);
                        }
                    }

                    Map<String, Object> carReceptionMap = new HashMap<>();
                    carReceptionMap.put("notDriverIdList", deleteDriverIdList);
                    carReceptionMap.put("orderId", orderId);
                    carReceptionMap.put("status1", "-1");
                    carReceptionMap.put("carTypeList", carTypeList);

                    carReceptionMapper.updateWithIfByMap(carReceptionMap);
                    /********* 删除修改的司机接单记录 end *********/

                    if (null != updateDriverIdList && updateDriverIdList.size() > 0) {

                        Map<String, Object> updateReceptionMap = new HashMap<>();
                        updateReceptionMap.put("driverIdList", updateDriverIdList);
                        updateReceptionMap.put("orderId", orderId);
                        updateReceptionMap.put("status1", "1");
                        updateReceptionMap.put("carTypeList", carTypeList);

                        carReceptionMapper.updateWithIfByMap(updateReceptionMap);
                    }

                    result.setMessage("改单成功");

                } else {
                    // 派单
                    //List<Map<String, String>> mapList = (List<Map<String, String>>) driverListMap.get("driverList");

                    for (int i = 0; i < driverListMap.size(); i++) {

                        // 多个司机生成多个订单与司机关系记录
                        for (Map<String, String> driverMap : mapList) {
                            String driverId = null;
                            String driverName = null;
                            String driverPhone = null;
                            String carNumber = null;
                            String carType = null;
                            if (StringUtils.isNotBlank(driverMap.get("driverId"))) {
                                driverId = driverMap.get("driverId").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("driverName"))) {
                                driverName = driverMap.get("driverName").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("driverPhone"))) {
                                driverPhone = driverMap.get("driverPhone").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("carNumber"))) {
                                carNumber = driverMap.get("carNumber").toString();
                            }
                            if (StringUtils.isNotBlank(driverMap.get("carType"))) {
                                carType = driverMap.get("carType").toString();
                            }

                            /********* 添加订单司机关系记录begin *********/
                            CarReception entity = new CarReception();

                            entity.setId(CCUUID.getUUID());
                            entity.setParkId(carOrder.getParkId());
                            entity.setOrderId(orderId);
                            entity.setOperationId(userId);

                            entity.setCarDriverId(driverId);
                            entity.setDriverName(driverName);
                            entity.setDriverPhone(driverPhone);
                            entity.setCarNumber(carNumber);
                            entity.setCarType(carType);
                            entity.setReceptionStatus("0");
                            entity.setCreateBy(userId);
                            entity.setCreateTime(new Date());
                            entity.setStatus1("1");

                            carReceptionMapper.insert(entity);
                            /********* 添加订单司机关系记录end *********/

                            /********* 添加订单操作流水记录begin *********/

                            CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

                            commOrderDetailData.setId(CCUUID.getUUID());
                            commOrderDetailData.setParkId(parkId);
                            commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
                            commOrderDetailData.setType2(type2);
                            commOrderDetailData.setOrderNo(carOrder.getOrderNo());
                            commOrderDetailData.setOrderId(orderId);
                            commOrderDetailData.setOrderStatus(CarConstant.ORDER_STATUS_3);
                            commOrderDetailData.setCreateBy(userId);
                            commOrderDetailData.setCreateName(userName);
                            commOrderDetailData.setCreateTime(new Date());
                            commOrderDetailData.setStatus1("1");

                            commOrderDetailDataMapper.insert(commOrderDetailData);
                            /********* 添加订单操作流水记录end *********/
                        }
                    }

                    /********* 修改订单总表记录begin *********/
                    CommOrder commOrder = new CommOrder();

                    commOrder.setOrderId(orderId);
                    commOrder.setOrderStatus(CarConstant.ORDER_STATUS_3);
                    commOrder.setUpdateBy(userId);
                    commOrder.setUpdateTime(new Date());
                    commOrder.setWaithandleType("2");
                    commOrder.setWaithandleId(CarConstant.VEHICLERESERVE_RECEIPT);

                    commOrderMapper.updateWithIfByOrderId(commOrder);
                    /********* 修改订单总表记录end *********/


                    /********* 修改用车订单记录begin *********/
                    // 派单后修改订单状态为已派单状态
                    CarOrder updateOrder = new CarOrder();

                    updateOrder.setId(orderId);
                    updateOrder.setOrderStatus(CarConstant.ORDER_STATUS_3);
                    updateOrder.setUpdateBy(userId);
                    updateOrder.setUpdateTime(new Date());


                    carOrderMapper.updateWithIf(updateOrder);
                    /********* 修改用车订单记录end *********/

                    result.setMessage("派单成功");

                    /********* 消息推送begin *********/

                    // 消息推送，写到线程里。
                    String noticeType = CarConstant.MESSAGE_CAR_MSG;
                    String noticeTitle = "公务用车已派车";
                    String noticeContent = "调度员已安排了司机";
                    String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/receiveOrder.html?orderId=" + orderId;
                    String simpleDesc = "";
                    String itemId = orderId;
                    String parentId = "";

                    // 查询该订单的司机
                    Map<String, Object> driverMap = new HashMap<String, Object>();
                    driverMap.put("orderId", orderId);
                    List<CarDriver> carDriverList = carDriverMapper.findListByMap(driverMap);

                    for(CarDriver carDriver:carDriverList){
                        pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, carDriver.getUserId(), parkId, handleUrlMobile, simpleDesc, itemId, parentId);
                    }
                    /********* 消息推送end *********/
                }

            } else {
                result.setMessage("该订单不是派单状态订单，不允许派单");
                result.setResult(false);
            }

        } else {

            result.setMessage("请至少选择一个司机");
            result.setResult(false);
        }
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
