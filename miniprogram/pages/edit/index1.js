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
    countNest: '',
    countChild: '',
    nestlingInfo: '',
    content: '',
    nestlingN: 0,
  },
  // 表单区域
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countNest: parseInt(e.detail.value) + 1
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countChild: parseInt(e.detail.value) + 1
    })
  },
  switch1Change(e) {
    console.log(`switch1发生change事件，携带值为`, e.detail.value)
    this.setData({
      death: e.detail.value
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




    console.log(this.data.editInfo._id);
    db.collection('nestling').doc(this.data.editInfo._id).update({
      data: {
        birdLocation: nestlingInfo.birdLocation,
        child: nestlingInfo.child,
        content: nestlingInfo.content,
        death: nestlingInfo.death,
        nest: nestlingInfo.nest,
        deathDate: db.serverDate()
      }

    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    })
    const pages = getCurrentPages()
    wx.navigateBack({
      delta: 1,
      success: () => {
        console.log(pages.length);
        console.log(pages[0]);
        pages[pages.length - 2].formSubmit()
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.on('goEdit', function (data) {

      db.collection('nestling').doc(data.data.id).get().then(res => {
        console.log(res.data);
        that.setData({
          editInfo: res.data,
          countNest: res.data.nest,
          countChild: res.data.child
        })

      })
    })
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
    let that = this
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.on('goEdit', function (data) {

      db.collection('nestling').doc(data.data.id).get().then(res => {
        console.log(res.data);
        that.setData({
          editInfo: res.data
        })

      })
    })
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