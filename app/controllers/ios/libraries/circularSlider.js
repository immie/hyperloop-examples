/**
 * Circular Slider example
 * @author: imraan
 *
 * A example using a combination of Native UI (from cocoapod) and Titanium UI.
 *
 *
 * MTTCircularSlider - OBJ C x64
 *
 *
 *
 *
 */

(function(container) {

	var UISlider = require('UIKit/UISlider'),
	    UIControlEventValueChanged = require('UIKit').UIControlEventValueChanged,
	    UIColor = require('UIKit/UIColor'),
	    CGPointMake = require('CoreGraphics').CGPointMake,
	    CGRectMake = require('CoreGraphics').CGRectMake,
	    UIScreen = require('UIKit/UIScreen'),
	    bounds = UIScreen.mainScreen.bounds;

	var MTTCircularSlider = require('MTTCircularSlider/MTTCircularSlider');

	var circularSlider = new MTTCircularSlider();
	var circularSliderValue = circularSlider.value;
	var event = circularSlider.UIControlEventValueChanged;
	circularSlider.sliderStyle = 1;
	circularSlider.circulate = 'YES';
	circularSlider.lineWidth = 25;
	circularSlider.indicatorColor = UIColor.greenColor;
	circularSlider.selectColor = UIColor.whiteColor;
	circularSlider.unselectColor = UIColor.redColor;
	circularSlider.frame = CGRectMake(100, 100, 250, 250);

	var SliderDelegate = Hyperloop.defineClass('SliderDelegate', 'NSObject');

	SliderDelegate.addMethod({
		selector : 'sliderMoved:',
		instance : true,
		arguments : ['MTTCircularSlider'],
		callback : function(sender) {
			if (this.sliderMoved) {
				this.sliderMoved(sender);
			}
		}
	});

	var delegate = new SliderDelegate();

	delegate.sliderMoved = function(sender) {
		sliderValue();
	};

	circularSlider.addTargetActionForControlEvents(delegate, "sliderMoved:", UIControlEventValueChanged);

	function sliderValue() {
		Ti.API.info("Slider Value => " + circularSlider.value + "        Slider Angle => " + circularSlider.angle);
		valueLabel.text = circularSlider.angle;
	}

	var valueLabel = Ti.UI.createLabel({
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : "SLIDER ANGLE:    ",
		top : 10,
		height : 50,
		color : "pink",
		font : {
			fontFamily : "HelveticaNeue-UltraLight",
			fontSize : 48
		}
	});

	container.add(circularSlider);

	container.add(valueLabel);

})($.slider_container);
