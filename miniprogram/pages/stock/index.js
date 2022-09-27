// pages/stock/index.js
const db = wx.cloud.database({
  env: ' '
});
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stockItem: '',
    isShowInput: false,
    addIsShow: false,
    stockChange: ''
  },
  load() {
    db.collection('stock').get().then(res => {

      this.setData({
        stockItem: res.data
      })
    })
  },
  bindPickerChange() { },
  /**
   * 生命周期函数--监听页面加载
   */
  checkStock(e) {

    this.setData({
      isShowInput: true,

    })

  },
  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      id: e.currentTarget.dataset.id,
      inputValue: e.detail.value
    })
    db.collection('stock').doc(this.data.id).get().then(res => {
      // console.log(res);
      this.setData({
        stockChange: res.data
      })
    })
  },
  blur() {

    if (!this.data.inputValue) {
      this.setData({
        isShowInput: false
      })
      // console.log(11);
    }
    if (this.data.inputValue) {
      db.collection('stock').doc(this.data.id).update({
        data: {
          quantity: this.data.inputValue
        }
      }).then(res => {

        this.setData({
          isShowInput: false
        })
        this.load()
      })

      console.log(this.data.stockChange);
      db.collection('stockChange').add({
        data: {
          feed: this.data.stockChange.feed,
          category: this.data.stockChange.category,
          specification: this.data.stockChange.specification,
          unitPrice: this.data.stockChange.unitPrice,
          date: db.serverDate(),
          action: this.data.inputValue - this.data.stockChange.quantity
        }
      }).then(res => {
        console.log(res);
      })

    }
  },
  addStockItem() {
    this.setData({
      addIsShow: !this.data.addIsShow
    })
  },
  formSubmit(e) {
    var newStockItem = e.detail.value
    if (!newStockItem.category) {
      wx.showToast({
        title: "请输入类别",
        icon: "error",
      });
      return;
    }
    if (!newStockItem.feed) {
      wx.showToast({
        title: "请输入名称",
        icon: "error",
      });
      return;
    }
    if (!newStockItem.specification) {
      wx.showToast({
        title: "请输入规格",
        icon: "error",
      });
      return;
    }
    if (!newStockItem.unitPrice) {
      wx.showToast({
        title: "请输入单价",
        icon: "error",
      });
      return;
    }
    if (!newStockItem.quantity) {
      wx.showToast({
        title: "请输入数量",
        icon: "error",
      });
      return;
    }
    console.log('form发生了submit事件，携带数据为：', newStockItem);

    db.collection('stock').add({
      data: newStockItem
    }).then(res => {
      this.load()
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
    this.load()
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