// 碰撞检测  
class Bird {
  constructor() {
    this.w = game.allImg['bird0'].width;
    this.h = game.allImg['bird0'].height;
    this.x = game.canvas.width / 2 - this.w / 2;
    this.y = game.canvas.height * (1 - 0.618);
    this.status = 'down';
    this.rotate = 0;
    this.changeY = 0; //Y方向初速度
  }
  update () {
    if (this.status == 'down') {
      // 加速度
      this.changeY += 0.3;
      this.y += this.changeY;
      this.rotate += 0.08;

    } else if (this.status == 'up') {
      this.changeY -= 0.6;

      this.changeY <= 0 ? this.status = 'down' : null;
      this.y -= this.changeY;
      this.y <= 0 ? this.y = 0:null;
    }
    // 记录小鸟每时每刻的值
    this.x1 = this.x - 19; // this.w / 2
    this.x2 = this.x + 19;
    this.y1 = this.y - 14;
    this.y2 = this.y + 14;

    if (this.y > game.canvas.height - 80) {
      this.y = game.canvas.height - 80;
    }
  }
  render () {
    game.draw.save()
    game.draw.translate(this.x, this.y);
    // 小鸟旋转
    game.draw.rotate(this.rotate);
    // -20,-13 小鸟自身大小的一半
    game.draw.drawImage(game.allImg['bird0'],-this.w/2,-this.h/2);
    game.draw.restore();
  }
  // 向上飞
  fly () {
    this.changeY = 6;
    this.rotate = -1.2;
    this.status = 'up'
  }
}