// pages/add/index.js

const db = wx.cloud.database({
  env: ''//环境id
});
const _ = db.command
const util = require('../../utils/util');

Page({
  data: {
    nowTime: '',
    array1: ['1', '2', '3', '4', '5', '6'],
    array2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    pickerHidden: true,
    date: util.getNowDate(new Date()),
    birdLocation: '',
    species: '',
    countNest: 1,
    countChild: 1,
    eggInfo: '',
    content: '',
    eggN: 0,
    imgUrl: 'cloud:// .6e65- -1312311558/location2.png'
  },
  // 表单区域
  bindPickerChange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countNest: parseInt(e.detail.value) + 1
    })
  },
  bindPickerChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countChild: parseInt(e.detail.value) + 1
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,

    })
  },
  formSubmit(e) {
    var eggInfo = e.detail.value
    console.log(eggInfo);
    if (!eggInfo.birdLocation) {
      wx.showToast({
        title: "请输入位置编号",
        icon: "error",
      });
      return;
    }
    if (!eggInfo.nest) {
      wx.showToast({
        title: "请输入第几窝",
        icon: "error",
      });
      return;
    }
    if (!eggInfo.child) {
      wx.showToast({
        title: "请输入第几个蛋",
        icon: "error",
      });
      return;
    }

    console.log('form发生了submit事件，携带数据为：', eggInfo);

    db.collection('egg').where({
      birdLocation: eggInfo.birdLocation,
      nest: eggInfo.nest,
      child: eggInfo.child
    }).get().then(res => {
      console.log(res);

      this.setData({
        eggN: res.data.length
      })
    })

    if (this.data.eggN) {
      wx.showToast({
        title: "该蛋已存在",
        icon: "error",
      });
      return;
    }

    db.collection('egg').add({
      data: eggInfo,
    }).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })

      let title = eggInfo.species + eggInfo.birdLocation + '蛋' + eggInfo.nest + '-' + eggInfo.child


      db.collection('calendar').add({
        data: {
          date: eggInfo.date,
          title: title,
          event: 'egg'
        }
      }).then(res => {
        // console.log(res);
      })
      //  需要向todos加一项
      if (eggInfo.species === 'JK' || eggInfo.species === 'HK' || eggInfo.species === 'XM') {
        let name = eggInfo.species + eggInfo.birdLocation + '蛋' + eggInfo.nest + '-' + eggInfo.child + '第22天'
        let startTimeStamp = Date.parse(eggInfo.date) + 1900800000
        // console.log(startTimeStamp);
        db.collection('todos').add({
          data: {
            startTimeStamp: startTimeStamp,
            startTime: util.toDate(startTimeStamp),
            name: name,
            completed: false,
            deleted: false
          }
        }).then(res => {
          // console.log(res);
        })
      } else if (eggInfo.species === 'YMX' || eggInfo.species === 'ZZ' || eggInfo.species === 'HWJ' || eggInfo.species === 'LY') {
        let name = eggInfo.species + eggInfo.birdLocation + '蛋' + eggInfo.nest + '-' + eggInfo.child + '第24天'
        let startTimeStamp = Date.parse(eggInfo.date) + 2073600000

        db.collection('todos').add({
          data: {
            startTimeStamp: startTimeStamp,
            startTime: util.toDate(startTimeStamp),
            name: name,
            completed: false,
            deleted: false
          }
        }).then(res => {
          // console.log(res);
        })
      }

      let pages = getCurrentPages()
      wx.switchTab({
        url: '/pages/main/index',
        success: () => {
          pages[pages.length - 2].onShow()
        }
      })
    })
  },

  formReset(e) {

    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      date: util.getNowDate(new Date()),
      birdLocation: '',
      species: '',
      countNest: 1,
      countChild: 1,
      eggInfo: '',
      content: '',
    })
  },
  previewImage: function (e) {
    var imgUrl = this.data.imgUrl;
    wx.previewImage({
      urls: [imgUrl], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
  },


  // touchStart: function (e) {
  //   startX = e.touches[0].pageX; // 获取触摸时的原点
  //   moveFlag = true;
  // },
  // // 触摸移动事件
  // touchMove: function (e) {
  //   endX = e.touches[0].pageX; // 获取触摸时的原点
  //   if (moveFlag) {
  //     if (endX - startX > 50) {
  //       console.log("move right");
  //       this.move2right();
  //       moveFlag = false;
  //     }
  //     if (startX - endX > 50) {
  //       console.log("move left");
  //       this.move2left();
  //       moveFlag = false;
  //     }
  //   }
  // },
  // touchEnd: function (e) {
  //    moveFlag = true; // 回复滑动事件
  //  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})