function Player(x,y,shootX,shootY,bitmapData,hp){
	base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
	var self=this;
	self.belong="self";
	self.downX=self.downY=0;
	self.bulletBitmapData=new LBitmapData(imglist['bullet01']);
	// self.x=x;
	// self.y=y;
}
/*动画*/
Player.prototype.onplainframe=function(){
	var self=this;	
	self.callParent("onplainframe", arguments);
	if (self.isdie==true) gameOver();
}
