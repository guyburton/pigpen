
/**
 * @author Guy Burton
 */

function AboutWindow() {
    var self = Ti.UI.createWindow({
        title:L('about'),
        backgroundColor:'white',
    });
    
    self.add(Ti.UI.createWebView({
        url: 'about.html',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }));
    
    return self;
}

module.exports = AboutWindow;

