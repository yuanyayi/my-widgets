function Layer() {
  this.mask = null;
  this.dialog = null;
  this.alert = (msg, ...[{ icon, type, title }]) => {
    if (this.dialog) { return }
    $(document.body).append('<div class="layer-mask"></div>')
    this.mask = $('.layer-mask').last()
    let option = {
      'msg': msg || '',
      'title': title || '信息',
      'type': type || 'normal',
      'icon': icon || undefined
    }
    $(document.body).append(`<div class="layer-dialog">
        <div class="layer-title">${option.title}</div>
        <span href="" class="layer-close"></span>
        <div class="layer-content">
          ${option.icon ? '<i class="layer-ico layer-ico'+ option.icon +'"></i>' : ''} ${option.msg}
        </div>
        <div class="layer-btn">
          <span class="layer-btn-0">确定</span>
        </div>
      </div>`)
    this.dialog = $('.layer-dialog').last()
    this.close = [$('.layer-dialog .layer-close'), $('.layer-btn span'), this.mask]
    for (let i in this.close) {
      this.close[i].on('click', () => {
        this.dialog.remove()
        this.mask.remove()
        this.mask = null;
        this.dialog = null;
      })
    }
  }
}