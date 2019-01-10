function Boss(x,y,shootX,shootY,bitmapData,hp) {
	base(this,Enemy,[x,y,shootX,shootY,bitmapData,hp]);
	this.shooIndex=0;
}
Boss.prototype.onplainframe=function(){
	var self=this;
	self.callParent("onplainframe", arguments);

	if(self.isdie||self.hp<=0)gameClear();
};
Boss.prototype.whenOut=function(){
	var self=this;
	if (self.x < 400) {
		self.move[0]=1;
		self.move[1]=Math.random()>0.5?1:-1;
	}
	else {
		self.move[0]=-1;
		self.move[1]=Math.random()>0.5?1:-1;
	}

};
Boss.prototype.shoot = function(){
	var self=this;
	self.shooIndex++;
	if (self.shooIndex>100 && self.shooIndex<200) {
		return;
	} else if(self.shooIndex>=200){
		self.shooIndex=0;
	}
	self.callParent("shoot", arguments);
}
