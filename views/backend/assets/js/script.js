var editor = {};

function show_message(text, icon) {
    $.toast({
        heading: "Thông Báo",
        text: text,
        position: 'top-left',
        icon: icon,
        hideAfter: 5000,
    });
}

function isset($element) {
    if (typeof $element != 'undefined')
        return true;
    return false;
}

function str_replace(str, key_search, key_replace) {
    return str.replace(key_search, key_replace);
}

function checkbox_style() {
    $('input.icheck').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
}

function getYoutubeID(url) {
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return videoid[1];
}


function filemanager(id, value, type, win) {
    e=tinymce.activeEditor;
    t=id;
    a=type;
    s=win;
    
    var r = window.innerWidth - 30,
        g = window.innerHeight - 60;
    if (r > 1800 && (r = 1800), g > 1200 && (g = 1200), r > 600) {
        var d = (r - 20) % 138;
        r = r - d + 10
    }
    urltype = 2, "image" == a && (urltype = 1), "media" == a && (urltype = 3);
    var o = "RESPONSIVE FileManager";
    "undefined" != typeof e.settings.filemanager_title && e.settings.filemanager_title && (o = e.settings.filemanager_title);
    var l = "key";
    "undefined" != typeof e.settings.filemanager_access_key && e.settings.filemanager_access_key && (l = e.settings.filemanager_access_key);
    var f = "";
    "undefined" != typeof e.settings.filemanager_sort_by && e.settings.filemanager_sort_by && (f = "&sort_by=" + e.settings.filemanager_sort_by);
    var m = "false";
    "undefined" != typeof e.settings.filemanager_descending && e.settings.filemanager_descending && (m = e.settings.filemanager_descending);
    var c = "";
    "undefined" != typeof e.settings.filemanager_subfolder && e.settings.filemanager_subfolder && (c = "&fldr=" + e.settings.filemanager_subfolder);
    var v = "";
    "undefined" != typeof e.settings.filemanager_crossdomain && e.settings.filemanager_crossdomain && (v = "&crossdomain=1", window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n)), 
    tinymce.activeEditor.windowManager.open({
        title: o,
        file: e.settings.external_filemanager_path + "dialog.php?type=" + urltype + "&descending=" + m + f + c + v + "&lang=" + e.settings.language + "&akey=" + l,
        width: r,
        height: g,
        resizable: !0,
        maximizable: !0,
        inline: 1
    }, {
        setUrl: function(n) {
          //console.log(t);
            var i = s.document.getElementById(t);
            if (i.value = e.convertURL(n), "createEvent" in document) {
                var a = document.createEvent("HTMLEvents");
                a.initEvent("change", !1, !0), i.dispatchEvent(a)
            } else i.fireEvent("onchange")
        }
    })
}

function tinymce_load() {
    //editor
    tinymce.init({
        fontsize_formats: "8px 9px 10px 11px 12px 14px 15px 18px 20px 26px 36px 40px 46px 62px 72px",
        selector: "textarea.tinymce",
        theme: "modern",
        height: 300,
        plugins: [
             "advlist autolink link image lists charmap print preview hr anchor pagebreak",
             "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking fullscreen",
             "table contextmenu directionality emoticons paste textcolor responsivefilemanager code"
        ],
        toolbar1: "undo redo pastetext | styleselect | fontselect | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink anchor | table responsivefilemanager image media | forecolor backcolor  | print preview code",
        content_css: domain+'scripts/tinymce/skins/custom.css',
        image_advtab: true ,
        image_caption: true,
        language: "vi",

        relative_urls : false,
        remove_script_host : false,
        convert_urls : true,

        external_filemanager_path: domain+"scripts/rpsfmng/filemanager/",
        filemanager_title:"Responsive Filemanager" ,
        external_plugins: { "filemanager" : domain+"scripts/rpsfmng/filemanager/plugin.min.js"},
        file_browser_callback: function(field_name, url, type, win) {
          func_value = win.document.getElementById(field_name).value;
          filemanager(field_name, func_value, type, win); 
        }
    });


    tinymce.init({
        selector: "textarea.tinymce-shortcut",
        theme: "modern",
        height: 100,
        plugins: [
             "advlist autolink link image lists charmap print preview hr anchor pagebreak",
             "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking fullscreen",
             "table contextmenu directionality emoticons paste textcolor responsivefilemanager code"
       ],
        toolbar1: "undo redo pastetext | fontselect | bold italic underline | code",
        content_css: domain+'scripts/tinymce/skins/custom.css',
        image_advtab: true ,
        language: "vi",

        relative_urls : false,
        remove_script_host : false,
        convert_urls : true,

        external_filemanager_path: domain+"scripts/rpsfmng/filemanager/",
        filemanager_title:"Responsive Filemanager" ,
        external_plugins: { "filemanager" : domain+"scripts/rpsfmng/filemanager/plugin.min.js"},
        file_browser_callback: function(field_name, url, type, win) {
          func_value = win.document.getElementById(field_name).value;
          filemanager(field_name, func_value, type, win); 
        }
    });
}

