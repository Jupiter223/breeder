const db = wx.cloud.database({
  env: ' '
});
const _ = db.command
const util = require('../../utils/util');

Page({
  data: {
    input: '',
    todos: '',
    leftCount: 0,
    allCompleted: false,
    completedItem: ''
  },

  // save: function () {
  //   wx.setStorageSync('todo_list', this.data.todos)
  //   wx.setStorageSync('completed_item', this.data.completedItem)
  // },

  load: function () {
    db.collection('todos').where({
      deleted: false,
      startTimeStamp: _.lte(Date.now() + 259200000)
    })
      .orderBy('completed', 'asc')
      .orderBy('startTimeStamp', 'desc')
      .get().then(res => {
        console.log('打印', res.data);
        this.setData({
          todos: res.data
        })
      })
    //  console.log(this.data.todos[0].startTime._proto_.toDateString());
    db.collection('todos').where({ deleted: true })
      .orderBy('finishTimeStamp', 'desc')
      .orderBy('startTimeStamp', 'desc')
      .limit(10)
      .get()
      .then(res => {
        console.log('已完成已删除', res.data);
        this.setData({
          completedItem: res.data
        })

      })
    // this.setData({
    //   ST: JSON.parse(JSON.stringify(this.todos.startTime, null))
    // })
    // console.log(ST);
    //  for(let i=0;i<=todos.length;i++){
    //   var ST[i]=util.formatTime(todos[i].startTime,1)

    // }
    //    this.setData({
    //      todos:{
    //       startTime1=util.formatTime(todos[i].startTime,1)
    //      }
    //    })
    //  }
    //  console.log(todos);
    // var todos = wx.getStorageSync('todo_list')
    //   if (this.data.todos) {
    //   var leftCount = todos.filter(function (item) {
    //     return !item.completed
    //   }).length
    //   this.setData({ todos: todos, leftCount: leftCount })
    // }
    // var completedItem = wx.getStorageSync('completed_item')
    // if (completedItem) {
    //   this.setData({ completedItem: completedItem })
    // }

    //   wx.clearStorage();
    //   wx.showToast({
    //     title: '数据已清空',
    //     icon: 'none'
    //   })

  },

  onLoad: function () {
    this.load()
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    //   var todos = this.data.todos
    //   var timeStamp = Date.parse(new Date());  
    // timeStamp = timeStamp / 1000;  

    //   todos.push({ name: this.data.input, completed: false,startTime: util.getNowDate(new Date()),timeStamp:timeStamp})
    //  console.log(todos);
    db.collection('todos').add({
      data: {
        name: this.data.input,
        completed: false,
        startTimeStamp: Date.now(),
        deleted: false,
        startTime: util.getNowDate(new Date())
      }
    }).then(res => {
      this.load()
    })
    this.setData({
      input: '',
      // todos: todos,
      leftCount: this.data.leftCount + 1,

    })


    // this.save()
  },

  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    console.log(index);
    console.log(id);
    // var completedItem = this.data.completedItem
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    db.collection('todos').doc(id).update({
      data: { completed: todos[index].completed }
    }).then(res => {
      console.log(res);
    })
    //   completedItem.push({ finishTime: new Date(), name: todos[index].name })
    //  console.log(completedItem);
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
      // completedItem: completedItem
    })
    // this.save()
  },

  // removeTodoHandle: function (e) {
  //   var index = e.currentTarget.dataset.index
  //   var todos = this.data.todos   
  //   var remove = todos.splice(index, 1)[0]
  //   var completedItem = this.data.completedItem
  //   var timeStamp = Date.parse(new Date());  
  //   timeStamp = timeStamp / 1000;  

  //   completedItem.push({ finishTime: util.getNowDate(new Date()),timeStamp:timeStamp,name:todos[index].name})
  //   this.setData({
  //     todos: todos,
  //     leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
  //     completedItem:completedItem
  //   })
  //   this.save()
  // },

  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    db.collection('todos').where({
      deleted: false
    }).update({
      data: { completed: this.data.allCompleted }
    }).then(res => {
      console.log(res);
    })
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
      // completedItem.push({
      //   finishTime: new Date(),
      //   name: todos[i].name
      // })
    }

    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      // completedItem: completedItem
    })
    // this.save()
  },

  clearCompletedHandle: function (e) {
    db.collection('todos').where({
      completed: true,
      deleted: false,
      startTimeStamp: _.lte(Date.now() + 259200000)
    }).update({
      data: {
        deleted: true,
        finishTimeStamp: Date.now(),
        finishiTime: util.getNowDate(new Date())
      }
    }).then(res => {

      this.load()
    })
    // db.collection('todos').where({
    //   completed:true,
    //   startTimeStamp:_.lte(Date.now()+259200000)}).update({
    //   data:{deleted:true,
    //   finishTimeStamp:Date.now(),
    // finishiTime:util.getNowDate(new Date())}
    // }).then(res=>{

    //   this.load()
    // })

    // this.setData({
    //   completedItem
    // })
    // var todos = this.data.todos
    // var remains = []
    // var completedItem = this.data.completedItem
    // var timeStamp = Date.parse(new Date());  
    // timeStamp = timeStamp / 1000;  
    // for (var i = 0; i < todos.length; i++) {
    //   todos[i].completed || remains.push(todos[i])
    //   completedItem.push({
    //     finishTime: util.getNowDate(new Date()),
    //     name: todos[i].name,
    //     timeStamp:timeStamp
    //   })
    // }

    // var logs = this.data.logs
    // logs.push({
    //   timestamp: new Date(),
    //   action: 'Clear',
    //   name: 'Completed todo'
    // })

    // this.setData({ todos: remains,completedItem:completedItem})

  }
})
