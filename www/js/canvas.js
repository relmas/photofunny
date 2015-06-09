////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START APP CANVAS - This is the function that runs to setup app canvas
 * 
 */
function initAppCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("appCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, editContainer, cameraOptionContainer, editOptionContainer, resultOptionContainer, photoContainer, photoUploadContainer, photoGuideContainer, stickerIconContainer, transformIconContainer, shareContainer, loaderContainer;
var bgLanding, logo, bgPhoto, bgSticker, bgTransform, btnCamera, btnUpload, btnStickerLeft, btnStickerRight, btnStickerCatLeft, btnStickerCatRight, btnZoomIn, btnZoomOut, btnDone, btnRemove, btnRotateLeft, btnRotateRight, maskPhoto, photoUploadBg, btnBackSmall, btnBack, btnContinue, btnTakephoto, btnFinish, textNoCamera, textCameraAllow, textCameraDenied, textCameraNotSupport, textLoading, textComplete, btnCancel, btnStartCamera, btnDownload, btnStartOver, titleCameraUpload, titleEditPhoto, titleAddSticker, titleComplete, centerReg, bgLoader;

//version 1.1
var btnBringFront, btnBringBack, btnFlipX, btnFlipY;

//version 1.2
var btnFacebook;

var photoX = 0;
var photoY = 0;
var transformToolGuide_arr=[];

$.frameObj = {};
$.transformObj = {};
$.transformObj2 = {};
$.iconStickersObj = {};

/*!
 * 
 * BUILD APP CANVAS ASSERTS - This is the function that runs to build app canvas asserts
 * 
 */
function buildAppCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	editContainer = new createjs.Container();
	photoContainer = new createjs.Container();
	photoUploadContainer = new createjs.Container();
	photoGuideContainer = new createjs.Container();
	stickerIconContainer = new createjs.Container();
	transformIconContainer = new createjs.Container();
	editOptionContainer = new createjs.Container();
	cameraOptionContainer = new createjs.Container();
	resultOptionContainer = new createjs.Container();
	shareContainer = new createjs.Container();
	loaderContainer = new createjs.Container();
	
	photoX = canvasW/2;
	photoY = canvasH/100 * 35;
	
	photoUploadBg = new createjs.Shape();
	photoUploadBg.graphics.beginFill(photoBg).drawRect(photoX - (photoW/2), photoY - (photoH/2), photoW, photoH);
	
	maskPhoto = new createjs.Shape();
	maskPhoto.graphics.beginFill(photoBg).drawRect(photoX - (photoW/2), photoY - (photoH/2), photoW, photoH);
	photoContainer.mask = maskPhoto;
	
	//main
	bgLanding = new createjs.Bitmap(loader.getResult("bgLanding"));
	logo = new createjs.Bitmap(loader.getResult("logo"));
	btnCamera = new createjs.Bitmap(loader.getResult("btnCamera"));
	btnUpload = new createjs.Bitmap(loader.getResult("btnUpload"));
	
	centerReg(logo);
	centerReg(btnCamera);
	centerReg(btnUpload);
	
	logo.x = canvasW/2;
	logo.y = canvasH/100 * 35;
	
	btnCamera.x=canvasW/2;
	btnCamera.y=canvasH/100*63;
	
	btnUpload.x=canvasW/2;
	btnUpload.y=canvasH/100*76;
	
	//reposition for ios
	$('#btn_hiddenCamera').css('left',((canvasW/2)-($('#btn_hiddenCamera').width()/2)));
	$('#btn_hiddenCamera').css('top',(canvasH/100*76)*scalePercent);
	
	//photo
	bgPhoto = new createjs.Bitmap(loader.getResult("bgPhoto"));
	bgSticker = new createjs.Bitmap(loader.getResult("bgSticker"));
	bgTransform = new createjs.Bitmap(loader.getResult("bgTransform"));
	centerReg(bgPhoto);
	centerReg(bgSticker);
	centerReg(bgTransform);
	
	bgPhoto.x = photoX;
	bgPhoto.y = photoY+5;
	
	bgSticker.x = canvasW/2;
	bgSticker.y = canvasH/100 * 72;
	
	bgTransform.x = canvasW/2;
	bgTransform.y = canvasH/100 * 76;
	
	var frameWidth = 0;
	var frameSpace = 8;
	var frameStartX = 0;
	
	for(n=0;n<maxFrame;n++){
		$.frameObj['i'+n] = new createjs.Bitmap(loader.getResult("frameSticker"));
		$.frameObj['c'+n] = new createjs.Bitmap(loader.getResult("frameStickerCategory"));
		
		if(n==0){
			frameWidth = ($.frameObj['i'+n].image.width * (maxFrame-1)) + (frameSpace * (maxFrame-1));
			frameStartX = (canvasW/2) - (frameWidth/2);	
		}
		centerReg($.frameObj['i'+n]);
		centerReg($.frameObj['c'+n]);
		$.frameObj['i'+n].x = $.frameObj['c'+n].x = frameStartX;
		$.frameObj['i'+n].y = $.frameObj['c'+n].y = bgSticker.y;
		frameStartX += $.frameObj['i'+n].image.width + frameSpace;
		
		stickerIconContainer.addChild($.frameObj['i'+n], $.frameObj['c'+n]);
	}
	
	btnStickerLeft = new createjs.Bitmap(loader.getResult("btnArrow"));
	btnStickerRight = new createjs.Bitmap(loader.getResult("btnArrow"));
	centerReg(btnStickerLeft);
	centerReg(btnStickerRight);
	createHitarea(btnStickerLeft);
	createHitarea(btnStickerRight);
	
	btnStickerCatLeft = new createjs.Bitmap(loader.getResult("btnArrowYellow"));
	btnStickerCatRight = new createjs.Bitmap(loader.getResult("btnArrowYellow"));
	centerReg(btnStickerCatLeft);
	centerReg(btnStickerCatRight);
	createHitarea(btnStickerCatLeft);
	createHitarea(btnStickerCatRight);
	
	btnStickerLeft.x = btnStickerCatLeft.x = canvasW/100 * 9;
	btnStickerRight.x = btnStickerCatRight.x = canvasW/100 * 91;
	btnStickerRight.scaleX = btnStickerCatRight.scaleX = -1;
	btnStickerLeft.y = btnStickerRight.y = btnStickerCatLeft.y = btnStickerCatRight.y = bgSticker.y;
	
	btnZoomIn = new createjs.Bitmap(loader.getResult("btnZoomIn"));
	btnZoomOut = new createjs.Bitmap(loader.getResult("btnZoomOut"));
	btnDone = new createjs.Bitmap(loader.getResult("btnDone"));
	btnRemove = new createjs.Bitmap(loader.getResult("btnRemove"));
	btnRotateLeft = new createjs.Bitmap(loader.getResult("btnRotateLeft"));
	btnRotateRight = new createjs.Bitmap(loader.getResult("btnRotateRight"));
	
	btnBringFront = new createjs.Bitmap(loader.getResult("btnBringFront"));
	btnBringBack = new createjs.Bitmap(loader.getResult("btnBringBack"));
	btnFlipX = new createjs.Bitmap(loader.getResult("btnFlipX"));
	btnFlipY = new createjs.Bitmap(loader.getResult("btnFlipY"));
	
	var transformTotal = 6;
	var transformTotal2 = 4;
	$.transformObj = [btnZoomIn, btnZoomOut, btnRotateLeft, btnRotateRight, btnBringBack, btnBringFront];
	$.transformObj2 = [btnFlipX, btnFlipY, btnDone, btnRemove];
	
	var transformWidth = 0;
	var transformSpace = 8;
	var transformStartX = 0;
	var spaceBetween = 60;
	
	for(n=0;n<transformTotal;n++){		
		if(n==0){
			transformWidth = ($.transformObj[n].image.width * (transformTotal-1)) + (transformSpace * (transformTotal-1));
			transformStartX = (canvasW/2) - (transformWidth/2);	
		}
		centerReg($.transformObj[n]);
		
		$.transformObj[n].x = transformStartX;
		$.transformObj[n].y = (bgTransform.y-5)-spaceBetween;
		transformStartX += $.transformObj[n].image.width + transformSpace;
	}
	
	transformWidth = 0;
	transformStartX = 0;
	
	for(n=0;n<transformTotal2;n++){		
		if(n==0){
			transformWidth = ($.transformObj2[n].image.width * (transformTotal2-1)) + (transformSpace * (transformTotal2-1));
			transformStartX = (canvasW/2) - (transformWidth/2);	
		}
		centerReg($.transformObj2[n]);
		$.transformObj2[n].x = transformStartX;
		$.transformObj2[n].y = (bgTransform.y-5)+spaceBetween;
		transformStartX += $.transformObj2[n].image.width + transformSpace;
	}
	
	
	//transform tool
	guideFill = new createjs.Shape();
	guideFill.alpha=.3;
	guideBorder = new createjs.Shape();
	
	tl=new createjs.Shape();
	tl.graphics.beginFill(transformToolFill).drawRect(0, 0, transformToolWidth, transformToolWidth);
	tl.graphics.beginStroke(transformToolLine);
	tl.graphics.setStrokeStyle(2);
	tl.snapToPixel = true;
	tl.graphics.drawRect(0,0,transformToolWidth,transformToolWidth);
	
	tr=new createjs.Shape();
	tr.graphics.beginFill(transformToolFill).drawRect(0, 0, transformToolWidth, transformToolWidth);
	tr.graphics.beginStroke(transformToolLine);
	tr.graphics.setStrokeStyle(2);
	tr.snapToPixel = true;
	tr.graphics.drawRect(0,0,transformToolWidth,transformToolWidth);
	
	bl=new createjs.Shape();
	bl.graphics.beginFill(transformToolFill).drawRect(0, 0, transformToolWidth, transformToolWidth);
	bl.graphics.beginStroke(transformToolLine);
	bl.graphics.setStrokeStyle(2);
	bl.snapToPixel = true;
	bl.graphics.drawRect(0,0,transformToolWidth,transformToolWidth);
	
	br=new createjs.Shape();
	br.graphics.beginFill(transformToolFill).drawRect(0, 0, transformToolWidth, transformToolWidth);
	br.graphics.beginStroke(transformToolLine);
	br.graphics.setStrokeStyle(2);
	br.snapToPixel = true;
	br.graphics.drawRect(0,0,transformToolWidth,transformToolWidth);
	
	transformToolGuide_arr=[tl,tr,bl,br]
	photoGuideContainer.addChild(guideBorder,tl,tr,bl,br);
	photoContainer.addChild(photoUploadBg, photoUploadContainer, photoGuideContainer);
	
	btnBackSmall = new createjs.Bitmap(loader.getResult("btnBackSmall"));
	btnBack = new createjs.Bitmap(loader.getResult("btnBack"));
	btnContinue = new createjs.Bitmap(loader.getResult("btnContinue"));
	btnTakephoto = new createjs.Bitmap(loader.getResult("btnTakephoto"));
	btnFinish = new createjs.Bitmap(loader.getResult("btnFinish"));
	btnCancel  = new createjs.Bitmap(loader.getResult("btnCancel"));
	btnStartCamera = new createjs.Bitmap(loader.getResult("btnStartCamera"));
	btnDownload = new createjs.Bitmap(loader.getResult("btnDownload"));
	btnStartOver = new createjs.Bitmap(loader.getResult("btnStartOver"));
	
	centerReg(btnBack);
	centerReg(btnBackSmall);
	centerReg(btnContinue);
	centerReg(btnTakephoto);
	centerReg(btnFinish);
	centerReg(btnCancel);
	centerReg(btnStartCamera);
	
	centerReg(btnDownload);
	centerReg(btnStartOver);
	
	btnTakephoto.x = canvasW/2;
	btnStartCamera.x = canvasW/2;
	btnStartCamera.y = btnTakephoto.y = canvasH/100 * 77;
	btnCancel.x = canvasW/2;
	btnCancel.y = canvasH/100 * 90;
	
	btnBackSmall.x = canvasW/2;
	btnBackSmall.y = canvasH/100 * 88;
	
	btnBack.x = canvasW/100 * 26;
	btnContinue.x = canvasW/100 * 74;
	btnFinish.x = canvasW/100 * 74;
	btnFinish.y = btnBack.y = btnContinue.y = canvasH/100 * 88;
	
	btnDownload.x = canvasW/2;
	btnDownload.y = canvasH/100 * 77;
	btnStartOver.x = canvasW/2;
	btnStartOver.y = canvasH/100 * 90;
	
	textNoCamera = new createjs.Bitmap(loader.getResult("textNoCamera"));
	textCameraAllow = new createjs.Bitmap(loader.getResult("textCameraAllow"));
	textCameraDenied = new createjs.Bitmap(loader.getResult("textCameraDenied"));
	textCameraNotSupport = new createjs.Bitmap(loader.getResult("textCameraNotSupport"));
	textLoading = new createjs.Bitmap(loader.getResult("textLoading"));
	textComplete = new createjs.Bitmap(loader.getResult("textComplete"));
	centerReg(textNoCamera);
	centerReg(textCameraAllow);
	centerReg(textCameraDenied);
	centerReg(textCameraNotSupport);
	centerReg(textLoading);
	centerReg(textComplete);
	
	textNoCamera.x = textCameraAllow.x = textCameraDenied.x = textCameraNotSupport.x = textComplete.x = photoX;
	textNoCamera.y = textCameraAllow.y = textCameraDenied.y = textCameraNotSupport.y = textComplete.y = canvasH/100 * 67;
	
	textLoading.x = canvasW/2;
	textLoading.y = canvasH/100 * 65;
	
	titleCameraUpload = new createjs.Bitmap(loader.getResult("titleCameraUpload"));
	titleEditPhoto = new createjs.Bitmap(loader.getResult("titleEditPhoto"));
	titleAddSticker = new createjs.Bitmap(loader.getResult("titleAddSticker"));
	titleComplete = new createjs.Bitmap(loader.getResult("titleComplete"));
	centerReg(titleCameraUpload);
	centerReg(titleEditPhoto);
	centerReg(titleAddSticker);
	centerReg(titleComplete);
	titleCameraUpload.x = titleEditPhoto.x = titleAddSticker.x = titleComplete.x = canvasW/2;
	titleCameraUpload.y = titleEditPhoto.y = titleAddSticker.y = titleComplete.y = canvasH/100 * 6;
	
	btnFacebook = new createjs.Bitmap(loader.getResult("btnFacebook"));
	centerReg(btnFacebook);
	
	if(shareEnable){
		btnDownload.x = canvasW/100 * 27;
		btnDownload.y = canvasH/100 * 77;
		btnFacebook.x = canvasW/100 * 73;
		btnFacebook.y = canvasH/100 * 77;
		btnFacebook.visible = true;
	}else{
		btnFacebook.visible = false;	
	}
	
	textLoader = new createjs.Bitmap(loader.getResult("textLoader"));
	centerReg(textLoader);
	textLoader.x=canvasW/2;
	textLoader.y=canvasH/2;
	
	bgLoader=new createjs.Shape();
	bgLoader.graphics.beginFill(loaderBgColour).drawRect(0, 0, canvasW, canvasH);
	bgLoader.alpha = .5;
	
	loaderContainer.addChild(bgLoader, textLoader);
	transformIconContainer.addChild(btnZoomIn, btnZoomOut, btnDone, btnRemove, btnRotateLeft, btnRotateRight, btnBringBack, btnBringFront, btnFlipX, btnFlipY);
	stickerIconContainer.addChild(btnStickerLeft, btnStickerRight, btnStickerCatLeft, btnStickerCatRight);
	editOptionContainer.addChild(titleEditPhoto, titleAddSticker, bgSticker, bgTransform, stickerIconContainer, transformIconContainer, btnBackSmall, btnBack, btnContinue, btnFinish);
	cameraOptionContainer.addChild(titleCameraUpload, btnTakephoto, btnCancel, btnStartCamera, textCameraAllow, textCameraDenied, textCameraNotSupport, textNoCamera);
	resultOptionContainer.addChild(titleComplete, btnDownload, btnStartOver, btnFacebook, textComplete);
	editContainer.addChild(bgPhoto, editOptionContainer, cameraOptionContainer, resultOptionContainer, photoContainer, shareContainer);
	mainContainer.addChild(logo, textLoading, btnCamera, btnUpload);
	
	canvasContainer.addChild(bgLanding, mainContainer, editContainer, loaderContainer);
	stage.addChild(canvasContainer);
}

/*!
 * 
 * BUILD CANVAS STICKERS - This is the function that runs to build canvas stickers
 * 
 */
function buildCanvasStickers(){
	for(n=0;n<stickers_arr.length;n++){
		$.iconStickersObj[stickers_arr[n].thumbID] = new createjs.Bitmap(stickerLoader.getResult(stickers_arr[n].thumbID));
		centerReg($.iconStickersObj[stickers_arr[n].thumbID]);
		$.iconStickersObj[stickers_arr[n].thumbID].visible = false;
		stickerIconContainer.addChild($.iconStickersObj[stickers_arr[n].thumbID]);
	}
}


/*!
 * 
 * RESIZE APP CANVAS - This is the function that runs to resize app canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

/*!
 * 
 * REMOVE APP CANVAS - This is the function that runs to remove app canvas
 * 
 */
 function removeAppCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.width/2;
	obj.regY=obj.image.height/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.width, obj.image.height));	
}