package com.zshop.core.util;



import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

/**
 * NIO工具类
 *
 */
public class CCNewIOUtil {
	
	public static StringBuffer readeFile(String filePath,String charCode) throws Exception {

		FileInputStream fis = new FileInputStream(filePath);
		
		StringBuffer sb=new StringBuffer();
		
		Charset charset = Charset.forName(charCode);
		
		//得到文件通道
		FileChannel fc = fis.getChannel();
		
		//指定大小为 1024 的缓冲区
		ByteBuffer bf = ByteBuffer.allocate(1024);
		
		// 读取通道中的下一块数据到缓冲区中
		// 缓冲区的 position 即为当前缓冲区中最后有效位置
		while (fc.read(bf) != -1) {

			//把缓冲中当前位置回复为零，前把缓冲区的 limit 设置为之前 position 值
			bf.flip();
			
			// 输出缓冲区中的内容
			while (bf.hasRemaining()) {
				sb.append(charset.decode(bf));
			}

			// 清理缓冲区，准备再次读取数据
			bf.clear();
		}
		return sb;
	}

	public static void writeFile(String filePaht,String value) throws IOException  {

		FileOutputStream fos = new FileOutputStream(filePaht);
	    // 得到文件通道
	    FileChannel fc = fos.getChannel();
	    // 指定大小为 1024 的缓冲区

	    ByteBuffer bf = ByteBuffer.allocate(1024);
	    for (int i = 0; i < value.length(); i++) {
	    	bf.putChar(value.charAt(i));
	    }
	    bf.flip();
	    fc.write(bf);
	    fc.close(); //关闭文件通道
	    fos.close(); //关闭文件输出流

	}

	public static void writeFile(String filePaht,StringBuffer value) throws IOException  {
			
		FileOutputStream fos = new FileOutputStream(filePaht);
		// 得到文件通道
		FileChannel fc = fos.getChannel();
		// 指定大小为 1024 的缓冲区
		
		ByteBuffer bf = ByteBuffer.allocate(1024);
		for (int i = 0; i < value.length(); i++) {
			bf.putChar(value.charAt(i));
		}
		bf.flip();
		fc.write(bf);
		fc.close(); //关闭文件通道
		fos.close(); //关闭文件输出流
	}

}
