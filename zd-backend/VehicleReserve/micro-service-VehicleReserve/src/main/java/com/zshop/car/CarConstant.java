package com.zshop.car;

/**
 * @Description: 公务用车常量类
 */
public class CarConstant {

    /**
     * 成功
     */
    public static final String MESSAGE_SUCCESS = "success";

    /**
     * 失败
     */
    public static final String MESSAGE_FAIL = "fail";

    /**
     * 0：待审批
     */
    public static final String ORDER_STATUS_0 = "0";
    /**
     * 1：已审批
     */
    public static final String ORDER_STATUS_1 = "1";
    /**
     * 2：已驳回
     */
    public static final String ORDER_STATUS_2 = "2";
    /**
     * 3：已派单
     */
    public static final String ORDER_STATUS_3 = "3";
    /**
     * 4、已接单
     */
    public static final String ORDER_STATUS_4 = "4";
    /**
     * 5、已到处理地
     */
    public static final String ORDER_STATUS_5 = "5";
    /**
     * 6、用车完成
     */
    public static final String ORDER_STATUS_6 = "6";
    /**
     * 7、已评价
     */
    public static final String ORDER_STATUS_7 = "7";
    /**
     * 8、已取消
     */
    public static final String ORDER_STATUS_8 = "8";

    /**
     * 订单类型前缀
     */
    public static final String ORDER_NO_YC = "YC";

    /**
     * 订单业务类型
     */
    public static final String COMM_ORDER_TYPE1 = "2";
    public static final String COMM_ORDER_TYPE1_NAME = "公务用车";

    /**
     * 类型2
     */
    public static final String COMM_ORDER_TYPE2 = "1";
    public static final String COMM_ORDER_TYPE2_NAME = "公务用车订单";


    /**
     * 公务用车图片url路径
     */
    public static final String COMM_ORDER_URL = "/car/carOrderList.jpg";

    /**
     * 公务用车-申请
     */
    public static final String VEHICLERSERVE_APPLY = "service:vehiclereserve:apply";

    /**
     * 公务用车-审核
     */
    public static final String VEHICLERSERVE_CHECK = "service:vehiclereserve:check";

    /**
     * 公务用车-小车派单
     */
    public static final String VEHICLERSERVE_SDISPATCH = "service:vehiclereserve:sdispatch";

    /**
     * 公务用车-中巴派单
     */
    public static final String VEHICLERESERVE_MDISPATCH = "service:vehiclereserve:mdispatch";


    /**
     * 公务用车-接单
     */
    public static final String VEHICLERESERVE_RECEIPT = "service:vehiclereserve:receipt";

    /**
     * 公务用车消息类型
     */
    public static final String MESSAGE_CAR_MSG = "CAR_MSG";
}
