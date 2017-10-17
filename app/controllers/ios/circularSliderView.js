(function(container) {

	$.circularSliderView.attrs({
		/* default is 62*/
		"diameter" : 300,
		/*No default */
		//"top" : 35,
		/*No default */
		//"left" : 15,
		/*default is a random color */
		"borderColor" : "#80FF0000",
		"selectColor" : "UIColor.blueColor",
		/*default is 2*/
		"borderOffset" : 0,
		/*default is 1*/
		"borderWidth" : 5,
		/*default is a random color */
		"backgroundColor" : "transparent",
		"textColor" : "1100FD",
		/*default is a random color */
		"initials" : "Slider Value",
		/*default is {fontSize: $.imageView.borderRadius, fontWeight: 'bold'}; */
		"font" : {
			fontSize : 30,
			fontWeight : 'bold'
		}
	});
	$.circularSliderView.init();

})($.circularSliderView_container);
