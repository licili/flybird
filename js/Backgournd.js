class Background {
  constructor() {
    // 获取背景图片的宽高
    this.w = game.allImg["bg"].width;
    this.h = game.allImg["bg"].height;
    // 横向移动（背景向左移动）
    this.x = 0;
    // 控制速度
    this.speed = 1;
  }
  // 背景在动，让某个值在变化
  update () {
    this.x-=this.speed;
    this.x <= -this.w ? this.x = 0 : null;
  }
  // 把background画到画布上
  render () {
    // 补上上面的颜色
    game.draw.fillStyle = '#6FC6CD';
    game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
    // 让画布沉底,因为一个图片不够大，还要再来一张
    game.draw.drawImage(game.allImg["bg"], this.x, game.canvas.height - this.h);
    game.draw.drawImage(game.allImg["bg"], this.x + this.w, game.canvas.height - this.h);
    // 再补一个背景，防止空白
    game.draw.drawImage(game.allImg["bg"], this.x+this.w*2, game.canvas.height - this.h);
  }
}