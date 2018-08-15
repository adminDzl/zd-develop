;
(function() {
	window.onerror = function(err) {
		console.log("page on error:" + err);
	};

	var browserType = {
		types: function() {
			var u = window.navigator.userAgent,
				app = window.navigator.appVersion;
			return { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				mac: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部

			};
		}(),
		
		language: (window.navigator.browserLanguage || window.navigator.language).toLowerCase(),
		
		appVersion: function() {
			var useragent = window.navigator.userAgent;
			var names = useragent.split(" ");
			var version = 0;
			for(var i = 0; i < names.length; i++) {
				var name = names[i];
				if(name.indexOf("ccplus/") > -1) {
					version = name.replace("ccplus/", "");
					console.log(version);
				}else if(name.indexOf("ccplus") > -1) {
					var temp = name.replace("ccplus", "");
					if(temp != ""){
						version = temp;
					}
					console.log(version);
				}
			}
			return version;
		}()
	};

	function setupWebViewJavascriptBridge(callback) {
		if(window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		}
		if(window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		if(browserType.types.android) {
			WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		} else if(browserType.types.mac || browserType.types.iPhone || browserType.types.iPad) {
			WVJBIframe.src = 'https://__bridge_loaded__';
		}
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0);
	}

	function invoke(handlerName, data, callback) {
		console.log(browserType.appVersion);
		//对低版本进行判断
		if(browserType.types.android) {
			 if(browserType.appVersion < 3.10){
			 	callback({
						'status': false,
						'appNeedUpgrade': true,
						'errorMessage': 'APP版本过低，WebViewJavascriptBridge对象不存在,请提示用户进行升级!'
					});
			 	return;
			 }
		} else if(browserType.types.mac || browserType.types.iPhone || browserType.types.iPad) {
			  if(browserType.appVersion < 3.02){
			 	callback({
						'status': false,
						'appNeedUpgrade': true,
						'errorMessage': 'APP版本过低，请提示用户进行升级!'
					});
			 	return;
			 }
		}
		
		
		if(window.WebViewJavascriptBridge) {
			window.WebViewJavascriptBridge.callHandler(handlerName, data, callback);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					window.WebViewJavascriptBridge.callHandler(handlerName, data, callback);
				},
				false
			);
		}
	}

	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('NativeCallJS', function(data, responseCallback) {
			var responseData = {
				'Javascript Says': 'Right back atcha!'
			};
			responseCallback(responseData);
		});

		var doc = document;
		var readyEvent = doc.createEvent('Events');
		readyEvent.initEvent('WebViewJavascriptBridgeReady');
		readyEvent.bridge = WebViewJavascriptBridge;
		doc.dispatchEvent(readyEvent);
	});

	function buildCallback(data) {
		var callback = function(res) {
			if(res.status) {
				if(data.success) {
					data.success(res);
				}
			} else {
				if(data.fail) {
					data.fail(res);
				}
			}
		}
		return callback;
	}

	window.ccapi = {
		//设备信息
		getDeviceInfo: function(data) {
			invoke("deviceInfo", "", data.success);
		},

		//获取网络状态
		getNetworkType: function(data) {
			invoke("networkType", "", data.success);
		},

		//扫二维码
		scanQRCode: function(data) {
			invoke("scanQRCode", {
				'needResult': data.needResult,
				'scanType': data.scanType
			}, data.success);
		},

		//选择图片
		chooseImage: function(data) {
			invoke("chooseImage", {
				'count': data.count
					//,'sizeType': data.sizeType,
					//'sourceType': data.sourceType
			}, data.success);
		},

		//上传图片
		uploadImage: function(data) {
			invoke("uploadImage", {
				'localId': data.localId
			}, buildCallback(data));
		},

		//微信支付
		chooseWXPay: function(data) {
			invoke("chooseWXPay", {
				'prePayId': data.prePayId
			}, buildCallback(data));
		},
		//微信支付V2
		chooseWXPayV2: function(data) {
			invoke("chooseWXPayV2", {
				'appId': data.appId,
				'partnerId': data.partnerId,
				'prepayId': data.prepayId,
				'packageValue': data.packageValue,
				'nonceStr': data.nonceStr,
				'timeStamp': data.timeStamp,
				'sign': data.sign
			}, buildCallback(data));
		},

		//跳转到原生专题
		toSpecialTopic: function(data) {
			invoke("specialTopic", {
				'id': data.id
			}, buildCallback(data));
		},
		//跳转到原生话题
		toTopic: function(data) {
			invoke("topic", {
				'id': data.id
			}, buildCallback(data));
		},
		//新鲜事详情
		toFreshDetail: function(data) {
			invoke("freshDetail", {
				'id': data.id
			}, buildCallback(data));
		},
		
		//获取地理位置
		getLocation: function(data) {
			invoke("getLocation", {
				'type': data.type
			}, data.success);
		},
		
		shareTo:function(data){
			invoke("shareTo",
			{
				 'title': data.title, // 分享标题
				 'desc': data.desc, //分享描述
				 'link': data.link, // 分享链接
				 'imgUrl': data.imgUrl, // 分享图标完整url
				 'type': data.type // 分享类型: weixin，qq，sms，email				
			},data.success);
		}
	};
})();