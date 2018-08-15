package com.zshop.webapp.config.base;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component(value="carSystemConfig")
@ConfigurationProperties(prefix = "sysConfig")
public class SystemConfig {

	
	/**
	 * 本地化部署园区id
	 */
	public String localPark;
	
	/**
	 * 正式文件服务器
	 */
	public String fileService;

	/**
	 * 正式文件存放位置
	 */
	public String upLocalFilePath;
	
	/**
	 * 正式文件服务器
	 */
	public String tempFileService;
	/**
	 * 缓存文件路径
	 */
	public String tempUpLocalFilePath;

	/**
	 * 附件上传服务器url
	 */
	public String fileUploadUrl;

	/**
	 * 附件域名url
	 */
	public String filePreviewUrl;

	/**
	 * 服务器域名
	 */
	public String serviceUrl;

	/**
	 * 公务用车图片地址
	 */
	public String carImage;

	
	
	public String getLocalPark() {
		return localPark;
	}
	public void setLocalPark(String localPark) {
		this.localPark = localPark;
	}
	public String getFileService() {
		return fileService;
	}
	public void setFileService(String fileService) {
		this.fileService = fileService;
	}
	public String getUpLocalFilePath() {
		return upLocalFilePath;
	}
	public void setUpLocalFilePath(String upLocalFilePath) {
		this.upLocalFilePath = upLocalFilePath;
	}
	public String getTempFileService() {
		return tempFileService;
	}
	public void setTempFileService(String tempFileService) {
		this.tempFileService = tempFileService;
	}
	public String getTempUpLocalFilePath() {
		return tempUpLocalFilePath;
	}
	public void setTempUpLocalFilePath(String tempUpLocalFilePath) {
		this.tempUpLocalFilePath = tempUpLocalFilePath;
	}

	public String getFileUploadUrl() {
		return fileUploadUrl;
	}

	public void setFileUploadUrl(String fileUploadUrl) {
		this.fileUploadUrl = fileUploadUrl;
	}

	public String getFilePreviewUrl() {
		return filePreviewUrl;
	}

	public void setFilePreviewUrl(String filePreviewUrl) {
		this.filePreviewUrl = filePreviewUrl;
	}

	public String getServiceUrl() {
		return serviceUrl;
	}

	public void setServiceUrl(String serviceUrl) {
		this.serviceUrl = serviceUrl;
	}

	public String getCarImage() {
		return carImage;
	}

	public void setCarImage(String carImage) {
		this.carImage = carImage;
	}
}
