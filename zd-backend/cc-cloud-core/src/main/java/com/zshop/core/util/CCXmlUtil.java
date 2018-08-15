package com.zshop.core.util;

import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.zshop.core.log.LogUtil;

/**
 * @Description: json解析工具类
 * @author administrator
 * @date 2016-07-07 14:45
 */
public class CCXmlUtil {

	private static final LogUtil log = LogUtil.getLogger(CCXmlUtil.class);
	/**
	 * 将xml数据转换为map
	 * @param xmlStr xml字符串
	 * @return
	 */
	public static Map<String, Object> xml2Map(String xmlStr) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(new InputSource(new StringReader(xmlStr)));
			Element root = doc.getDocumentElement();
			NodeList nodes = root.getChildNodes();
			if (nodes != null) {
				for (int i = 0; i < nodes.getLength(); i++) {
					Node node = nodes.item(i);
					map.put(node.getNodeName(),node.getFirstChild().getNodeValue());
				}
			}
		} catch (Exception e) {
			log.error(e.toString());
		}
		return map;  
    }
	
}
