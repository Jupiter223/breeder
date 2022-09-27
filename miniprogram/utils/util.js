const getNowDate = date => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if(month < 10) {
    month = '0' + month;
  };
  if(day < 10) {
    day = '0' + day;
  };
  // month<10?(month+'0'):month;
  //   day<10?(day+'0'):day;
  return year+'-'+month+'-'+day
}
function toDate(number){
  var date = new Date(number);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '-' + m + '-' + d;
}


function formatTime(time,arg) {
  var date = new Date(time);

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  if (arg === 1) {
    return y + '-' + m + '-' + d
  }
  if (arg === 2) {
    return h + ':' + minute + ':' + second
  }
  if (arg === 3) { // 字符串时间 转时间
    time = substring(0,19)
    time = replace(/-/g,'/')
    var date = new Date(time);
    return h + ':' + minute
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}




module.exports = {
  getNowDate:getNowDate,
  formatTime:formatTime,
  toDate:toDate,
  
}

