var pokemonDetail = {
    detailIsLoading: true,

    initialize: function(){
        pokemonDetail.addListeners();
    },

    showDetail: function(name, path) {
        pokemonDetail.detailIsLoading = true;

        //$.mobile.changePage("#page_detail");
        $.mobile.changePage(path);

        //$("#poke_content").hide();

        $.ajax({
            url: "http://pokeapi.co/api/v2/pokemon/" + name,
            success: function(data) {

                if(typeof data != 'object') {
                    data = JSON.parse(data); // Somehow returned a string instead of JSON object.
                }

                $(".main-title").text(data.name);
                $("#poke_img1").attr("src", data.sprites.front_default);
                $("#poke_img2").attr("src", data.sprites.back_default);
                $("#poke_img3").attr("src", data.sprites.front_shiny);
                $("#poke_img4").attr("src", data.sprites.back_shiny);

                var list = $("#poke_abilities");
                list.empty();
                for (var i = 0; i < data.abilities.length; i++) {
                    var listItem = document.createElement("li");
                    var textNode = document.createTextNode(data.abilities[i].ability.name);
                    listItem.appendChild(textNode);
                    list[0].appendChild(listItem);
                }

                var list = $("#poke_types");
                list.empty();
                for (var i = 0; i < data.types.length; i++) {
                    var listItem = document.createElement("li");
                    var textNode = document.createTextNode(data.types[i].type.name);
                    listItem.appendChild(textNode);
                    list[0].appendChild(listItem);
                }

                var list = $("#poke_forms");
                list.empty();
                for (var i = 0; i < data.forms.length; i++) {
                    var listItem = document.createElement("li");
                    var textNode = document.createTextNode(data.forms[i].name);
                    listItem.appendChild(textNode);
                    list[0].appendChild(listItem);
                }

                var button = $("#b_mapview");
                if (storage.ownThisPokemon(data)) {
                    button.text("You own this pokemon");
                    button.addClass("ui-disabled");
                }
                else {
                    button.text("View on map");
                    button.removeClass("ui-disabled");
                    button.unbind("tap");
                    button.on("tap", function() {
                        pokemonDetail.viewOnMap(data);
                    });
                }

                $("#poke_content").show();
                pokemonDetail.hideLoader();
                pokemonDetail.detailIsLoading = false;
            }
        });
    },

    showLoader: function() {
        $.mobile.loading("show", {
            text: "Loading pokemon",
            textVisible: true,
            theme: $.mobile.loader.prototype.options.theme,
            textonly: false
        });
    },

    hideLoader: function() {
        $.mobile.loading("hide");
        $("#poke_content").show();
    },

    viewOnMap: function(pokemon) {

        var pokeCoords = [
            "51.688905, 5.283644?q=51.688905, 5.283644",
            "51.691766, 5.282115?q=51.691766, 5.282115",
            "51.651014, 5.125790?q=51.651014, 5.125790",
            "51.695863, 5.297589?q=51.695863, 5.297589",
            "51.692731, 5.279375?q=51.692731, 5.279375",
            "51.701781, 5.277217?q=51.701781, 5.277217",
            "51.722615, 5.298758?q=51.722615, 5.298758",
            "51.724939, 5.277651?q=51.724939, 5.277651",
            "51.706678, 5.287521?q=51.706678, 5.287521",
            "51.688757, 5.285100?q=51.688757, 5.285100"
        ];
        window.open("geo:" + pokeCoords[pokemon.id - 1], '_system');
    },

    addListeners: function () {
        $(document).on( "pageshow", "#page_detail", function( event ) {
            if (pokemonDetail.detailIsLoading) {
                pokemonDetail.showLoader();
            }
        });
    }
};