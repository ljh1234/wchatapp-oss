/*
 * @author liujunhua(374059694@qq.com)
 * 
 *
 */
import Base64 from '../lib/base64';
import Crypto from '../lib/crypto';

class http {
    constructor() {
        this.upFileOss = (param) => {
            if(!(typeof param === 'object')) {
                return;
            }

            const accessid = '6MKOqxGiGU4AUk44'; // 填写你所申请的accessid(两个key中最短的那个)
            const accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy'; // 填写你所申请的accesskey(两个key中最长的那个)
            const host = 'http://post-test.oss-cn-hangzhou.aliyuncs.com'; // 填写你所申请的oss服务地址
            const policyText = {
                "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                "conditions": [
                    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
                ]
            };
            const policyBase64 = Base64.encode(JSON.stringify(policyText));
            const message = policyBase64;
            const bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
                asBytes: true
            });
            const signature = Crypto.util.bytesToBase64(bytes);
            
            return new Promise((resolve, reject) => {
                wx.showLoading({
                    title: '上传中...',
                    mask: true
                });
                wx.uploadFile({
                    url: host,
                    filePath: param.filePath,
                    name: 'file', 
                    formData: {
                        'key': '${filename}',
                        'policy': policyBase64,
                        'OSSAccessKeyId': accessid,
                        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                        'signature': signature,
                    },
                    success: (result) => {
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 1000,
                            mask: false,
                            success: (result) => {},
                            fail: () => {},
                            complete: () => {}
                        });
                        // 上传哦oss成功后,文件在oss的访问路径
                        const res = {
                            url: host + 'workorder/' + param.filePath.split('tmp/')[1]
                        }
                        resolve(res)
                    },
                    fail: () => {
                        wx.showToast({
                            title: '上传失败,请重试',
                            icon: 'success',
                            duration: 1000,
                            mask: false,
                            success: (result) => {},
                            fail: () => {},
                            complete: () => {}
                        });
                        reject();
                    },
                    complete: () => {
                        wx.hideLoading();
                    }
                });

            });
        }
    }
}


export default new http()