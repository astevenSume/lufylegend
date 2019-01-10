function Bullet(params){
	base(this,LSprite,[]);
	var self=this;
	
	self.x=params.x;
	self.y=params.y;

	self.xspeed=params.xspeed;
	self.yspeed=params.yspeed;
	self.belong=params.belong;
	self.isdie=false;

	self.bitmap=new LBitmap(params.bitmapData);
	self.addChild(self.bitmap);
}
Bullet.prototype.onbulletframe=function(){
	var self=this;
	// console.log(self.x + '==' + self.xspeed); 
	self.x+=self.xspeed;
	self.y+=self.yspeed;
	
	if (self.isdie){
		self.removeRun();
		return;
	}

	var key,plain;
	if (self.belong==player.belong){
		for (key in plainLayer.childList){
			plain=plainLayer.childList[key];		
			if (player.objectindex != plain.objectindex && LGlobal.hitTestArc(self,plain)) {			
				plain.hp--;
				self.isdie=true;
				self.bitmap.bitmapData=new LBitmapData(imglist["remove"]);
				self.bitmap.x=-self.bitmap.getWidth()*0.5;
				self.bitmap.y=-self.bitmap.getHeight()*0.5;
				
			} 
		} 
	} else {
		if (LGlobal.hitTestArc(self,player)){
			player.hp--;
			self.isdie=true;
			self.bitmap.bitmapData=new LBitmapData(imglist["remove"]);
			self.bitmap.x=-self.bitmap.getWidth()*0.5;
			self.bitmap.y=-self.bitmap.getHeight()*0.5;
		}
	}
	if (self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height) {
		bulletLayer.removeChild(self);
		self=null;
	}
}
Bullet.prototype.removeRun=function(){
	var self=this;
	if(self.alpha<=0){
		bulletLayer.removeChild(self);
		return;
	}
	self.bitmap.scaleX+=0.1;
	self.bitmap.scaleY+=0.1;
	self.bitmap.x=-self.bitmap.getWidth()*0.5;
	self.bitmap.y=-self.bitmap.getHeight()*0.5;
	self.alpha-=0.1;
}
