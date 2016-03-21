var currentDirection = {
    watchId: null,

    initialize: function(){
        currentDirection.getCurrentDirection();
    },

    //On Succes
    showDirection: function(direction){
        var heading = "Degrees: " + direction.magneticHeading;
        if($("#compass-degrees")) {
            $("#compass-degrees").val(heading);
        }
    },

    //On Error
    errorHandler: function(err){
        if(err.code == 1) {
            alert("Compass error: " + err);
        }
        else if( err.code == 2) {
            alert("Error: Compass is not supported");
        }
    },

    //Start Watch
    getCurrentDirection: function(){
        if(navigator.compass){
            var options = {frequency: 3000};
            currentDirection.watchId = navigator.compass.watchHeading(
                currentDirection.showDirection, currentDirection.errorHandler, options);
        }
        else{
            alert("Sorry, the device does not support compass!");
        }
    },

    //Stop Watch
    stopCompassWatch: function(){
        if(currentDirection.watchId){
            navigator.compass.clearWatch(currentDirection.watchId);
            currentDirection.watchId = null;
        }
    }

};