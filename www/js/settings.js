var settings = {
    initialize: function(){
        settings.setSettingValues();
        settings.addListeners();
    },

    //Method for setting the initial values of the Settings Page.
    setSettingValues: function(){
        $(document).on("pageshow", '#settings-page', function () {
            if (localStorage.getItem("awesomesettings") == 'true') {
                $('#switch-awesome-settings').prop('checked', true).flipswitch("refresh");
            } else {
                $('#switch-awesome-settings').prop('checked', false).flipswitch("refresh");
            }
            if (localStorage.getItem("showcompass") == 'true') {
                $('#switch-show-compass').prop('checked', true).flipswitch( "refresh" );
                $('#compass-wrapper').show();
            } else{
                $('#switch-show-compass').prop('false', true).flipswitch( "refresh" );
                $('#compass-wrapper').hide();
            }
            if (localStorage.getItem("showgps") == 'true') {
                $('#switch-show-gps').prop('checked', true).flipswitch( "refresh" );
                $('#gps-wrapper').show();
            } else {
                $('#switch-show-gps').prop('false', true).flipswitch( "refresh" );
                $('#gps-wrapper').hide();
            }
        });
    },

    //Method for adding the Listeners to the Settings Page.
    addListeners: function(){
        $(document).on("pageshow", '#settings-page', function () {
            $('#switch-awesome-settings').change(function(){
                var switchChecked = $('#switch-awesome-settings').is(":checked");
                localStorage.setItem("awesomesettings", switchChecked);
            });
            $('#switch-show-compass').change(function(){
                var switchChecked = $('#switch-show-compass').is(":checked");
                localStorage.setItem("showcompass", switchChecked);
                if(switchChecked){
                    $('#compass-wrapper').show();
                } else {
                    $('#compass-wrapper').hide();
                }
            });
            $('#switch-show-gps').change(function(){
                var switchChecked = $('#switch-show-gps').is(":checked");
                localStorage.setItem("showgps", switchChecked);
                if(switchChecked){
                    $('#gps-wrapper').show();
                }else{
                    $('#gps-wrapper').hide();
                }
            });
        });
    }
};