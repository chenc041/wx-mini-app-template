import store from '@utils/store';
import config from '@/config/config';

interface RequestOptions {
  url: string;
  data?: any;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
}

interface Response {
  statusCode: number;
  data: any;
  message: string;
}

/**
 * 基础请求方法封装
 * @param options {RequestOptions}
 * @returns [err, data]; err = true, 报错, 否则正常
 */
const request = (options: RequestOptions): Promise<[boolean, null] | [boolean, any]> => {
  const user = store.getItem('_userInfo');
  return new Promise((reslove) => {
    wx.request({
      url: `${config.APIHOST}${options.url}`,
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        ...(user.token ? { Authorization: user.token || '' } : {}),
      },
      timeout: 5000,
      method: options.method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res: { data: Response }) {
        const { statusCode, message, data } = res.data;
        if (statusCode === 401) {
          reslove([true, null]);
        } else if (statusCode === 1) {
          reslove([false, data]);
        } else {
          reslove([true, null]);
          wx.showModal({
            title: '系统错误提示',
            content: message,
            showCancel: false,
          });
        }
      },
      fail(res) {
        reslove([true, null]);
        wx.showModal({
          title: '系统错误提示',
          content: res.errMsg,
          showCancel: false,
        });
      },
    });
  });
};

export { request };

export default request;
