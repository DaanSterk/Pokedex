var currentLocation = {
    watchId: null,

    initialize: function(){
        currentLocation.getLocationUpdate();
    },

    showLocation: function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = "Latitude: " + latitude + " Longitude: " + longitude + "\n";
        if($("#textarea-position"))
            $("#textarea-position").val(function(_, val){return val + coordinates})
    },

    errorHandler: function(err){
        if(err.code == 1) {
            alert("Error: Access is denied!");
        }
        else if( err.code == 2) {
            alert("Error: Position is unavailable!");
        }
    },

    getLocationUpdate: function(){
        if(navigator.geolocation){
            //var options = {maximumAge: 3000, timeout:30000};
            var options = {enableHighAccuracy: true}
            currentLocation.watchId = navigator.geolocation.watchPosition(
                currentLocation.showLocation, currentLocation.errorHandler, options);
        }
        else{
            alert("Sorry, browser does not support geolocation!");
        }
    }

};