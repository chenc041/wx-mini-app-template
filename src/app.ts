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
        console.log('login res', res);
      },
    });
  },
});