function load_image_review() {
    $.each($('input[type="images"]'), function(index, value) {
        image_review($(this));
    });
}

function image_review($this = null) {
    var field_id = $this.attr('id');
    if($this.val().length > 0) {
        url = $this.val();
        url = str_replace(url, domain+'uploads/source/','');
        url = domain+'uploads/source/'+url;
        if(url.length > 0)
        {
            var tmpImg  = new Image();
            var width = 0;
            var height = 0;
            tmpImg.src  = url;
            tmpImg.onload = function() {
                width = tmpImg.Width;
                height = tmpImg.Height;
            };
            var str         = '';
            var fileNameIndex = url.lastIndexOf("/") + 1;
            var filename      = url.substr(fileNameIndex);
            str += '<p> <b style="text-transform: uppercase;">'+ filename + '</b></p>';
            str += '<p style="color:#999"> '+ width + ' x '+ height + '</p>';
            if(isset($this.closest('.group').find('.result-img').html())) {
                $this.closest('.group').find('.result-img').attr('src', url);
                $this.closest('.group').find('.result-img-info').html(str);
            }
            else {
                $this.closest('.group').append('<div class="pull-left text-center" style="width:150px;"><img class="result-img" src="'+url+'" style="max-width:150px;margin:10px 0;"></div>');
                $this.closest('.group').append('<div class="pull-left result-img-info" style="width: calc(100% - 160px);margin:10px 0 0 10px;">'+str+'</div>');
            }
        }
    }
    else {
        if(isset($this.closest('.group').find('.result-img').html())) {
            $this.closest('.group').find('.result-img').remove();
        }
    }
}

function video_review() {
    $.each($('input[type="video"]'), function(index, value) {
        var field_id = $(this).attr('id');
        if($(this).val().length > 0) {
            var url = 'https://img.youtube.com/vi/'+getYoutubeID($(this).val())+'/0.jpg';
            if(url.length > 0)
            {
                if(isset($(this).closest('.form-group').find('.result-img').html())) {
                    $(this).closest('.form-group').find('.result-img').attr('src', url);
                }
                else $(this).closest('.form-group').append('<img class="result-img" src="'+url+'" style="max-width:100%;margin-top:10px;">');
            }
        }
        else {
            if(isset($(this).closest('.form-group').find('.result-img').html())) {
                $(this).closest('.form-group').find('.result-img').remove();
            }
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delCookie(name) {
    document.cookie = name + ';expires= Thu, 01-Jan-1970 00:00:01 GMT;';
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(function(){

    var post_type = getParameterByName('post_type');
    var cate_type = getParameterByName('cate_type');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (settings.data.indexOf('csrf_test_name') === -1) {
                settings.data += '&csrf_test_name=' + encodeURIComponent(getCookie('csrf_cookie_name'));
            }

            if (settings.data.indexOf('post_type') === -1 && typeof post_type !== null ) {
                settings.data += '&post_type=' + post_type;
            }

            if (settings.data.indexOf('cate_type') === -1 && typeof cate_type !== null ) {
                settings.data += '&cate_type=' + cate_type;
            }
        }
    });

    load_image_review();
    /*===========================================
    *style input
    * ===========================================*/
    checkbox_style();

    //code
    var codecss = document.getElementsByClassName("code-css");
    for (var index = 0; index < codecss.length; index++) {
        code(codecss[index], 'css');
    }

    var codejavascript = document.getElementsByClassName("code-javascript");
    for (var index = 0; index < codejavascript.length; index++) {
        code(codejavascript[index], 'javascript');
    }

    $('input.switch').on('change', function( e ){
       $(e.currentTarget).closest('.toggleWrapper').find('input.switch-value').val((this.checked ? 1 : 0));
    });

    //editor
    tinymce_load();

    /*===========================================
    * theme
    * ===========================================*/
    //Cập nhật các trạng thái có kiểu boolean
    $('input#select_all').on('ifChecked', function(event){
        $('.select').iCheck('check');
    });

    $('input#select_all').on('ifUnchecked', function(event){
        $('.select').iCheck('uncheck');
    });
    //menu
    $('#menu').metisMenu();

    //tooltip boostrap
	 $('[data-toggle="tooltip"]').tooltip();

    //<![CDATA[
    var Nanobar=function(){var c,d,e,f,g,h,k={width:"100%",height:"3px",zIndex:9999,top:"0"},l={width:0,height:"100%",clear:"both",transition:"height .3s"};c=function(a,b){for(var c in b)a.style[c]=b[c];a.style["float"]="left"};f=function(){var a=this,b=this.width-this.here;0.1>b&&-0.1<b?(g.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){a.cont.el.removeChild(a.el)},100))):(g.call(this,this.width-b/4),setTimeout(function(){a.go()},16))};g=function(a){this.width=
    a;this.el.style.width=this.width+"%"};h=function(){var a=new d(this);this.bars.unshift(a)};d=function(a){this.el=document.createElement("div");this.el.style.backgroundColor=a.opts.bg;this.here=this.width=0;this.moving=!1;this.cont=a;c(this.el,l);a.el.appendChild(this.el)};d.prototype.go=function(a){a?(this.here=a,this.moving||(this.moving=!0,f.call(this))):this.moving&&f.call(this)};e=function(a){a=this.opts=a||{};var b;a.bg=a.bg||"#2980B9";this.bars=[];b=this.el=document.createElement("div");c(this.el,
    k);a.id&&(b.id=a.id);b.style.position=a.target?"relative":"fixed";a.target?a.target.insertBefore(b,a.target.firstChild):document.getElementsByTagName("body")[0].appendChild(b);h.call(this)};e.prototype.go=function(a){this.bars[0].go(a);100==a&&h.call(this)};return e}();
    var nanobar = new Nanobar();nanobar.go(30);nanobar.go(60);nanobar.go(100);
    //]]>
    //
    $('.item-color').colorpicker({format: "rgba"});

    //upload file
    $('.iframe-btn').fancybox({ 'type'  : 'iframe', });
    
    $().fancybox({
      selector : '[data-fancybox="iframe"]',
    });

    $('.datetime').datepicker({
        language: 'vi',
    })

    $('.mobile-nav').click(function(){
        $('#adminmenumain').toggleClass('open-nv'); return false;
    })
});

