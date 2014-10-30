// Move framework stuff to base.js. And keep only preview specific stuff here.

try {
	var options = {
		valueNames: ["company", "contact", "city", "website", "name"]
	};

	new List('inventory-search', options);
} catch (e) {}

$(function() {
	$('.example-link').click(function(event) {
		event.preventDefault();
		alert("This link does not go anywhere. It's only an example.");
	});

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
