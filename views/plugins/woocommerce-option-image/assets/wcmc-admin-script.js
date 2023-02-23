$( document ).on( 'click', 'a[href="#wcmc_metabox_tab_option_img"]', function() {

	wcmc_option_img_load();

});

function wcmc_option_img_load() {

	var data = {};

	data.action     = 'wcmc_ajax_option_img_load';

	data.object_id  = $('#wcmc_metabox').attr('data-object-id');

	data.session_id = $('#wcmc_metabox').attr('data-session-id');

	$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

    $jqxhr.done(function( data ) {

	    if(data.type == 'success') {

	    	$('#result-option-items').html(data.data);
	    }

	});
}