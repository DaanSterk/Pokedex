var settings = {
    initialize: function(){
        settings.setSettingValues();
        settings.addListeners();
    },

    setSettingValues: function(){
        $(document).on("pageshow", '#settings-page', function () {
            if (localStorage.getItem("awesomesettings") == 'true') {
                $('#switch-awesome-settings').prop('checked', true).flipswitch( "refresh" );
            };
            if (localStorage.getItem("showcompass") == 'true') {
                $('#switch-show-compass').prop('checked', true).flipswitch( "refresh" );
            };
            if (localStorage.getItem("showgps") == 'true') {
                $('#switch-show-gps').prop('checked', true).flipswitch( "refresh" );
            };
        });
    },

    addListeners: function(){
        $(document).on("pageshow", '#settings-page', function () {
            $('#switch-awesome-settings').change(function(){
                localStorage.setItem("awesomesettings", $('#switch-awesome-settings').is(":checked"));
            });
            $('#switch-show-compass').change(function(){
                localStorage.setItem("showcompass", $('#switch-show-compass').is(":checked"));
            });
            $('#switch-show-gps').change(function(){
                localStorage.setItem("showgps", $('#switch-show-gps').is(":checked"));
            });
        });
    }
};