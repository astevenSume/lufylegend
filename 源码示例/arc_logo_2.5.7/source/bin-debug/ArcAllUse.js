//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ArcAllUse = (function (_super) {
    __extends(ArcAllUse, _super);
    function ArcAllUse() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    var d = __define,c=ArcAllUse,p=c.prototype;
    p.init = function () {
        this.addToContainer(this.getArc(false));
        this.addToContainer(this.getArc(true));
        this.addToContainer(this.getArch(false));
        this.addToContainer(this.getArch(true));
        this.addToContainer(this.getSector(false, 1));
        this.addToContainer(this.getSector(true, 1));
        this.addToContainer(this.getSector(false, -1));
        this.addToContainer(this.getSector(true, -1));
        this.addToContainer(this.getArcProgress(false, 1));
        this.addToContainer(this.getArcProgress(true, 1));
        this.addToContainer(this.getArcProgress(false, -1));
        this.addToContainer(this.getArcProgress(true, -1));
        this.addToContainer(this.getSectorProgress(false, 1));
        this.addToContainer(this.getSectorProgress(true, 1));
        this.addToContainer(this.getSectorProgress(false, -1));
        this.addToContainer(this.getSectorProgress(true, -1));
        this.addToContainer(this.drawBorderProgress("club_png", false, 1));
        this.addToContainer(this.drawBorderProgress("club_png", true, 1));
        this.addToContainer(this.drawBorderProgress("club_png", true, -1));
        this.addToContainer(this.drawBorderProgress("club_png", false, -1));
        this.addToContainer(this.drawBorderProgress("club2_png", false, 1));
        this.addToContainer(this.drawBorderProgress("club2_png", true, 1));
        this.addToContainer(this.drawBorderProgress("club2_png", true, -1));
        this.addToContainer(this.drawBorderProgress("club2_png", false, -1));
        this.addToContainer(this.drawBorderProgress("role_png", false, 1));
        this.addToContainer(this.drawBorderProgress("role_png", true, 1));
        this.addToContainer(this.drawBorderProgress("role_png", true, -1));
        this.addToContainer(this.drawBorderProgress("role_png", false, -1));
        this.addToContainer(this.drawBorderWithPic("bg_icon_png"));
        this.addToContainer(this.drawMaskWithPic("bg_icon_png"));
        this.addToContainer(this.drawBgWithPic("role_png"));
    };
    p.addToContainer = function (child) {
        child.x = Math.floor(this.numChildren % 4) * 120 + 10;
        child.y = Math.floor(this.numChildren / 4) * 120 + 10;
        this.addChild(child);
    };
    p.getArc = function (anticlockwise) {
        var shape = new egret.Shape();
        shape.graphics.lineStyle(2, 0xffff00);
        shape.graphics.drawArc(50, 50, 50, 0, 30 * Math.PI / 180, anticlockwise);
        shape.graphics.endFill();
        return shape;
    };
    p.getArch = function (anticlockwise) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawArc(50, 50, 50, 0, Math.PI / 180 * 60, anticlockwise);
        shape.graphics.endFill();
        return shape;
    };
    p.getSector = function (anticlockwise, dic) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(50, 50);
        shape.graphics.lineTo(100, 50);
        shape.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180 * dic, anticlockwise);
        shape.graphics.lineTo(50, 50);
        shape.graphics.endFill();
        return shape;
    };
    p.getArcProgress = function (anticlockwise, dic) {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1 * dic;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        return shape;
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x0000ff, 1);
            shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, anticlockwise);
            shape.graphics.endFill();
        }
    };
    p.getSectorProgress = function (anticlockwise, dic) {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1 * dic;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        return shape;
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.moveTo(50, 50);
            shape.graphics.lineTo(100, 50);
            shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, anticlockwise);
            shape.graphics.lineTo(50, 50);
            shape.graphics.endFill();
        }
    };
    p.drawMaskWithPic = function (key) {
        var container = new egret.DisplayObjectContainer();
        var w = 100;
        var h = 100;
        var pic = new egret.Bitmap(RES.getRes(key));
        container.addChild(pic);
        pic.width = w;
        pic.height = h;
        var progress = this.drawBorderProgress("club2_png", true, 1);
        container.addChild(progress);
        progress.alpha = 1;
        return container;
    };
    p.drawBorderWithPic = function (picKey) {
        var container = new egret.DisplayObjectContainer();
        var w = 96;
        var h = 96;
        var pic = new egret.Bitmap(RES.getRes(picKey));
        container.addChild(pic);
        pic.width = w;
        pic.height = h;
        pic.x = 3;
        pic.y = 3;
        var progress = this.drawBorderProgress("club_png", false, 1);
        container.addChild(progress);
        return container;
    };
    p.drawBgWithPic = function (key) {
        var container = new egret.DisplayObjectContainer();
        var w = 100;
        var h = 100;
        var pic = new egret.Bitmap(RES.getRes(key));
        container.addChild(pic);
        pic.width = w;
        pic.height = h;
        pic.alpha = 0.5;
        var progress = this.drawBorderProgress(key, false, 1);
        container.addChild(progress);
        return container;
    };
    p.drawBorderProgress = function (key, anticlockwise, dic) {
        var container = new egret.DisplayObjectContainer();
        var w = 100;
        var h = 100;
        var r = Math.max(w, h) / 2 * 1.5;
        var bitmap = new egret.Bitmap(RES.getRes(key));
        container.addChild(bitmap);
        bitmap.width = w;
        bitmap.height = h;
        var shape = new egret.Shape();
        shape.x = bitmap.width / 2;
        shape.y = bitmap.height / 2;
        bitmap.mask = shape;
        container.addChild(shape);
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1 * dic;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        return container;
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.lineTo(r, 0);
            shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, anticlockwise);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    };
    return ArcAllUse;
})(egret.DisplayObjectContainer);
egret.registerClass(ArcAllUse,'ArcAllUse');
