// pages/index/index.js
const db = wx.cloud.database({
  env: ' '
});
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: ''
  },
  addEgg() {
    wx.navigateTo({
      url: '../add/index',
    })
  },
  toLocation() {
    wx.navigateTo({
      url: '../location/index',
    })
  },
  checkStock() {
    wx.navigateTo({
      url: '../stock/index',
    })
  },
  addNestling() {
    wx.navigateTo({
      url: '../add/index2',
    })
  },
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
    db.collection('todos').where({
      deleted: false,
      startTimeStamp: _.lte(Date.now() + 259200000)
    })
      .orderBy('completed', 'asc')
      .orderBy('startTimeStamp', 'desc')
      .get().then(res => {
        this.setData({
          todos: res.data
        })
      })
    // 实时显示
    // this.selectComponent('#info').attached()

    // db.collection('egg').where({

    // })
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