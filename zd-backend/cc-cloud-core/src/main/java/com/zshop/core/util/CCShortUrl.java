package com.zshop.core.util;

/**
 * @ClassName: ShortUrl
 * @描述: 用于生成短链接 
 * 短链接:把原始链接很长的地址压缩,生成4个6个字母的短链接地址，存储取一个或多个短链接和长链接的映射，
 * 对请求进行转换成长链接。
 * 
 * 例如：http://www.abc.com/zAnuAn中解析短链接(zAnuAn),
 * 与数据库中存入的原始链接进行匹配，跳转到匹配到的原始链接.
 * 
 * @author malp@zshop.com
 * @date 2015年7月1日 下午5:02:32
 */
public class CCShortUrl {

//	public static void main(String[] args) {
//		String url = "http://www.sunchis.com";
//		for (String string : ShortText(url)) {
//			System.out.println(string);
//		}
//	}
	
	/**
	 * 生成短链接
	 * @param url
	 * @return
	 */
	public static String[] ShortText(String url) {
		String key = "CcPlus"; // 自定义生成MD5加密字符串前的混合KEY
		String[] chars = new String[] { // 要使用生成URL的字符
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
				"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B",
				"C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

		String hex = CCMD5.getMd5Str(key + url);
		int hexLen = hex.length();
		int subHexLen = hexLen / 8;
		String[] ShortStr = new String[4];

		for (int i = 0; i < subHexLen; i++) {
			String outChars = "";
			int j = i + 1;
			String subHex = hex.substring(i * 8, j * 8);
			long idx = Long.valueOf("3FFFFFFF", 16) & Long.valueOf(subHex, 16);

			for (int k = 0; k < 6; k++) {
				int index = (int) (Long.valueOf("0000003D", 16) & idx);
				outChars += chars[index];
				idx = idx >> 5;
			}
			ShortStr[i] = outChars;
		}

		return ShortStr;
	}
}
