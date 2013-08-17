/**
 * @author Guy Burton
 */

function InfoWindow() {
    var self = Ti.UI.createWindow({
        title:L('info'),
        backgroundColor:'white',
        navBarHidden: true
    });
    
    self.add(Ti.UI.createWebView({
        url: 'http://en.m.wikipedia.org/wiki/Pigpen_cipher',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }));
    
    return self;
}

module.exports = InfoWindow;

