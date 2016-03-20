var storage = {

    store: localStorage,

    getMyPokemon: function() {
        var pokemonArray = new Array();
        var i = 0;
        for (var pokemonId in localStorage) {
            pokemonArray[i] = JSON.parse(this.store.getItem(pokemonId));
            i++;
        }
        return pokemonArray;
    },

    saveMyPokemon: function(pokemon) {
        this.store.setItem(pokemon.id, JSON.stringify(pokemon));
    }

}