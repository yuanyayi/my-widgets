# my-widgets
一个小功能库，简单的小功能，可实例化的小玩意儿～

##目录
1. countdown---基于jQuery的倒数计时器：
 *  支持到天数；
 *  支持选择HTMLElement,HTMLCollection,jQuery格式的对象；
 *  支持修改display方法；
 *  支持`d:h:m:s` 和 `h:m:s` 两种显示模式。
 * 参数：指定目标元素(必填)，结束时间(必填)，开始时间(new Date())，分隔符(:)，时间显示样式("h:m:s")，自定义时间显示函数(简单样式和文字)
 * 使用范例：
   `new Countdown({
     el: document.getElementsByTagName('div'),
     endTime: "2018/3/1 24:00:00",
     startTime: "",
     divideChar: "-",
     formate: "d:h:m:s",
     // display: f,
   });`
