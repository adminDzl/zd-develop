package com.zshop.core.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;


import com.zshop.core.log.LogUtil;

/**
 *  @描述 序列化工具类
 */
public class CCSerializeUtil {
	
	private static LogUtil logger = LogUtil.getLogger(CCSerializeUtil.class);

	/**
	 * 反序列化
	 * @param bytes
	 * @param t
	 * @return
	 */
	public static Object deserialize(byte[] bytes) {
		if (bytes == null || bytes.length == 0) {
			return null;
		}
		ByteArrayInputStream bais = null;
		ObjectInputStream bis = null;

		try {
			bais = new ByteArrayInputStream(bytes);
			bis = new ObjectInputStream(new BufferedInputStream(bais));
			return bis.readObject();
			
		} catch (ClassNotFoundException e) {
			logger.error("Failed to deserialize object type",e.getMessage());
		} catch (Exception e) {
			logger.error("Failed to deserialize",e.getMessage());
		} finally {
			try {
				bais.close();
				bis.close();
			} catch (IOException e) {
				logger.error("Failed to close serialize", e.getMessage());
			}
		}
		return null;
	}

	/**
	 * 序列化
	 * @param obj
	 * @return
	 */
	public static byte[] serialize(Object obj) {
		if (obj == null) {
			return null;
		}
		ByteArrayOutputStream baos = null;
		ObjectOutputStream oos = null;
		try {
			baos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(baos);
			oos.writeObject(obj);
		} catch (IOException e) {
			logger.error("Failed to serialize", e.getMessage());
		} finally {
			try {
				baos.close();
				oos.close();
			} catch (IOException e) {
				logger.error("Failed to close serialize", e.getMessage());
			}
		}
		return baos.toByteArray();
	}

}
