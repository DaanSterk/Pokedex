var storage = {

    store: localStorage,

    getMyPokemon: function() {
        var pokemonArray = new Array();
        var i = 0;
        for (var item in localStorage) {
            var parsedItem = JSON.parse(this.store.getItem(item));
            if (parsedItem.name != undefined) {
                pokemonArray[i] = parsedItem;
                i++;
            }
        }
        return pokemonArray;
    },

    saveMyPokemon: function(pokemon) {
        this.store.setItem(pokemon.name, JSON.stringify(pokemon));
    },

    ownThisPokemon: function(pokemon) {
        var myPokemon = this.getMyPokemon();

        for (var i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].name == pokemon.name) {
                return true;
            }
        }

        return false;
    },

    dummySave: function(pokemon) {
        this.saveMyPokemon(
            {
                id: 0,
                name: 'Weezing',
                abilities: ['jump', 'attack'],
                sprite: 'test.png'
            }
        );
        this.saveMyPokemon(
            {
                id: 1,
                name: 'Pikachu',
                abilities: ['jump', 'attack'],
                sprite: 'test2.png'
            }
        );
    }

}