/**
 * @author Guy Burton
 */

function EncodeWindow() {
    var self = Ti.UI.createWindow({
        title:L('encode'),
        backgroundImage: 'images/paper.jpg'
    });
    
    var captureButton = Ti.UI.createButton({
        systemButton:  Titanium.UI.iPhone.SystemButton.CAMERA
    });
    
    captureButton.addEventListener('click', function() {
        Ti.Media.saveToPhotoGallery(codeTextArea.toImage());
        alert('Saved cipher to photo gallery!');
    });
    
    var codeTextArea = Ti.UI.createTextArea({
        editable: false,
        width: Titanium.Platform.displayCaps.platformWidth - 10,
        height: Ti.UI.SIZE,
        font: { fontFamily: 'BabelStonePigpen', fontSize: 18 },
        scrollable: false,
        backgroundColor: 'transparent'
    });
    
    var codeScrollArea = Ti.UI.createScrollView({
        height:90,
        width: Titanium.Platform.displayCaps.platformWidth - 10,
        top: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        contentWidth: Titanium.Platform.displayCaps.platformWidth - 10,
        scrollType: 'vertical',
        scrollsToTop: true,
        backgroundColor: 'transparent'
    });
    codeScrollArea.add(codeTextArea);
    
    var plainTextArea = Ti.UI.createTextArea({
        height:95,
        width: Titanium.Platform.displayCaps.platformWidth - 10,
        top: 100,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        editable: true,
        font: { fontSize: 18, fontFamily: 'Permanent Marker' },
        autocorrect: true,
        clearOnEdit: false,
        suppressReturn: false,
        hintText: L('encodeHint'),
        value: L('encodeHint'),
        color: 'gray',
        scrollsToTop: true,
        backgroundColor: 'transparent'
    });
    
    plainTextArea.addEventListener('change', function(e) {
        codeTextArea.value = e.value;
        codeTextArea.setHeight(Ti.UI.SIZE);
        codeScrollArea.scrollToBottom();
    });
    
    plainTextArea.addEventListener('focus',function(e){
        if(e.source.value == e.source.hintText){
            e.source.value = "";
            plainTextArea.color = 'black';
        }
    });
    plainTextArea.addEventListener('blur',function(e){
        if(e.source.value==""){
            e.source.value = e.source.hintText;
            plainTextArea.color = 'gray';
        }
    });
    
    self.rightNavButton = captureButton;
    self.add(codeScrollArea);
    self.add(plainTextArea);
    plainTextArea.focus();
    return self;
}

module.exports = EncodeWindow;

