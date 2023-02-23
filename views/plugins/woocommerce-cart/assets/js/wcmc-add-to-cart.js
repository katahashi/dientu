jQuery( function( $ ) {

	if( typeof $('.wcm-box-order').html() != 'undefined' ) {
		wcmc_update_order_review();
	}

	var product_id = 0;
	/**
	 * AddToCartHandler class.
	 */
	var AddToCartHandler = function() {
		$( document )
			.on( 'click', '.wcmc-product-cart-options .options .item', this.onAttribute )
			.on( 'mouseover', '.wcmc-product-cart-options .options .option-type__swatch', this.upOptionLabel )
			.on( 'click', '.wcmc-product-cart-options .options .option-type__radio', this.upDataProduct )
			.on( 'click', '.wcmc_add_to_cart', this.onAddToCart )
			.on( 'click', '.wcmc_add_to_cart_now', this.onAddToCartNow )

	};

	/**================================================================
	 * [ACTION EVENT]
	 * ================================================================
	 */
	AddToCartHandler.prototype.onAttribute = function( e ) {

		$(this).closest('.options').find('label').removeClass('active');

		$(this).closest('label').addClass('active');

		img = $(this).closest('label').find('.item').attr('data-image');
		
		if( img != '' && typeof img != 'undefined' ) {
            $('.box-image-featured img').attr('src', img);
            $('.zoomWindowContainer .zoomWindow').css('background-image','url("'+img+'")');
            $('#sliderproduct a').removeClass('active');
        }

	};

	AddToCartHandler.prototype.upOptionLabel = function( e ) {

		$(this).closest('.wcmc-product-cart-options').find('.option-type__selected-option').text( $(this).attr('data-label') );

	};


	//event khi chọn các option nâng cao
	AddToCartHandler.prototype.upDataProduct = function( e ) {

		var data        = $( ':input', $('.wcm-box-options')).serializeJSON();

		data.product_id =  $(this).attr('data-id');
		
		data.action     =  'wcmc_ajax_product_variations';

		$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

  		$jqxhr.done(function( data ) {

		    if(data.type == 'success') {

		    	$('.wcmc-price-detail').html(data.data);
		    }
		});
	};

	//event khi click vào nút đặt hàng
	AddToCartHandler.prototype.onAddToCart = function( e ) {

		$('.wcmc-alert-product').html('');

		var data        = $( ':input', $('.wcm-box-options')).serializeJSON();

		data.product_id =  $(this).attr('data-id');

		data.qty 		=  $('#quantity').val();

		if( typeof data.qty == 'undefined' ) data.qty = 1;

		data.action     =  'wcmc_ajax_cart_add';

		$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

  		$jqxhr.done(function( data ) {

  			$('.wcmc-alert-product').html(data.data);

		    if(data.type == 'success') {
		    	$('.wcmc-total-items').html(data.total_items);
		    }
		});

		return false;
	};

	AddToCartHandler.prototype.onAddToCartNow = function( e ) {

		$('.wcmc-alert-product').html('');

		var data        = $( ':input', $('.wcm-box-options')).serializeJSON();

		data.product_id =  $(this).attr('data-id');

		data.qty 		=  $('#quantity').val();

		if( typeof data.qty == 'undefined' ) data.qty = 1;

		data.action     =  'wcmc_ajax_cart_add';

		$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

  		$jqxhr.done(function( data ) {

  			$('.wcmc-alert-product').html(data.data);

		    if(data.type == 'success') {

		    	$('.wcmc-total-items').html(data.total_items);

		    	window.location = 'gio-hang';
		    }
		});

		return false;
	};
	/**
	 * Init AddToCartHandler.
	 */
	var wcmc_addtocart = new AddToCartHandler();
});

//check out
$(document).on('submit', '.woocommerce-checkout', function() {

	var data = $( ':input', $(this) ).serializeJSON();

	data.action 	= 'wcmc_ajax_checkout_save';

	$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

	$('.wcm-box-order').addClass('loading');

	$jqxhr.done(function( data ) {

		$('.wcm-box-order').removeClass('loading');

		$('.woocommerce-checkout .notice').remove();

	    if(data.type == 'success') {
	    	window.location = data.url;
	    }
	    else {
	    	var notice = data.message;

	    	$('.woocommerce-checkout').prepend(notice);

	    	$('html, body').animate({
		        scrollTop: $(".woocommerce-checkout .notice").offset().top  - 100
		    }, 500);
	    }

	});

	return false;
});

//shipping 
$(document).on('change', '#shipping', function() {

	var data = {
		key 	: $(this).val(),
		action 	: 'wcmc_ajax_checkout_shipping',
	}

	$jqxhr   = $.post(base+'/ajax', data, function() {}, 'json');

	$jqxhr.done(function( data ) {

	    if(data.type == 'success') {
	    	
	    	$('#total').html(data.total);

	    	if( data.shipping != 0 )
	    		$('#ship').html(data.shipping);
	    	else $('#ship').html('Miễn phí');
	    }

	});

	return false;
});



function wcmc_update_order_review( ) {

	$('.wcm-box-order').addClass('loading');
	
	var data = $('form[name="checkout"]').serializeJSON();

	data.action = 'wcmc_ajax_update_order_review';

	$jqxhr   = $.post( base + '/ajax' , data, function() {}, 'json');

	$jqxhr.done(function( data ) {

		if( data.type == 'success' ) {

			$('.wcm-box-order').html( data.order_review );

			$('.wcm-box-order').removeClass('loading');
		}

	});
}