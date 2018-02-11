/**
 *  基于jQuery的倒数计时器 v3.0.0 袁雅宜 2018-02-09
 *  支持到天数；
 *  支持选择HTMLElement,HTMLCollection,jQuery格式的对象；
 *  支持修改display方法；
 *  支持d:h:m:s和h:m:s两种显示模式。
 **/

/** 
 * 参数：指定目标元素(必填)，结束时间(必填)，开始时间(new Date())，分隔符(:)，时间显示样式("h:m:s")，自定义时间显示函数(简单样式和文字)
 * 使用范例：
   new Countdown({
     el: document.getElementsByTagName('div'),
     endTime: "2018/3/1 24:00:00",
     startTime: "",
     divideChar: "-",
     formate: "d:h:m:s",
     // display: f,
   });
 * 结构示例：<div><d>0</d><i>Days</i><h>05</h><i>:</i><m>47</m><i>:</i><s>53</s></div>
 **/

function Countdown(op) {
  // 校验：加载jQuery？
  if (!$('body')) {
    console.error("Countdown Error: Can't use Countdown without jQuery.")
    return false
  }
  // 对象初始化：
  let CDObj = {
    els: cheakElements(op.el),
    endTime: cheakDateFormat(op.endTime),
    startTime: op.startTime && op.startTime != '' ? cheakDateFormat(op.startTime) : new Date(),
    divideChar: op.divideChar || ':',
    timeformate: op.formate,
    display: op.display,
  }
  // console.log(CDObj)
  // 校验CDObj合法？
  if (!CDObj.els || !CDObj.els.length) { console.error("Countdown Error: Unavailable el."); return false }
  if (!CDObj.endTime || !CDObj.startTime) { console.error("Countdown Error: Wrong Date Format！" + (!CDObj.endTime ? 'end' : 'start')); return false }
  CDObj.per = CDObj.endTime - CDObj.startTime
  if (CDObj.per < 0) { console.error("Countdown Error: You CAN'T end it before it start！" + CDObj.endTime); return false }

  return constructCountdownTimer(CDObj.els);

  // ----------------------------------------------------LIB---------------------------------------------------------//
  // 校验：可处理的el？
  function cheakElements(el) {
    if (el instanceof HTMLElement) {
      return $(el)
    } else if (el instanceof HTMLCollection) {
      return $(el)
    } else if (el instanceof $) {
      return el
    } else {
      return false
    }
  }
  // 日期格式化函数：
  function cheakDateFormat(datestr) {
    let date = new Date()
    if ((typeof(datestr) == 'number') || ((typeof(datestr) == 'string') && (datestr == parseInt(datestr).toString()) && (parseInt(datestr) > 0))) {
      date.setTime(parseInt(datestr))
    } else if (typeof(datestr) == 'string') {
      let arr = datestr.split(/[-:\/ '"`]/);
      if (!(arr.length == 6) && arr[1] <= 12 && arr[3] <= 24 && arr[4] < 60 && arr[5] < 60) {
        date = false
      } else {
        date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
      }
    }
    console.log(date)
    return date.getTime() == 'Invalid Date' ? false : date
  }
  // 构造倒计时HTML结构：
  function constructCountdownTimer(el) {
    // 初始化目标内部格式：
    switch (CDObj.timeformate) {
      case 'd:h:m:s':
        el.append("<d></d><i>Days</i>")
      case 'h:m:s':
        el.append("<h></h><i>" + CDObj.divideChar + "</i><m></m><i>" + CDObj.divideChar + "</i><s></s>")
        break;
      default:
        console.warn('Countdown Warning: Unknown timeformate.')
        el.append("<h></h><i>" + CDObj.divideChar + "</i><m></m><i>" + CDObj.divideChar + "</i><s></s>")
        break;
    }
    // 文字：
    let textobj = {
      // 显示屏：
      d: el.find("d"),
      h: el.find("h"),
      m: el.find("m"),
      s: el.find("s"),
      // 初始值：
      dd: parseInt(CDObj.per / (1000 * 60 * 60)) % 24,
      hh: parseInt(CDObj.per / (1000 * 60 * 60)),
      mm: parseInt(CDObj.per / (1000 * 60)) % 60,
      ss: parseInt(CDObj.per / 1000) % 60,
      // 倒计时:
      _countdown: function() {
        if (this.ss > 0) {
          this.ss -= 1;
        } else if (this.ss == 0) {
          if (this.mm > 0) {
            this.mm -= 1;
            this.ss = 59;
          } else if (this.mm == 0) {
            if (this.hh > 0) {
              this.hh -= 1;
              this.mm = 59;
            } else if (this.hh == 0) {
              if (this.dd > 0) {
                this.dd -= 1;
              } else if (this.dd == 0) {
                console.info("Countdown END!");
                clearInterval(this.timer);
              } else {
                console.error("error d");
              }
            } else {
              console.error("error h");
            }
          } else {
            console.error("error m");
          }
        } else {
          console.error("error s")
        }
      },
      // 输出函数：
      _show: CDObj.display ? CDObj.display : function() {
        if (CDObj.timeformate == 'd:h:m:s') {
          this.d.text(this.hh / 24 <= 0 ? "0" + this.hh % 24 : parseInt(this.hh / 24));
          this.h.text(this.hh % 24 < 10 ? "0" + this.hh % 24 : this.hh % 24);
        } else {
          this.h.text(this.hh < 10 ? "0" + this.hh : this.hh);
        }
        this.m.text(this.mm < 10 ? "0" + this.mm : this.mm);
        this.s.text(this.ss < 10 ? "0" + this.ss : this.ss);
      },
      // 内部用的计时器
      _setTimer: function() {
        let _this = this;
        this.timer = setInterval(function() {
          _this._countdown();
          _this._show();
        }, 1000);
      }
    }
    textobj._show();
    textobj._setTimer();
    return textobj;
  }
}

// 模块调用：
// export {
//   Countdown
// }