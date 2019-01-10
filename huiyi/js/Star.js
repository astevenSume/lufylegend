var starCount = 400;
var rains = new Array();
var rainCount =12;

function Star(){
		base(this,LSprite,[]);
		this.x=0;
		this.y=0;		
		this.color = "white";//颜色

		for (var i=0;i<starCount;i++) {			
			this.draw();
		}
}
//产生随机颜色
Star.prototype.getColor=function(){
		var _r = Math.random();
		if(_r<0.5){
			this.color = "#222";
		}else{
			this.color = "white";
		}
}
Star.prototype.draw=function(){
	var text=new LTextField();
	this.getColor();
	x = LGlobal.width * Math.random();//横坐标
	y = LGlobal.height * Math.random();//纵坐标	
	text.x=x
	text.y=y;
	text.text=".";
	text.color=this.color;
	// text.weight=1;
	this.addChild(text);
}
Star.prototype.shine=function(){	
	var key;
	for(key in this.childList){		
		this.childList[key].alpha = Math.random()+0.3;
	}
}

function MeteorRain(){
	base(this,LSprite,[]);

    this.color1 = "";//流星的色彩
    this.color2 = "";  //流星的色彩
    this.getRandomColor();   	
    	
    for (var i=0;i<rainCount;i++) {			
			this.drawmt();
	}

}
MeteorRain.prototype.getRandomColor=function(){
        //中段颜色
    this.color1 = "rgba("+38+","+76+","+151+",0.8)";
        //结束颜色
    this.color2 = "rgba(37,75,138,0.5)";
}
MeteorRain.prototype.drawmt=function(){
	var sub=new LSprite();
	var self=this;

	//最小长度，最大长度
    var x = Math.random() * 180 + 200;
    sub.length = Math.ceil(x);
    sub.angle = 30; //流星倾斜角
    x = Math.random()+1.5;
    sub.speed = Math.ceil(x)*4; //流星的速度
    var cos = Math.cos(sub.angle*3.14/180);
    var sin = Math.sin(sub.angle*3.14/180);
    sub.width = sub.length*cos ;  //流星所占宽度
    sub.height = sub.length*sin ;//流星所占高度
    sub.offset_x = sub.speed*cos;
    sub.offset_y = sub.speed*sin;
	sub.x=LGlobal.width * Math.random();//横坐标
	sub.y=LGlobal.height * Math.random();//纵坐标

    sub.graphics.beginPath();
    sub.graphics.lineWidth(1); //宽度
    // self.graphics.globalAlpha = self.alpha; //设置透明度
    //创建横向渐变颜色,起点坐标至终点坐标
     var line = LGlobal.canvas.createLinearGradient(0, 0,
        sub.width,-1*sub.height);
    //分段设置颜色
    line.addColorStop(0, "white");
    line.addColorStop(0.3, self.color1);
    line.addColorStop(0.6, self.color2);
    sub.graphics.strokeStyle(line);
    //起点
    sub.graphics.moveTo(0, 0);
    //终点
    sub.graphics.lineTo(sub.width, -1*sub.height);
    sub.graphics.closePath();
    sub.graphics.stroke();

    self.addChild(sub);
}
MeteorRain.prototype.runnow=function(){	
    	var key;
		for(key in this.childList){	
			// console.log('aaa');
			var sub = this.childList[key];
			if (sub.x <= -1*sub.width || sub.y >= LGlobal.height+sub.height){
			 	sub.x=LGlobal.width * Math.random();
				sub.y=LGlobal.height * Math.random();
				// console.log(key);
			}
			sub.x = sub.x-sub.offset_x;
        	sub.y = sub.y+sub.offset_y;
			sub.alpha -= 0.002;
		}
		// if (this.childList.length==0){
		// 	console.log(123);
		// }

}