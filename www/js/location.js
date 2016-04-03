var currentLocation = {
    watchId: null,

    pokeLat: 0,
    pokeLong: 0,
    pokeName: null,

    maxDiff: 0.1,

    initialize: function(){
        currentLocation.getLocationUpdate();
    },

    catchPokemon: function(lat, long, name) {
        currentLocation.pokeLat = lat;
        currentLocation.pokeLong = long;
        currentLocation.pokeName = name;
        var options = {enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(this._callback, currentLocation.errorHandler, options);
    },

    _callback: function(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;

        var latDiff = myLat - currentLocation.pokeLat;
        var longDiff = myLong - currentLocation.pokeLong;

        //alert("Me (lat, long)");
        //alert(myLat);
        //alert(myLong);
        //
        //alert("Pokemon (lat, long)")
        //alert(currentLocation.pokeLat);
        //alert(currentLocation.pokeLong);
        //
        //alert(latDiff);
        //alert(longDiff);


        if (latDiff > -currentLocation.maxDiff && latDiff < currentLocation.maxDiff && longDiff > -currentLocation.maxDiff && longDiff < currentLocation.maxDiff) {
            $.ajax({
                url: "http://pokeapi.co/api/v2/pokemon/" + currentLocation.pokeName,
                success: function (data) {
                    storage.saveMyPokemon(data);
                    alert("Pokemon successfully caught!");
                    pokemonDetail.hideLoader();
                    $("#b_mapview").text("You own this pokemon");
                    $("#b_mapview").addClass("ui-disabled");
                    $("#b_catch").hide();
                },
                error: function() {
                    alert("error");
                }
            });
        }
        else {
            alert("You are too far away from this Pokemon.");
            pokemonDetail.hideLoader();
        }
    },

    showLocation: function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = "Latitude: " + latitude + " Longitude: " + longitude + "\n";
        var textArea = $("#textarea-position");
        if(textArea) {
            textArea.val(function (_, val) {
                return val + coordinates
            });
            //Ensure that the textarea is always scrolled to the bottom.
            textArea.scrollTop(textArea.height());
        }
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
            var options = {enableHighAccuracy: true};
            currentLocation.watchId = navigator.geolocation.watchPosition(
                currentLocation.showLocation, currentLocation.errorHandler, options);
        }
        else{
            alert("Sorry, the device does not support geolocation!");
        }
    }

};