/*
 * 文件名：BigDecimalUtil.java	 
 * 时     间：上午9:51:39
 * 作     者：kuangkaizhan     
 * 版     权： 2014-2022  智慧园区, 公司保留所有权利.
 * 联     系：www.szyungu.com
 */
package com.zshop.core.util;

import java.math.BigDecimal;

/**
 * @ClassName: BigDecimalUtil
 * @Description: 数字运算帮助类
 * @author kuangkaizhan
 * @date 2014年11月17日 上午9:51:39
 */
public class CCBigDecimalUtil
{   
	
	/**
	 * 加
	 * @param a
	 * @param b
	 * @return
	 */
	public static BigDecimal add(BigDecimal a, BigDecimal b) {
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
        return a.add(b);
    }
	
	/**
	 * 减
	 * @param a
	 * @param b
	 * @return
	 */
	public static BigDecimal sub(BigDecimal a, BigDecimal b) {
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
        return a.subtract(b);
    }
	
	/**
	 * 乘
	 * @param a
	 * @param b
	 * @return
	 */
	public static BigDecimal mul(BigDecimal a, BigDecimal b) {
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
        return a.multiply(b);
    }
	
	/**
	 * 
	 * @方法名称: division 
	 * @描述: 
	 *     b除以a
	 *
	 * @参数:
	 *    @param a
	 *    @param b
	 *    @return
	 *
	 * @返回类型: BigDecimal
	 * @作者:kuangkaizhan
	 * @可能抛出异常:
	 */
	public static BigDecimal division(BigDecimal b,BigDecimal a)
	{
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
		if(a.equals(BigDecimal.ZERO)){
			return null;
		}
		return b.divide(a,2);
	}
	/**
	 * 
	 * @方法名称: divisionDiscount 
	 * @描述: 
	 *     b除以a*10 得到折扣
	 *
	 * @参数:
	 *    @param a
	 *    @param b
	 *    @return
	 *
	 * @返回类型: BigDecimal
	 * @作者:kuangkaizhan
	 * @可能抛出异常:
	 */
	public static BigDecimal divisionDiscount(BigDecimal b,BigDecimal a)
	{
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
		if(a.equals(BigDecimal.ZERO)){
			return null;
		}
		b = b.multiply(new BigDecimal("10"));
		return b.divide(a,1,BigDecimal.ROUND_HALF_UP);
	}
	
	/**
	 * 
	 * @方法名称: divisionPercent 
	 * @描述: 
	 *     b除以a*100 得到百分比
	 *
	 * @参数:
	 *    @param a
	 *    @param b
	 *    @return
	 *
	 * @返回类型: BigDecimal
	 * @作者:kuangkaizhan
	 * @可能抛出异常:
	 */
	public static BigDecimal divisionPercent(BigDecimal b,BigDecimal a)
	{
		if(b==null) b=BigDecimal.ZERO;
		if(a==null) a= BigDecimal.ZERO;
		if(a.equals(BigDecimal.ZERO)){
			return null;
		}
		b = b.multiply(new BigDecimal("100"));
		return b.divide(a,1,BigDecimal.ROUND_HALF_UP);
	}
	
	
	public static void main(String[] args)
	{
		System.out.println(divisionDiscount(new BigDecimal("600"), new BigDecimal("510")));
		
	}
}
