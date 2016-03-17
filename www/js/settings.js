var settings = {
    initialize: function(){
        settings.setSettingValues();
        settings.addListeners();
    },

    setSettingValues: function(){
        if(localStorage.getItem("awesomesettings") == 'on'){
            $('#switch-awesome-settings').val('on').slider('refresh');
        };
        if(localStorage.getItem("showcompass") == 'on'){
            $('#switch-show-compass').val('on').slider('refresh');
        };
        if(localStorage.getItem("showgps") == 'on'){
            $('#switch-show-gps').val('on').slider('refresh');
        };
    },

    addListeners: function(){
        alert($('#switch-awesome-settings').val());
        alert($('#switch-show-compass').val());
        alert($('#switch-show-gps').val());
        $('#switch-awesome-settings').on("tap", function(){
            localStorage.setItem("awesomesettings", $('#switch-awesome-settings').val());
        });
        $('#switch-show-compass').change(function(){
            localStorage.setItem("showcompass", $('#switch-show-compass').val());
        });
        $('#switch-show-gps').on("change", function(){
            alert("Werkt niet. Of toch wel?");
            localStorage.setItem("showgps", $('#switch-show-gps').val());
        });
    }
};