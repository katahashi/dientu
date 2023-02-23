$(function() {

	var FbmHandler = function() {
		$( document )
			.on('click', '.btn-fbm-active', this.onClickActive)
			.on('change','.fbm-send-message input, .fbm-send-message select', this.onSendMessageChange)
			.on('submit','form[name="fbm-send-message"]', this.onSettingSave)
			.on('submit','form[name="fbm-widget"]', this.onSettingSave)
	};

	FbmHandler.prototype.onClickActive = function(e) {

		var name 	= $(this).attr('data-id');

		data = {
			'action' 		: 'ajax_fbm_active',
			'name' 			: name,
		}

		$jqxhr   = $.post(base+'/ajax', data, function(data) {}, 'json');

		$jqxhr.done(function( data ) {
        	show_message(data.message, data.type);
        	if(data.type == 'success') window.location.reload();
    	});

		return false;
	};


	//STYLE 1
	FbmHandler.prototype.onSendMessageChange = function(e) {

		data = $( ':input', $('.fbm-send-message')).serializeJSON();

		console.log(data);

		if( data.fbm_title.length > 0 ) $('#fbm_box .fbm-chat-title span').text(data.fbm_title)
		if( data.fbm_color_text.length > 0 ) $('#fbm_box .fbm-chat-title').css('color', data.fbm_color_text);
		if( data.fbm_color_bg.length > 0 ) $('#fbm_box .fbm-chat-header').css('background-color', data.fbm_color_bg);

		if( data.fbm_position.length > 0 ) 		{

			$('#fbm_box').removeClass('box-fbm-chat-left');
			$('#fbm_box').removeClass('box-fbm-chat-right');
			$('#fbm_box').addClass('box-fbm-chat-'+data.fbm_position);
		}

	};

	//STYLE 2
	// CmiHandler.prototype.onStyle2Change = function(e) {

	// 	data = $( ':input', $('.cmi-style-2')).serializeJSON();

	// 	console.log(data.cmi_bg.length);

	// 	if( data.cmi_title_call.length > 0 ) 	$('.style-2-call a span').text(data.cmi_title_call)
	// 	if( data.cmi_title_sms.length > 0 ) 	$('.style-2-sms a span').text(data.cmi_title_sms)
	// 	if( data.cmi_title_contact.length > 0 ) $('.style-2-contact a span').text(data.cmi_title_contact)
	// 	if( data.cmi_bg.length > 0 ) $('.box-style-2').css('background-color', data.cmi_bg);

	// };

	//STYLE 3
	// CmiHandler.prototype.onStyle3Change = function(e) {

	// 	data = $( ':input', $('.cmi-style-3')).serializeJSON();


	// 	if( data.cmi_color_icon.length 	  > 0 ) $('.quick-alo-ph-img-circle').css('background-color', data.cmi_color_icon);
	// 	if( data.cmi_color_border1.length > 0 ) $('.quick-alo-ph-circle-fill').css('background-color', data.cmi_color_border1);
	// 	if( data.cmi_color_border2.length > 0 ) $('.quick-alo-ph-circle').css('border-color', data.cmi_color_border2);
	// 	if( data.cmi_bottom.length > 0 ) 		{
	// 		$('.cmi-box-style-3').css("bottom", data.cmi_bottom+"px");
	// 	}

	// 	if( data.cmi_position.length > 0 ) 		{

	// 		$('.cmi-box-style-3').removeClass('phone-right');
	// 		$('.cmi-box-style-3').removeClass('phone-left');
	// 		$('.cmi-box-style-3').addClass('phone-'+data.cmi_position);
	// 	}

		


	// };


	FbmHandler.prototype.onSettingSave = function(e) {

		style = $(this).attr('name');

		data        = $( ':input', $(this)).serializeJSON();
		
		data.action = 'ajax_fbm_save_setting';

		data.style  = style;

		$('.ajax-load-qa').show();
		
		$jqxhr      = $.post(base+'/ajax', data, function(data) {}, 'json');

		$jqxhr.done(function( data ) {

        	show_message(data.message, data.type);

        	$('.ajax-load-qa').hide();

    	});

		return false;
	};



	/**
	 * Init AddToCartHandler.
	 */
	new FbmHandler();
});