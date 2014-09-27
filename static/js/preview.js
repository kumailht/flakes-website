
var FlakesNavigation = {
	init: function() {
		this.el = {
			expandable_items: $('.flakes-navigation .expandable'),
			expandable_active_items: $('.flakes-navigation .expandable.active')
		};

		this.events();
	},
	expandActiveItems: function() {
		var that = this;
		this.el.expandable_active_items.each(function() {
			that.expandItem($(this));
		});
	},
	expandItem: function(item) {
		item.toggleClass('expanded');
	},
	events: function() {
		var that = this;
		this.expandActiveItems();

		this.el.expandable_items.click(function(event) {
			event.preventDefault();
			that.expandItem($(this));
		});
	}
};

jQuery(function() {
	FlakesNavigation.init();
})

$(function() {
	// Sometimes 'html' does not exist in the path
	var file_name = document.location.pathname.match(/[^\/]+$/)[0];
	var current_navigation = $('.flakes-navigation ul li a[href="' + file_name + '"]');

	current_navigation.parent().addClass('active');

	var nav_items = $('.flakes-navigation ul li a');
	nav_items.each(function() {
		var text = $(this).text();
		$(this).attr('title', text);
	});
});



$(function() {
	if (globals.ie === undefined || (globals.ie && globals.ie >= 10)) {
		var snapper = new Snap({
			element: $('.flakes-content')[0],
			disable: 'right',
			maxPosition: 250,
			minPosition: -250
		});

		if (!Utils.isMobileDevice()) $('body').attr('data-snap-ignore', 'true');

		$('.flakes-mobile-top-bar .navigation-expand-target').click(function() {
			if (snapper.state().state == "left") {
				snapper.close();
			} else {
				snapper.open('left');
			}
			return false;
		});
	} else if (globals.ie && globals.ie <= 9) {
		console.log('wef');
		$('.flakes-mobile-top-bar .navigation-expand-target').click(function() {
			$('.flakes-navigation').css({
				'z-index': '10',
				'background': 'white'
			}).show();
			return false;
		});

		$('.flakes-content').click(function() {
			$('.flakes-navigation').hide();
		});
	}

	function placeholderFallback() {
		var isInputSupported = 'placeholder' in document.createElement('input'),
			isTextareaSupported = 'placeholder' in document.createElement('textarea');

		var el = {
			placeholdersOnPage: $('[placeholder]')
		};

		if (!isInputSupported || !isTextareaSupported) {
			el.placeholdersOnPage
				.focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
				.blur(function() {
					var input = $(this);
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
						input.val(input.attr('placeholder'));
					}
				})
				.blur()
				.parents('form').submit(function() {
					$(this).find('[placeholder]').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
						}
					});
				});
		}
	};
	placeholderFallback();
});
