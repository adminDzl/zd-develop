package com.zshop.core.web.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

/**
 * Title :
 * Author : luffyjet
 * Date : 2017/12/20
 * Project : ccarch
 * Site : http://www.luffyjet.com
 */
@Component
public class ApiCache {
    private List<ApiInfo> apiInfoList = new ArrayList<ApiInfo>();

    public void add(ApiInfo apiInfo) {
        apiInfoList.add(apiInfo);
    }

    public ApiInfo get(int positon) {
        return apiInfoList.get(positon);
    }

    public List<ApiInfo> all() {
        return apiInfoList;
    }

    public void clear() {
        apiInfoList.clear();
    }
}
