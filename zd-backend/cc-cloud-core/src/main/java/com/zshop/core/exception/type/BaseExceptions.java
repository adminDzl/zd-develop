package com.zshop.core.exception.type;

/**
 * 
 * @ClassName: DiyExceptions
 * @Description: 提供错误码定义，系统中所有的异常从此处获取，错误码由以下三部分构成：
 * 				 10000-00001-00001，第一部分表示模块，第二部分表示功能，第三部分表示错误;
 * 				 00000：系统异常|00001：系统管理模块
 * @author xiaopeng
 */
public enum BaseExceptions{   
	
    	//系统异常
		CommonException("00000-00001-00001","程序发生异常"),//所有业务代码没有处理的异常就打印该异常代码
        JsonParseException("00000-00001-00002","Json解析异常"),
        IoException("00000-00001-00003","系统IO发生异常"),
        DataQueryException("00000-00001-00007","数据查询发生异常"),
        NotHaveParameter("00000-00001-00009","参数未传入"),
        TokenIsOutOfDateException("401","token is out of date"),
        TokenIsInvalidException("401","token is invalid"),
        
        //系统管理模块
        UserNameDuplicateException("10000-00001-00001","用户名重复"),
        UserNotExists("10000-00001-00002","用户不存在"),
        InvitationCodeNotExists("10000-00001-00006","邀请码不存在"),
        UserNamePasswordNotMatch("10000-00001-00003","用户名或密码不正确"),
        InviteUserAlreadyExist("10000-00001-00004","邀请用户已经在当前公司下"),
        UserAlreadyJoinInCompany("10000-00001-00007","您已加入该公司"),
        OldPasswordNotMatch("10000-00001-00005","原密码不正确"),
        RoleNameDuplicateException("10000-00002-00001","角色名称重复"),
        RegisterCaptureCodeNotMatch("10000-00003-00001","验证码不正确"),
        RegisterCaptureCodeReachMax("10000-00003-00002","手机注册短信验证码发送达到当天最大次数"),
        FindPasswordCaptureCodeReachMax("10000-00003-00003","手机找回密码短信验证码发送达到当天最大次数"),
        IsNotAvailableEmail("10000-00003-00004","邮箱格式不正确"),
        IsNotAvailableMobileNo("10000-00003-00005","手机格式不正确"),
        IsNotAvailableCompanyName("10000-00003-00010","公司名称已经存在"),
        MobileNoHasBeenUsed("10000-00003-00006","手机号码已被占用"),
        EmailHasBeenUsed("10000-00003-00007","邮箱已被占用"),
        RegisterCaptureCodeSendError("10000-00003-00008","手机注册短信验证码发送失败"),
        UserNameCannotBeNull("10000-00003-00009","用户名不能为空"),
        UserRealNameIsNull("10000-00003-00010","用户真实姓名为空"),
        CompanyInfoNotExist("10000-00004-00001","公司信息不存在"),
        MemberFileIsNull("10000-00004-00002","文件或文件内容不能为空"),
        MemberFileFormatNotOk("10000-00004-00003","文件类型不匹配,请使用模板"),
        PARAMETERISNULL("10000-00004-00004","请传入参数值"),
        FAILUREREQUEST("10000-00004-00005","该链接已经失效!")
        ;
       
        private BaseExceptions(String c,String m){   
        	this.code=c;   
        	this.message=m;
        }     
        
        private String code;  
        private String message;
        
		public String getCode() {
			return code;
		}
		public String getMessage() {
			return message;
		}
		
		
		//测试
//		public static void main(String[] args){
//			System.out.println(BaseExceptions.FAILUREREQUEST.message);
//		}
}  
