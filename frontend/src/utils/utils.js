import moment from 'moment';
import 'moment/locale/zh-cn'

export function isMobileDevice() {
  const sUserAgent = navigator.userAgent;
  return (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1);
}

/** 
* param 将要转为URL参数字符串的对象 
* key URL参数字符串的前缀 
* encode true/false 是否进行URL编码,默认为true 
*  
* return URL参数字符串 
*/
export function urlEncode(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

export function urlEncode2(obj) {
  try {
    return JSON.stringify(obj).replace(/:/g, "=").replace(/"/g, '').replace(/,/g, '&').match(/\{([^)]*)\}/)[1];
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function parseTimePoint(time) {
  return moment.format();
}