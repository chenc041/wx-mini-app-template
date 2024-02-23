import request from '@utils/request';
import config from '@/config/config';

const getOssToken = async (cb?: Function) => {
  const [err, data] = await request({
    url: '/api/v1/wx-user/ossMpToken',
  });
  if (!err) {
    cb && cb(data);
  }
};

const upload = (scene = 'img', success?: Function) => {
  wx.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album'],
    success(resp) {
      let tempFilePath = resp.tempFiles[0].tempFilePath;

      getOssToken((oss: any) => {
        let key = `wjh-app/${scene}/${+new Date()}-${Math.floor(Math.random() * +new Date())}`;

        wx.uploadFile({
          url: config.OSSUPLOADHOST,
          filePath: tempFilePath,
          name: 'file',
          formData: {
            key: key,
            policy: oss.policy,
            OSSAccessKeyId: oss.OSSAccessKeyId,
            signature: oss.signature,
            'x-oss-security-token': oss['x-oss-security-token'],
          },
          success: () => {
            let url = `${config.OSSHOST}/${key}`;
            success && success(url);
          },
          fail: (err) => {
            console.log('=-= upload err', err);
          },
        });
      });
    },
  });
};

export default upload;
