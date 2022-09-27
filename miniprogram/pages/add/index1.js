// pages/add/index1.js
const db = wx.cloud.database(
  { env: ' ' }
)
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.getNowDate(new Date()),
    title: '',
    content: ''
  },
  formSubmit(e) {
    var calendarEvent = e.detail.value
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log('form发生了submit事件，携带数据为：', calendarEvent);
    if (!calendarEvent.title) {
      wx.showToast({
        title: "请输入标题",
        icon: "error",
      });
      return;
    }

    db.collection('calendar').add({
      // data 字段表示需新增的 JSON 数据
      data: calendarEvent
    }).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000//发布完成后提示完成动作未成功需解决
      })
      wx.switchTab({
        url: '/pages/main/index',//返回后日历页面前月内容未显示，需要刷新后才显示
      })
    })

  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      date: util.getNowDate(new Date()),
      title: '',
      content: ''
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