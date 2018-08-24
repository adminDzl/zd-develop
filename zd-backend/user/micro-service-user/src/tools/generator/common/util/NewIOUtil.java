package common.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

public class NewIOUtil {
	public static StringBuffer readeFile(String filePath, String charCode) throws Exception {
		FileInputStream fis = new FileInputStream(filePath);
		StringBuffer sb = new StringBuffer();
		Charset charset = Charset.forName(charCode);
		FileChannel fc = fis.getChannel();
		ByteBuffer byteBuf = ByteBuffer.allocate(1024);
		while (fc.read(byteBuf) != -1) {
			byteBuf.flip();
			while (byteBuf.hasRemaining()) {
				sb.append(charset.decode(byteBuf));
			}
			byteBuf.clear();
		}
		fis.close();
		return sb;
	}

	public static void writeFile(String filePaht, String value) throws IOException {
		FileOutputStream fos = new FileOutputStream(filePaht);

		FileChannel fc = fos.getChannel();

		ByteBuffer bf = ByteBuffer.allocate(1024);
		for (int i = 0; i < value.length(); i++) {
			bf.putChar(value.charAt(i));
		}
		bf.flip();
		fc.write(bf);
		fc.close();
		fos.close();
	}

	public static void writeFile(String filePaht, StringBuffer value) throws IOException {
		FileOutputStream fos = new FileOutputStream(filePaht);

		FileChannel fc = fos.getChannel();

		ByteBuffer bf = ByteBuffer.allocate(1024);
		for (int i = 0; i < value.length(); i++) {
			bf.putChar(value.charAt(i));
		}
		bf.flip();
		fc.write(bf);
		fc.close();
		fos.close();
	}
}
