package com.zshop.cloud.util.jwt;

import java.util.Map;

import com.zshop.cloud.util.CCJsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;


@Component
public class TokenUtil {
	
	@Autowired
	private JwtUtil jwt;

	
	
	private Map<String, Object> parseToken(String token) throws Exception {
		Claims claims = jwt.parseJWT(token);
 		String json = claims.getSubject();
		Map<String, Object> map = CCJsonUtil.jsonToMap(json);
		map.put("iat", claims.getIssuedAt());
		map.put("exp", claims.getExpiration());
		return map;
	}
}
