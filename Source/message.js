/*
---
description: Message Class. A much more sophisticated way to alert your users.

license: MIT-style

authors:
- Jason Beaudoin
- ColdFire Designs

requires:
	core/1.2.4: '*'
	more/1.2.4:Chain.Wait
	more/1.2.4:Element.Position
	more/1.2.4:Element.Shortcuts

provides: [Message.say, Message.tell, Message.ask, Message.waiter, Messate.tip]

...
*/

<<<<<<< HEAD
var Message=new Class({Implements:[Options,Events],msgChain:null,end:false,isDisplayed:false,windowSize:null,pageSize:null,page:$(document),box:null,boxSize:null,scrollPos:null,windowSize:null,hasVerticalBar:false,hasHorizontalBar:false,boxPos:$empty,tipCheck:true,cancel:false,fx:null,fxOut:null,options:{callingElement:null,top:false,left:false,centered:false,offset:30,width:"auto",icon:null,iconPath:"images/icons/",iconSize:40,fontSize:14,title:null,message:null,delay:0,autoDismiss:true,dismissOnEvent:false,isUrgent:false,callback:null,passEvent:null,fxTransition:null,fxDuration:"normal",fxUrgentTransition:Fx.Transitions.Bounce.easeOut,fxOutTransition:null,fxOutDuration:"normal",yesLink:"Yes",noLink:"No"},initialize:function(a){this.setOptions(a);this.box=this;if(this.options.width=="auto"){this.options.width="250px"}if($chk(this.options.passEvent)&&$defined(this.options.callingElement)){this.options.dismissOnEvent=true;this.options.callingElement.addEvent("mouseout",function(){if(this.isDisplayed){this.dismiss()}else{this.cancel=true}}.bind(this))}},say:function(d,c,b,a,e){this.setVars(d,c,b,a,e);this.box=this.createBox();this.msgChain=new Chain();this.setMsgChain()},ask:function(d,c,e,b,a){this.options.autoDismiss=false;if($chk(e)){this.options.callback=e}a=$defined(a)?a:true;this.say(d,c,b,a,e)},tell:function(d,c,b,a){a=$defined(a)?a:true;this.options.dismissOnEvent=true;this.say(d,c,b,a)},waiter:function(d,c,b,a){if($chk(a)){this.options.centered=a}this.options.autoDismiss=false;this.options.dismissOnEvent=true;this.options.centered=true;this.say(d,c,b)},tip:function(c,b,a){this.options.autoDismiss=true;this.options.dismissOnEvent=true;this.say(c,b,a)},setVars:function(d,c,b,a,e){if($defined(d)){this.options.title=d}if($defined(c)){this.options.message=c}if($defined(b)){this.options.icon=b}if($defined(a)){this.options.isUrgent=a}if($defined(e)){this.options.callback=e}},setMsgChain:function(){if(!$chk(this.fx)){this.fx=new Fx.Tween(this.box,{link:"chain",onComplete:function(){if((this.options.autoDismiss&&!this.options.dismissOnEvent)||(!this.isDisplayed&&!$chk(this.options.callback))){this.msgChain.callChain()}}.bind(this),transition:this.options.fxTransition,duration:this.options.fxDuration})}var a;if($chk(this.options.callback)||this.options.autoDismiss==false||this.options.dismissOnEvent){a=0}else{a=2000}this.msgChain.wait(this.options.delay).chain(function(){if(!this.cancel){this.showMsg()}else{this.complete()}this.fireEvent("onShow")}.bind(this)).wait(a).chain(function(){this.hideMsg()}.bind(this)).callChain()},showMsg:function(){this.setSizes();this.setBoxPosition();if(this.hasVerticalBar){$(document.body).setStyle("overflow","hidden")}this.box.setStyles({opacity:0,top:this.boxPos.startTop,left:this.boxPos.startLeft,"z-index":"1"}).fade("in");if(!this.options.isUrgent){this.fx.start("top",this.boxPos.endTop)}else{var a=new Fx.Tween(this.box,{duration:"long",transition:this.options.fxUrgentTransition});a.start("top",this.boxPos.endTop)}this.isDisplayed=true},dismiss:function(){this.msgChain.callChain()},setBoxPosition:function(){this.boxPos=new Hash();var e=(this.options.top&&this.options.left);var c;var a;var b;var d;this.options.top?c=(this.boxSize.y*-1):c=this.scrollPos.y+this.windowSize.y;this.options.left?a=this.options.offset:a=this.windowSize.x-this.boxSize.x-this.options.offset;this.options.top?d=this.options.offset:d=this.scrollPos.y+this.windowSize.y-(this.boxSize.y*1.25);if(($chk(this.options.passEvent)&&!this.options.isUrgent)&&!e){var f;(this.options.passEvent.page.x+this.boxSize.x>this.windowSize.x)?f=(this.boxSize.x*-1)-5:f=5;this.boxPos.extend({startTop:this.options.passEvent.page.y-this.options.offset,startLeft:this.options.passEvent.page.x+f,endTop:this.options.passEvent.page.y})}else{if((this.options.isUrgent&&!e)||this.options.centered){this.box.position();this.boxPosition=this.box.getCoordinates();this.boxPos.extend({startTop:this.boxPosition.top-100,startLeft:this.boxPosition.left,endTop:this.boxPosition.top})}else{this.boxPos.extend({startTop:c,startLeft:a,endTop:d})}}},setSizes:function(){this.boxSize=this.box.getSize();this.boxPosition=this.box.getCoordinates();this.windowSize=this.page.getSize();this.scrollPos=this.page.getScroll();this.pageSize=this.page.getScrollSize();if(this.windowSize.y>=this.pageSize.y){this.hasVerticalBar=true||false}if(this.windowSize.x>=this.pageSize.x){this.hasHorizontalBar=true||false}},createBox:function(){var h=new Element("div",{"class":"msgBox",styles:{"max-width":this.options.width,width:this.options.width}});var j=0;if($chk(this.options.icon)){var g=new Element("div",{"class":"msgBoxIcon"});var i=new Element("img",{"class":"msgBoxImage",src:this.options.iconPath+this.options.icon,styles:{width:this.options.iconSize,height:this.options.iconSize}})}if(!$chk(this.options.title)||!$chk(this.options.message)){this.getContent()}var l=new Element("div",{"class":"msgBoxContent"}).setStyle("font-size",this.options.fontSize);var b=new Element("div",{"class":"msgBoxTitle",html:this.options.title}).setStyle("font-size",this.options.fontSize+4);var k=this.getCSSTotalWidth("msgBoxIcon");var n=new Element("div",{"class":"clear"});var c=new Element("div",{html:this.options.message+"<br />",styles:{margin:"0px",width:this.options.width.toInt()-k}});var q=this.options.message.indexOf("textarea")>-1;if($chk(this.options.callback)&&!q){var e=this.createLink(this.options.yesLink,true);var o=this.createLink(this.options.noLink,false);e.inject(c);c.appendText(" | ");o.inject(c)}else{if(q){var f=this.createLink("Send",true);var d=this.createLink("Cancel",false);f.inject(c);c.appendText(" | ");d.inject(c)}else{if(this.options.isUrgent||(!this.options.autoDismiss&&!this.options.dismissOnEvent)){var m=this.createLink("Ok",false);m.inject(c)}}}var a=new Element("div",{"class":"msgBoxMessage"});c.inject(a);if($chk(this.options.icon)){g.inject(h);i.inject(g)}l.inject(h);b.inject(l);n.inject(l);a.inject(l);h.inject(this.page.body);this.box=h;return h},createLink:function(b,a){var c=new Element("a",{href:"javascript:","class":"msgBoxLink",html:b,id:b.replace(" ","_")+"Link",events:{click:function(){this.msgChain.callChain();if(a){this.executeCallback()}}.bind(this)}});return c},getCSSTotalWidth:function(b){var c=new Element("div",{id:"dummy","class":b});c.inject($(document.body));var a=c.getComputedSize();c.destroy();return a.totalWidth},executeCallback:function(){if($type(this.options.callback)=="element"){this.options.callback.fireEvent("click")}else{eval(this.options.callback)}},getContent:function(){var d;var c;if($defined(this.options.callingElement)){var b=this.options.callingElement.getProperty("rel");var a;if(!$chk(b)){a=this.setError("Expected data in the 'rel' property of this calling element was not defined.");d=a[0];c=a[1];this.options.autoDismiss=false}else{a=b.split("::");d=a[0];c=a[1]}}this.options.title=d;this.options.message=c},setError:function(b){var a=new Array();a.push("<span style='color:#FF0000'>Error!</span>");a.push(b);return a},complete:function(){this.box.destroy();this.end=true;this.isDisplayed=false;this.fireEvent("onComplete");$(document.body).setStyle("overflow","auto")},hideMsg:function(){if(this.hasVerticalBar){$(document.body).setStyle("overflow","hidden")}var a=this.box.getCoordinates();this.box.fade("out");this.fxOut=new Fx.Tween(this.box,{transition:this.options.fxOutTransition,duration:this.options.fxOutDuration});this.fxOut.addEvent("complete",function(){this.complete()}.bind(this));var b;this.options.top?b=this.boxSize.y*-1:b=a.top+this.boxSize.y;this.fxOut.start("top",b)}});
=======
var Message=new Class({Implements:[Options,Events],msgChain:null,end:false,isDisplayed:false,windowSize:null,pageSize:null,page:$(document),box:null,boxSize:null,scrollPos:null,windowSize:null,hasVerticalBar:false,hasHorizontalBar:false,boxPos:$empty,tipCheck:true,cancel:false,fx:null,fxOut:null,options:{callingElement:null,top:false,left:false,centered:false,offset:30,width:"auto",icon:null,iconPath:"images/icons/",iconSize:40,fontSize:14,title:null,message:null,delay:0,autoDismiss:true,dismissOnEvent:false,isUrgent:false,callback:null,passEvent:null,fxTransition:null,fxDuration:"normal",fxUrgentTransition:Fx.Transitions.Bounce.easeOut,fxOutTransition:null,fxOutDuration:"normal"},initialize:function(a){this.setOptions(a);this.box=this;if(this.options.width=="auto"){this.options.width="250px"}if($chk(this.options.passEvent)&&$defined(this.options.callingElement)){this.options.dismissOnEvent=true;this.options.callingElement.addEvent("mouseout",function(){if(this.isDisplayed){this.dismiss()}else{this.cancel=true}}.bind(this))}},say:function(d,c,b,a,e){this.setVars(d,c,b,a,e);this.box=this.createBox();this.msgChain=new Chain();this.setMsgChain()},ask:function(d,c,e,b,a){this.options.autoDismiss=false;if($chk(e)){this.options.callback=e}a=$defined(a)?a:true;this.say(d,c,b,a,e)},tell:function(d,c,b,a){a=$defined(a)?a:true;this.options.dismissOnEvent=true;this.say(d,c,b,a)},waiter:function(d,c,b,a){if($chk(a)){this.options.centered=a}this.options.autoDismiss=false;this.options.dismissOnEvent=true;this.options.centered=true;this.say(d,c,b)},tip:function(c,b,a){this.options.autoDismiss=true;this.options.dismissOnEvent=true;this.say(c,b,a)},setVars:function(d,c,b,a,e){if($defined(d)){this.options.title=d}if($defined(c)){this.options.message=c}if($defined(b)){this.options.icon=b}if($defined(a)){this.options.isUrgent=a}if($defined(e)){this.options.callback=e}},setMsgChain:function(){if(!$chk(this.fx)){this.fx=new Fx.Tween(this.box,{link:"chain",onComplete:function(){if((this.options.autoDismiss&&!this.options.dismissOnEvent)||(!this.isDisplayed&&!$chk(this.options.callback))){this.msgChain.callChain()}}.bind(this),transition:this.options.fxTransition,duration:this.options.fxDuration})}var a;if($chk(this.options.callback)||this.options.autoDismiss==false||this.options.dismissOnEvent){a=0}else{a=2000}this.msgChain.wait(this.options.delay).chain(function(){if(!this.cancel){this.showMsg()}else{this.complete()}}.bind(this)).wait(a).chain(function(){this.hideMsg()}.bind(this)).callChain()},showMsg:function(){this.setSizes();this.setBoxPosition();if(this.hasVerticalBar){$(document.body).setStyle("overflow","hidden")}this.box.setStyles({opacity:0,top:this.boxPos.startTop,left:this.boxPos.startLeft,"z-index":"1"}).fade("in");if(!this.options.isUrgent){this.fx.start("top",this.boxPos.endTop)}else{var a=new Fx.Tween(this.box,{duration:"long",transition:this.options.fxUrgentTransition});a.start("top",this.boxPos.endTop)}this.isDisplayed=true},dismiss:function(){this.msgChain.callChain()},setBoxPosition:function(){this.boxPos=new Hash();var e=(this.options.top&&this.options.left);var c;var a;var b;var d;this.options.top?c=(this.boxSize.y*-1):c=this.scrollPos.y+this.windowSize.y;this.options.left?a=this.options.offset:a=this.windowSize.x-this.boxSize.x-this.options.offset;this.options.top?d=this.options.offset:d=this.scrollPos.y+this.windowSize.y-(this.boxSize.y*1.25);if(($chk(this.options.passEvent)&&!this.options.isUrgent)&&!e){var f;(this.options.passEvent.page.x+this.boxSize.x>this.windowSize.x)?f=(this.boxSize.x*-1)-5:f=5;this.boxPos.extend({startTop:this.options.passEvent.page.y-this.options.offset,startLeft:this.options.passEvent.page.x+f,endTop:this.options.passEvent.page.y})}else{if((this.options.isUrgent&&!e)||this.options.centered){this.box.position();this.boxPosition=this.box.getCoordinates();this.boxPos.extend({startTop:this.boxPosition.top-100,startLeft:this.boxPosition.left,endTop:this.boxPosition.top})}else{this.boxPos.extend({startTop:c,startLeft:a,endTop:d})}}},setSizes:function(){this.boxSize=this.box.getSize();this.boxPosition=this.box.getCoordinates();this.windowSize=this.page.getSize();this.scrollPos=this.page.getScroll();this.pageSize=this.page.getScrollSize();if(this.windowSize.y>=this.pageSize.y){this.hasVerticalBar=true||false}if(this.windowSize.x>=this.pageSize.x){this.hasHorizontalBar=true||false}},createBox:function(){var h=new Element("div",{"class":"msgBox",styles:{"max-width":this.options.width,width:this.options.width}});var j=0;if($chk(this.options.icon)){var g=new Element("div",{"class":"msgBoxIcon"});var i=new Element("img",{"class":"msgBoxImage",src:this.options.iconPath+this.options.icon,styles:{width:this.options.iconSize,height:this.options.iconSize}})}if(!$chk(this.options.title)||!$chk(this.options.message)){this.getContent()}var l=new Element("div",{"class":"msgBoxContent"}).setStyle("font-size",this.options.fontSize);var b=new Element("div",{"class":"msgBoxTitle",html:this.options.title}).setStyle("font-size",this.options.fontSize+4);var k=this.getCSSTotalWidth("msgBoxIcon");var n=new Element("div",{"class":"clear"});var c=new Element("div",{html:this.options.message+"<br />",styles:{margin:"0px",width:this.options.width.toInt()-k}});var q=this.options.message.indexOf("textarea")>-1;if($chk(this.options.callback)&&!q){var e=this.createLink("Yes",true);var o=this.createLink("No",false);e.inject(c);c.appendText(" | ");o.inject(c)}else{if(q){var f=this.createLink("Send",true);var d=this.createLink("Cancel",false);f.inject(c);c.appendText(" | ");d.inject(c)}else{if(this.options.isUrgent||(!this.options.autoDismiss&&!this.options.dismissOnEvent)){var m=this.createLink("Ok",false);m.inject(c)}}}var a=new Element("div",{"class":"msgBoxMessage"});c.inject(a);if($chk(this.options.icon)){g.inject(h);i.inject(g)}l.inject(h);b.inject(l);n.inject(l);a.inject(l);h.inject(this.page.body);this.box=h;return h},createLink:function(b,a){var c=new Element("a",{href:"javascript:","class":"msgBoxLink",html:b,events:{click:function(){this.msgChain.callChain();if(a){this.executeCallback()}}.bind(this)}});return c},getCSSTotalWidth:function(b){var c=new Element("div",{id:"dummy","class":b});c.inject($(document.body));var a=c.getComputedSize();c.destroy();return a.totalWidth},executeCallback:function(){if($type(this.options.callback)=="element"){this.options.callback.fireEvent("click")}else{eval(this.options.callback)}},getContent:function(){var d;var c;if($defined(this.options.callingElement)){var b=this.options.callingElement.getProperty("rel");var a;if(!$chk(b)){a=this.setError("Expected data in the 'rel' property of this calling element was not defined.");d=a[0];c=a[1];this.options.autoDismiss=false}else{a=b.split("::");d=a[0];c=a[1]}}this.options.title=d;this.options.message=c},setError:function(b){var a=new Array();a.push("<span style='color:#FF0000'>Error!</span>");a.push(b);return a},complete:function(){this.box.destroy();this.end=true;this.isDisplayed=false;this.fireEvent("onComplete");$(document.body).setStyle("overflow","auto")},hideMsg:function(){if(this.hasVerticalBar){$(document.body).setStyle("overflow","hidden")}var a=this.box.getCoordinates();this.box.fade("out");this.fxOut=new Fx.Tween(this.box,{transition:this.options.fxOutTransition,duration:this.options.fxOutDuration});this.fxOut.addEvent("complete",function(){this.complete()}.bind(this));var b;this.options.top?b=this.boxSize.y*-1:b=a.top+this.boxSize.y;this.fxOut.start("top",b)}});
>>>>>>> 434a19bbfaf18324db2a107780ef9577b695b970
