function Progress(obj, ...opts) {
  let _this = this
  let options = {
    value: 0,
    max: 1,
    min: 0,
    labels: [],
    labelFormat: function(val) { return val },
    callback: null
  }
  // 初始化
  this.init = function() {
    $el = $(obj)
    this.container = _createBar($el)
    this.bar = this.container.find('.bar')
    opts = opts[0] || {}
    for (let option in options) {
      this[option] = opts[option] || options[option]
    }
  }
  this.init()
  // 创建UI
  function _createBar(box) {
    if (box.find('.progress .bar').length === 0) {
      box.append(`<div class="progress">
        <span class="bar"></span>
      </div>`)
      box.find('.progress').css({
        'position': 'relative',
        'overflow': 'hidden'
      })
      box.find('.bar').css({
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'height': '100%',
      })
    }
    return box.find('.progress')
  }
  // 遍历并修改标签数值
  this.changeLabels = function() {
    let val = this.value
    if (this.labels instanceof jQuery) {
      this.labels.each(function() {
        $(this).text(_this.labelFormat(val))
      })
    }
  }
  // 直接修改数值：
  this.setValue = function(val, call) {
    this.value = valueFormat(val)
    this.bar.css('width', (this.value - this.min) / (this.max - this.min) * 100 + '%')
    this.changeLabels()
    if ((call || call === undefined) && typeof this.callback === 'function') {
      this.callback(this.value)
    }
  }
  this.setValue(this.value)
  // 拖拽
  this.container.on('mousedown', (ev) => {
    this.moveBar(ev)
    this.container.on('mousemove', (ev) => {
      let val = this.moveBar(ev)

    })
    $(document).on('mouseup', (ev) => {
      let val = this.moveBar(ev)
      this.setValue(val)

      this.container.off('mousemove')
      $(document).off('mouseup')
    })
  })
  // 封装移动效果
  this.moveBar = function(ev) {
    let len = ev.clientX - this.container.offset().left
    let val = len / this.container.width() * (this.max - this.min)
    this.bar.css('width', len)
    return valueFormat(val)
  }
  // 精度
  function valueFormat(val) {
    let v = Math.round(val * 100) / 100
    return v > _this.max ? _this.max : (v < _this.min ? _this.min : v)
  }
}