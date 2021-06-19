class SceneManager {
  constructor() {
    this.bindEvent()
  }
  // 进入场景。进入场景前都要初始化数据
  enter (number) {
    switch (number) {
      case 0:
        // 定义初始值
        game.bg = new Background();
        game.bird = new Bird();
        this.titleW = game.allImg['head'].width
        this.titleX = game.canvas.width / 2 - this.titleW / 2
        this.titleY = -80;
        this.startW = game.allImg['start'].width;
        this.startH = game.allImg['start'].height;
        console.log(game.canvas.width/2,this.startW/2)
        this.startX = game.canvas.width / 2 - this.startW / 2;
        this.startY = game.canvas.height;
        this.birdX = game.canvas.width / 2 - game.allImg['bird0'].width / 2;
        this.birdY = 250;
        this.birdChangeY = 1;
        break;
      case 1:
        game.scene = 1;
        game.bg = new Background()
        this.turtorW = game.allImg['turtor'].width;
        this.turtorX = game.canvas.width / 2 - this.turtorW / 2
        this.turtorY = 250;
        this.alpha = 1;
        this.alphaChange = 0.05;
        break;
      case 2:
        game.scene = 2;
        game.bg = new Background();
        game.bird = new Bird();
        game.pipeArr = [];
        break;
      case 3:
        this.isBooM = false;
        this.index = 0;
        game.scene = 3;
        break;
      case 4:
        game.scene = 4;
        // 获取分数
        let arr = JSON.parse(localStorage.getItem('FB'));
        for (let i = 0; i < arr.length; i++) {
          if (game.score >= arr[0]) {
            this.best = game.score;
            this.model = '金牌'
            arr[0] = game.score;
          } else if (game.score >= arr[1]) {
            this.model = '银牌'
            arr[1] = game.score;
          } else if (game.score >= arr[2]) {
            this.model = '铜牌'
            arr[2] = game.score;
          } else {
            this.model = '铁牌'
          }
        }
        // 最高分
        this.best = arr[0];
        localStorage.setItem('FB', JSON.stringify(arr))
        this.overX = game.canvas.width/2-game.allImg['gameover'].width/2;
        this.overY = -80;
        this.messageX = game.canvas.width/2-game.allImg['message'].width/2;
        this.messageY = game.canvas.height;
        break;
      case 5:
        break;
    }
  }
  // 更新渲染
  updateAndRender () {
    switch (game.scene) {
      case 0:
        game.bg.render()
        this.titleY >= 150 ? this.titleY = 150 : this.titleY += 5;
        this.startY <= 400 ? this.startY = 400 : this.startY -= 8;
        if (this.birdY > 320 || this.birdY < 250) {
          this.birdChangeY *= -1;
        }
        this.birdY += this.birdChangeY;
        game.draw.drawImage(game.allImg['head'], this.titleX, this.titleY)
        game.draw.drawImage(game.allImg['bird0'],this.birdX,this.birdY)
        game.draw.drawImage(game.allImg['start'],this.startX,this.startY)
        break;
      case 1:
        game.bg.render();
        game.draw.drawImage(game.allImg['bird0'], game.canvas.width / 2 - 25, 150)

        if (this.alpha > 1 || this.alpha < 0) this.alphaChange *= -1;
        // 渐变 好像闪烁有问题
        game.draw.save()
        this.alpha += this.alphaChange;
        // console.log(this.alpha)
        game.draw.globalAlpha = this.alpha;

        game.draw.drawImage(game.allImg['turtor'], this.turtorX, this.turtorY)
        game.draw.restore()

        break;
      case 2:
        game.bg.update();
        game.bg.render();
        game.pipeArr.forEach(item => {
          item.update();
          item.render();
        })
        game.bird.update();
        game.bird.render();

        if (game.frame % 200 == 0) {
          new Pipe()
        }
        this.socreRender()
        break;
      case 3:
        // 停止上一个场景结束的时候
        game.bg.render();
        game.bird.render();
        for (let i = 0; i < game.pipeArr.length; i++) {
          game.pipeArr[i].render()
        }
        if (this.isBooM) {
          this.index++;
          if (this.index > 9) {
            this.enter(4);
            return;
          }
          // 爆炸
          // game.draw.drawImage(game.allImg['boom'],game.bird.x,600)

        } else {
          // 下落
          game.bird.y += 5;
          if (game.bird.y >= 600) {
            game.bird.y = 600;
            this.isBooM = true;
          }
        }
        break;
      case 4:
        game.bg.render();
        this.overY >= 160 ? this.overY = 160 : this.overY += 7;
        this.messageY <= 260 ? this.messageY = 260 : this.messageY -= 12;

        game.draw.drawImage(game.allImg['gameover'], this.overX, this.overY);
        game.draw.drawImage(game.allImg['message'], this.messageX, this.messageY);

        // 画奖牌
        // 写字体
        game.draw.fillStyle = '#666';
        game.draw.font = "20px consolas";
        game.draw.textAlign = 'right';
        game.draw.fillText(game.score,(game.canvas.width/2)+90,this.messageY+60)
        game.draw.fillText(this.best,(game.canvas.width/2)+110,this.messageY+110)

        break;
      case 5:
        break;
    }
  }
  // 哪个场景的事件。分场景管理
  bindEvent () {
    game.canvas.onclick = (e) => {
      switch (game.scene) {
        case 0:
          // 第一个场景的按钮事件。找出按钮位置
          if (e.clientX >= this.startX
            && e.clientX <= this.startX + this.startW
            && e.clientY >= this.startY
            && e.clientY <= this.startY + this.startH
          ) {
            this.enter(1)
          }
          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          game.bird.fly();

          break;
        case 3:

          break;
        case 4:
          break;
        case 5:
          break;
      }
    }
  }
  socreRender () {
    let str = game.score.toString();
    for (let i = 0; i < str.length; i++) {
      game.draw.drawImage(game.allImg['shuzi'+str[i]],i*30,0)
    }
    
  }
}