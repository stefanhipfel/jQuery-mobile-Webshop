var ws = {};

(function( $ ) {
	var shopClient =  'elegance';
	var methods = {
		initMainPage : function() {
			
			var page = $('#mainPage');
			var productPage = $('#productPage');
			var categories = $('#main_categories');
			var linkDtata=[];
            categories.empty();
				$.mobile.showPageLoadingMsg();
				now.loadMainCategories('jqm', shopClient, function(err, data) {
                
				localStorage.setItem(shopClient, JSON.stringify(data));
					for (var cat=0; cat < data.length; cat++) {
                        var htmlCat = '';
								
                        htmlCat += '<div data-role="collapsible" data-theme="b"><h3>'+
                        data[cat].name + '</h3><ul data-role="listview" data-theme="g">';
                        
                        for(var subcat=0; subcat < data[cat].subcategories.length; subcat++) {
                            htmlCat += '<li><a href="#productPage" data-transistion="slide">'+
                                              data[cat].subcategories[subcat].name + '</a></li>'; 
			  						 linkDtata.push(data[cat].subcategories[subcat].name);
                        }
                        htmlCat += '</ul></div>';
                        categories.append(htmlCat);
					}
													for (var links=0; links < $('#main_categories ul a').get().length; links++) {
														//console.log($('#main_categories ul a').get().length)
														(function(data) {
													 		$('#main_categories').find($('#main_categories ul a').get(links)).click(function(){
																$('#productPage').data('productId', data);
															});
													 	})(linkDtata[links]);
													}
					var temp = localStorage.getItem(shopClient)
               categories.trigger('create');
					$.mobile.hidePageLoadingMsg();	
				});
                now.receieveTeaserData = function(message) {
                    $('#test').empty();
                    $('#test').append(message);
                }
				page.live('pageshow', function(event) {
					var page = $('#productPage');
					var prods = page.find('.container-products ul');
					prods.empty();
				})
		},
		
		initProductsPage : function() {
			var page = $('#productPage');
			var prods = page.find('.container-products ul');
			var prodData = {};
			page.live('pagebeforeshow', function (event) {
				var productId = page.data('productId');
				$.mobile.showPageLoadingMsg();
			   prods.empty();
				now.loadProducts('jqm', 'elegance', unescape(productId), function(err, prodData) {
					if(prodData) {
						for(var items=0; items < prodData.items.length; items++) {
							var html='';
							html += '<li data-theme="c">' +
									'<a href="#productDetailPage">' +
									'<img src="'+ prodData.items[items].images[0].replace('{relTypeCode}', 550) +'"/>' +
									'<h3>'+prodData.items[items].name + '</h3>' +
									'<p>' + prodData.items[items].price + '</p>' +
									'</a>' +
									'</li>';
							prods.append(html);
							(function(data) {
								prods.find('a:last').click(function(){
									$('#productDetailPage').data('product', data);
								});
							})(prodData.items[items]);

						}
						$('.container-products').trigger('create');
						prods.listview('refresh');
					}
					$.mobile.hidePageLoadingMsg();
				});

			});		
		},

		initProductDetailPage : function() {
			var page = $('#productDetailPage');
			page.bind("pagebeforeshow", function(event, ui) {
				$('.container-product').empty();
				if(page.data('product')) {
					$.mobile.showPageLoadingMsg();
					var product = page.data('product');
					var strHtml = '<p><img src="' + product.images[0].replace('{relTypeCode}', 561) + '">';
					strHtml += product.text + '</p>';
					$('.container-product').append(strHtml);
					$('.container-product').trigger('create');
					$.mobile.hidePageLoadingMsg();
				}
			});
		},
		
		initAccountPage : function() {
		},
		
		initAll : function() {
			$().initApp("initMainPage");
			$().initApp("initProductsPage");
			$().initApp("initProductDetailPage");
			$().initApp("initAccountPage");
		}
	};
	
	$.fn.initApp = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, 
			Array.prototype.slice.call( arguments, 1));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.initAll.apply( this, arguments );
		}else {
			$.error( 'Method ' + method + ' does not exist');
		}
	};
})(jQuery);


ws.setImages = function() {
	var productPage = $('#productPage');
	
	var productData = 'tt';
	now.loadProducts('jqm', 'elegance', unescape(productId), function(err, data) {
		callback(data);
	});
	//private property
	var config = {
		server: ''
	};
	
	//public method: fetching JSON
	var init = function (method) {
		
	};
	
	return {
		products: productData		
	}
}


