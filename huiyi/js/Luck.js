function Luck(grade){
	base(this,LSprite,[]);
	var self=this;


	self.name="luckbtn";
	self.grade=grade;

	self.radius=80;
	// self.pointX=LGlobal.width/2;
	// self.pointY=LGlobal.height/2;
	// luckingLayer.rotatex=self.pointX;
	// luckingLayer.rotatey=self.pointY-up_distance;

	// var bitmapdata=new LBitmapData(imglist['btn']);
	// bitmapdata.y=100;
	// var bitmap=new LBitmap(bitmapdata);

	//self.graphics.beginBitmapFill(bitmapdata);

	// self.addChild(bitmap);
	// self.graphics.drawLine('#fff',LGlobal.width/2,0,LGlobal.width/2,LGlobal.height);
	// luckingLayer.addChild();

	self.graphics.drawArc(4,'#0ff',[0,0,self.radius,0,3.14*2],true,'#f0f');
	self.x=LGlobal.width/2;
	self.y=LGlobal.height/2;

	luckingLayer.addChild(self);
}

Luck.prototype.flyToBtn=function(){
	var self=this;
	//停止再产生头像
	allowcreate=0;
	if (avatarLayer.childList.length>0) {
		var key=-1,av;
		for (key in avatarLayer.childList){
			av=avatarLayer.childList[key];			
			if (av.movex==0){
					var longx=self.x-av.x;
					var longy=self.y-av.y;
					var longer=Math.sqrt(longx*longx+longy*longy);
					av.movex=longx/longer*100;
					av.movey=longy/longer*100;
			}			
		}
	}
}

Luck.prototype.onLuckframe=function(){
	var self=this;
	var key=-1;
	for (key in avatarLayer.childList){
		if (key>=0){
			if(LGlobal.hitTestArc(self,avatarLayer.childList[key])){
				avatarLayer.childList[key].remove();
			}
		}		
	}
}