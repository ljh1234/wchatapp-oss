//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/http';

Page({
  data: {
    imgsrc: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('进入程序');
    
  },
  selectFile () {
      wx.chooseImage({
          count: 1,
          sizeType: ['original','compressed'],
          sourceType: ['album','camera'],
          success: (result)=>{
              this.setData({
                  imgsrc: result.tempFilePaths[0]
              })
          },
          fail: ()=>{},
          complete: ()=>{}
      });
  },
  upFile(){ 
        http.upFileOss({ filePath: this.data.imgsrc }).then(res => {
            console.log('res', res);
        });
  }
})
