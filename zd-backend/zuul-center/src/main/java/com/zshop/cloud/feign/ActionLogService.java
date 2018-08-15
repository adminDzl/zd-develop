package com.zshop.cloud.feign;

import com.zshop.cloud.core.controller.ResultData;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "SYSTEM")
public interface ActionLogService {

    @PostMapping("/baseinfo/actionlog/addSave")
    ResultData addLog(
            @RequestHeader(name = "Authorization", required = true) String token,
            @RequestParam("url") String url,
            @RequestParam("method") String method,
            @RequestParam("result") String result,
            @RequestParam("errorMessage") String errorMessage,
            @RequestParam("requestIp") String requestIp,
            @RequestParam("parameter") String parameter,
            @RequestParam("tbName") String tbName,
            @RequestParam("tbMethod") String tbMethod
            );
}
