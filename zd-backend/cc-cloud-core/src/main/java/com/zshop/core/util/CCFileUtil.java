package com.zshop.core.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.zshop.core.log.LogUtil;

/**
 * 文件工具类
 * 
 * @author maorp
 * 
 */
public class CCFileUtil {
	private static final LogUtil log = LogUtil.getLogger(CCFileUtil.class);

	/**
	 * 
	 * @param name
	 * @return
	 */
	public static final boolean creatDir(String name) {
		boolean success = Boolean.TRUE;

		File f = new File(name);
		if (!f.exists()) {
			success = f.mkdir();
		}
		return success;
	}

	public static void writeFile(String fileFullPath, String string) throws UnsupportedEncodingException, IOException {
		// TODO Auto-generated method stub
		FileOutputStream out;
		out = new FileOutputStream(fileFullPath, true);
		out.write(string.toString().getBytes("utf-8"));
		out.close();
	}

	/**
	 * 
	 * @param inputStream
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyInputStreamToFile(InputStream input, File destFile) throws IOException {

		FileOutputStream output = null;

		output = new FileOutputStream(destFile);
		byte[] b = new byte[1024 * 5];
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();

	}

	/**
	 * 
	 * @param inputStream
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyInputStreamToOutputStream(InputStream input, OutputStream output) throws IOException {

		byte[] b = new byte[1024 * 5];
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();

	}

	/**
	 * 
	 * @param sourceFile
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyFileToFile(File sourceFile, File destFile) throws IOException {

		FileInputStream input = null;
		FileOutputStream output = null;
		input = new FileInputStream(sourceFile);
		output = new FileOutputStream(destFile);
		byte[] b = new byte[1024 * 5];
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();
		input.close();

	}

	/**
	 * 
	 * @param file
	 */
	public static void deleteFile(File file) {
		if (file.exists()) {// 判断文件是否存在
			if (file.isFile()) {// 判断是否是文件
				file.delete();// 删除文件
			} else if (file.isDirectory()) {// 否则如果它是一个目录
				File[] files = file.listFiles();// 声明目录下所有的文件 files[];
				for (int i = 0; i < files.length; i++) {// 遍历目录下所有的文件
					deleteFile(files[i]);// 把每个文件用这个方法进行迭代
				}
				file.delete();// 删除文件夹
			}
		} else {
			// System.out.println("所删除的文件不存在");
		}
	}

	public static void scale(InputStream input, File destFile, int height, int width, boolean bb, String suffix) {

		try {

			double ratio = 0.0; // 缩放比例
			BufferedImage bi = ImageIO.read(input);
			Image itemp = bi.getScaledInstance(width, height, bi.SCALE_SMOOTH);
			// 计算比例
			if ((bi.getHeight() > height) || (bi.getWidth() > width)) {
				if (bi.getHeight() > bi.getWidth()) {
					ratio = (new Integer(height)).doubleValue() / bi.getHeight();
				} else {
					ratio = (new Integer(width)).doubleValue() / bi.getWidth();
				}
				AffineTransformOp op = new AffineTransformOp(AffineTransform.getScaleInstance(ratio, ratio), null);
				itemp = op.filter(bi, null);
			}
			itemp = rotateImg((BufferedImage) itemp, 90, null);

			ImageIO.write((BufferedImage) itemp, "JPEG", new File(destFile.toString()));

		} catch (IOException e) {
			log.error(e.toString());
		}

	}

	public static BufferedImage rotateImg(BufferedImage image, int degree, Color bgcolor) throws IOException {

		int iw = image.getWidth();// 原始图象的宽度
		int ih = image.getHeight();// 原始图象的高度
		int w = 0;
		int h = 0;
		int x = 0;
		int y = 0;
		degree = degree % 360;
		if (degree < 0)
			degree = 360 + degree;// 将角度转换到0-360度之间
		double ang = Math.toRadians(degree);// 将角度转为弧度

		/**
		 * 确定旋转后的图象的高度和宽度
		 */

		if (iw > ih) {//
			if (degree == 180 || degree == 0 || degree == 360) {
				w = iw;
				h = ih;
			} else if (degree == 90 || degree == 270) {
				w = ih;
				h = iw;
			} else {
				/*
				 * int d = iw + ih; w = (int) (d * Math.abs(Math.cos(ang))); h =
				 * (int) (d * Math.abs(Math.sin(ang))); w = (int) (sinVal*ih) +
				 * (int) (cosVal*iw); h = (int) (sinVal*iw) + (int) (cosVal*ih);
				 */
			}

			x = (w / 2) - (iw / 2);// 确定原点坐标
			y = (h / 2) - (ih / 2);
			BufferedImage rotatedImage = new BufferedImage(w, h, image.getType());
			Graphics2D gs = (Graphics2D) rotatedImage.getGraphics();
			if (bgcolor == null) {
				// rotatedImage =
				// gs.getDeviceConfiguration().createCompatibleImage(w, h,
				// Transparency.TRANSLUCENT);
			} else {
				// gs.setColor(bgcolor);
				// gs.fillRect(0, 0, w, h);//以给定颜色绘制旋转后图片的背景
			}

			AffineTransform at = new AffineTransform();
			at.rotate(ang, w / 2, h / 2);// 旋转图象
			at.translate(x, y);
			AffineTransformOp op = new AffineTransformOp(at, AffineTransformOp.TYPE_BICUBIC);
			op.filter(image, rotatedImage);
			image = rotatedImage;

		}

		return image;

	}

	// 文件上传处理
	public static Map<String, Object> ProcessFile(HttpServletRequest request, MultipartFile multipartFile) throws IOException {

		Map<String, Object> map = new HashMap<String, Object>();
		String originalFileName = multipartFile.getOriginalFilename(); // 源文件名

		// 文件后缀名
		String suffix = originalFileName.substring(originalFileName.lastIndexOf('.'), originalFileName.length());

		String basepath = request.getSession().getServletContext().getRealPath("/") ;

		File file = new File(basepath);
		if (!file.exists()) {
			file.mkdir(); // 如果目录不存在，创建目录
		}

		String filename = getRandomString(15);

		File files = new File(basepath + "/" + filename + suffix);
		files.createNewFile();

		FileOutputStream out = new FileOutputStream(files);
		out.write(multipartFile.getBytes());
		out.close();
	//	map.put("filePath", CommonContans.CONTENT_FILE_UP_TMP + "/" + filename + suffix);
		map.put("type", suffix);
		map.put("fileName", originalFileName);
		map.put("size", convertFileSize(multipartFile.getSize()));
		return map;

	}

	// 随机生成文件名
	public static String getRandomString(int length) { // length表示生成字符串的长度
		String base = "abcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}


	public static String convertFileSize(long filesize){
		String strUnit = "Bytes";
		String strAfterComma = "";
		int intDivisor = 1;
		if (filesize >= 1024 * 1024)
		{
			strUnit = "MB";
			intDivisor = 1024 * 1024;
		}else if (filesize >= 1024){
			strUnit = "KB";
			intDivisor = 1024;
		}
		if (intDivisor == 1)
			return filesize + " " + strUnit;
		strAfterComma = "" + 100 * (filesize % intDivisor) / intDivisor;
		if (strAfterComma == "")
			strAfterComma = ".0";
		return filesize / intDivisor + "." + strAfterComma + " " + strUnit;
	}

}
