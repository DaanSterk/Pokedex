// Only call functions that are not indented.
var pokemonList = {
	recordsPerPage: 10,

	callbacks: null,
	callbacksLeft: null,
	currPage: null,

	savedList: null,

	isLoading: false,

	events_all_pokemon: false,

	initialize: function () {
		pokemonList.addListeners();
	},

	showAllPokemon: function (limit, page) {
		pokemonList.currPage = page;
		pokemonList.callbacks = limit;
		pokemonList.callbacksLeft = limit;
		pokemonList.isLoading = true;

		$("#list_all_pokemon").empty();
		pokemonList.updateButtonText();
		pokemonList.disableButtons();
		pokemonList.showListLoader();

		$.ajax({
			url: "http://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + (page * limit),
			success: function (data) {
				for (var i = 0; i < data.results.length; i++) {
					pokemonList.addSinglePokemonToAllList(data, i);
				}
			}
		});
	},

	// Subfunction - do not call directly. Adds a single pokemon to the 'ALL POKEMON' list.
	addSinglePokemonToAllList: function(data, num){
		var currPokemon = data.results[num];

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
			pokemonDetail.showDetail(data.results[num].name, "views/detail_pokemon.html");
		});

		item.appendChild(anchor);

		$("#list_all_pokemon")[0].appendChild(item);
		$("#list_all_pokemon").listview("refresh");

		pokemonList.setImgAndPTags(data.results[num].url, image, p);
	},

	// Subfunction - do not call directly. Gets single pokemon data and updates listview item on callback.
	setImgAndPTags: function(url, img, p) {
		$.ajax({
			url: url,
			success: function(data) {
				// storage.saveMyPokemon(data);

				$(img).attr("src", data.sprites.front_default);
				var moves = "";

				var divider = ""
				for (var i = 0; i < data.moves.length; i++) {
					moves = moves + divider + data.moves[i].move.name;
					divider = ", ";
				}
				$(p).text(moves);

				// If all callbacks have returned data:
				if (pokemonList.isFullyLoaded()) {
					pokemonList.hideLoader();
					pokemonList.enableButtons();
					pokemonList.isLoading = false;
				}
				else {
					if ($.mobile.activePage.attr("id") == "page_all_pokemon") {
						pokemonList.showListLoader();
					}
				}
			}
		});
	},

	isFullyLoaded: function() {
		pokemonList.callbacksLeft--;
		return pokemonList.callbacksLeft == 0;
	},

	disableButtons: function() {
		$("#btn-next").addClass("ui-disabled");
		$("#btn-prev").addClass("ui-disabled");
	},

	enableButtons: function() {
		$("#btn-next").removeClass("ui-disabled");
		if (pokemonList.currPage != 0) {
			$("#btn-prev").removeClass("ui-disabled");
		}
	},

	updateButtonText: function() {
		var btnNextText = "Next (" + (pokemonList.currPage + 2) + ")";
		$("#btn-next").text(btnNextText);

		var btnPrevText;
		var btnPrev = $("#btn-prev");
		if (pokemonList.currPage != 0) {
			btnPrevText = "Previous (" + (pokemonList.currPage) + ")";
			btnPrev.text(btnPrevText);
		}
		else {
			btnPrev.text("Previous");
		}
	},

	showListLoader: function() {
		$("#list_all_pokemon").hide();

		$.mobile.loading( "show", {
			text: "Loading pokemon " + (pokemonList.callbacks - pokemonList.callbacksLeft) + "/" + pokemonList.callbacks,
			textVisible: true,
			theme: $.mobile.loader.prototype.options.theme,
			textonly: false
		});
	},

	showLoader: function() {
		$.mobile.loading( "show", {
			text: "Loading pokemon",
			textVisible: true,
			theme: $.mobile.loader.prototype.options.theme,
			textonly: false
		});
	},

	hideLoader: function() {
		$.mobile.loading("hide");
		$("#list_all_pokemon").show();
		if (!pokemonList.isLoading) {
			pokemonList.savedList = $("#list_all_pokemon");
		}
	},

	addListeners: function(){
		// Everything that needs to happen when a page is loaded.
		$(document).on( "pageshow", "#page_all_pokemon", function( event ) {
			$(".main-title").text("Pokedex");
			//$(".nav-all-pokemon").addClass("ui-btn-active");

			if (pokemonList.savedList == null) {
				if (!pokemonList.isLoading) {
					pokemonList.showAllPokemon(pokemonList.recordsPerPage, 0);
				}
				else {
					pokemonList.showListLoader();
				}
			}
			else {
				$("#list_all_pokemon")[0] = pokemonList.savedList;
			}
			
			if (!pokemonList.events_all_pokemon) {
				$(document).on("tap", "#btn-next", function() {
					$("#btn-next").text(pokemonList.currPage + 1);
					pokemonList.showAllPokemon(pokemonList.recordsPerPage, pokemonList.currPage + 1);
				});


				$(document).on("tap", "#btn-prev", function() {
					$("#btn-prev").text(pokemonList.currPage - 1);
					pokemonList.showAllPokemon(pokemonList.recordsPerPage, pokemonList.currPage - 1);
				});
				pokemonList.events_all_pokemon = true;
			}
		});
	}
};