// pages/search/index.js
const db = wx.cloud.database({
  env: ' '
})

Page({

  /**
   * 页面的初始数据
   */
  data: {


    inputValue: '',
    eggInfo: '',
    birdInfo: '',
    searchresult: '',
    idF: '',
    show: false,
    eggIsShow: false

  },


  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },


  clickBtn() {

    this.setData({
      eggIsShow: !this.data.eggIsShow
    })
    let number = this.data.inputValue

    if (!number) {
      wx.showToast({
        title: "不能为空",
        icon: "error",
      });
      return;
    }
    db.collection('aldutBird').where({
      birdLocation: number,
    }).get()
      .then(res => {
        // console.log(res);
        this.setData({
          birdInfo: res.data
        })
        // console.log('查找鸟数据库结果'+res.data);
      })
    wx.cloud.callFunction({
      config: {
        env: ' '
      },
      name: "getEggInfoCurYear",
      data: {
        birdLocation: number
      }
    }).then(res => {
      this.setData({
        eggResult: res.result.data,

      })
    })

  },
  clickBtn1() {

    this.setData({
      eggIsShow: !this.data.eggIsShow
    })
    let number = this.data.inputValue

    if (!number) {
      wx.showToast({
        title: "不能为空",
        icon: "error",
      });
      return;
    }
    db.collection('aldutBird').where({
      birdLocation: number,
    }).get()
      .then(res => {
        // console.log(res);
        this.setData({
          birdInfo: res.data
        })
        // console.log('查找鸟数据库结果'+res.data);
      })
    wx.cloud.callFunction({
      config: {
        env: ' '
      },
      name: "getEggInfo",
      data: {
        birdLocation: number
      }
    }).then(res => {
      this.setData({
        eggResult: res.result.data,

      })
    })

  },
  formSubmit(e) {

    let birdLocation = e.detail.value.birdLocation
    let vervel = e.detail.value.vervel

    if (!(birdLocation || vervel)) {
      wx.showToast({
        title: "不能都为空",
        icon: "error",
      });
      return;
    }
    if (birdLocation !== '') {
      db.collection('aldutBird').where({
        birdLocation: birdLocation,
      }).get()
        .then(res => {
          // console.log(res);
          this.setData({
            birdInfo: res.data
          })
          // console.log('查找鸟数据库结果'+res.data);
        })
      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getNestlingInfo",
        data: {
          birdLocation: birdLocation
        }
      }).then(res => {
        this.setData({
          nestlingReslut: res.result.data,

        })
      })
    } else if (vervel !== '' && birdLocation == '') {
      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getNestlingInfo",
        data: {
          vervel: db.RegExp({
            regexp: vervel,
            options: 'i',
          })
        }

      }).then(res => {
        console.log(res);
        this.setData({
          nestlingReslut: res.result.data,
        })
      })
      console.log(this.data.nestlingReslut.birdLocation);
      db.collection('aldutBird').where({
        birdLocation: this.data.nestlingReslut.birdLocation,
      }).get()
        .then(res => {

          this.setData({
            birdInfo: res.data
          })

        })
    }

  },
  formSubmit1(e) {
    let birdLocation = e.detail.value.birdLocation
    let vervel = e.detail.value.vervel

    if (!(birdLocation || vervel)) {
      wx.showToast({
        title: "不能都为空",
        icon: "error",
      });
      return;
    }
    if (birdLocation !== '') {
      db.collection('aldutBird').where({
        birdLocation: birdLocation,
      }).get()
        .then(res => {
          // console.log(res);
          this.setData({
            birdInfo: res.data
          })
          // console.log('查找鸟数据库结果'+res.data);
        })

    }
    else if (vervel !== '' && birdLocation == '') {

      db.collection('aldutBird').where({

        vervel: db.RegExp({
          regexp: vervel,
          options: 'i',
        })

      }).get()
        .then(res => {

          this.setData({
            birdInfo: res.data
          })

        })
    }
  },
  // clickBtn2(){

  //   this.setData({
  //     eggIsShow: !this.data.eggIsShow
  //   })
  //   let number = this.data.inputValue

  //   if (!number) {
  //     wx.showToast({
  //       title: "不能为空",
  //       icon: "error",
  //     });
  //     return;
  //   }
  //   db.collection('aldutBird').where({
  //     birdLocation: number,
  //   }).get()
  //     .then(res => {
  //       // console.log(res);
  //       this.setData({
  //         birdInfo: res.data
  //       })
  //       // console.log('查找鸟数据库结果'+res.data);
  //     })
  //   wx.cloud.callFunction({
  //     config: {
  //       env: ' '
  //     },
  //     name: "getNestlingInfo",
  //     data: {
  //       birdLocation: number
  //     }
  //   }).then(res => {
  //     this.setData({
  //        nestlingReslut: res.result.data,

  //     })
  //   })

  // },
  edit(e) {
    let getId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/index',
      events: {},
      success: function (res) {
        res.eventChannel.emit('goEdit', {
          data: {
            id: getId
          }
        })
      }
    })
  },
  edit1(e) {
    let getId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/index1',
      events: {},
      success: function (res) {
        res.eventChannel.emit('goEdit', {
          data: {
            id: getId
          }
        })
      }
    })
  },

  delete(e) {
    let getId = e.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          db.collection('egg').doc(getId).remove()
            .then(res => {

            })

        } else if (res.cancel) {
          return
        } that.clickBtn()
      }
    })


  },
  delete1(e) {
    let getId = e.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          db.collection('nestling').doc(getId).remove()
            .then(res => {
              this.clickBtn2()
            })

        } else if (res.cancel) {
          return
        } that.clickBtn()
      }
    })
  },
  // formSubmit(e) {
  //   var searchVlu=e.detail.value
  //       console.log('form发生了搜索事件，携带数据为：', searchVlu);
  //          if (!searchVlu.birdLocation) {
  //     wx.showToast({
  //       title: "不能为空",
  //       icon: "error",
  //     });
  //     return;}
  //   db.collection('aldutBird').where({
  //     birdLocation:searchVlu.birdLocation,
  //         }).get()
  //         .then(res => {
  //           // console.log(res);
  //           this.setData({
  //             birdInfo:res.data
  //           })
  //           // console.log('查找鸟数据库结果'+res.data);
  //         })
  //         wx.cloud.callFunction({
  //           config:{ env: ' ' },
  //           name: "getEggInfo",
  //           data:{birdLocation:searchVlu.birdLocation}
  //         }).then(res=>{
  //                 console.log(res)
  //           this.setData({
  //             // oneTitle:res.result.data.title
  //             searchresult:res.result.data,
  //           }) 
  //           })
  //       },





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