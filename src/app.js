import request from '@utils/request';
import store from '@utils/store';

App({
  onLaunch() {
    this.init();
  },
  onShow() {},
  onHide() {},
  globalData: {
    isLogin: false,
  },
  init() {
    let user = store.getItem('_userInfo');
    if (user.token) {
      this.globalData.isLogin = true;
      return;
    }
    wx.login({
      success: (res) => {
        request({
          url: '/api/v1/wx-user/wx-login',
          method: 'POST',
          data: {
            js_code: res.code,
          },
          success: (r) => {
            if (r.hasRegister) {
              store.setItem('_userInfo', r);
              this.globalData.user = r;
              this.globalData.isLogin = true;
            }
          },
        });
      },
    });
  },
});
