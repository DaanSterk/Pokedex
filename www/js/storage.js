var storage = {

    store: localStorage,

    getMyPokemon: function() {
        var pokemonArray = new Array();
        var i = 0;
        for (var item in localStorage) {
            var parsedItem = JSON.parse(this.store.getItem(item));
            if (parsedItem.id != undefined) {
                pokemonArray[i] = parsedItem;
                i++;
            }
        }
        return pokemonArray;
    },

    saveMyPokemon: function(pokemon) {
        this.store.setItem(pokemon.id, JSON.stringify(pokemon));
    }

}