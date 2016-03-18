// Only call functions that are not indented.

var callbacks;
var callbacksLeft;

var savedList;

// Shows all pokemon in the 'ALL POKEMON' list.
function showAllPokemon(limit, offset) {
	callbacks = limit;
	callbacksLeft = limit;

	showListLoader();
	
	$.ajax({
  		url: "http://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset,
  		success: function(data) {
  			for (var i = 0; i < data.results.length; i++) {
  				addSinglePokemonToAllList(data, i);
  			}
  		}
	});
}

	// Subfunction - do not call directly. Adds a single pokemon to the 'ALL POKEMON' list.
	function addSinglePokemonToAllList(data, num) {
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
			showDetail(data.results[num].name);
		});

		item.appendChild(anchor);

		$("#list_all_pokemon")[0].appendChild(item);
		$("#list_all_pokemon").listview("refresh");

		setImgAndPTags(data.results[num].url, image, p);
	}

	// Subfunction - do not call directly. Gets single pokemon data and updates listview item on callback.
	function setImgAndPTags(url, img, p) {
		$.ajax({
	  		url: url,
	  		success: function(data) {
	  			$(img).attr("src", data.sprites.front_default);
	  			var moves = "";

	  			var divider = ""
	  			for (var i = 0; i < data.moves.length; i++) {
	  				moves = moves + divider + data.moves[i].move.name;
	  				divider = ", ";
	  			}
	  			$(p).text(moves);

	  			// If all callbacks have returned data:
				if (isFullyLoaded()) {
					hideLoader();
				}
				else {
					showListLoader();
				}
	  		}
		});
	}

function isFullyLoaded() {
	callbacksLeft--;
	return callbacksLeft == 0;
}

function showListLoader() {
	$("#list_all_pokemon").hide();

    $.mobile.loading( "show", {
            text: "Loading pokemon " + (callbacks - callbacksLeft) + "/" + callbacks,
            textVisible: true,
            theme: $.mobile.loader.prototype.options.theme,
            textonly: false
    });
}

function showLoader() {
	$.mobile.loading( "show", {
		text: "Loading pokemon",
		textVisible: true,
		theme: $.mobile.loader.prototype.options.theme,
		textonly: false
	});
}

function hideLoader() {
	$.mobile.loading("hide");
	$("#list_all_pokemon").show();
	savedList = $("#list_all_pokemon");
}

function showDetail(name) {
	$.mobile.changePage("../views/detail.html");
	$.ajax({
		url: "http://pokeapi.co/api/v2/pokemon/" + name,
		success: function(data) {
			data = JSON.parse(data); // Somehow returned a string instead of JSON object.
			$(".main-title").text(data.name);
			$("#poke_img1").attr("src", data.sprites.front_default);
			$("#poke_img2").attr("src", data.sprites.back_default);
			$("#poke_img3").attr("src", data.sprites.front_shiny);
			$("#poke_img4").attr("src", data.sprites.back_shiny);
			hideLoader();
		}
	});
}

$(document).ready(function(){
	showAllPokemon(1, 150);
});

$(document).ajaxStart(function() {

});

$(document).ajaxStop(function() {

});