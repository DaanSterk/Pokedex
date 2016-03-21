var settings = {
    initialize: function(){
        settings.setSettingValues();
        settings.addListeners();
    },

    setSettingValues: function(){
        $(document).on("pageshow", '#settings-page', function () {
            if (localStorage.getItem("awesomesettings") == true) {
                $('#switch-awesome-settings').prop('checked', true).slider('refresh');
                console.log("Settings is: " + $('#switch-awesome-settings').is(":checked"));
            }
            ;
            if (localStorage.getItem("showcompass") == true) {
                $('#switch-show-compass').prop('checked', true).slider('refresh');
                console.log("Compass is: " + $('#switch-show-compass').is(":checked"));
            }
            ;
            if (localStorage.getItem("showgps") == true) {
                $('#switch-show-gps').prop('checked', true).slider('refresh');
                console.log("GPS is: " + $('#switch-show-gps').is(":checked"));
            }
            ;
        });
    },

    addListeners: function(){
        $('body').on("pageshow", '#settings-page', function () {
            $('#switch-awesome-settings').change(function(){
                console.log($('#switch-awesome-settings').is(":checked"));
                localStorage.setItem("awesomesettings", $('#switch-awesome-settings').is(":checked"));
            });
            $('#switch-show-compass').change(function(){
                console.log($('#switch-show-compass').is(":checked"));
                localStorage.setItem("showcompass", $('#switch-show-compass').is(":checked"));
            });
            $('#switch-show-gps').change(function(){
                console.log($('#switch-show-gps').is(":checked"))
                localStorage.setItem("showgps", $('#switch-show-gps').is(":checked"));
            });
        });
    }
};