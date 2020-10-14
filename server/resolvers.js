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
};
