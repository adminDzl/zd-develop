package com.zshop.core.util;

import java.util.Random;

/**
 * @描述 生成随机数和随机字符串工具类
 *
 */
public class CCRandomUtil {

//	public static void main(String[] args){
//		
//		System.out.println(getRandomIndex(5));
//		System.out.println("随机生成8位不同的数："+generateDiffNum(8));
//		System.out.println("生成8位可能重复的数："+generateRandomNum(8));
//	}
//	
	
	//定义所有的字符组成的串
    public static final String allChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //定义所有的小写字符组成的串（不包括数字）
    public static final String letterChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //定义所有的数字字符组成的串
    public static final String numberChar = "0123456789";
	
	
	/**
	 * 生成长度为length的各个字符不重复的字符串，字符范围为0到9的数字。
	 * @param length
	 * @return
	 */
	public static String generateDiffNum(int length){
		char[] array = {'0','1','2','3','4','5','6','7','8','9'};
		Random rand = new Random();
		for (int i = 10; i > 10 - length; i--) {
			int index = rand.nextInt(i);
			char tmp = array[index];
			array[index] = array[i - 1];
			array[i - 1] = tmp;
		}
		String randomStr = "";
		for(int j = 0;j < length; j ++){
			randomStr = randomStr + array[j];
		}
		return randomStr;
	}
	
	/**
	 * 生成各位不相同的6位数
	 * @param length
	 * @return 整数
	 */
	public static int generateRandom(int length){
		int[] array = {0,1,2,3,4,5,6,7,8,9};
		Random rand = new Random();
		for (int i = 10; i > 1; i--) {
			int index = rand.nextInt(i);
			int tmp = array[index];
			array[index] = array[i - 1];
			array[i - 1] = tmp;
		}
		int result = 0;
		for(int i = 0; i < 6; i++){
			result = result * 10 + array[i];
		}
		return result;
	}
	
	/**
	 * 生成长度为length的各个字符不重复的字符串，字符范围为26个英文字母。
	 * @param length
	 * @return
	 */
	public static String generateRandomStr(int length){
		char[] array = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S',
						'T','U','V','W','X','Y','Z'};
		Random rand = new Random();
		for (int i = 26; i > 0; i--) {
			int index = rand.nextInt(i);
			char tmp = array[index];
			array[index] = array[i - 1];
			array[i - 1] = tmp;
		}
		
		String randomStr = "";
		for(int j = 0;j < length; j ++){
			randomStr = randomStr + array[j];
		}
		return randomStr;
	}
	
	// 随机产生codeCount字符，一般用于产生验证码。
	public static String getRandomChar(int codeCount) {
		// 随机数基集
		char[] codeSequence = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
				'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
				'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6',
				'7', '8', '9' };
		StringBuffer randomCode = new StringBuffer();
		Random random = new Random();
		// 随机产生基于26个大写字母和10数字的的验证码。
		for (int i = 0; i < codeCount; i++) {
			// 得到随机产生的验证码码。
			String strRand = String.valueOf(codeSequence[random.nextInt(36)]);
			randomCode.append(strRand);
		}
		String randomChar = String.valueOf(randomCode);
		return randomChar;
	}
	
	
	/**
	 * 生成验证码：生成随机数。
	 * 数可能重复
	 * @return
	 */
	public static String generateRandomNum(int length) {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for(int i = 0; i < length; i++) {
            sb.append(numberChar.charAt(random.nextInt( numberChar.length())));
        }
        return sb.toString();
    }
	
	/**
     * 产生长度为length的随机字符串（包括字母和数字）
     * @param length
     * @return
     */
    public static String generateString(int length) {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(allChar.charAt(random.nextInt(allChar.length())));
        }
        return sb.toString();
    }
    /**
     * 产生长度为length的随机字符串（包括字母，不包括数字）
     * @param length
     * @return
     */
    public static String generateMixString(int length) {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(letterChar.charAt(random.nextInt(letterChar.length())));
        }
        return sb.toString();
    }
    /**
     * 产生长度为length的随机小写字符串（包括字母，不包括数字）
     * @param length
     * @return
     */
    public static String generateLowerString(int length) {
        return generateMixString(length).toLowerCase();
    }
    /**
     * 产生长度为length的随机大写字符串（包括字母，不包括数字）
     * @param length
     * @return
     */
    public static String generateUpperString(int length) {
        return generateMixString(length).toUpperCase();
    }
    /**
     * 产生长度为length的'0'串
     * @param length
     * @return
     */
    public static String generateZeroString(int length) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            sb.append('0');
        }
        return sb.toString();
    }
    
	/**
	 * 随机获取0~totalNum之间的一个数值
	 * @param totalNum
	 * @return
	 */
	public static int getRandomIndex(Integer totalNum){
		Double d =  Math.ceil(Math.random()*totalNum) - 1;
		return d.intValue();
	}
}
