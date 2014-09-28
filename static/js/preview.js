try {
	var options = {
		valueNames: ["company", "contact", "city", "website", "name"]
	};

	new List('inventory-search', options);
} catch (e) {}

$(function() {
	var TableActions = {
		el: {
			table: $('.flakes-table'),
			buttons: $('.flakes-actions-bar .disabled'),
			deleteButton: $('.flakes-actions-bar .delete')
		},
		init: function() {
			this.events();
		},
		selectItem: function() {
			var that = TableActions;

			$(this).closest('tr').toggleClass('selected');

			if (that.el.table.find('tr.selected').length) {
				that.el.buttons.removeClass('disabled');
			} else {
				that.el.buttons.addClass('disabled');
			}
		},
		toggleAll: function() {
			var that = TableActions;
			if (that.el.table.find('thead input[type=checkbox]').is(':checked')) {
				that.el.table.find('input[type=checkbox]').attr('checked', 'checked');
				that.el.table.find('tbody > tr').addClass('selected');
			} else {
				that.el.table.find('input[type=checkbox]').attr('checked', false);
				that.el.table.find('tbody > tr').removeClass('selected');
			}
		},
		deleteSelected: function() {
			var that = TableActions;
			var checked = that.el.table.find('tbody input[type=checkbox]').filter(':checked');

			$(checked).each(function() {
				$(this).closest('tr')
					.fadeOut('fast', function() {
						$(this).remove();
					});
			});

			return false;
		},
		events: function() {
			this.el.table.find('input[type=checkbox]').change(this.selectItem);
			this.el.table.find('thead input[type=checkbox]').change(this.toggleAll);
			this.el.deleteButton.click(this.deleteSelected);
		}
	}
	TableActions.init();
});


$(function() {
	if (!$('#example-graph').length) {
		return;
	};
	var rand = function(min, max) { return Math.floor(Math.random() * (max - min)) + min };
	var i = 0;
	var sample_data = [];
	while (i < 100) {
		var d = new Date();
		d.setDate(d.getDate() - (100 - i));

		sample_data.push({
			y: d.getTime(),
			a: rand(3000, 3600) + i * rand(20, 30),
			b: rand(1500, 2000) + i * rand(30, 40)
		});
		i++;
	}

	Morris.Line({
		element: 'example-graph',
		data: sample_data,
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Revenue', 'Units Sold'],
		smooth: false,
		ymin: 1000,
		xLabels: 'month',
		resize: true,
		xLabelFormat: function (d) {
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

			return monthNames[curr_month] + ' ' + curr_year;
		}
	});
});

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
