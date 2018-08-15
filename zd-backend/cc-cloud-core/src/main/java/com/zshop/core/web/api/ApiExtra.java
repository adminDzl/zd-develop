package com.zshop.core.web.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Title :
 * Author : luffyjet
 * Date : 2017/12/20
 * Project : ccarch
 * Site : http://www.luffyjet.com
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiExtra {

    /**
     * 接口使用权限key，格式如：account:create
     */
    String permission() default "";
    
    /**
     * 接口创建者
     * @return
     */
    String creator() default "";

    /**
     * 接口更新时间
     * @return
     */
    String createTime() default "";
    
    /**
     * 接口更新者
     * @return
     */
    String updator() default "";
    
    /**
     * 接口更新时间
     * @return
     */
    String updateTime() default "";

    /**
     * 接口版本
     * @return
     */
    double version() default 1.0;

    /**
     * 接口使用范围：0 内外 1 外部 , 2 内部
     * @return
     */
    int apiScope() default 1;

    /**
     * 验证类型：anon 不验证，login 登录，auth token验证
     * @return
     */
    String verificationType() default "auth";
}
