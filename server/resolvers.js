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
  },
};
