/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //$mobile.changePage("all_pokemon.html");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // var toppos=($(window).height()/2) - ($("#menu-buttons").height()/2);
        // var leftpos=($(window).width()/2) - ($("#menu-buttons").width()/2);
        // $("#menu-buttons").css("top", toppos).css("left",leftpos);

        // window.open = cordova.InAppBrowser.open;
        app.indexPageListeners();
        currentLocation.initialize();
        currentDirection.initialize();
        settings.initialize();
    },
    
    indexPageListeners: function () {
        $(document).on("tap", "#pokedex-webpage", function () {
            window.open("http://www.pokemon.com/nl/pokedex/", "_system");
        });

        $(document).on("tap", "#pokedex-facebook", function () {
            //window.open("https://www.facebook.com/1399971336935582", "_system");
            window.open('fb://page/1399971336935582', '_system');
        });
    }
};
