class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    // 创建一个绘制环境2d环境
    this.draw = this.canvas.getContext('2d');
    let W = document.documentElement.clientWidth > 420 ?
      420 : document.documentElement.clientWidth;
    let H = document.documentElement.clientHeight > 750 ?
      750 : document.documentElement.clientHeight;
    // 设置画布宽高
    this.canvas.width = W;
    this.canvas.height = H;
    this.timer = null;
    this.imgLoad()
    this.pipeArr = [];
    this.bindEvent()
    this.frame = 0;
    // 统计分数
    this.score = 0;
  }
  // 用来清屏的
  clear () {
    // 每一次，要把上一帧的画面清除掉
    this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  start () {
    // 创建背景实例
    this.bg = new Background();
    // 创建大地
    // this.land = new Land();

    this.bird = new Bird();

    // 保证所有图片加载完成后才加载start
    this.timer = setInterval(() => {
      this.frame++;
      // 清屏 每一帧都要清除上一帧的内容
      // this.clear()

      // 首先就是背景上场，每一秒都更新渲染
      this.bg.update(); // 更新
      this.bg.render(); // 渲染

      if (this.frame % 200 == 0) {
        new Pipe()
      }
      this.pipeArr.forEach(item => {
        item.update();
        item.render();
      })
      this.bird.update();
      this.bird.render();
    }, 20);
  }
  imgLoad () {
    // 将对象的属性值变为真实图片
    this.allImg = {
      "bg": "./images/bg.jpg",
      "up_pipe":"./images/up_pipe.png",
      "up_mod":"./images/up_mod.png",
      "down_pipe": "./images/down_pipe.png",
      "down_mod": "./images/down_mod.png",
      "bird0":"./images/bird0.png",
      "bird1":"./images/bird1.png",
    }
    let count = 0, total = Object.keys(this.allImg).length;
    for (let key in this.allImg) {
      let img = new Image();
      img.src = this.allImg[key];
      img.onload = () => {
        count++;
        this.allImg[key] = img;
         // 保证所有图片加载完成后才加载start
        if (count >= total) this.start();
      }
    }
  }
  bindEvent () {
    this.canvas.onclick = ()=> {
      // console.log(this.bird)
      this.bird.fly()
    }
  }
}