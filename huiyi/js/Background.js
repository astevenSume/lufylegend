function Background(){
	base(this,LSprite,[]);
	var self=this;
	
	

	self.bitmapData=new LBitmapData(imglist["back"]);

	self.bitmap1=new LBitmap(self.bitmapData);

	
	self.scaleX=1;
	self.scaleY=LGlobal.height/1080; //将图片的高度进行拉伸


	self.addChild(self.bitmap1);
	self.graphics.drawLine('2','#000000',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height]);
	// self.graphics.drawLine('2','#000000',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height]);
	// self.graphics.drawLine('2','#000000',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height]);
	// self.graphics.drawLine('2','#000000',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height]);

}
Background.prototype.run=function(){
	var self=this;

}