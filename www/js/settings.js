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
        console.log($('#switch-awesome-settings'));
        console.log($('#switch-show-compass'));
        console.log($('#switch-show-gps'));

        $('#settings-page').on("pageshow", function () {
            $('#switch-awesome-settings').on("tap", function(){
                console.log("switch settings");
                localStorage.setItem("awesomesettings", $('#switch-awesome-settings').val());
            });
            $('#switch-show-compass').change(function(){
                console.log("switch compass");
                localStorage.setItem("showcompass", $('#switch-show-compass').val());
            });
            $('#switch-show-gps').on("change", function(){
                console.log("switch gps");
                localStorage.setItem("showgps", $('#switch-show-gps').val());
            });
        });
    }
};