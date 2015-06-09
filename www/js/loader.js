////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
var loaded = false;
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeAppFunc();
	});
	resizeAppFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest = [{src:'assets/bgLanding.jpg', id:'bgLanding'},
				{src:'assets/logo.png', id:'logo'},
				{src:'assets/titleCameraUpload.png', id:'titleCameraUpload'},
				{src:'assets/titleAddSticker.png', id:'titleAddSticker'},
				{src:'assets/titleEditPhoto.png', id:'titleEditPhoto'},
				{src:'assets/titleComplete.png', id:'titleComplete'},
				{src:'assets/arrow.png', id:'btnArrow'},
				{src:'assets/arrow_yellow.png', id:'btnArrowYellow'},
				{src:'assets/bg_photo.png', id:'bgPhoto'},
				{src:'assets/bg_sticker.png', id:'bgSticker'},
				{src:'assets/bg_transform.png', id:'bgTransform'},
				{src:'assets/button_continue.png', id:'btnContinue'},
				{src:'assets/button_finish.png', id:'btnFinish'},
				{src:'assets/button_back.png', id:'btnBack'},
				{src:'assets/button_backsmall.png', id:'btnBackSmall'},
				{src:'assets/button_camera.png', id:'btnCamera'},
				{src:'assets/button_takephoto.png', id:'btnTakephoto'},
				{src:'assets/button_upload.png', id:'btnUpload'},
				{src:'assets/button_cancel.png', id:'btnCancel'},
				{src:'assets/button_startcamera.png', id:'btnStartCamera'},
				{src:'assets/button_download.png', id:'btnDownload'},
				{src:'assets/button_startover.png', id:'btnStartOver'},
				{src:'assets/frame_sticker.png', id:'frameSticker'},
				{src:'assets/frame_stickerCategory.png', id:'frameStickerCategory'},
				{src:'assets/icon_zoom_in.png', id:'btnZoomIn'},
				{src:'assets/icon_zoom_out.png', id:'btnZoomOut'},
				{src:'assets/icon_done.png', id:'btnDone'},
				{src:'assets/icon_remove.png', id:'btnRemove'},
				{src:'assets/icon_rotate_left.png', id:'btnRotateLeft'},
				{src:'assets/icon_rotate_right.png', id:'btnRotateRight'},
				{src:'assets/text_nocamera.png', id:'textNoCamera'},
				{src:'assets/text_cameraallow.png', id:'textCameraAllow'},
				{src:'assets/text_cameradenied.png', id:'textCameraDenied'},
				{src:'assets/text_cameranotsupport.png', id:'textCameraNotSupport'},
				{src:'assets/text_loading.png', id:'textLoading'},
				{src:'assets/text_complete.png', id:'textComplete'},
				{src:'assets/icon_front.png', id:'btnBringFront'},
				{src:'assets/icon_back.png', id:'btnBringBack'},
				{src:'assets/icon_flipx.png', id:'btnFlipX'},
				{src:'assets/icon_flipy.png', id:'btnFlipY'},
				{src:'assets/button_facebook.png', id:'btnFacebook'},
				{src:'assets/text_uploading.png', id:'textLoader'}
				];
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('.percentIndicator').css('width',Math.round(loader.progress/1*98)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	loaded = true;
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#loaderHolder').show();
	}else{
		$('#loaderHolder').hide();
	}
}