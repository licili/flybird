// 大地
class Land {
  constructor() {
    // 知道当前的图片的宽高
    // this.w = game.allImg["land"].width;
    // this.h = game.allImg["bg"].height;
    // this.x = 0;
    // this.y = game.canvas.height - this.h;
    // this.speed = 1;
  }
  updated () {
    this.x += this.speed;
    this.x <= -this.w ? this.x = 0 : null;
  }
  render () {
    //  game.draw.drawImage(game.allImg["land"], this.x, this.y);
    //  game.draw.drawImage(game.allImg["land"], this.x+this.w, this.y);
  }
}