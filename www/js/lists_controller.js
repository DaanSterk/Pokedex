// Only call functions that are not indented.

var recordsPerPage = 10;

var callbacks;
var callbacksLeft;
var currPage;

var savedList;

var isLoading = false;
var detailIsLoading = false;

// Shows all pokemon in the 'ALL POKEMON' list.
function showAllPokemon(limit, page) {
	currPage = page;
	callbacks = limit;
	callbacksLeft = limit;
	isLoading = true;

	savedList = null;
	$("#list_all_pokemon").empty();
	updateButtonText();
	disableButtons();
	showListLoader();

	$.ajax({
		url: "http://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + (page * limit),
		success: function (data) {
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
			if (isFullyLoaded()) {
				hideLoader();
				enableButtons();
				isLoading = false;
			}
			else {
				if ($.mobile.activePage.attr("id") == "page_all_pokemon") {
					showListLoader();
				}
			}
		}
	});
}

function isFullyLoaded() {
	callbacksLeft--;
	return callbacksLeft == 0;
}

function disableButtons() {
	$("#btn-next").addClass("ui-disabled");
	$("#btn-prev").addClass("ui-disabled");
}

function enableButtons() {
	$("#btn-next").removeClass("ui-disabled");
	if (currPage != 0) {
		$("#btn-prev").removeClass("ui-disabled");
	}
}

function updateButtonText() {
	var btnNextText = "Next (" + (currPage + 2) + ")";
	$("#btn-next").text(btnNextText);

	var btnPrevText;
	var btnPrev = $("#btn-prev");
	if (currPage != 0) {
		btnPrevText = "Previous (" + (currPage) + ")";
		btnPrev.text(btnPrevText);
	}
	else {
		btnPrev.text("Previous");
	}
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
	if (!isLoading) {
		savedList = $("#list_all_pokemon");
	}
}

function showDetail(name) {
	detailIsLoading = true;

	$.mobile.changePage("#page_detail");

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
			}

			$("#poke_content").show();
			hideLoader();
			detailIsLoading = false;
		}
	});
}

function showMyPokemon() {

	$("#list_my_pokemon").empty();

	var myPokemon = storage.getMyPokemon();

	for (var i = 0; i < myPokemon.length; i++) {

		var currPokemon = myPokemon[i];

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
			showDetail(currPokemon.name);
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

}

// Everything that needs to happen when a page is loaded.
var events_all_pokemon = false;
$("#page_all_pokemon").on( "pageshow", function( event ) {

	$(".main-title").text("Pokedex");
	$(".nav-all-pokemon").addClass("ui-btn-active");

	if (savedList == null) {
		if (!isLoading) {
			showAllPokemon(recordsPerPage, 0);
		}
		else {
			showListLoader();
		}
	}
	else {
		$("#list_all_pokemon")[0] = savedList;
	}


	if (!events_all_pokemon) {
		$("#btn-next").on("tap", function() {
			$("#btn-next").text(currPage + 1);
			showAllPokemon(recordsPerPage, currPage + 1);
		});


		$("#btn-prev").on("tap", function() {
			$("#btn-prev").text(currPage - 1);
			showAllPokemon(recordsPerPage, currPage - 1);
		});
		events_all_pokemon = true;
	}


});

$("#page_my_pokemon").on( "pageshow", function( event ) {
	showMyPokemon();
	hideLoader();
	$(".nav-my-pokemon").addClass("ui-btn-active");
	$(".nav-all-pokemon").removeClass("ui-btn-active");
});

$("#page_detail").on( "pageshow", function( event ) {
	if (detailIsLoading) {
		showLoader();
	}
});