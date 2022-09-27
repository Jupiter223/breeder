// components/info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNumbers() {
      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getEggNumber",
        data: {
          species: 'JK'
        }
      }).then(res => {
        console.log(res);
        this.setData({
          eggJK: res.result.data
        })
        var eggJKF = this.data.eggJK.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          eggJKF: eggJKF
        })
        var eggJKH = eggJKF.filter(function (item, index, arr) {
          if (item.hatch == true) {
            return item;
          }
        })
        this.setData({
          eggJKH: eggJKH
        })
      })
      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getEggNumber",
        data: {
          species: 'HK'
        }
      }).then(res => {
        console.log(res);
        this.setData({
          eggHK: res.result.data
        })
        var eggHKF = this.data.eggHK.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          eggHKF: eggHKF
        })
        var eggHKH = eggHKF.filter(function (item, index, arr) {
          if (item.hatch == true) {
            return item;
          }
        })
        this.setData({
          eggHKH: eggHKH
        })
      })
      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getEggNumber",
        data: {
          species: 'ZZ'
        }
      }).then(res => {
        console.log(res);
        this.setData({
          eggZZ: res.result.data
        })
        var eggZZF = this.data.eggZZ.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          eggZZF: eggZZF
        })
        var eggZZH = eggZZF.filter(function (item, index, arr) {
          if (item.hatch == true) {
            return item;
          }
        })
        this.setData({
          eggZZH: eggZZH
        })
      })

      wx.cloud.callFunction({
        config: {
          env: ' '
        },
        name: "getDeathNumber",
        data: {
          death: true
        }
      }).then(res => {
        console.log(res);
        this.setData({
          d: res.result.data
        })
        var dJK = this.data.d.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          dJK: dJK
        })
        var dHK = this.data.d.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          dHK: dHK
        })
        var dZZ = this.data.d.filter(function (item, index, arr) {
          if (item.fertilization == true) {
            return item;
          }
        })

        this.setData({
          dZZ: dZZ
        })

      })
    }
  },
  attached() {
    this.getNumbers()
  }
})
