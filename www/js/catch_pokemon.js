// var catchpokemon = {
//     initialize: function(){
//         catchpokemon.mapListener();
//         catchpokemon.mapListener2();
//         catchpokemon.mapListener3();
//     },
//
//     mapListener: function () {
//           $(document).on("tap", "#map-btn", function () {
//               //The system parameter is used otherwise it will use an old browser now it uses the correct one.
//               //Therefore if you press the back button you go back to the app instead of the browser.
//               window.open("geo:58.897096,-77.036545?q=58.897096,-77.036545", '_system');
//           });
//     },
//
//     mapListener2: function () {
//         $(document).on("tap", "#map2-btn", function () {
//             window.open("https://www.google.nl/maps/place/Hertog+Arnoldstraat+33,+5331+XG+Kerkdriel/@51.772366,5.3325072,17z/data=!3m1!4b1!4m2!3m1!1s0x47c6f1aa4025754d:0x5e17882030294bcc?hl=nl", "_system");
//         });
//     },
//
//     mapListener3: function () {
//         $(document).on("tap", "#map3-btn", function () {
//             window.open("geo:51.805117,5.329747?q=restaurants", "_system");
//         });
//     }
// };