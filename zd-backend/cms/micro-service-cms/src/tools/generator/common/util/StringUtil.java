package common.util;



public  class StringUtil {
	
//	public static  void main(String args[]){
//		System.out.println(lineToHump("sfsf_sys_user_dff_id"));
//		System.out.println("__________________________");
//		System.out.println(humpToLine("departJobId"));
//	}
	
	
	
	/**
	 * 驼峰转下划线
	 * @param str
	 * @return
	 */
	public static String humpToLine(String str){
		String newStr="";
		char tmp;
		for(int i=0;i<str.length();i++){
			tmp=str.charAt(i);
			if(Character.isUpperCase(tmp)){
				newStr+="_";
				newStr+=((tmp+"").toLowerCase());
			}else{
				newStr+=tmp;
			}
		}
		return newStr;
	}
	
	/**
	 * 下划线转驼峰
	 * 将demo_show_word 转换成 demoShowWord
	 * @param str
	 * @return
	 */
	public static String lineToHump(String str){
		str = str.toLowerCase();
		String newStr="";
		char tmp;
		for(int i=0;i<str.length();i++){
			tmp=str.charAt(i);
			if("_".equals(tmp+"")&&i!=str.length()-1){
				tmp=str.charAt(i+1);
				newStr+=(tmp+"").toUpperCase();
				i++;
			}else{
				newStr+=tmp;
			}
		}
		
		return newStr;
	}
	
	/**
	 * 首字母小写
	 * @param str
	 * @return
	 */
	public static String getFirstLower(String str) {
		return str.subSequence(0, 1).toString().toLowerCase() + str.subSequence(1, str.length());
	}
	/**
	 * 首字母大写
	 * @param str
	 * @return
	 */
	public static String getFirstUpper(String str) {
		return str.subSequence(0, 1).toString().toUpperCase() + str.subSequence(1, str.length());
	}
	
}
