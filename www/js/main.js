////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW=768;
var stageH=1024;

/*!
 * 
 * START BUILD APP - This is the function that runs build app
 * 
 */
function initMain(){
	if(!isMobile || !isTablet){
		$('#canvasHolder').show();	
	}else{
		checkMobileOrientation();	
	}
	
	initAppCanvas(stageW,stageH);
	buildAppCanvas();
	buildPageButton();
	buildCamera();
	
	goPage('main');
	resizeCanvas();
	
	loadXML('stickers.xml');
}

var windowW=windowH=0;
var scalePercent=0;

/*!
 * 
 * APP RESIZE - This is the function that runs to resize and centralize the app
 * 
 */
function resizeAppFunc(){
	setTimeout(function() {
		$('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
		$('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));
		
		windowW = $(window).width();
		windowH = $(window).height();
		
		scalePercent = windowW/stageW;
			
		if((stageH*scalePercent)>windowH){
			scalePercent = windowH/stageH;
		}
		var appCanvas = document.getElementById("appCanvas");
		appCanvas.width=stageW*scalePercent;
		appCanvas.height=stageH*scalePercent;
		
		$('#canvasHolder').css('max-width',stageW*scalePercent);
		$('#canvasHolder').css('top',(windowH/2)-((stageH*scalePercent)/2));
		
		$('#loaderHolder').css('max-width',stageW*scalePercent);
		$('#loaderHolder').css('top',(windowH/2)-((stageH*scalePercent)/2));
		
		resizeCanvas();
		resizeCamera();
	}, 100);	
}