// pages/add/index2.js
const db = wx.cloud.database({
  env: ' '
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
    nestlingInfo: '',
    content: '',
    nestlingN: 0,
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
    var nestlingInfo = e.detail.value
    if (!nestlingInfo.birdLocation) {
      wx.showToast({
        title: "请输入位置编号",
        icon: "error",
      });
      return;
    }
    if (!nestlingInfo.nest) {
      wx.showToast({
        title: "请输入第几窝",
        icon: "error",
      });
      return;
    }
    if (!nestlingInfo.child) {
      wx.showToast({
        title: "请输入第几个蛋",
        icon: "error",
      });
      return;
    }

    console.log('form发生了submit事件，携带数据为：', nestlingInfo);

    db.collection('nestling').where({
      birdLocation: nestlingInfo.birdLocation,
      nest: nestlingInfo.nest,
      child: nestlingInfo.child
    }).get().then(res => {
      console.log(res);

      this.setData({
        nestlingN: res.data.length
      })
    })

    if (this.data.nestlingN) {
      wx.showToast({
        title: "该蛋已存在",
        icon: "error",
      });
      return;
    }

    db.collection('nestling').add({
      data: nestlingInfo,
    }).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })

      let title = nestlingInfo.species + nestlingInfo.birdLocation + '出壳' + nestlingInfo.nest + '-' + nestlingInfo.child + '蛋'


      db.collection('calendar').add({
        data: {
          date: nestlingInfo.date,
          title: title,
          event: 'hatch'
        }
      }).then(res => {
        // console.log(res);
      })

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