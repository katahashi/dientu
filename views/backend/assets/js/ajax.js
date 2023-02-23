var body = $(document);
$(function(){

    //đóng mở tab form
    body.on('click', '.btn-collapse', function(event) {

    	$event 	 = $(this);

        var data = {
            'action' : 'ajax_collapse',
            'id'     : $event.attr('id')
        }

    	$jqxhr   = $.post(base+'/ajax', data, function(data) {}, 'html');
    	
		$jqxhr.done(function( data ) {});
    });

    //upload boolean
	body.on('ifClicked', '.up-boolean', function(event) {

        var data = {};

        data.action = 'ajax_up_boolean';

        data.id 	= $(this).attr('data-id');

        data.table 	= $(this).attr('data-model');

        data.row 	= $(this).attr('data-row');

    	$jqxhr   = $.post(base+'/ajax', data, function(data) {}, 'json');

		$jqxhr.done(function( data ) {
			show_message(data.message, data.type);
		});
    });

    //upload datatable
    $('.edittable-dl-number').editable({
		type 	: 'number',
		params: function(params) {
	        // add additional params from data-attributes of trigger element
	        params.action = 'ajax_up_table';
	        params.table = $(this).editable().attr('data-table');
	        return params;
	    },
		url 	: base+'/ajax',
	});

	$('.edittable-dl-text').editable({
		type: 'text',
		params: function(params) {
	        // add additional params from data-attributes of trigger element
	        params.action = 'ajax_up_table';
	        params.table = $(this).editable().attr('data-table');
	        return params;
	    },
		url: base+'/ajax',
	});

    //kiểm tra khi click submit form add, edit
    body.on('click', '#form-input button[name="save"]', function() {
        //hiển thị loading
        $('#ajax_loader').show();
        //get form submit
        var $this = $('#form-input');
        //xử lý dữ liệu
        var datas = {};

        $this.find('input, textarea, select').each(function(index, el) {
			datas[$(this).attr('name')] = $(this).val();
		});

        datas['action'] = 'ajax_form_validation';
        datas['module'] = $this.attr('data-module');

        //tiển hành kiểm tra
        $jqxhr   = $.post(base+'/ajax'+url_type, datas, function(data) {}, 'json');

        $jqxhr.done(function( data ) {
		    if(data.type == 'error'){
		    	show_message(data.message, data.type);
                $('#ajax_loader').hide();
		    }
		    else
		    	$this.submit();
		});
		return false;
    });

    //cho vào thùng rác
    var trash_this = null;
    var trash_id   = null;
    body.on('click', '.trash', function(event)  {
    	trash_this = $(this);
    	trash_id = trash_this.attr('data-id');
    	if(!isset(trash_id)) {
    		trash_id = []; var i = 0;
	        $('.select:checked').each(function () {
	            trash_id[i++] = $(this).val();
	        });
    	}
        return false;
    });

    $('.trash').bootstrap_confirm_delete({
		heading:'Xác nhận xóa',
		message:'Bạn muốn xóa trường dữ liệu này ?',
		callback:function ( event ) {

			if(trash_id == null || trash_id.length == 0) {
				show_message('Không có dữ liệu nào được xóa ?', 'error');
			}
			else {
				var data ={
	                'action' : 'ajax_trash',
	                'data'   : trash_id,
	                'table'  : trash_this.attr('data-table'),
	            }
	            $jqxhr   = $.post(base+'/ajax'+url_type, data, function() {}, 'json');
				$jqxhr.done(function( data ) {
				    show_message(data.message, data.type);
				    if(data.type == 'success')
				    {
				    	if (typeof data.data != 'undefined') {
						  	var count = data.data.length;
					    	for (i = 0; i < count; i++) {
					    		$('.tr_'+data.data[i]).hide('fast').remove();
							}
						}
						else
						{
							var button = event.data.originalObject;
	            			button.closest( 'tr' ).remove();
						}
				    }

					if(data.type == 'reload') { location.reload();}
				});
			}
        },
	});

    //khôi phục đối tượng
    var undo_this = null;
	var undo_id	  = null;
	body.on('click', '.undo', function(event)  {
    	undo_this = $(this);
		undo_id = []; var i = 0;
        $('.select:checked').each(function () {
            undo_id[i++] = $(this).val();
        });
        return false;
    });

    $('.undo').bootstrap_confirm_delete({
		heading:'Phục hồi',
		message:'Bạn chắc chắn muốn phục hồi dữ liệu đã chọn!',
		btn_ok_label:'Khôi Phục',
		btn_cancel_label:'Hủy',
		callback:function ( event ) {
			if(undo_id == null || undo_id.length == 0) {
				show_message('Không có dữ liệu nào được phục hồi ?', 'error');
			}
			else {
				var data ={
					'action' : 'ajax_undo',
	                'data'   : undo_id,
	                'table'  : undo_this.attr('data-table'),
	            };
	            $jqxhr   = $.post(base+'/ajax'+url_type, data, function() {}, 'json');
	            $jqxhr.done(function( data ) {
				    show_message(data.message, data.type);
				    if(data.type == 'success')
				    {
				    	if (typeof data.data != 'undefined') {
						  	var count = data.data.length;
					    	for (i = 0; i < count; i++) {
					    		$('.tr_'+data.data[i]).hide('fast').remove();
							}
						}
						else
						{
							var button = event.data.originalObject;
	            			button.closest( 'tr' ).remove();
						}
				    }

					if(data.type == 'reload') { location.reload(); }
				});
			}
        },
	});
    //xóa vĩnh viển đối tượng
	var del_this = null;
	var del_id	 = null;
    body.on('click', '.delete', function(event)  {
    	del_this = $(this);
    	del_id = del_this.attr('data-id');
    	if(!isset(del_id)) {
    		del_id = []; var i = 0;
	        $('.select:checked').each(function () {
	            del_id[i++] = $(this).val();
	        });
    	}
        return false;
    });

    $('.delete').bootstrap_confirm_delete({
		heading:'Xác nhận xóa',
		message:'Bạn muốn xóa vĩnh viển trường dữ liệu này ? <b>thao tác này không thể khôi phục</b>',
		callback:function ( event ) {
			if(del_id == null || del_id.length == 0) {
				show_message('Không có dữ liệu nào được xóa ?', 'error');
			}
			else {
				var data ={
	                'data'   : del_id,
	                'table'  : del_this.attr('data-table'),
	            };
	            $jqxhr   = $.post(path+'/ajax_delete'+url_type, data, function() {}, 'json');
	            $jqxhr.done(function( data ) {
				    show_message(data.message, data.type);
				    if(data.type == 'success')
				    {
				    	if (typeof data.data != 'undefined') {
						  	var count = data.data.length;
					    	for (i = 0; i < count; i++) {
					    		$('.tr_'+data.data[i]).hide('fast').remove();
							}
						}
						else
						{
							var button = event.data.originalObject;
	            			button.closest( 'tr' ).remove();
						}
				    }

					if(data.type == 'reload') { location.reload(); }
				});
			}
        },
	});
});

