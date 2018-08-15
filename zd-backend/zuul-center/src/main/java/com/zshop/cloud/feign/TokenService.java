package com.zshop.cloud.feign;

import com.zshop.cloud.core.controller.ResultData;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value="SYSTEM")
public interface TokenService {

	
	@GetMapping("/security/api/admin/createtoken")
    ResultData createToken(
			@RequestParam("userId")String userId,
			@RequestParam("userName")String userName,
			@RequestParam("parkId")String parkId,
			@RequestParam("grant")String grant
			); 
}
