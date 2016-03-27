var myPokemon = {
    initialize: function () {
        myPokemon.addListeners();
    },

    showMyPokemon: function() {

        $("#list_my_pokemon").empty();

        var myPokemonStorage = storage.getMyPokemon();

        for (var i = 0; i < myPokemonStorage.length; i++) {

            var currPokemon = myPokemonStorage[i];

            var item = document.createElement("li");
            var anchor = document.createElement("a");
            $(anchor).attr("data-transition", "none");
            var image = document.createElement("img");
            var h2 = document.createElement("h2");
            $(h2).text(currPokemon.name);
            var p = document.createElement("p");

            anchor.appendChild(image);
            anchor.appendChild(h2);
            anchor.appendChild(p);
            $(anchor).click(function() {
                pokemonDetail.showDetail(currPokemon.name, "detail_pokemon.html");
            });

            item.appendChild(anchor);

            $("#list_my_pokemon")[0].appendChild(item);
            $("#list_my_pokemon").listview("refresh");

            $(image).attr("src", currPokemon.sprites.front_default);
            var moves = "";

            var divider = ""
            for (var j = 0; j < currPokemon.moves.length; j++) {
                moves = moves + divider + currPokemon.moves[j].move.name;
                divider = ", ";
            }
            $(p).text(moves);
        }
    },

    addListeners: function () {
        $(document).on("pageshow", "#page_my_pokemon", function( event ) {
            myPokemon.showMyPokemon();
            pokemonList.hideLoader();
            //$(".nav-my-pokemon").addClass("ui-btn-active");
            //$(".nav-all-pokemon").removeClass("ui-btn-active");
        });

        $(document).on("swiperight", "#page_my_pokemon", function () {
            window.history.back();
        });
    }

};