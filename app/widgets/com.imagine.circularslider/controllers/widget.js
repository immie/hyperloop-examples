//====================================
//
//Diameter must be an even number. If an odd number it will be lowered 1.
//Position will only be used for the wrapper.
//
//
//
//
//
//
//MTTCircularSlider - OBJ C x64
//
//=====================================

var attrs = {};
exports.attrs = function(args) {
	attrs = args;
};

exports.init = function(args) {
	var args = arguments[0] || {};
	args = _.defaults(attrs, args);

	args.diameter = 2 * Math.floor(args.diameter / 2) || 180;
	args.borderWidth = args.borderWidth || 1;
	args.borderOffset = args.borderOffset || 4;

	args.lineWidth = args.lineWidth || 25;

	args.backgroundColor = args.backgroundColor || randomColor();
	args.borderColor = args.borderColor || randomColor();

	//args.selectColor = args.selectColor || UIColor.greenColor;
	//args.unselectColor = args.unselectColor || UIColor.orangeColor;
	//args.indicatorColor = args.indicatorColor || UIColor.yellowColor;

	args.initials = args.initials || "";
	args.font = args.font || {
		fontSize : $.labelView.borderRadius,
		fontWeight : 'bold'
	};

	var UISlider = require('UIKit/UISlider'),
	    UIView = require('UIKit/UIView'),
	    UIControlEventValueChanged = require('UIKit').UIControlEventValueChanged,
	    UIColor = require('UIKit/UIColor'),
	    CGPointMake = require('CoreGraphics').CGPointMake,
	    CGRectMake = require('CoreGraphics').CGRectMake;

	var MTTCircularSlider = require('MTTCircularSlider/MTTCircularSlider');
	var circularSlider = new MTTCircularSlider();
	var circularSliderValue = circularSlider.value;
	var event = circularSlider.UIControlEventValueChanged;
	circularSlider.sliderStyle = 1;
	circularSlider.circulate = 'YES';
	circularSlider.lineWidth = args.lineWidth;
	circularSlider.indicatorColor = UIColor.blueColor;
	circularSlider.selectColor = UIColor.grayColor;
	circularSlider.unselectColor = UIColor.yellowColor;
//	circularSlider.frame = CGRectMake(0, 0, 250, 250);

	var WidgetSliderDelegate = Hyperloop.defineClass('WidgetSliderDelegate', 'NSObject');

	WidgetSliderDelegate.addMethod({
		selector : 'sliderMoved:',
		instance : true,
		arguments : ['MTTCircularSlider'],
		callback : function(sender) {
			if (this.sliderMoved) {
				this.sliderMoved(sender);
			}
		}
	});

	var delegate = new WidgetSliderDelegate();

	delegate.sliderMoved = function(sender) {
		sliderValue();
	};

	circularSlider.addTargetActionForControlEvents(delegate, "sliderMoved:", UIControlEventValueChanged);

	function sliderValue() {
		Ti.API.info("Slider Value => " + circularSlider.value + "        Slider Angle => " + circularSlider.angle);
		$.labelView.text = circularSlider.angle;
	}


	$.wrapperView.height = $.wrapperView.width = parseInt(args.diameter, 10) + args.borderOffset;
	$.wrapperView.borderRadius = (parseInt(args.diameter, 10) / 2) || 62;
	$.wrapperView.borderWidth = args.borderWidth;

	$.labelView.height = $.labelView.width = parseInt(args.diameter, 10);
	$.labelView.borderRadius = (parseInt(args.diameter, 10) / 2) || 60;

	$.wrapperView.add(circularSlider);

	$.labelView.visible = true;

	$.labelView.backgroundColor = args.backgroundColor;
	$.labelView.color = args.textColor;
	$.wrapperView.borderColor = args.borderColor;
	$.labelView.font = args.font;
	$.labelView.text = args.initials.toUpperCase();

	_.each(args, function(value, key, list) {
		if (_.indexOf(["bottom", "top", "left", "right", "backgroundColor", "borderWidth", "borderColor"], key) > -1) {
			$.wrapperView[key] = value;
		}
	});
};

function randomColor() {
	var c = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	var color = "#";
	for (var i = 1; i <= 6; i++) {
		r = _.random(0, 15);
		color += c[r];
	}
	return color;
}

