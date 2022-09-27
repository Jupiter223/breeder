Page({

  data: {
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth: 'nextMonth',
    selectVal: '',
    calendar: ''

    //     // 触摸开始时间
    // touchStartTime: 0,
    // // 触摸结束时间
    // touchEndTime: 0,  
    // // 最后一次单击事件点击发生时间
    // lastTapTime: 0, 
    // // 单击事件点击后要触发的函数
    // lastTapTimeoutFunc: null, 

  },


  onLoad() {

  },
  onShow() {
    wx.cloud.callFunction({
      config: { env: ' ' },
      name: "getCalendarEvent"
    }).then(res => {
      this.setData({
        mu: res.result.data,
      })
    })
    // this.setData({
    //   mu:[1,2]
    // })
  },

  //组件监听事件
  select(e) {
    console.log(e.detail)
    this.setData({
      selectVal: e.detail
    })

  },

  toggleType() {
    this.selectComponent('#Calendar').toggleType();//调用自定义组件的方法
  },
  nextMonth() {
    this.selectComponent('#Calendar').nextMonth()
  },
  lastMonth() {
    this.selectComponent('#Calendar').lastMonth()
  }
})