/**
 * @author Guy Burton
 */

function DecodeWindow() {
    var self = Ti.UI.createWindow({
        title:L('decode'),
        backgroundImage: '/images/paper.jpg',
    });
    
    var plainTextArea = Ti.UI.createTextArea({
        height: 110,
        top: 5,
        left: 5,
        right: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'transparent',
        editable: false,
        font: { fontFamily: 'Permanent Marker', fontSize: 22 },
    });
    var codeTextArea = Ti.UI.createTextArea({
        height: Ti.Platform.displayCaps.getPlatformHeight() - 120 - 180 - 10 - 50,
        top: 120,
        left: 5,
        right: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black', 
        backgroundColor: 'transparent',
        editable: false,
        font: { fontFamily: 'BabelStonePigpen', fontSize: 22 },
    });
    
    var clearButton = Ti.UI.createButton({
        title: L('clear')
    });
    clearButton.addEventListener('click', function() {
        codeTextArea.value = '';
        plainTextArea.value = '';
    });
    
    self.rightNavButton = clearButton;
    self.add(plainTextArea);
    self.add(codeTextArea);
    
    var keyboard = require('ui/common/PigPenKeyboard')();
    self.add(keyboard);
    
    keyboard.addEventListener('code_keypress', function(key) {
        console.log('Keypress: ' + key.value);
        if (key.isBackspace) {
            plainTextArea.value = plainTextArea.value.slice(0, -1);
            codeTextArea.value  = codeTextArea.value.slice(0, -1);
        } else {
            plainTextArea.value += key.value;
            codeTextArea.value += key.value;
        }
    })
    
    return self;
}

module.exports = DecodeWindow;

