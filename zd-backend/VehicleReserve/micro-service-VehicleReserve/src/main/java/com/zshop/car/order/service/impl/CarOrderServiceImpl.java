package com.zshop.car.order.service.impl;

import com.github.pagehelper.PageHelper;
import com.zshop.car.CarConstant;
import com.zshop.car.driver.dao.mapper.CarDriverMapper;
import com.zshop.car.driver.entity.CarDriver;
import com.zshop.car.leaderorder.dao.mapper.CarLeaderOrderMapper;
import com.zshop.car.leaderorder.entity.CarLeaderOrder;
import com.zshop.car.order.dao.mapper.CarOrderMapper;
import com.zshop.car.order.entity.CarOrder;
import com.zshop.car.order.service.CarOrderService;
import com.zshop.car.reception.dao.mapper.CarReceptionMapper;
import com.zshop.car.reception.entity.CarReception;
import com.zshop.common.order.dao.mapper.CommOrderMapper;
import com.zshop.common.order.entity.CommOrder;
import com.zshop.common.orderdetail.dao.mapper.CommOrderDetailDataMapper;
import com.zshop.common.orderdetail.entity.CommOrderDetailData;
import com.zshop.common.rating.dao.mapper.CommRatingMapper;
import com.zshop.common.rating.entity.CommRating;
import com.zshop.core.base.controller.ResultData;
import com.zshop.core.base.mapper.BaseMapper;
import com.zshop.core.base.service.impl.BaseServiceImpl;
import com.zshop.core.log.LogUtil;
import com.zshop.core.page.Page;
import com.zshop.core.page.PageUtil;
import com.zshop.core.security.SessionUtil;
import com.zshop.core.util.*;
import com.zshop.feign.PushMessageService;
import com.zshop.feign.UserPrimissionService;
import com.zshop.webapp.config.base.SystemConfig;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * @Description: 用车订单表
 * @author: Administrator
 * @date: 2018-04-11 17:29:44
 */
@Service
public class CarOrderServiceImpl extends BaseServiceImpl<CarOrder, String> implements CarOrderService {

    @SuppressWarnings("unused")
    private final LogUtil logger = LogUtil.getLogger(this.getClass());

    @Autowired
    private CarOrderMapper carOrderMapper;

    @Autowired
    private CarLeaderOrderMapper carLeaderOrderMapper;

    @Autowired
    private CarReceptionMapper carReceptionMapper;

    @Autowired
    private CarDriverMapper carDriverMapper;

    @Autowired
    private CommOrderMapper commOrderMapper;

    @Autowired
    private CommOrderDetailDataMapper commOrderDetailDataMapper;

    @Autowired
    private CommRatingMapper commRatingMapper;

    @Override
    public BaseMapper<CarOrder, String> getMapper() {
        return carOrderMapper;
    }

    @Autowired
    private UserPrimissionService userPrimissionService;

    @Autowired
    private PushMessageService pushMessageService;

    @Resource(name = "carSystemConfig")
    private SystemConfig systemConfig;

