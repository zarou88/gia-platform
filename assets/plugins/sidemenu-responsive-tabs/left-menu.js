   (function($) {
	"use strict";
	
	// ______________Active Class
	$(".app-sidebar a").each(function() {
	  var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) { 
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	//Active Class
	$(".app-sidebar a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(".submenu-list li a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().parent().parent().parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(document).ready(function(){		
			
		if ($('.element-Mohammed.active').hasClass('active'))
        $('li.element-Mohammed').addClass('active');
	
		if ($('.pages-Mohammed.active').hasClass('active'))
        $('li.pages-Mohammed').addClass('active');
	
		if ($('.index-Mohammed.active').hasClass('active'))
        $('li.index-Mohammed').addClass('active');
	
		if ($('.widget-Mohammed.active').hasClass('active'))
        $('li.widget-Mohammed').addClass('active');
		
		if ($('.apps-Mohammed.active').hasClass('active'))
        $('li.apps-Mohammed').addClass('active');
	
		if ($('.utilites-Mohammed.active').hasClass('active'))
        $('li.utilites-Mohammed').addClass('active');
	
		if ($('.forms-Mohammed.active').hasClass('active'))
        $('li.forms-Mohammed').addClass('active');
	
		if ($('.charts-Mohammed.active').hasClass('active'))
        $('li.charts-Mohammed').addClass('active');
	
		if ($('.ecommerce-Mohammed.active').hasClass('active'))
        $('li.ecommerce-Mohammed').addClass('active');
		
		if ($('.custom-Mohammed.active').hasClass('active'))
        $('li.custom-Mohammed').addClass('active');
		
		if ($('.advanced-Mohammed.active').hasClass('active'))
        $('li.advanced-Mohammed').addClass('active');
	
		if ($('.mail-Mohammed.active').hasClass('active'))
        $('li.mail-Mohammed').addClass('active');
	
	});
	
	
	// VerticalTab
	$('#sidemenu-Tab').easyResponsiveTabs({
		type: 'vertical',
		width: 'auto', 
		fit: true, 
		closed: 'accordion',
		tabidentify: 'hor_1',
		activate: function(event) {
			var $tab = $(this);
			var $info = $('#nested-tabInfo2');
			var $name = $('span', $info);
			$name.text($tab.text());
			$info.show();
		}
	});
	
	const ps = new PerfectScrollbar('.first-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	const ps1 = new PerfectScrollbar('.second-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	
})(jQuery);