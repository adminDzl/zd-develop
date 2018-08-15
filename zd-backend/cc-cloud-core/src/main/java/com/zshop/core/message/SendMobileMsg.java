package com.zshop.core.message;

/**
 * @ClassName: SendMobileCode
 * @Description: 描述该类要完成的功能
 * @author xiaopeng
 * @date: 2014 下午9:15:46
 * @version JDK 1.6
 */
public class SendMobileMsg implements Runnable{
	
	private String mobileNo;
	private Integer sendType;
	private String sendMsg;
	
	public SendMobileMsg(String mobileNo,Integer sendType,String sendMsg){
		this.mobileNo = mobileNo;
		this.sendType = sendType;
		this.sendMsg = sendMsg;
	}

	@Override
	public void run() {
		MessageSenderByalidayu.send(mobileNo, sendMsg);
	}
}

