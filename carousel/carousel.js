function Carousel($el, autoplay, delayTime) {
  let _this = this
  this.viewport = $el.find('.viewport')
  this.items = $el.find('.itemlist')
  this.itemlist = this.items.find('.item')
  let itemWidth = this.itemlist.eq(0).width()
  let itemLength = this.itemlist.length
  this.itemlist.map((index, item) => {
    $(item).css({ left: index * itemWidth })
  })
  // clone first and last
  this.itemlist.eq(-1).clone().addClass('clone')
    .insertBefore(this.itemlist.eq(0)).css({ left: -1 * itemWidth })
  this.itemlist.eq(0).clone().addClass('clone')
    .insertAfter(this.itemlist.eq(-1)).css({ left: itemLength * itemWidth })
  // DOM-导航按钮
  $el.append('<ol class="carousel-nav"></ol>')
  let nav = $el.find('.carousel-nav')
  for (let i = 0; i < itemLength; i++) {
    nav.append(`<i data-i="${i}">${i}</i>`)
  }
  nav.on('click', 'i', (ev) => {
    console.log($(ev.target).data('i'))
    _this._gotoIndex($(ev.target).data('i'))
  })
  // functions 
  // 基本跳转
  let delay = delayTime || 1000
  let current = 0
  function formatCurrent(){
    nav.find('i').removeClass('cur').eq(current).addClass('cur')
  }
  formatCurrent()

  this._next = () => {
    current += 1
    this.items.animate({ left: -itemWidth * current }, delay)
    if (current === itemLength) {
      current = 0
      this.items.animate({ left: 0 }, 0)
    }
    formatCurrent()
  }
  this._prev = () => {
    current -= 1
    this.items.animate({ left: -itemWidth * current }, delay)
    if (current === -1) {
      current = itemLength - 1
      this.items.animate({ left: -itemWidth * current }, 0)
    }
    formatCurrent()
  }
  // 导航跳转
  this._gotoIndex = (i) => {
    current = i
    this.items.stop(true, false).animate({ left: -itemWidth * current }, delay)
    formatCurrent()
  }
  // DOM-上一下一
  $el.find('.next').on('click', () => {
    this._next()
  })
  $el.find('.prev').on('click', () => {
    this._prev()
  })
  this.autoplayTimer = null
  // 自动播放相关
  function autorun(autoplay) {
    if (autoplay !== undefined && !autoplay) return false
    _this.autoplayTimer = setInterval(()=>{_this._next()}, delay*3.5)
    _this.itemlist.on('mouseenter', () => {
      clearInterval(_this.autoplayTimer)
    })
    _this.itemlist.on('mouseleave', () => {
      _this._next()
      _this.autoplayTimer = setInterval(()=>{_this._next()}, delay*3.5)
    })
    nav.on('click', 'i', ()=>{
      clearInterval(_this.autoplayTimer)
      setTimeout(()=>{
        _this._next()
        _this.autoplayTimer = setInterval(()=>{_this._next()}, delay*3.5)
      }, delay*3.5)
    })
  }
  // DOM-自动播放？
  autorun(autoplay);

}