$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});

function responsive_filemanager_callback(field_id) {
    image_review($('#'+field_id));
    parent.$.fancybox.close();
}

function code($element, $lang = 'css') {
    editor[$element.name] = CodeMirror.fromTextArea($element, {
        mode: $lang,
        theme: 'darkpastel',
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-F": "findPersistent",
            "Ctrl-S":function (){
                alert("save");
                return false;
            },
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        },
        onKeyEvent : function(e , s){
            console.log(s);
        },
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        styleSelectedText: true,
        matchBrackets: true,
        autoCloseBrackets: true,
    });
}

//format number
var inputnumber = 'Giá trị nhập vào không phải là số';

function FormatNumber(str) {
    var strTemp = GetNumber(str);
    if (strTemp.length <= 3)
      return strTemp;
    strResult = "";
    for (var i = 0; i < strTemp.length; i++)
      strTemp = strTemp.replace(",", "");
    var m = strTemp.lastIndexOf(".");
    if (m == -1) {
      for (var i = strTemp.length; i >= 0; i--) {
        if (strResult.length > 0 && (strTemp.length - i - 1) % 3 == 0)
          strResult = "," + strResult;
        strResult = strTemp.substring(i, i + 1) + strResult;
      }
    } else {
      var strphannguyen = strTemp.substring(0, strTemp.lastIndexOf("."));
      var strphanthapphan = strTemp.substring(strTemp.lastIndexOf("."),
          strTemp.length);
      var tam = 0;
      for (var i = strphannguyen.length; i >= 0; i--) {

        if (strResult.length > 0 && tam == 4) {
          strResult = "," + strResult;
          tam = 1;
        }

        strResult = strphannguyen.substring(i, i + 1) + strResult;
        tam = tam + 1;
      }
      strResult = strResult + strphanthapphan;
    }
    return strResult;
}

function GetNumber(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      var temp = str.substring(i, i + 1);
      if (!(temp == "," || temp == "." || (temp >= 0 && temp <= 9))) {
        alert(inputnumber);
        return str.substring(0, i);
      }
      if (temp == " ")
        return str.substring(0, i);
      if (temp == ".") {
        if (count > 0)
          return str.substring(0, ipubl_date);
        count++;
      }
    }
    return str;
}

function IsNumberInt(str) {
    for (var i = 0; i < str.length; i++) {
      var temp = str.substring(i, i + 1);
      if (!(temp == "." || (temp >= 0 && temp <= 9))) {
        alert(inputnumber);
        return str.substring(0, i);
      }
      if (temp == ",") {
        return str.substring(0, i);
      }
    }
    return str;
}
