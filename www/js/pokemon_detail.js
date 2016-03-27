var pokemonDetail = {
    detailIsLoading: true,

    initialize: function(){
        pokemonDetail.addListeners();
    },

    showDetail: function(name, path) {
        pokemonDetail.detailIsLoading = true;

        //$.mobile.changePage("#page_detail");
        $.mobile.changePage(path);

        $("#poke_content").hide();

        $.ajax({
            url: "http://pokeapi.co/api/v2/pokemon/" + name,
            success: function(data) {
                data = JSON.parse(data); // Somehow returned a string instead of JSON object.

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
                pokemonList.hideLoader();
                pokemonDetail.detailIsLoading = false;
            }
        });
    },

    viewOnMap: function(pokemon) {
        var pokeCoords = [
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545",
            "58.897096,-77.036545?q=58.897096,-77.036545"
        ];

        window.open("geo:" + pokeCoords[pokemon.id - 11], '_system');
    },

    addListeners: function () {
        $(document).on( "pageshow", "#page_detail", function( event ) {
            if (pokemonDetail.detailIsLoading) {
                pokemonList.showLoader();
            }
        });
    }
};