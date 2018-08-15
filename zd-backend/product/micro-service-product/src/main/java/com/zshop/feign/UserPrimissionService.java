package com.zshop.feign;

import com.zshop.core.base.controller.ResultData;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;
import java.util.Set;

@FeignClient(value = "SYSTEM")
public interface UserPrimissionService {

    /**
     * 获取用户权限
     *
     * @return
     */
    @GetMapping("/ccapi/baseinfo/userinfo/privs")
    public Set<String> userPrivs();
//    @GetMapping("/baseinfo/userinfo/api/privs")
//    public Set<String> userPrivs(@RequestParam("userId") String userId, @RequestParam("parkId") String parkId);

//    @GetMapping("/baseinfo/userinfo/api/check")
//    public ResultData userInfo(@RequestHeader(name = "Authorization", required = true) String token);

    /**
     * 获取用户资料
     *
     * @return
     */
    @GetMapping("/ccapi/baseinfo/userinfo/user")
    public Map<String,Object> getUserDetail();
//    @GetMapping("/baseinfo/user/getUserDetail")
//    public Map<String,Object> getUserDetail(@RequestHeader(name = "id", required = true) String id);


    /**
     * 根据用户权限获取用户id集合
     * @param permission
     * @return
     */
    @GetMapping(value = "/ccapi/authority/auth/permitUserIds")
    public Set<String> getUserIdByPrivs(@RequestParam("permission") String permission);
//    @GetMapping(value = "/authority/auth/api/userIds")
//    public Set<String> getUserIdByPrivs(@RequestParam("permission")String permission);


    /**
     * 根据部门id获取部门信息
q    * @return
     */
    @GetMapping(value = "/baseinfo/basDept/initEdit")
    public ResultData getDeptInfo(@RequestParam("id") String id);
}
