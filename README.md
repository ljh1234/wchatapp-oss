# wchatapp-oss
小程序直传oss实例

#使用方法

1. 请登录oss,配置bucket跨域
<img class="doc-content-img" src="statics/images/bucket.png"  alt="bucket配置">

2. 配置外网域名到小程序的上传域名白名单中
<img class="doc-content-img" src="statics/images/whitelist.png"  alt="小程序白名单配置">
3. 将lib下文件复制粘贴到你的项目

4. 将http.js中accessid,accesskey,host,替换成你所申请id,key,host地址

5. 可直接引入http.js到你需要的使用的文件中使用upFileOss方法,也可复制需要的代码到你的请求模块中

#备注
1. 视频图片皆可上传

2. 参考链接
<a href="https://help.aliyun.com/document_detail/92883.html?spm=a2c4g.11186623.6.1151.7d8d2812KthXh0"></a>