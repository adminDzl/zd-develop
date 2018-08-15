package com.zshop.cloud.feign;

import java.util.Set;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value="SYSTEM")
public interface UserPrimissionService {

	/**
	 * 获取用户权限
	 * @return
	 */
//	@GetMapping("/baseinfo/api/user/userPrimission")
//	public List<UserPrimission> userprimmission(@RequestParam("userId")String userId,@RequestParam("parkId")String parkId); 

	@GetMapping("/baseinfo/userinfo/api/privs")
	public Set<String> userPrivs(@RequestParam("userId")String userId,@RequestParam("parkId")String parkId); 
	@GetMapping("/api/api/permission")
	public String resourcePriv(@RequestParam("url")String url); 
}
