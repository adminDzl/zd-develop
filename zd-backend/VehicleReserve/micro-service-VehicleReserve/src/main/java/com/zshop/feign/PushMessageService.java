package com.zshop.feign;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "SYSTEM")
public interface PushMessageService {

    /**
     * 推送消息至用户
     *
     * @param noticeType      消息类型
     * @param noticeTitle     消息标题
     * @param noticeContent   消息内容
     * @param userId          用户ID
     * @param parkId          园区ID
     * @param handleUrlMobile 消息详情对应H5地址
     * @param simpleDesc      消息简述
     * @param itemId          模块项目数据id，如果是活动就为活动id
     * @param parentId        产生当前推送所关联的数据id，如果是评论活动则是评论id，在我的消息里面可以立即回复此时就相当于父id
     * @return ResultData
     */
    @PostMapping("/push/pushMessage.json")
    public Object pushMessage(@RequestParam("noticeType") String noticeType, @RequestParam("noticeTitle") String noticeTitle, @RequestParam("noticeContent") String noticeContent, @RequestParam("userId") String userId, @RequestParam("parkId") String parkId, @RequestParam("handleUrlMobile") String handleUrlMobile, @RequestParam("simpleDesc") String simpleDesc, @RequestParam("itemId") String itemId, @RequestParam("parentId") String parentId);
}
