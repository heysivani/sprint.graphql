// The data below is mocked.
const data = require("./data");

module.exports = {
  Query: {
    Pokemons: () => {
      return data.pokemon;
    },
    Pokemon: (parent, args) => {
      console.log(args.input.name);
      if (args.input.id) {
        return data.pokemon.find((pokemon) => pokemon.id === args.input.id);
      }
      return data.pokemon.find((pokemon) => pokemon.name === args.input.name);
    },
    Type: (parent, args) => {
      console.log(args);
      return data.pokemon.filter((pokemon) =>
        pokemon.types.includes(args.name)
      );
    },
    Attack: (parent, args) => {
      return data.pokemon.filter((pokemon) => {
        for (let key in pokemon.attacks) {
          for (let element of pokemon.attacks[key]) {
            if (element.name === args.name) {
              return true;
            }
            return false;
          }
        }
      });
    },
  },
  Mutation: {
    AddPokemon: (parent, args) => {
      data.pokemon.push(args.input.name);
      console.log(data.pokemon.length);
      console.log("pokemon added");
    },
    DeletePokemon: (parent, args) => {
      for (let i = 0; i < data.pokemon.length; i++) {
        console.log(data.pokemon[i].name);
        if (
          data.pokemon[i].name.toLowerCase() === args.input.name.toLowerCase()
        ) {
          data.pokemon.splice(i, 1);
          console.log("Pokemon deleted");
          return;
        }
      }
    },
    ModifyPokemon: (parent, args) => {
      for (let i = 0; i < data.pokemon.length; i++) {
        if (args.input.newName) {
          if (
            data.pokemon[i].name.toLowerCase() === args.input.name.toLowerCase()
          ) {
            data.pokemon[i].name = args.input.newName;
            if (args.input.newId) data.pokemon[i].id = args.input.newId;
            console.log("Pokemon modified");
            console.log(data.pokemon[data.pokemon.length - 1]);
          }
        }
      }
    },
  },
};
