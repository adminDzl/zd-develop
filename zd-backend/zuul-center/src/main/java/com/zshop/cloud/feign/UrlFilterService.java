package com.zshop.cloud.feign;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.zshop.cloud.feign.entity.PermissionInfo;

@FeignClient(value="SYSTEM")
public interface UrlFilterService {

	@GetMapping("/security/urlfilter/allUrlList")
	List<PermissionInfo> allUrlList(); 
	
}
