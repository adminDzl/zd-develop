package common.util;

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
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

public class FileUtil {
	
	/**
	 * 创建文件夹
	 * @param name
	 * @return true/false
	 */
	public static final boolean creatDir(String fileName) {
		boolean success = Boolean.TRUE.booleanValue();

		File f = new File(fileName);
		if (!f.exists()) {
			success = f.mkdir();
		}
		return success;
	}
	
	/**
	 * 创建文件夹
	 * @param filePath
	 * @return file 对象
	 */
	public static File createFolder(String filePath) {
		File file = new File(filePath);
		if (!file.exists()) {
			file.mkdirs();
		}
		return file;
	}
	/**
	 * 创建文件,及该文件所属文件夹
	 */
	public static File createFileAndFolder(String fileName) throws IOException {
		File file = new File(fileName);
		if (file.exists()) {
			file.delete();
		}else if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		file.createNewFile();
		return file;
	}

	/**
	 * 
	 * 搜索指定目录下所有文件 
	 * @param rootPath
	 * @return File[]
	 */
	public static File[] scanAllFile(String rootPath) {
		
		File root = new File(rootPath);
		List<File> list = null;
		if(root.isDirectory()){
			list = new ArrayList<File>(1024);
			scanFile(root, list);
		}
		return list!=null && list.size()>0 ? list.toArray(new File[list.size()]) : null;
	}
	/**
	 * 深度扫描文件
	 * @param root
	 * @param list
	 */
	private static void scanFile(File root,List<File> list){
		
		File[] temp = root.listFiles();
		for (File file : temp) {
			if(file.isDirectory()){
				scanFile(file, list);
			}else {
				list.add(file);
			}
		}
	}

	/**
	 * 保存数据到文件
	 * @param fileFullPath
	 * @param string
	 */
	public static void writeFile(String fileFullPath, String string) throws UnsupportedEncodingException, IOException {
		FileOutputStream out = new FileOutputStream(fileFullPath, true);//以追加方式
		out.write(string.toString().getBytes("utf-8"));
		out.close();
	}
	/**
	 * @param input
	 * @param destFile
	 * @throws IOException
	 */
	public static void copyInputStreamToFile(InputStream input, File destFile) throws IOException {
		FileOutputStream output = null;

		output = new FileOutputStream(destFile);
		byte[] b = new byte[1024*10]; //10KB = 1024B * 10 = 1024*8bit * 10 
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();
	}

	public static void copyInputStreamToOutputStream(InputStream input, OutputStream output) throws IOException {
		byte[] b = new byte[1024*10];
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();
	}

	public static void copyFileToFile(File sourceFile, File destFile) throws IOException {
		FileInputStream input = null;
		FileOutputStream output = null;
		input = new FileInputStream(sourceFile);
		output = new FileOutputStream(destFile);
		byte[] b = new byte[1024*10];
		int len;
		while ((len = input.read(b)) != -1) {
			output.write(b, 0, len);
		}
		output.flush();
		output.close();
		input.close();
	}

	public static void deleteFile(File file) {
		if (file.exists()) {
			if (file.isFile()) {
				file.delete();
			} else if (file.isDirectory()) {
				File[] files = file.listFiles();
				for (int i = 0; i < files.length; i++) {
					deleteFile(files[i]);
				}
				file.delete();
			}
		}
	}

	public static void scale(InputStream input, File destFile, int height, int width, boolean bb, String suffix) {
		try {
			double ratio = 0.0D;
			BufferedImage bi = ImageIO.read(input);
			Image itemp = bi.getScaledInstance(width, height, 4);
			if ((bi.getHeight() > height) || (bi.getWidth() > width)) {
				if (bi.getHeight() > bi.getWidth()) {
					ratio = new Integer(height).doubleValue() / bi.getHeight();
				} else {
					ratio = new Integer(width).doubleValue() / bi.getWidth();
				}
				AffineTransformOp op = new AffineTransformOp(AffineTransform.getScaleInstance(ratio, ratio), null);

				itemp = op.filter(bi, null);
			}
			itemp = rotateImg((BufferedImage) itemp, 90, null);

			ImageIO.write((BufferedImage) itemp, "JPEG", new File(destFile.toString()));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static BufferedImage rotateImg(BufferedImage image, int degree, Color bgcolor) throws IOException {
		int iw = image.getWidth();
		int ih = image.getHeight();
		int w = 0;
		int h = 0;
		int x = 0;
		int y = 0;
		degree %= 360;
		if (degree < 0) {
			degree = 360 + degree;
		}
		double ang = Math.toRadians(degree);
		if (iw > ih) {
			if ((degree == 180) || (degree == 0) || (degree == 360)) {
				w = iw;
				h = ih;
			} else if ((degree == 90) || (degree == 270)) {
				w = ih;
				h = iw;
			}
			x = w / 2 - iw / 2;
			y = h / 2 - ih / 2;
			BufferedImage rotatedImage = new BufferedImage(w, h, image.getType());
			Graphics2D gs = (Graphics2D) rotatedImage.getGraphics();
			if (bgcolor == null) {
			}
			AffineTransform at = new AffineTransform();
			at.rotate(ang, w / 2, h / 2);
			at.translate(x, y);
			AffineTransformOp op = new AffineTransformOp(at, 3);
			op.filter(image, rotatedImage);
			image = rotatedImage;
		}
		return image;
	}

	public static Map<String, Object> ProcessFile(HttpServletRequest request, MultipartFile multipartFile) throws IOException {
		Map<String, Object> map = new HashMap();
		String originalFileName = multipartFile.getOriginalFilename();

		String suffix = originalFileName.substring(originalFileName.lastIndexOf('.'), originalFileName.length());

		String basepath = request.getSession().getServletContext().getRealPath("/") + "WEB-INF/content_file_up_tmp";
		File file = new File(basepath);
		if (!file.exists()) {
			file.mkdir();
		}
		String filename = getRandomString(15);

		File files = new File(basepath + "/" + filename + suffix);
		files.createNewFile();

		FileOutputStream out = new FileOutputStream(files);
		out.write(multipartFile.getBytes());
		out.close();
		map.put("filePath", "WEB-INF/content_file_up_tmp/" + filename + suffix);
		map.put("type", suffix);
		map.put("fileName", originalFileName);
		map.put("size", convertFileSize(multipartFile.getSize()));
		return map;
	}

	public static String getRandomString(int length) {
		String base = "abcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}
	/**
	 * 位：bit;
	 * 字节：B = 8bit;
	 * KB：1KB = 1024B;
	 * MB：1MB = 1024KB;
	 * GB：1GB = 1024MB;
	 * 字符：根据系统，规定由多个字节组成。
	 * @param filesize
	 * @return String
	 */
	static String convertFileSize(long filesize) {
		String unit = "Bytes";
		int intDivisor = 1;
		if (filesize >= 1048576L) {
			unit = "MB";
			intDivisor = 1048576;
		} else if (filesize >= 1024L) {
			unit = "KB";
			intDivisor = 1024;
		}
		
		if (intDivisor == 1) {
			return filesize + " " + unit;
		}
		String strAfterComma = "" + 100L * (filesize % intDivisor) / intDivisor;
		if (strAfterComma == "") {
			strAfterComma = ".0";
		}
		return filesize / intDivisor + "." + strAfterComma + " " + unit;
	}
}
