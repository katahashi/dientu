$(function() {
	// $(".product-thumb-vertical").mThumbnailScroller({
	// 		axis:"y",
	// 		type:"click-thumb",
	// 		theme:"buttons-out",
	// 		type:"hover-precise",
	// 		contentTouchScroll: true
	// 	});
	
	// //product thumbail
	// if($(".product-thumb-vertical").length > 0 && $(window).width() >= 768 ) {

	// 	$(".product-thumb-vertical").mThumbnailScroller({
	// 		axis:"y",
	// 		type:"click-thumb",
	// 		theme:"buttons-out",
	// 		type:"hover-precise",
	// 		contentTouchScroll: true
	// 	});

	// 	setTimeout(function(){
	// 		$('.product-thumb-vertical').css('height',$('.product-image-feature').height());
	// 		$('#sliderproduct').show();
	// 	},1500);
	// }

	// setTimeout(function(){
	//   	if($(".product-thumb-vertical").length > 0 && $(window).width() >= 768 ) {
	// 	  	jQuery(".product-image-feature").elevateZoom({
	// 		  	gallery:'sliderproduct',
	// 		  	scrollZoom : true
	// 	  	});
	//   	}
 //  	},500);

	// if( $(window).width() < 767 ) {
	//   	$("#list-product-thumb").owlCarousel({
	//         items:4,
	//         margin:10,
	//         loop:true,
	//         autoplay:true,
	//         autoplayTimeout:2000,
	//         autoplayHoverPause:true,
	//         responsive:{
	//             0   :{ items:3 }, 400   :{ items:3 }, 600   :{ items:3 }, 1000:{ items:4 }
	//         }
	//     });
	// }

	$('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.addtocart_quantity input');
	
	$('.addtocart_quantity').each(function() {
	  	var spinner = jQuery(this),
	    	input = spinner.find('input[type="number"]'),
	    	btnUp = spinner.find('.quantity-up'),
	    	btnDown = spinner.find('.quantity-down'),
	    	min = input.attr('min'),
	    	max = input.attr('max');

	  	btnUp.click(function() {
	    	var oldValue = parseFloat(input.val());
	    	if (oldValue >= max) {
	      		var newVal = oldValue;
	    	} else {
	      		var newVal = oldValue + 1;
	    	}
	    	spinner.find("input").val(newVal);
	    	spinner.find("input").trigger("change");
	  	});

	  	btnDown.click(function() {
	    	var oldValue = parseFloat(input.val());
	    	if (oldValue <= min) {
	      		var newVal = oldValue;
	    	} else {
	     		var newVal = oldValue - 1;
	    	}
	    	spinner.find("input").val(newVal);
	    	spinner.find("input").trigger("change");
	  	});
	});
});


// $(document).on('click', '.woocommerce-quick-view', function() {
// 	$('#quick-view-modal').modal('show');
// 	return false;
// });
