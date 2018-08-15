package com.zshop.car.order.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zshop.car.reception.entity.CarReception;
import com.zshop.common.rating.entity.CommRating;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


/**
 * @Description: 用车订单表
 * @author: Administrator
 * @date: 2018-04-11 17:29:44
 */
public class CarOrder implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 订单id
     */
    private String id;
    /**
     * 园区id
     */
    private String parkId;
    /**
     * 订单号
     */
    private String orderNo;
    /**
     * 事由
     */
    private String reason;
    /**
     * 起始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;
    /**
     * 结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;
    /**
     * 起始地址
     */
    private String startAddress;
    /**
     * 结束地址
     */
    private String endAddress;
    /**
     * 是否选择小车
     */
    private String isSamllCar;
    /**
     * 小车数量
     */
    private Integer smallCarNum;
    /**
     * 是否选择中巴
     */
    private String isMidCar;
    /**
     * 中巴数量
     */
    private Integer midCarNum;
    /**
     * 用车类型
     */
    private String useType;
    /**
     * 订单状态
     */
    private String orderStatus;
    /**
     * 预定人
     */
    private String orderBy;
    /**
     * 预定时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date orderTime;
    /**
     * 预定部门
     */
    private String orderDept;
    /**
     * 附件地址
     */
    private String fileUrl;
    /**
     * 备注
     */
    private String remark;
    /**
     * 创建人
     */
    private String createBy;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;
    /**
     * 修改人
     */
    private String updateBy;
    /**
     * 修改时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;
    /**
     * 状态1
     */
    private String status1;
    /**
     * 状态2
     */
    private String status2;
    /**
     * 驳回理由
     */
    private String ext1;
    /**
     *
     */
    private String ext2;
    /**
     *
     */
    private String ext3;
    /**
     *
     */
    private String ext4;
    /**
     *
     */
    private String ext5;
    /**
     *
     */
    private String ext6;

    /**
     * 当前用户可执行的动作类型
     * 0：取消订单 1：审核通过、驳回 2：派单 3：改派 4接单 5：到达出发地 6：用车完成
     */
    private String curOperationType;

    /**
     * 领导人信息，以json形式储存
     */
    private String leader;

    /**
     * 司机列表
     */
    private List<CarReception> driverList;

    /**
     * 订单详情司机信息
     */
    private Map<String, Object> driverMap;


    /**
     * 预定人电话
     */
    private String orderPhone;

    /**
     * 评价对象
     */
    private CommRating commRating;

    /**
     * 附件列表
     */
    private List<String> fileUrlList;

    /**
     * 司机接单状态（0：派单，1：接单，2：到达出发地，3：用车完成）
     */
    private String receptionStatus;

    /**
     * 驳回理由(前台显示，数据库用ext1存储)
     */
    private String repulseReason;

    /**
     * 申请人
     */
    private String realname;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setParkId(String parkId) {
        this.parkId = parkId;
    }

    public String getParkId() {
        return this.parkId;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOrderNo() {
        return this.orderNo;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReason() {
        return this.reason;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getStartTime() {
        return this.startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getEndTime() {
        return this.endTime;
    }

    public void setStartAddress(String startAddress) {
        this.startAddress = startAddress;
    }

    public String getStartAddress() {
        return this.startAddress;
    }

    public void setEndAddress(String endAddress) {
        this.endAddress = endAddress;
    }

    public String getEndAddress() {
        return this.endAddress;
    }

    public void setIsSamllCar(String isSamllCar) {
        this.isSamllCar = isSamllCar;
    }

    public String getIsSamllCar() {
        return this.isSamllCar;
    }

    public void setSmallCarNum(Integer smallCarNum) {
        this.smallCarNum = smallCarNum;
    }

    public Integer getSmallCarNum() {
        return this.smallCarNum;
    }

    public void setIsMidCar(String isMidCar) {
        this.isMidCar = isMidCar;
    }

    public String getIsMidCar() {
        return this.isMidCar;
    }

    public void setMidCarNum(Integer midCarNum) {
        this.midCarNum = midCarNum;
    }

    public Integer getMidCarNum() {
        return this.midCarNum;
    }

    public void setUseType(String useType) {
        this.useType = useType;
    }

    public String getUseType() {
        return this.useType;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getOrderStatus() {
        return this.orderStatus;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getOrderBy() {
        return this.orderBy;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Date getOrderTime() {
        return this.orderTime;
    }

    public void setOrderDept(String orderDept) {
        this.orderDept = orderDept;
    }

    public String getOrderDept() {
        return this.orderDept;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileUrl() {
        return this.fileUrl;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getUpdateTime() {
        return this.updateTime;
    }

    public void setStatus1(String status1) {
        this.status1 = status1;
    }

    public String getStatus1() {
        return this.status1;
    }

    public void setStatus2(String status2) {
        this.status2 = status2;
    }

    public String getStatus2() {
        return this.status2;
    }

    public void setExt1(String ext1) {
        this.ext1 = ext1;
    }

    public String getExt1() {
        return this.ext1;
    }

    public void setExt2(String ext2) {
        this.ext2 = ext2;
    }

    public String getExt2() {
        return this.ext2;
    }

    public void setExt3(String ext3) {
        this.ext3 = ext3;
    }

    public String getExt3() {
        return this.ext3;
    }

    public void setExt4(String ext4) {
        this.ext4 = ext4;
    }

    public String getExt4() {
        return this.ext4;
    }

    public void setExt5(String ext5) {
        this.ext5 = ext5;
    }

    public String getExt5() {
        return this.ext5;
    }

    public void setExt6(String ext6) {
        this.ext6 = ext6;
    }

    public String getExt6() {
        return this.ext6;
    }

    public String getCurOperationType() {
        return curOperationType;
    }

    public void setCurOperationType(String curOperationType) {
        this.curOperationType = curOperationType;
    }

    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader;
    }

    public List<CarReception> getDriverList() {
        return driverList;
    }

    public void setDriverList(List<CarReception> driverList) {
        this.driverList = driverList;
    }

    public String getOrderPhone() {
        return orderPhone;
    }

    public void setOrderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
    }

    public Map<String, Object> getDriverMap() {
        return driverMap;
    }

    public void setDriverMap(Map<String, Object> driverMap) {
        this.driverMap = driverMap;
    }

    public CommRating getCommRating() {
        return commRating;
    }

    public void setCommRating(CommRating commRating) {
        this.commRating = commRating;
    }

    public List<String> getFileUrlList() {
        return fileUrlList;
    }

    public void setFileUrlList(List<String> fileUrlList) {
        this.fileUrlList = fileUrlList;
    }

    public String getReceptionStatus() {
        return receptionStatus;
    }

    public void setReceptionStatus(String receptionStatus) {
        this.receptionStatus = receptionStatus;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getRepulseReason() {
        return repulseReason;
    }

    public void setRepulseReason(String repulseReason) {
        this.repulseReason = repulseReason;
    }
}

