/**
 * @author Guy Burton
 */

function ApplicationWindow(title) {
	var rootWindow = Ti.UI.createWindow({
	});
	
	var homeWindow = Ti.UI.createWindow({
        title:title,
        backgroundColor:'white',
        navBarHidden: true,
        backgroundImage: 'images/paper.jpg'
	});
	
	homeWindow.add(Ti.UI.createLabel({
	    text: L('apptitle'),
	    top: 20,
	    size: 24,
	    textAlign: 'center',
	    font: { fontFamily: 'Permanent Marker', fontSize: 32 }
	}))
	
	homeWindow.add(Ti.UI.createView({
	    backgroundImage: 'images/logo.png',
	    width: 85,
	    height: 85,
	    top: 75
	}));
	
	var topCoord = 125;
	var buttonHeight = 44;
	var buttonWidth = 200;
	var buttonPadding = 10;
	
	function getNextTopCoord() {
	    topCoord += buttonHeight + buttonPadding;
	    return topCoord;
	}
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
        window: homeWindow
    });

	function createButton(text, window) {
    	var button = Ti.UI.createButton({
    		height:buttonHeight,
    		width:buttonWidth,
    		title:text,
    		top: getNextTopCoord(),
    		color: 'black',
    		font: { fontFamily: 'Permanent Marker', fontSize: 20 },
    		backgroundColor: 'transparent',
    		borderColor: 'white',
    		borderWidth: 3,
    		borderRadius: 3,
    		style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    	});
    	button.addEventListener('click', function() {
    		window.navBarHidden = false;
    		navGroup.open(window);
    	});
    	homeWindow.add(button);
	    return button;
	}
	
	createButton(L('encode'), require('ui/handheld/EncodeWindow')());
	createButton(L('decode'), require('ui/handheld/DecodeWindow')()); 
	createButton(L('info'), require('ui/handheld/InfoWindow')());
	createButton(L('about'), require('ui/handheld/AboutWindow')());
	
	rootWindow.add(navGroup);
	return rootWindow;
};

module.exports = ApplicationWindow;
