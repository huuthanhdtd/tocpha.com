/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.4(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2014 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 *
 * Fork by Orakaro 2015
 *
 */
!function($){$.fn.drawDoughnutChart=function(data,options){function getHollowCirclePath(doughnutRadius,cutoutRadius){var startRadius=-1.57,endRadius=4.7131,startX=centerX+cos(startRadius)*doughnutRadius,startY=centerY+sin(startRadius)*doughnutRadius,endX2=centerX+cos(startRadius)*cutoutRadius,endY2=centerY+sin(startRadius)*cutoutRadius,endX=centerX+cos(endRadius)*doughnutRadius,endY=centerY+sin(endRadius)*doughnutRadius,startX2=centerX+cos(endRadius)*cutoutRadius,startY2=centerY+sin(endRadius)*cutoutRadius,cmd=["M",startX,startY,"A",doughnutRadius,doughnutRadius,0,1,1,endX,endY,"Z","M",startX2,startY2,"A",cutoutRadius,cutoutRadius,0,1,0,endX2,endY2,"Z"];return cmd=cmd.join(" ")}function pathMouseEnter(e){var order=$(this).data().order;if(settings.showTip&&$tip.text(data[order].title+": "+data[order].value).fadeIn(200),settings.showLabel){$summaryTitle.text(data[order].title).css("font-size",getScaleFontSize($summaryTitle,data[order].title));var tmpNumber=settings.shortInt?shortKInt(data[order].value):data[order].value;$summaryNumber.html(tmpNumber).css("font-size",getScaleFontSize($summaryNumber,tmpNumber))}settings.onPathEnter.apply($(this),[e,data])}function pathMouseLeave(e){if(settings.showTip&&$tip.hide(),settings.showLabel){$summaryTitle.text(settings.summaryTitle).css("font-size",getScaleFontSize($summaryTitle,settings.summaryTitle));var tmpNumber=settings.shortInt?shortKInt(segmentTotal):segmentTotal;$summaryNumber.html(tmpNumber).css("font-size",getScaleFontSize($summaryNumber,tmpNumber))}settings.onPathLeave.apply($(this),[e,data])}function pathMouseMove(e){settings.showTip&&$tip.css({top:e.pageY+settings.tipOffsetY,left:e.pageX-$tip.width()/2+settings.tipOffsetX})}function pathClick(){var order=$(this).data().order;"undefined"!=typeof data[order].action&&data[order].action()}function drawPieSegments(animationDecimal){var startRadius=-PI/2,rotateAnimation=1;if(settings.animation&&settings.animateRotate&&(rotateAnimation=animationDecimal),drawDoughnutText(animationDecimal,segmentTotal),$pathGroup.attr("opacity",animationDecimal),1===data.length&&4.7122<rotateAnimation*(data[0].value/segmentTotal)*2*PI+startRadius)return void $paths[0].attr("d",getHollowCirclePath(doughnutRadius,cutoutRadius));for(var i=0,len=data.length;len>i;i++){var segmentAngle=rotateAnimation*(data[i].value/segmentTotal)*2*PI,endRadius=startRadius+segmentAngle,largeArc=(endRadius-startRadius)%(2*PI)>PI?1:0,startX=centerX+cos(startRadius)*doughnutRadius,startY=centerY+sin(startRadius)*doughnutRadius,endX2=centerX+cos(startRadius)*cutoutRadius,endY2=centerY+sin(startRadius)*cutoutRadius,endX=centerX+cos(endRadius)*doughnutRadius,endY=centerY+sin(endRadius)*doughnutRadius,startX2=centerX+cos(endRadius)*cutoutRadius,startY2=centerY+sin(endRadius)*cutoutRadius,cmd=["M",startX,startY,"A",doughnutRadius,doughnutRadius,0,largeArc,1,endX,endY,"L",startX2,startY2,"A",cutoutRadius,cutoutRadius,0,largeArc,0,endX2,endY2,"Z"];$paths[i].attr("d",cmd.join(" ")),startRadius+=segmentAngle}}function drawDoughnutText(animationDecimal,segmentTotal){settings.overwriteTotal!==!1&&(segmentTotal=settings.overwriteTotal),$summaryNumber.css({opacity:animationDecimal}).text((segmentTotal*animationDecimal).toFixed(1));var tmpNumber=settings.shortInt?shortKInt(segmentTotal):segmentTotal;$summaryNumber.html(tmpNumber).css("font-size",getScaleFontSize($summaryNumber,tmpNumber))}function animateFrame(cnt,drawData){var easeAdjustedAnimationPercent=settings.animation?CapValue(easingFunction(cnt),null,0):1;drawData(easeAdjustedAnimationPercent)}function animationLoop(drawData){var animFrameAmount=settings.animation?1/CapValue(settings.animationSteps,Number.MAX_VALUE,1):1,cnt=settings.animation?0:1;requestAnimFrame(function(){cnt+=animFrameAmount,animateFrame(cnt,drawData),1>=cnt?requestAnimFrame(arguments.callee):settings.afterDrawed.call($this)})}function Min(arr){return Math.min.apply(null,arr)}function isNumber(n){return!isNaN(parseFloat(n))&&isFinite(n)}function CapValue(valueToCap,maxValue,minValue){return isNumber(maxValue)&&valueToCap>maxValue?maxValue:isNumber(minValue)&&minValue>valueToCap?minValue:valueToCap}function shortKInt(int){int=int.toString();var strlen=int.length;return 5>strlen?int:8>strlen?'<span title="'+int+'">'+int.substring(0,strlen-3)+"K</span>":'<span title="'+int+'">'+int.substring(0,strlen-6)+"M</span>"}function getScaleFontSize(block,newText){block.css("font-size",""),newText=newText.toString().replace(/(<([^>]+)>)/gi,"");var newFontSize=block.width()/newText.length*settings.ratioFont,maxCharForDefaultFont=block.width()-newText.length*block.css("font-size").replace(/px/,"")/settings.ratioFont;return 0>maxCharForDefaultFont?newFontSize+"px":""}var $this=this,W=$this.width(),H=$this.height(),centerX=W/2,centerY=H/2,cos=Math.cos,sin=Math.sin,PI=Math.PI,settings=$.extend({segmentShowStroke:!0,segmentStrokeColor:"#0C1013",segmentStrokeWidth:1,baseColor:"rgba(0,0,0,0.5)",baseOffset:4,edgeOffset:10,percentageInnerCutout:75,animation:!0,animationSteps:90,animationEasing:"easeInOutExpo",animateRotate:!0,tipOffsetX:-8,tipOffsetY:-45,showTip:!0,showLabel:!1,ratioFont:1.5,shortInt:!1,tipClass:"doughnutTip",summaryClass:"doughnutSummary",summaryTitle:"TOTAL:",summaryTitleClass:"doughnutSummaryTitle",summaryNumberClass:"doughnutSummaryNumber",overwriteTotal:!1,beforeDraw:function(){},afterDrawed:function(){},onPathEnter:function(){},onPathLeave:function(){}},options),animationOptions={linear:function(t){return t},easeInOutExpo:function(t){var v=.5>t?8*t*t*t*t:1-8*--t*t*t*t;return v>1?1:v}},requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}();settings.beforeDraw.call($this);var $svg=$('<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+" "+H+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),$paths=[],easingFunction=animationOptions[settings.animationEasing],doughnutRadius=Min([H/2,W/2])-settings.edgeOffset,cutoutRadius=doughnutRadius*(settings.percentageInnerCutout/100),segmentTotal=0,baseDoughnutRadius=doughnutRadius+settings.baseOffset,baseCutoutRadius=cutoutRadius-settings.baseOffset;$(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({d:getHollowCirclePath(baseDoughnutRadius,baseCutoutRadius),fill:settings.baseColor}).appendTo($svg);var $pathGroup=$(document.createElementNS("http://www.w3.org/2000/svg","g"));if($pathGroup.attr({opacity:0}).appendTo($svg),settings.showTip){var $tip=$('<div class="'+settings.tipClass+'" />').appendTo("body").hide();$tip.width(),$tip.height()}var summarySize=2*(cutoutRadius-(doughnutRadius-cutoutRadius)),$summary=$('<div class="'+settings.summaryClass+'" />').appendTo($this).css({width:summarySize+"px",height:summarySize+"px","margin-left":-(summarySize/2)+"px","margin-top":-(summarySize/2)+"px"}),$summaryTitle=$('<p class="'+settings.summaryTitleClass+'">'+settings.summaryTitle+"</p>").appendTo($summary);$summaryTitle.css("font-size",getScaleFontSize($summaryTitle,settings.summaryTitle));for(var $summaryNumber=$('<p class="'+settings.summaryNumberClass+'"></p>').appendTo($summary).css({opacity:0}),i=0,len=data.length;len>i;i++)segmentTotal+=data[i].value,$paths[i]=$(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({"stroke-width":settings.segmentStrokeWidth,stroke:settings.segmentStrokeColor,fill:data[i].color,"data-order":i}).appendTo($pathGroup).on("mouseenter",pathMouseEnter).on("mouseleave",pathMouseLeave).on("mousemove",pathMouseMove).on("click",pathClick);return animationLoop(drawPieSegments),$this}}(jQuery);