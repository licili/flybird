// 上下管子的之间空隙距离（就是小鸟通过的口子）是一样的，所以随机一个管子的高度，就可以算出另一个的高度

// 管子的宽度是一样的。中间空隙是固定的。

class Pipe {
  constructor() {
    // 上管头
    this.h_up = game.allImg['up_pipe'].height;
    this.w_up = game.allImg['up_pipe'].width;
    // 管身
    this.w_mod = game.allImg['up_mod'].width;
    this.h_mod = game.allImg['up_mod'].height;
    // 上管身的随机高度
    this.random = Math.floor(Math.random() * 200 + 100)
    // 中间的空隙
    this.gap = 200;
    // 下管子的高度 = canvas高度 - 地面那些高度（估计一下） - 上管头-上管身-空隙
    // 下管身的高度 = 下管子的高度-下管头
    this.h_down = game.allImg['down_pipe'].height;
    this.w_down = game.allImg['down_pipe'].width;

    this.x = game.canvas.width;
    this.speed = 1;
    this.pipes = [];
    this.isPass = false; //小鸟是否通过了
    // 每个new一个管子都放到g保存在game上
    game.pipeArr.push(this)
  }

  update() {

    
    // 销毁没用的管子
    for (let i = 0; i < game.pipeArr.length; i++) {
      if (game.pipeArr[i].x < -this.w_up) {
        game.pipeArr.splice(i, 1);
        // 注意数组坍塌问题
        i--;
      }
    }
    this.x -= this.speed;
    // 记录管子的四个坐标
    this.x1 = this.x;
    this.x2 = this.x + this.w_up;
    this.y1 = this.random + this.h_up; //上馆子高度
    this.y2 = this.y1 + this.gap;
    
    // 碰撞检测
    if (game.bird.x2 >= this.x1 && game.bird.x1 <= this.x2 && (game.bird.y1 <= this.y1 || game.bird.y2 >= this.y2)) {
      console.log(game.bird.y1,game.bird.y2)
      clearInterval(game.timer)
    }
    // 加分
    if (game.bird.x1 > this.x2 && !this.isPass) {
      this.isPass = true;
      game.score++;
    }
  }
  render() {
    game.draw.drawImage(game.allImg['up_mod'], 0, 0, this.w_mod, this.h_mod,this.x, 0, this.w_mod, this.random)
    game.draw.drawImage(game.allImg['up_pipe'], this.x, this.random)
    game.draw.drawImage(game.allImg['down_mod'], 0, 0, this.w_mod, this.h_mod, this.x, this.random + this.h_up + this.gap, this.w_mod, 1500)
    game.draw.drawImage(game.allImg['down_pipe'], this.x, this.random + this.h_up + this.gap)
  }
}