package com.zshop.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 */
@FeignClient(value = "common-service")
public interface CommonPrimissionService {

    /**
     * 获取订单评价详情
     *
     * @param orderId 订单id
     * @param parkId  园区id
     * @return
     */
    @PostMapping("/common/rating/addRating")
    public String addRating(@RequestParam("userId") String userId, @RequestParam("parkId") String parkId, @RequestParam("type") String type, @RequestParam("orderId") String orderId, @RequestParam("ratingType") String ratingType, @RequestParam("ratingScore") Integer ratingScore, @RequestParam("title") String title, @RequestParam("ratingDesc") String ratingDesc);


    /**
     * 获取订单评价详情
     *
     * @param orderId 订单id
     * @param parkId  园区id
     * @return
     */
    @GetMapping("/common/rating/getRatingInfo")
    public Object getRatingInfo(@RequestParam("orderId") String orderId, @RequestParam("parkId") String parkId);

    /**
     * 添加订单总表信息
     * @param order 订单信息，以json形式
     * @return
     */
    @PostMapping("/common/order/addCommOrder")
    public String addCommOrder(@RequestParam("order") String order);

    /**
     * 添加订单总表信息
     * @param order 订单信息，以json形式
     * @return
     */
    @PostMapping("/common/order/updateCommOrder")
    public String updateCommOrder(@RequestParam("order") String order);

    /**
     * 添加订单操作流水信息
     * @param orderDetail 订单操作流水信息，以json形式
     *      * @return
     */
    @PostMapping("/common/orderdetail/addCommonOrderDetail")
    public String addCommonOrderDetail(@RequestParam("orderDetail") String orderDetail);
}
