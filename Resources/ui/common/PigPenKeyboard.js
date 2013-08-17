/**
/**
 * @author Guy Burton
 */

var centroids = [
    { x: 66, y: 200, region: 'shiftNumber' },
    { x: 70, y: 339, region: 'shiftLetter' },
    { x: 227, y: 430, region: 'space1' },
    { x: 320, y: 430, region: 'space2' },
    { x: 420, y: 430, region: 'space3' },
    { x: 520, y: 430, region: 'space4' },
    { x: 590, y: 430, region: 'space5' },
    { x: 130, y: 425, region: 'backspace' },
    { x: 660, y: 430, region: 'return' },
    { x: 188, y: 96, region: '1' },
    { x: 294, y: 95, region: '2' },
    { x: 404, y: 95, region: '3' },
    { x: 188, y: 215, region: '4' },
    { x: 294, y: 215, region: '5' },
    { x: 404, y: 215, region: '6' },
    { x: 188, y: 339, region: '7' },
    { x: 294, y: 339, region: '8' },
    { x: 404, y: 339, region: '9' },
    { x: 636, y: 112, region: '10' },
    { x: 552, y: 189, region: '11' },
    { x: 724, y: 182, region: '12' },
    { x: 634, y: 285, region: '13' },
];
var keyboardWidth = 800;
var keyboardHeight = 465;

function PigPenKeyboard() {
    var container = Ti.UI.createView({
        height: 180,
        bottom: -2,
        left:-2,
        right:-2,
        borderWidth: 2,
        borderColor: 'black'
    });
    
    var debug = false;
    
    // calculate center of each polygon (actually an estimate, but good enough)
    centroids.forEach(function(centroid) {
        centroid.x = centroid.x / keyboardWidth * Ti.Platform.displayCaps.platformWidth;
        centroid.y = centroid.y / keyboardHeight * container.height;
        if (debug) {
            container.add(Ti.UI.createView({
                backgroundColor: 'blue',
                top: centroid.y,
                left: centroid.x,
                width: 5,
                height: 5
            }));
        }
    });
    
    var shiftNumber = false;
    var shiftLetter = false;
    
    function update() {
        if (shiftLetter) {
            container.backgroundImage = 'images/keyboard-secondary.png';
        } else if (shiftNumber) {
            container.backgroundImage = 'images/keyboard-numbers.png';
        } else {
            container.backgroundImage = 'images/keyboard-primary.png';
        }
    }
    update();
    
    container.addEventListener('click', function(e){
         var closestCoord = { region: -1, distance: 0 };
         for (var i=0; i < centroids.length; i++) {
            var distance = Math.pow(e.x - centroids[i].x, 2) + Math.pow(e.y - centroids[i].y, 2);
            if (debug) {
                console.log('region ' + centroids[i].region + ' distance: ' + distance);
            }
            if (distance < closestCoord.distance || closestCoord.region < 0) {
                closestCoord = { region: centroids[i].region, distance: distance};
            }
        }
        if (closestCoord.region < 0) {
            console.log("Error calculating click button position");
        } else {
            if (debug) {
                console.log("User clicked region " + closestCoord.region);
            }
            try {
                if (closestCoord.region == 'shiftNumber') {
                    shiftNumber = !shiftNumber;
                    shiftLetter = false;
                } else if (closestCoord.region == 'shiftLetter') {
                    shiftLetter = !shiftLetter;
                    shiftNumber = false;
                } else if (closestCoord.region.substring(0, 5) == 'space') {
                    container.fireEvent('code_keypress', { value: ' '});
                    shiftLetter = false;
                    shiftNumber = false;
                    return;
                } else if (closestCoord.region == 'backspace') {
                    shiftLetter = false;
                    shiftNumber = false;
                    container.fireEvent('code_keypress', { value: '', isBackspace: true});
                    return;
                } else if (closestCoord.region == 'return') {
                    container.fireEvent('code_keypress', { value: '\n'});
                    shiftLetter = false;
                    shiftNumber = false;
                    return;
                }
                 else {
                    if (shiftNumber) {
                        if (closestCoord.region < 1 || closestCoord.region > 9) {
                            console.log(closestCoord.region + ' does not have a number');
                            return;
                        }
                        shiftNumber = false;
                        container.fireEvent('code_keypress', { value: parseInt(closestCoord.region)});
                        return;
                    }
                    var index = parseInt(closestCoord.region);
                    
                    if (index <= 9) {
                        if (shiftLetter) {
                            index += 9;
                            shiftLetter = false;
                        }
                    } else {
                        index += 9;
                        if (shiftLetter) {
                            index += 4;
                            shiftLetter = false;
                        }
                    }
                    container.fireEvent('code_keypress', { value: String.fromCharCode("a".charCodeAt(0) - 1 + index) });
                }
            } finally {
                update();
            }
        }
    });
    
    return container;
}

module.exports = PigPenKeyboard;