    /**
     * 列表
     *
     * @param page
     * @param searchKeys 查询关键字
     * @param userId     用户id
     */
    @Override
    public void list(ResultData result, Page<CarOrder> page, String searchKeys, String userId) {
        Map<String, Object> mapSql = new HashMap<String, Object>();
        mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));

        PageHelper.startPage((int) page.getPageNo(), (int) page.getPageSize());
        List<CarOrder> list = carOrderMapper.list(mapSql);

        PageUtil.setPageInfo(page, list);
        page.setRows(list);

        result.setMapData("page", page);

    }

    /**
     * 新增/修改初始化
     *
     * @param result
     */
    @Override
    public void init(ResultData result, String id) {

        if (StringUtils.isNotBlank(id)) {
            result.setData(carOrderMapper.findById(id));
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
    public void addSave(ResultData result, CarOrder entity) {
        carOrderMapper.insert(entity);
    }

    /**
     * 修改保存
     *
     * @param result
     * @param entity
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateSave(ResultData result, CarOrder entity) {
        carOrderMapper.updateWithIf(entity);
    }

    /**
     * 详情
     *
     * @param result
     * @param id
     */
    @Override
    public void findById(ResultData result, String id) {
        CarOrder entity = carOrderMapper.findById(id);
        result.setData(entity);
    }

    /**
     * 根据id删除
     *
     * @param result
     * @param id
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteById(ResultData result, String id) {
        carOrderMapper.logicDelete(id);
    }

    /**
     * 根据ids删除
     *
     * @param result
     * @param ids
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void deleteByIds(ResultData result, String[] ids) {
        carOrderMapper.logicDeleteByIds(ids);
    }


    /**
     * 订单列表
     * @param result
     * @param page
     * @param searchKeys 关键词
     * @param orderStatus 订单状态
     * @param orderTimeBegin 申请时间
     * @param orderTimeEnd 申请时间
     */
    @Override
    public void orderList(ResultData result, Page<CarOrder> page, String searchKeys, String orderStatus, Date orderTimeBegin, Date orderTimeEnd) {

        // 根据不同用户权限查询不同列表
        String parkId = SessionUtil.getParkId();

        Map<String, Object> mapSql = new HashMap<String, Object>();
        mapSql.put("parkId", parkId);
        mapSql.put("searchKeys", CCStringUtils.searchKeys(searchKeys));
        mapSql.put("orderStatus", orderStatus);
        mapSql.put("orderTimeBegin", orderTimeBegin);
        mapSql.put("orderTimeEnd", orderTimeEnd);

        PageHelper.startPage((int) page.getPageNo(), (int) page.getPageSize());
        List<CarOrder> list = carOrderMapper.orderList(mapSql);

        PageUtil.setPageInfo(page, list);
        page.setRows(list);

        result.setMapData("page", page);
    }

    /**
     * 申请用车
     *
     * @param result
     * @param entity
     */
    @Override
    public void addOrder(ResultData result, CarOrder entity) {

        // 获取当前用户信息
        String userId = SessionUtil.getLoginUserId();
        String userName = SessionUtil.getLoginUserName();
        String parkId = SessionUtil.getParkId();
        String phone = "";
        String deptName = "车管科";

        try {

            String deptId = SessionUtil.getDeptId();
            ResultData deptResult = userPrimissionService.getDeptInfo(deptId);
            Map<String, Object> entityMap = (Map<String, Object>) deptResult.getMapData("entity");
            if (null != entityMap) {
                deptName = (String) entityMap.get("name");
            }

        }catch (Exception e){

        }

        Map<String, Object> userMap = userPrimissionService.getUserDetail();
        Map<String, Object> detailResultData = (Map<String, Object>) userMap.get("userDetailMap");
        if (null != detailResultData) {
            phone = (String) detailResultData.get("mobile");
        }

        if (!checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_APPLY)) {
            result.setMessage("当前用户没有该权限");
            result.setResult(false);
            return;
        }

        String orderId = CCUUID.getUUID();
        String orderNo = CarConstant.ORDER_NO_YC + CCDateUtil.getDate(new Date()).replace("-", "") + CCRandomUtil.generateRandomNum(4);
        String orderStatus = CarConstant.ORDER_STATUS_0;

        /********* 添加订单总表信息begin *********/
        CommOrder commOrder = new CommOrder();

        commOrder.setId(CCUUID.getUUID());
        commOrder.setParkId(parkId);
        commOrder.setIsDone("0");
        commOrder.setType1(CarConstant.COMM_ORDER_TYPE1);
        commOrder.setType1Name(CarConstant.COMM_ORDER_TYPE1_NAME);
        commOrder.setType2(CarConstant.COMM_ORDER_TYPE2);
        commOrder.setType2Name(CarConstant.COMM_ORDER_TYPE2_NAME);
        commOrder.setOrderNo(orderNo);
        commOrder.setOrderId(orderId);
        commOrder.setOrderStatus(orderStatus);
        commOrder.setCreateBy(userId);
        commOrder.setCreateName(userName);
        commOrder.setCreateTime(new Date());
        commOrder.setStatus1("1");
        commOrder.setWaithandleType("2");
        commOrder.setWaithandleId(CarConstant.VEHICLERSERVE_CHECK);

        commOrder.setImgUrl(systemConfig.getCarImage());

        commOrder.setExt1("/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId);

        commOrderMapper.insert(commOrder);
        /********* 添加订单总表信息end *********/

        /********* 添加订单操作流水记录begin *********/

        CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

        commOrderDetailData.setId(CCUUID.getUUID());
        commOrderDetailData.setParkId(parkId);
        commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
        commOrderDetailData.setType2(CarConstant.ORDER_STATUS_0);
        commOrderDetailData.setOrderNo(orderNo);
        commOrderDetailData.setOrderId(orderId);
        commOrderDetailData.setOrderStatus(CarConstant.ORDER_STATUS_0);
        commOrderDetailData.setCreateBy(userId);
        commOrderDetailData.setCreateName(userName);
        commOrderDetailData.setCreateTime(new Date());
        commOrderDetailData.setStatus1("1");

        commOrderDetailDataMapper.insert(commOrderDetailData);
        /********* 添加订单操作流水记录end *********/

        /********* 添加领导人订单关系记录begin *********/
        // 获取领导人信息
        Map<String, Object> leaderMap = CCJsonUtil.jsonToMap(entity.getLeader());

        if (null != leaderMap && leaderMap.size() > 0) {

            List<Map<String, String>> mapList = (List<Map<String, String>>) leaderMap.get("leader");

            for (Map<String, String> leader : mapList) {
                // 添加领导订单关系表记录
                CarLeaderOrder carLeaderOrder = new CarLeaderOrder();

                carLeaderOrder.setId(CCUUID.getUUID());
                if (null != leader.get("id")) {
                    carLeaderOrder.setLeaderId(leader.get("id"));
                }
                carLeaderOrder.setLeaderName(leader.get("leaderName"));
                carLeaderOrder.setParkId(parkId);
                carLeaderOrder.setOrderId(orderId);
                carLeaderOrder.setCreateBy(userId);
                carLeaderOrder.setCreateTime(new Date());
                carLeaderOrder.setStatus1("1");
                carLeaderOrderMapper.insert(carLeaderOrder);
            }

            entity.setId(orderId);
            entity.setParkId(parkId);
            entity.setOrderNo(orderNo);
            entity.setOrderStatus(CarConstant.ORDER_STATUS_0);
            entity.setOrderBy(userName);
            entity.setOrderTime(new Date());
            entity.setOrderPhone(phone);
            entity.setOrderDept(deptName);
            entity.setCreateBy(userId);
            entity.setCreateTime(new Date());
            entity.setStatus1("1");

            if (null != entity.getSmallCarNum() && entity.getSmallCarNum() > 0) {
                entity.setIsSamllCar("1");
            }
            if (null != entity.getMidCarNum() && entity.getMidCarNum() > 0) {
                entity.setIsMidCar("1");
            }

            carOrderMapper.insert(entity);

            Map<String, Object> resultMap = new HashMap<String, Object>();
            resultMap.put("orderId", orderId);
            result.setData(resultMap);
            result.setMessage("申请用车成功");
        } else {

            result.setMessage("申请用车失败，请选择需要添加的领导信息");
            result.setResult(false);
        }
        /********* 添加领导人订单关系记录end *********/


        /********* 消息推送begin *********/
        // 只要是拥有该权限的用户都需要推送一条消息记录
        // 根据权限返回用户id列表的接口
        Set<String> userIdList = userPrimissionService.getUserIdByPrivs(CarConstant.VEHICLERSERVE_CHECK);

        // 消息推送，写到线程里。
        if (null != userIdList && userIdList.size() > 0) {
            for (String sendUserId : userIdList) {
                String noticeType = CarConstant.MESSAGE_CAR_MSG;
                String noticeTitle = "公务用车申请";
                String noticeContent = "您收到了一条新的用车申请单";
                String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderReject.html?orderId=" + orderId;
                String simpleDesc = "";
                String itemId = orderId;
                String parentId = "";

                pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, sendUserId, parkId, handleUrlMobile, simpleDesc, itemId, parentId);
            }
        }
        /********* 消息推送end *********/
    }

    /**
     * 取消订单
     *
     * @param result
     * @param orderId 订单id
     */
    @Override
    public void deleteOrder(ResultData result, String orderId) {

        // 获取用户资料
        String userId = SessionUtil.getLoginUserId();
        String userName = SessionUtil.getLoginUserName();
        String parkId = SessionUtil.getParkId();

        // 查询订单资料是否可以取消
        CarOrder entity = carOrderMapper.findById(orderId);

        if (null != entity && CarConstant.ORDER_STATUS_0.equals(entity.getOrderStatus())) {

            // 只允许申请人取消订单

            // 修改订单为已取消
            CarOrder updateOrder = new CarOrder();
            updateOrder.setId(orderId);
            updateOrder.setOrderStatus(CarConstant.ORDER_STATUS_8);
            updateOrder.setUpdateBy(userId);
            updateOrder.setUpdateTime(new Date());
            carOrderMapper.updateWithIf(updateOrder);

            /********* 添加订单操作流水记录begin *********/
            CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

            commOrderDetailData.setId(CCUUID.getUUID());
            commOrderDetailData.setParkId(parkId);
            commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
            commOrderDetailData.setType2(CarConstant.ORDER_STATUS_7);
            commOrderDetailData.setOrderNo(entity.getOrderNo());
            commOrderDetailData.setOrderId(orderId);
            commOrderDetailData.setOrderStatus(CarConstant.ORDER_STATUS_8);
            commOrderDetailData.setCreateBy(userId);
            commOrderDetailData.setCreateName(userName);
            commOrderDetailData.setCreateTime(new Date());
            commOrderDetailData.setStatus1("1");

            commOrderDetailDataMapper.insert(commOrderDetailData);
            /********* 添加订单操作流水记录end *********/

            /********* 修改订单总表记录begin *********/
            CommOrder commOrder = new CommOrder();

            commOrder.setOrderId(orderId);
            commOrder.setOrderStatus(CarConstant.ORDER_STATUS_8);
            commOrder.setUpdateBy(userId);
            commOrder.setUpdateTime(new Date());
            commOrder.setIsDone("1");

            commOrderMapper.updateWithIfByOrderId(commOrder);
            /********* 修改订单总表记录end *********/

            result.setMessage("取消用车订单成功");

            /********* 消息推送begin *********/

            // 根据权限返回用户id列表的接口
            Set<String> userIdList = userPrimissionService.getUserIdByPrivs(CarConstant.VEHICLERSERVE_CHECK);

            if (null != userIdList && userIdList.size() > 0) {

                for (String sendUserId : userIdList) {
                    String noticeType = CarConstant.MESSAGE_CAR_MSG;
                    String noticeTitle = "公务用车取消";
                    String noticeContent = "申请人已取消了用车申请";
                    String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + entity.getId();
                    String simpleDesc = "";
                    String itemId = orderId;
                    String parentId = "";

                    pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, sendUserId, parkId, handleUrlMobile, simpleDesc, itemId, parentId);
                }
            }

            /********* 消息推送end *********/
        } else {
            result.setMessage("只能取消待审核订单");
            result.setResult(false);
        }
    }

    /**
     * 获取用车订单详情
     *
     * @param result  返回数据
     * @param orderId 订单id
     */
    @Override
    public void orderInfo(ResultData result, String orderId) {
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();

        if (StringUtils.isNotBlank(orderId)) {

            Map<String,Object> carOrderMap = new HashMap<>();
            carOrderMap.put("id",orderId);
            carOrderMap.put("userId",userId);
            CarOrder entity = carOrderMapper.findOneByMap(carOrderMap);

            if (null == entity) {
                result.setMessage("抱歉，查询不到该订单。");
                result.setResult(false);
                return;
            }

            // 订单附件，多个以;隔开。fileUrlList
            String fileUrl = entity.getFileUrl();
            if (StringUtils.isNotBlank(entity.getFileUrl())) {

                String[] fileUrlArray = entity.getFileUrl().split(";");

                List<String> fileUrlList = new ArrayList<String>();

                String filePreviewUrl = systemConfig.getFilePreviewUrl();

                for (String url : fileUrlArray) {

                    fileUrlList.add(filePreviewUrl + url);
                }
                entity.setFileUrlList(fileUrlList);
            }


            // 查询领导信息
            String leaderStr = "";
            Map<String, Object> leaderMap = new HashMap<String, Object>();
            leaderMap.put("orderId", orderId);
            List<CarLeaderOrder> leaderOrderList = carLeaderOrderMapper.findListByMap(leaderMap);
            if (null != leaderOrderList && leaderOrderList.size() > 0) {
                for (int i = 0; i < leaderOrderList.size(); i++) {
                    // leaderStr += leaderOrderList.get(i).getLeaderName() + "、";
                    leaderStr += leaderOrderList.get(i).getLeaderName();
                    if (i != leaderOrderList.size() - 1) {
                        leaderStr += "、";
                    }
                }
            }
            entity.setLeader(leaderStr);

            // 判断该订单处于什么状态
            //(0：待审批；1：已审批；2：已驳回；3：已派单；4、已接单；5、已到处理地；6、用车完成；7、已评价)
            if (CarConstant.ORDER_STATUS_0.equals(entity.getOrderStatus())) {

                // 待审批状态，申请人显示取消订单，审批人显示通过和驳回
                if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_CHECK)) {
                    // 当前用户具有审核权限
                    entity.setCurOperationType("1");
                } else {
                    // 申请人取消订单权限
                    entity.setCurOperationType("0");
                }

                result.setData(entity);

            } else if (CarConstant.ORDER_STATUS_1.equals(entity.getOrderStatus())) {

                // 已审批状态，派单人显示派单，只显示调度员能调度的车辆类型订单
                if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH)) {
                    // 当前用户具有小车派单权限
                    entity.setCurOperationType("2");
                }
                if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {
                    // 当前用户具有中巴派单权限
                    entity.setCurOperationType("2");
                }

                result.setData(entity);

            } else if (CarConstant.ORDER_STATUS_2.equals(entity.getOrderStatus())) {
                // 已驳回状态，只允许申请人和审批人查看，无按钮提供

                // 驳回理由
                if(StringUtils.isNotBlank(entity.getExt1())){
                    entity.setRepulseReason(entity.getExt1());
                }
                result.setData(entity);
            } else if (CarConstant.ORDER_STATUS_3.equals(entity.getOrderStatus())) {

                this.checkDriver(entity,orderId,userId,parkId);

                result.setData(entity);

            } else if (CarConstant.ORDER_STATUS_4.equals(entity.getOrderStatus())) {

                this.checkDriver(entity,orderId,userId,parkId);

                result.setData(entity);
            } else if (CarConstant.ORDER_STATUS_5.equals(entity.getOrderStatus())) {

                this.checkDriver(entity,orderId,userId,parkId);

                result.setData(entity);

            } else if (CarConstant.ORDER_STATUS_6.equals(entity.getOrderStatus())) {

                if (userId.equals(entity.getCreateBy())) {

                    // 待评价状态
                    entity.setCurOperationType(CarConstant.ORDER_STATUS_7);
                }

                // 查询司机信息
                entity.setDriverMap(this.getDriverMap(orderId, null));

                result.setData(entity);

            } else if (CarConstant.ORDER_STATUS_7.equals(entity.getOrderStatus())) {
                // 已评价状态
                Map<String, Object> mapSql = new HashMap<String, Object>();
                mapSql.put("orderId", orderId);
                mapSql.put("parkId", parkId);
                CommRating commRating = commRatingMapper.findOneByMap(mapSql);

                // 获取评价文件
                String ratingFileUrl = commRating.getRatingFileUrl();

                if (StringUtils.isNotBlank(ratingFileUrl)) {

                    String[] ratingFileUrlArray = ratingFileUrl.split(";");

                    List<String> ratingFileUrlList = new ArrayList<String>();

                    String filePreviewUrl = systemConfig.getFilePreviewUrl();

                    for (String url : ratingFileUrlArray) {
                        ratingFileUrlList.add(filePreviewUrl + url);
                    }
                    commRating.setRatingFileUrlList(ratingFileUrlList);
                }

                entity.setCommRating(commRating);

                // 查询司机信息
                entity.setDriverMap(this.getDriverMap(orderId, null));

                result.setData(entity);
            } else {
                result.setData(entity);
            }
        } else {
            result.setResult(false);
            result.setMessage("抱歉，查询不到该订单。");
        }
    }

    /**
     * 查询司机信息
     *
     * @param entity
     */
    private Map<String, Object> getDriverMap(String orderId, String userId) {

        Map<String, Object> driverMap = new HashMap<String, Object>();

        // 查询司机信息
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("orderId", orderId);
        paramMap.put("operationId", userId);
        paramMap.put("status1", "1");
        List<CarReception> receptionList = carReceptionMapper.findListByMap(paramMap);

        List<Map<String, Object>> smallCarList = new ArrayList<>();
        List<Map<String, Object>> midCarList = new ArrayList<>();

        if (null != receptionList && receptionList.size() > 0) {

            for (CarReception reception : receptionList) {

                if ("1".equals(reception.getCarType())) {
                    // 添加小车司机记录
                    List<Map<String, Object>> driverList = new ArrayList<Map<String, Object>>();

                    Map<String, Object> smallCarMap = new HashMap<String, Object>();

                    smallCarMap.put("driverId", reception.getCarDriverId());
                    smallCarMap.put("driverName", reception.getDriverName());
                    smallCarMap.put("driverPhone", reception.getDriverPhone());
                    smallCarMap.put("carNumber", reception.getCarNumber());
                    smallCarMap.put("carType", reception.getCarType());
                    if("0".equals(reception.getReceptionStatus())){
                        smallCarMap.put("driverStatus", "1");
                    }else{
                        smallCarMap.put("driverStatus", "0");
                    }

                    smallCarList.add(smallCarMap);
                } else {
                    // 添加中巴司机记录
                    List<Map<String, Object>> driverList = new ArrayList<Map<String, Object>>();

                    Map<String, Object> midCarMap = new HashMap<String, Object>();

                    midCarMap.put("driverId", reception.getCarDriverId());
                    midCarMap.put("driverName", reception.getDriverName());
                    midCarMap.put("driverPhone", reception.getDriverPhone());
                    midCarMap.put("carNumber", reception.getCarNumber());
                    midCarMap.put("carType", reception.getCarType());
                    if("0".equals(reception.getReceptionStatus())){
                        midCarMap.put("driverStatus", "1");
                    }else{
                        midCarMap.put("driverStatus", "0");
                    }
                    driverList.add(midCarMap);

                    midCarList.add(midCarMap);
                }
            }
        }

        driverMap.put("smallCarList", smallCarList);
        driverMap.put("midCarList", midCarList);

        return driverMap;
    }

    /**
     * 审批用车订单（通过/驳回）
     *
     * @param orderId       订单id
     * @param orderStatus   订单状态
     * @param repulseReason 驳回理由
     */
    @Override
    public void updateOrderStatus(ResultData result, String orderId, String orderStatus, String repulseReason) {

        //orderStatus 只允许 已审核和已驳回状态，
        if (CarConstant.ORDER_STATUS_1.equals(orderStatus) || CarConstant.ORDER_STATUS_2.equals(orderStatus)) {

            // 获取当前用户信息
            String userId = SessionUtil.getLoginUserId();
            String userName = SessionUtil.getLoginUserName();
            String parkId = SessionUtil.getParkId();

            Set<String> privs = userPrimissionService.userPrivs();
            if(!checkPrivs(userId,parkId,CarConstant.VEHICLERSERVE_CHECK)){
                // 没有审核权限
                result.setMessage("抱歉，您没有审核用车订单权限");
                result.setResult(false);
                return;
            }


            /********* 修改用车订单状态 begin *********/
            CarOrder entity = carOrderMapper.findById(orderId);

            // 只能审核待审批订单
            if (CarConstant.ORDER_STATUS_0.equals(entity)) {
                result.setResult(false);
                result.setMessage("只能审核待审批订单");
                return;
            }

            CarOrder order = new CarOrder();
            order.setId(orderId);
            order.setOrderStatus(orderStatus);
            order.setUpdateBy(userId);

            if(CarConstant.ORDER_STATUS_2.equals(orderStatus)){
                order.setExt1(repulseReason);
            }

            order.setUpdateTime(new Date());
            carOrderMapper.updateWithIf(order);
            /********* 修改用车订单状态 end *********/


            /********* 修改订单总表记录begin *********/
            CommOrder commOrder = new CommOrder();

            commOrder.setOrderId(orderId);
            commOrder.setOrderStatus(orderStatus);
            commOrder.setUpdateBy(userId);
            commOrder.setUpdateTime(new Date());
            if (CarConstant.ORDER_STATUS_1.equals(orderStatus)) {
                commOrder.setWaithandleId("");
                commOrder.setWaithandleType("2");

                // 分配不同的派单权限
                //String waithandleId = "";
                if ("1".equals(entity.getIsSamllCar())) {
                    //waithandleId += CarConstant.VEHICLERSERVE_SDISPATCH+";";
                    commOrder.setWaithandleId(CarConstant.VEHICLERSERVE_SDISPATCH);
                }
                if ("1".equals(entity.getIsMidCar())) {
                    //waithandleId += CarConstant.VEHICLERESERVE_MDISPATCH;
                    commOrder.setExt2(CarConstant.VEHICLERESERVE_MDISPATCH);
                }
            }else{
                commOrder.setIsDone("1");
            }

            commOrderMapper.updateWithIfByOrderId(commOrder);
            /********* 修改订单总表记录end *********/


            /********* 添加订单操作流水记录begin *********/
            CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

            commOrderDetailData.setId(CCUUID.getUUID());
            commOrderDetailData.setParkId(parkId);
            commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
            commOrderDetailData.setType2(orderStatus);
            commOrderDetailData.setOrderNo(entity.getOrderNo());
            commOrderDetailData.setOrderId(orderId);
            commOrderDetailData.setOrderStatus(orderStatus);
            commOrderDetailData.setCreateBy(userId);
            commOrderDetailData.setCreateName(userName);
            commOrderDetailData.setCreateTime(new Date());
            commOrderDetailData.setStatus1("1");

            commOrderDetailDataMapper.insert(commOrderDetailData);
            /********* 添加订单操作流水记录end *********/

            result.setMessage("审批用车订单成功");

            /********* 消息推送begin *********/
            if (CarConstant.ORDER_STATUS_2.equals(orderStatus)) {

                String noticeType = CarConstant.MESSAGE_CAR_MSG;
                String noticeTitle = "公务用车申请驳回";
                String noticeContent = "车管科已驳回了您的用车申请";
                String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + entity.getId();
                String simpleDesc = "";
                String itemId = orderId;
                String parentId = "";

                pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, entity.getCreateBy(), parkId, handleUrlMobile, simpleDesc, itemId, parentId);
            }else{
                // 发送消息给调度员
                Set<String> users = new HashSet<>();

                if ("1".equals(entity.getIsSamllCar())) {
                    Set<String> userIdList = userPrimissionService.getUserIdByPrivs(CarConstant.VEHICLERSERVE_SDISPATCH);
                    users.addAll(userIdList);
                }
                if ("1".equals(entity.getIsMidCar())) {
                    Set<String> userIdList = userPrimissionService.getUserIdByPrivs(CarConstant.VEHICLERESERVE_MDISPATCH);
                    users.addAll(userIdList);
                }

                for(String id : users){
                    String noticeType = CarConstant.MESSAGE_CAR_MSG;
                    String noticeTitle = "公务用车申请通过";
                    String noticeContent = "车管科审核通过了用车申请";
                    String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderSelectCars.html?orderId=" + entity.getId();
                    String simpleDesc = "";
                    String itemId = orderId;
                    String parentId = "";

                    pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, id, parkId, handleUrlMobile, simpleDesc, itemId, parentId);
                }
            }
            /********* 消息推送end *********/
        } else {
            result.setMessage("请确认当前订单是否是审核状态订单");
            result.setResult(false);
        }
    }

    /**
     * 司机接单、到底出发地、用车完成
     *
     * @param result
     * @param orderId     订单id
     * @param orderStatus 订单状态
     */
    @Override
    public void orderReceiving(ResultData result, String orderId, String orderStatus) {

        // 根据当前登陆用户判断该用户是否拥有司机权限
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();
        String userName = SessionUtil.getLoginUserName();

        // 接单人数
        int receivingNumber = 0;
        // 到底出发地人数
        int startAddressNumber = 0;
        // 标记完成人数
        int doneNumber = 0;

        String message = "司机接单成功";

        CarOrder carOrder = carOrderMapper.findById(orderId);

        int smallCarCount = 0;
        int midCarCount = 0;
        int carCount = 0;
        // 订单小车数量
        if (null != carOrder.getSmallCarNum()) {
            smallCarCount = carOrder.getSmallCarNum();
        }
        // 订单中巴数量
        if (null != carOrder.getMidCarNum()) {
            midCarCount = carOrder.getMidCarNum();
        }
        // 订单全部车辆总数
        carCount = smallCarCount + midCarCount;

        // 查询司机接单记录，判断全部车辆是否全部完成接单
        Map<String, Object> receptionSqlMap = new HashMap<>();
        receptionSqlMap.put("orderId", carOrder.getId());
        //receptionSqlMap.put("receptionStatus", "1");
        receptionSqlMap.put("status1", "1");
        List<CarReception> carReceptionList = carReceptionMapper.findListByMap(receptionSqlMap);

        // 当司机全部接完单才允许修改订单状态
        if (null != carReceptionList && carReceptionList.size() > 0) {
            // 全部司机点击完成状态，当最后一个司机点完成才把订单状态改为已完成状态

            for (CarReception carReception : carReceptionList) {
                if ("1".equals(carReception.getReceptionStatus())) {
                    // 已接单司机人数
                    receivingNumber++;
                } else if ("2".equals(carReception.getReceptionStatus())) {
                    // 到达出发地司机人数
                    startAddressNumber++;
                    receivingNumber++;
                } else if ("3".equals(carReception.getReceptionStatus())) {
                    // 已完成司机人数
                    doneNumber++;
                    startAddressNumber++;
                    receivingNumber++;
                }
            }

        }

        CommOrder commOrder = new CommOrder();
        CarOrder updateCarOrder = new CarOrder();
        // 司机接单状态
        String receptionStatus = "";
        // 任务完成发送消息标识
        boolean pushMessageDone = false;
        if (CarConstant.ORDER_STATUS_4.equals(orderStatus)) {
            receptionStatus = "1";
            // 当全部司机接完单才修该订单状态为已接单
            if (carCount - 1 == receivingNumber) {
                commOrder.setOrderStatus(orderStatus);
                updateCarOrder.setOrderStatus(orderStatus);
            }
        } else if (CarConstant.ORDER_STATUS_5.equals(orderStatus)) {
            receptionStatus = "2";
            // 当全部司机已到达出发地
            if (carCount - 1 == startAddressNumber) {
                commOrder.setOrderStatus(orderStatus);
                updateCarOrder.setOrderStatus(orderStatus);
            }
        } else if (CarConstant.ORDER_STATUS_6.equals(orderStatus)) {
            receptionStatus = "3";
            // 当全部司机用车完成才把订单状态改为完成状态
            if (carCount - 1 == doneNumber) {
                pushMessageDone = true;
                commOrder.setIsDone("1");
                commOrder.setOrderStatus(orderStatus);
                updateCarOrder.setOrderStatus(orderStatus);
            }
        }

        /********* 修改用车订单记录begin *********/
        updateCarOrder.setId(orderId);
        updateCarOrder.setUpdateBy(userId);
        updateCarOrder.setUpdateTime(new Date());
        carOrderMapper.updateWithIf(updateCarOrder);
        /********* 修改用车订单记录end *********/

        /********* 修改订单总表记录begin *********/
        commOrder.setOrderId(orderId);
        commOrder.setUpdateBy(userId);
        commOrder.setUpdateTime(new Date());
        commOrderMapper.updateWithIfByOrderId(commOrder);
        /********* 修改订单总表记录end *********/


        /********* 司机接单，修改接单状态begin *********/
        Map<String, Object> carReceptionMap = new HashMap<>();
        carReceptionMap.put("orderId", orderId);
        carReceptionMap.put("driverId", userId);
        carReceptionMap.put("receptionStatus", receptionStatus);
        carReceptionMapper.updateWithIfByMap(carReceptionMap);
        /********* 司机接单，修改接单状态end *********/

        /********* 修改司机信息记录begin *********/
        CarDriver carDriver = new CarDriver();
        carDriver.setUserId(userId);
        carDriver.setDriverStatus(receptionStatus);
        if (CarConstant.ORDER_STATUS_6.equals(orderStatus)) {
            carDriver.setRunNumber(1);
            carDriver.setDriverStatus("1");
        }else{
            carDriver.setDriverStatus("0");
        }
        //carDriverMapper.updateRunNumber(carDriver);


        /********* 修改司机信息记录end *********/

        /********* 添加订单操作流水记录begin *********/
        CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

        commOrderDetailData.setId(CCUUID.getUUID());
        commOrderDetailData.setParkId(parkId);
        commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
        commOrderDetailData.setType2(orderStatus);
        commOrderDetailData.setOrderNo(carOrder.getOrderNo());
        commOrderDetailData.setOrderId(orderId);
        commOrderDetailData.setOrderStatus(orderStatus);
        commOrderDetailData.setCreateBy(userId);
        commOrderDetailData.setCreateName(userName);
        commOrderDetailData.setCreateTime(new Date());
        commOrderDetailData.setStatus1("1");

        commOrderDetailDataMapper.insert(commOrderDetailData);
        /********* 添加订单操作流水记录end *********/


        /********* 消息推送begin *********/

        String noticeType = CarConstant.MESSAGE_CAR_MSG;
        String noticeTitle = "司机接单";
        String noticeContent = "司机接单了";
        String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId;
        String simpleDesc = "";
        String itemId = orderId;
        String parentId = "";

        if (CarConstant.ORDER_STATUS_5.equals(orderStatus)) {
            message = "司机已到达出发地";
            noticeTitle = "司机到达提醒";
            noticeContent = "司机已到达出发地";
            handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId;

        } else if (pushMessageDone && CarConstant.ORDER_STATUS_6.equals(orderStatus)) {
            message = "任务完成";
            noticeTitle = "任务完成";
            noticeContent = "本次公务用车已完成，快来评价吧";
            handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId;
        }

        Map<String, Object> commOrderDetailsMap = new HashMap<>();
        List<String> type2List = new ArrayList<>();
        type2List.add("0");
        type2List.add("1");
        type2List.add("2");
        type2List.add("3");
        commOrderDetailsMap.put("orderId", carOrder.getId());
        commOrderDetailsMap.put("type1", "2");
        commOrderDetailsMap.put("type2List", type2List);

        List<CommOrderDetailData> commOrderDetailDataList = commOrderDetailDataMapper.findListByMap(commOrderDetailsMap);

        if (commOrderDetailDataList != null && commOrderDetailDataList.size() > 0) {

            Set<String> userIdList = new HashSet<>();

            for (CommOrderDetailData detailData : commOrderDetailDataList) {
                userIdList.add(detailData.getCreateBy());
            }
            for (String sendId : userIdList) {
                // 消息推送给申请人、审核人、派单人
                pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, sendId, parkId, handleUrlMobile, simpleDesc, itemId, parentId);
            }
        }

        /********* 消息推送end *********/

        result.setMessage(message);
    }

    /**
     * 评价订单
     *
     * @param result
     * @param orderId     订单id
     * @param ratingScore 评分
     * @param ratingDesc  评价描述
     */
    @Override
    public void addRating(ResultData result, String orderId, Integer ratingScore, String ratingDesc) {

        // 获取用户资料
        String userId = SessionUtil.getLoginUserId();
        String parkId = SessionUtil.getParkId();
        String userName = SessionUtil.getLoginUserName();

        // 查询当前订单是否可以评价
        CarOrder entity = carOrderMapper.findById(orderId);

        if (CarConstant.ORDER_STATUS_6.equals(entity.getOrderStatus())) {

            /********* 添加评价记录begin*************/
            CommRating commRating = new CommRating();

            commRating.setId(CCUUID.getUUID());
            commRating.setParkId(parkId);
            commRating.setType1(CarConstant.COMM_ORDER_TYPE1);
            commRating.setOrderId(orderId);
            commRating.setRatingType("0");
            commRating.setRatingScore(ratingScore);
            commRating.setTitle("公务用车评价");
            commRating.setRatingDesc(ratingDesc);
            commRating.setCreateBy(userId);
            commRating.setCreateTime(new Date());

            commRatingMapper.insert(commRating);
            /********* 添加评价记录end*************/

            /********* 修改用车记录表begin*************/
            // 评价成功修改订单状态为已评价状态
            CarOrder carOrder = new CarOrder();

            carOrder.setId(orderId);
            carOrder.setOrderStatus(CarConstant.ORDER_STATUS_7);

            carOrderMapper.updateWithIf(carOrder);
            /********* 修改用车记录表end*************/

            /********* 修改订单总表记录begin *********/
            CommOrder commOrder = new CommOrder();

            commOrder.setOrderId(orderId);
            commOrder.setOrderStatus(CarConstant.ORDER_STATUS_7);
            commOrder.setUpdateBy(userId);
            commOrder.setUpdateTime(new Date());


            commOrderMapper.updateWithIfByOrderId(commOrder);
            /********* 修改订单总表记录end *********/

            /********* 添加订单操作流水记录begin *********/

            CommOrderDetailData commOrderDetailData = new CommOrderDetailData();

            commOrderDetailData.setId(CCUUID.getUUID());
            commOrderDetailData.setParkId(parkId);
            commOrderDetailData.setType1(CarConstant.COMM_ORDER_TYPE1);
            commOrderDetailData.setType2(CarConstant.ORDER_STATUS_7);
            commOrderDetailData.setOrderNo(entity.getOrderNo());
            commOrderDetailData.setOrderId(orderId);
            commOrderDetailData.setOrderStatus(CarConstant.ORDER_STATUS_7);
            commOrderDetailData.setCreateBy(userId);
            commOrderDetailData.setCreateName(userName);
            commOrderDetailData.setCreateTime(new Date());
            commOrderDetailData.setStatus1("1");

            commOrderDetailDataMapper.insert(commOrderDetailData);
            /********* 添加订单操作流水记录end *********/


            /********* 消息推送begin *********/
            // 查询该订单的司机
            Map<String, Object> driverMap = new HashMap<String, Object>();
            driverMap.put("orderId", orderId);
            CarDriver carDriver = carDriverMapper.findOneByMap(driverMap);
            String noticeType = CarConstant.MESSAGE_CAR_MSG;
            String noticeTitle = "评价";
            String noticeContent = "您收到了一条新的评价信息";
            String handleUrlMobile = systemConfig.getServiceUrl() + "/nsApp/pages/officialCars/orderDetail.html?orderId=" + orderId;
            String simpleDesc = "";
            String itemId = orderId;
            String parentId = "";

            pushMessageService.pushMessage(noticeType, noticeTitle, noticeContent, carDriver.getUserId(), parkId, handleUrlMobile, simpleDesc, itemId, parentId);
            /********* 消息推送end *********/


            result.setMessage("订单评价成功");
        } else {
            result.setMessage("该订单不允许评价");
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

    /**
     * 判断司机权限
     *
     * @param userId
     * @param parkId
     * @return
     */
    public String checkDriverPrivs(String userId, String parkId) {

        if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH) && checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {
            // 该用户同时拥有小车和中巴司机权限
            return "1";
        } else if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH)) {
            // 该用户拥有小车权限
            return "2";
        } else if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {
            // 该用户拥有中巴权限
            return "3";
        } else if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_RECEIPT)) {
            // 该用户拥有接单权限
            return "4";
        }
        return "0";
    }


    /**
     * 司机接单到达出发地操作状态
     * @param entity
     * @param orderId
     * @param userId
     * @param parkId
     */
    private void checkDriver(CarOrder entity, String orderId,String userId,String parkId){

        if (checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_RECEIPT)) {

            // 当前登陆用户是司机，查询该司机关联的用车订单表
            Map<String, Object> sqlMap = new HashMap<String, Object>();
            sqlMap.put("orderId", orderId);
            sqlMap.put("userId", userId);
            CarDriver carDriver = carDriverMapper.findOneByMap(sqlMap);

            if (null != carDriver) {
                // 当前用户是该订单的司机，则该用户可以接单
                Map<String, Object> driverMap = new HashMap<String, Object>();
                driverMap.put("driverName", carDriver.getDriverName());
                driverMap.put("driverPhone", carDriver.getDriverPhone());
                driverMap.put("carNumber", carDriver.getCarNumber());
                driverMap.put("carType", carDriver.getCarType());

                entity.setDriverMap(driverMap);

                // 司机操作根据司机接单状态显示
                if("0".equals(entity.getReceptionStatus())){
                    // 司机已接单则显示到达出发地
                    entity.setCurOperationType(CarConstant.ORDER_STATUS_4);
                }
                if("1".equals(entity.getReceptionStatus())){
                    // 司机已接单则显示到达出发地
                    entity.setCurOperationType(CarConstant.ORDER_STATUS_5);
                }
                if("2".equals(entity.getReceptionStatus())){
                    // 司机已到出发地显示用车完成
                    entity.setCurOperationType(CarConstant.ORDER_STATUS_6);
                }
            } else {
                // 已派单状态，如果当前用户不是该订单的司机，则查询司机信息
                //this.getDriverList(entity);
            }
        } else if (checkPrivs(userId, parkId, CarConstant.VEHICLERSERVE_SDISPATCH) || checkPrivs(userId, parkId, CarConstant.VEHICLERESERVE_MDISPATCH)) {

            // 调度员已派单，但司机未全部完成接单，则显示改派
            // 改派则查询调度员已派过单的司机信息
            entity.setDriverMap(this.getDriverMap(orderId, userId));
            // 查该派单员是否存在派单司机，存在则改派，不存在则派单
            Map<String, Object> receptionSqlMap = new HashMap<>();
            receptionSqlMap.put("orderId", orderId);
            receptionSqlMap.put("operationId",userId);
            List<CarReception> carReceptionList = carReceptionMapper.findListByMap(receptionSqlMap);

            if(null!=carReceptionList && carReceptionList.size()> 0 ){
                // 存在派单记录则改派
                // 原订单司机
                entity.setDriverMap(this.getDriverMap(orderId, userId));


                entity.setCurOperationType(CarConstant.ORDER_STATUS_3);
            }else{
                // 不存在派单记录则派单
                entity.setCurOperationType(CarConstant.ORDER_STATUS_2);

            }

        } else {
            //  其他用户则查询司机信息（申请人和审核人）
            entity.setDriverMap(this.getDriverMap(orderId, null));
        }

    }

}
