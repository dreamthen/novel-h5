import md5 from "MD5";
/**
 * 微信公共API
 * @type {{}}
 */
const weixin = (function () {
  return (WeixinJSBridge) => {
    return {
      //校验内置对象是否存在
      isJsBridge() {
        return typeof WeixinJSBridge === "undefined";
      },
      /**
       * H5网页中执行JS调起支付
       */
      onBridgeReady(paySign, prepay_id, appId, timeStamp, nonceStr, signType) {
        console.log({
          //公众号名称，由商户传入
          "appId": appId,
          //时间戳，自1970年以来的秒数
          "timeStamp": timeStamp,
          //随机串
          "nonceStr": nonceStr,
          //订单详情扩展字符串
          "package": `prepay_id=${prepay_id}`,
          //微信签名方式：
          "signType": signType,
          //微信签名
          "paySign": paySign
        });
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            //公众号名称，由商户传入
            "appId": appId,
            //时间戳，自1970年以来的秒数
            "timeStamp": timeStamp,
            //随机串
            "nonceStr": nonceStr,
            //订单详情扩展字符串
            "package": `prepay_id=${prepay_id}`,
            //微信签名方式：
            "signType": signType,
            //微信签名
            "paySign": paySign
          },
          function (res) {
            console.log(res);
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if (res.err_msg === "get_brand_wcpay_request:ok") {
            }
          }
        );
      },
      /**
       * 假如WeixinJsBridge内置对象不存在,执行监听事件模式
       * @param paySign
       * @param prepay_id
       * @param appId
       * @param timeStamp
       * @param nonceStr
       * @param signType
       */
      onBridgeNotExist(paySign, prepay_id, appId, timeStamp, nonceStr, signType) {
        const {onBridgeReady} = this;
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(this, paySign, prepay_id, appId, timeStamp, nonceStr, signType), false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(this, paySign, prepay_id, appId, timeStamp, nonceStr, signType));
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(this, paySign, prepay_id, appId, timeStamp, nonceStr, signType));
        }
      },
      /**
       * MD5生成签名
       * @param paySign
       * @param prepay_id
       * @param appId
       * @param timeStamp
       * @param nonceStr
       * @param signType
       * @constructor
       * @returns "string"
       */
      MD5ToPaySign(paySign, prepay_id, appId, timeStamp, nonceStr, signType) {
        let md5ObjectSignTemp = {
          appId,
          nonceStr,
          package: `prepay_id=${prepay_id}`,
          signType,
          timeStamp
        };
        let stringSignTemp = ``,
          sign = ``;
        for (let [key, value] of Object.entries(md5ObjectSignTemp)) {
          stringSignTemp = `${stringSignTemp}${key}=${value}&`;
        }
        stringSignTemp = `${stringSignTemp}key=${paySign}`;
        console.log(stringSignTemp);
        sign = md5(stringSignTemp);
        return sign.toUpperCase();
      },
      /**
       * 执行在H5网页中执行JS调起支付
       * @param paySign
       * @param prepay_id
       * @param appId
       * @param timeStamp
       * @param nonceStr
       * @param signType
       */
      readyBridge(paySign, prepay_id, appId, timeStamp, nonceStr, signType) {
        const {isJsBridge, onBridgeReady, onBridgeNotExist, MD5ToPaySign} = this;
        paySign = MD5ToPaySign.bind(this)(paySign, prepay_id, appId, timeStamp, nonceStr, signType);
        if (isJsBridge.bind(this)()) {
          onBridgeNotExist.bind(this)(paySign, prepay_id, appId, timeStamp, nonceStr, signType);
        } else {
          onBridgeReady.bind(this)(paySign, prepay_id, appId, timeStamp, nonceStr, signType);
        }
      }
    }
  };
})();

/**
 * 导出微信公共API
 */
export default weixin;
