// pages/edit/index.js
const db = wx.cloud.database({
  env: ' '
});
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editInfo: '',
    choices: ['JK', 'HK', 'YMX', 'ZZ', 'XM', 'HWJ', 'LY'],
    array1: ['1', '2', '3', '4', '5', '6'],
    array2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    countNest: '',
    countChild: '',
    date: util.getNowDate(new Date())
  },
  back() {
    wx.navigateBack({
      delta: 1  // 返回上一级页面。
    })

  },
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // bindDateChange1: function (e) {
  //   console.log('hatchdate发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     hatchDate: e.detail.value
  //   })
  // },
  switch1Change(e) {
    console.log(`switch1发生change事件，携带值为`, e.detail.value)
    this.setData({
      fertilization: e.detail.value
    })
  },
  // switch2Change(e) {
  //   console.log(`switch2发生change事件，携带值为`, e.detail.value)
  //   this.setData({
  //     hatch: e.detail.value
  //   })
  // },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    // const species = this.data.species
    // for (let i = 0; i < species.length; ++i) {
    //   species[i].checked = species[i].value === e.detail.value
    // }

    // this.setData({
    //   species
    // })
    this.setData({
      species: e.detail.value
    })
    // console.log(this.data.species);
  },
  formSubmit(e) {
    var submitInfo = e.detail.value
    console.log(e.detail.value);
    let title = submitInfo.species + submitInfo.birdLocation + '出壳' + submitInfo.nest + '-' + submitInfo.child + '蛋'
    console.log(title);
    // console.log(submitInfo);
    if (!submitInfo.birdLocation) {
      wx.showToast({
        title: "请输入位置编号",
        icon: "error",
      });
      return;
    }
    if (!submitInfo.nest) {
      wx.showToast({
        title: "请输入第几窝",
        icon: "error",
      });
      return;
    }
    if (!submitInfo.child) {
      wx.showToast({
        title: "请输入第几个蛋",
        icon: "error",
      });
      return;
    }
    console.log(submitInfo);

    db.collection('egg').doc(this.data.editInfo._id).update({
      data: submitInfo
    }).then(res => {
      // console.log(res);
    })

    const pages = getCurrentPages()
    wx.navigateBack({
      delta: 1,
      success: () => {
        console.log(pages.length);
        console.log(pages[0]);
        pages[pages.length - 2].clickBtn()
      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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

      db.collection('egg').doc(data.data.id).get().then(res => {
        // console.log(res.data);
        that.setData({
          editInfo: res.data,
          countNest: res.data.nest,
          countChild: res.data.child
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