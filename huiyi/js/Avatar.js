/*
	修改星星的数量和密度
	数量：notcount数越大数量可能越多
	密码：(px-pointArr[key][0])*(px-pointArr[key][0])+(py-pointArr[key][1])*(py-pointArr[key][1]) < (self.radius*1.8)*(self.radius*1.8)
		1.8这个数变小，那么密度就越大，且数量也会多一些
*/
function Avatar(imgobj,way='',radius=33,x=0,y=0){
	base(this,LSprite,[]);
	var self=this;
	self.x=x;
	self.y=y;
	self.movex=0;
	self.movey=0; //运动

	self.runx=0;
	self.runy=0;
	self.initdirx=0; //初始x方向正负
	self.initdiry=0; //初始y方向正负
	self.maxRunx=11;
	self.maxRuny=11;
	self.sumRunx=0;
	self.sumRuny=0;
	self.speed=0.1; //运动速度

	name=way;
	if (way!='solid') {		
		self.setPoint();
	}
	
	var bitmapdata=new LBitmapData(imgobj);

	bgimg_width=bitmapdata.width;
	bgimg_height=bitmapdata.height;
	self.radius=bgimg_width/2;
	self.img_rate=radius*1.6/bgimg_width;
	

	if (way==''){
		self.scaleX=0.1;
		self.scaleY=0.1;		
		var maydraw = self.mayAddArc(self.x,self.y);
		if (maydraw!=0 && notcount<=200) {
			self.createme(bitmapdata);
			pointArr.push([self.x,self.y]);
			
			avatarLayer.addChild(self);
			addcount++;
		} else if (notcount>200) {
			console.log('xmax 200')
		}
	} else if (way=='solid') {
		//画固定位置的头像
		self.scaleX=self.scaleY=self.img_rate;
		self.createme(bitmapdata);
		avatarLayer.addChild(self);
	} else if (way=='lucking') {
		self.scaleX=self.scaleY=self.img_rate;
		self.createme(bitmapdata);
	} else if (way=='getluck'){		
		self.scaleX=self.scaleY=self.img_rate;
		self.createLucker(bitmapdata);
	}
}
Avatar.prototype.createLucker=function(bitmapdata){
	var self=this;
	// trace(self.radius);
	self.graphics.beginBitmapFill(bitmapdata);
	
	self.graphics.drawArc(2,"#000000",[self.radius,self.radius,self.radius,0,3.14*2]);
	self.graphics.drawArc(6,"#fff999",[self.radius,self.radius,self.radius,0,3.14*2]);	
	// self.graphics.drawArc(6,"#dddddd",[0,0,self.radius,0,3.14*2]); //辅助线

	self.x=(LGlobal.width-self.radius)/2;
	self.y=LGlobal.height/2;
}
Avatar.prototype.createme=function(bitmapdata){
	var self=this;
	self.rotatex=0;
	if(luck){
		self.rotatey=luck.radius*-1;
		self.x-=self.radius;
	};

	self.graphics.beginBitmapFill(bitmapdata);	

	self.graphics.drawArc(2,"#000000",[self.radius,self.radius,self.radius,0,3.14*2]);
	self.graphics.drawArc(6,"#fff999",[self.radius,self.radius,self.radius,0,3.14*2]);
	// self.graphics.drawArc(10,"red",[self.x,self.y,self.radius,0,3.14*2]); //辅助线
}
//是否允许落点
Avatar.prototype.mayAddArc=function(px,py){
	var self=this;
	var key;
	for (key in pointArr) {		
		if ((px-pointArr[key][0])*(px-pointArr[key][0])+(py-pointArr[key][1])*(py-pointArr[key][1]) < (self.radius*1.8)*(self.radius*1.8)){			
			notcount++;
			return 0;
		}
	}
	return 1;
}
Avatar.prototype.run=function(){
	var self=this;	
	if (self.scaleX<=self.img_rate){
		self.scaleX+=0.005;
		self.scaleY+=0.005;
	}
	if (self.maxRunx==11) {
		self.maxRunx=self.maxRunx*Math.random()+8;
		self.maxRuny=self.maxRuny*Math.random()+8;	
	}

	
	if (self.initdirx==0) {
		if (Math.random()<0.25) {
			self.initdirx=-1;
			self.initdiry=1;
		} else if (Math.random()<0.5 ) {
			self.initdirx=-1;
			self.initdiry=-1;
		} else if (Math.random()<0.75) {
			self.initdirx=1;
			self.initdiry=-1;
		} else {
			self.initdirx=1;
			self.initdiry=1;
		}

	}
	
	self.x+=self.speed*self.initdirx;
	self.y+=self.speed*self.initdiry*Math.random();
	self.sumRunx+=self.speed;
	if (Math.abs(self.sumRunx)>=self.maxRunx){
	 	self.speed = -1*self.speed;
	}

	//向按钮移动
	self.x+=self.movex;
	self.y+=self.movey;
	
	
}
//随机生成点
Avatar.prototype.setPoint=function(){
	var self=this;
	self.x=parseInt(Math.random()*LGlobal.width);

	self.y=parseInt(Math.random()*LGlobal.height);
	if (self.x<50) {
		self.x+=60;
	} else if (self.x>LGlobal.width-110) {
		self.x-=110
	}

	if (self.y<100) {
		self.y+=100
	} else if (self.y>LGlobal.height-110) {
		self.y-=110;
	}	
	
}
//垂直翻转效果,y必需传进来是负数
Avatar.prototype.tranme=function(x,y){
	if (y>0){
		alert('tranme方法y需要是负数');
	}

	// console.log('tran');
	// var tmpMatrix=new LMatrix();
	// tmpMatrix.scale(x,y).translate(0,this.radius*2);
	// this.transform.matrix=tmpMatrix;
	// tmpMatrix.scale(x,y).translate(0,this.radius*2);
	// this.transform.matrix=tmpMatrix;
}