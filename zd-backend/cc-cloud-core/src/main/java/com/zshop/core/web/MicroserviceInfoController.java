package com.zshop.core.web;

import java.util.List;

import com.zshop.core.log.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zshop.core.web.api.ApiCache;
import com.zshop.core.web.api.ApiInfo;

/**
 * @Description: 微服务信息endpoint
 * @author: fangwj
 * @date: 2018-04-28 11:00:00
 */
@RestController
public class MicroserviceInfoController {

	private final LogUtil logger = LogUtil.getLogger(this.getClass());

	@Autowired
	LoadBalancerClient loadBalancerClient;

	@Autowired
	private ApiCache apiCache;

	@GetMapping("${sysConfig.info.apis:/apis}")
	public List<ApiInfo> apis() {
		logger.debug("api info read.");
		return apiCache.all();
	}

	/*@GetMapping(value = "${sysConfig.info.host:/host}")
	public ResultData getHostIp(String microservice) {
		if (StringUtils.isBlank(microservice)) {
			throw new ParameterException("请输入微服务名称！");
		}
		ResultData result = new ResultData();
		ServiceInstance serviceInstance = loadBalancerClient.choose(microservice);
		String url = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort();
		logger.debug("fetch "+microservice+" from ribbon, return:"+url);
		result.setMapData("name",microservice);
		result.setMapData("host",url);
		return result;
	}*/
}
