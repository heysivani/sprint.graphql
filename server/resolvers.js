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
    AddType: (parent, args) => {
      if (!data.types.includes(args.input.name)) {
        data.types.push(args.input.name);
        console.log(data.types);
        console.log("type added");
      }
    },
    DeleteType: (parent, args) => {
      for (let i = 0; i < data.types.length; i++) {
        if (data.types[i] === args.input.name) {
          data.types.splice(i, 1);
          console.log("type deleted");
          console.log(data.types);
        }
      }
    },
    ModifyType: (parent, args) => {
      if (args.input.newType) {
        for (let i = 0; i < data.types.length; i++) {
          if (data.types[i] === args.input.name) {
            data.types[i] = args.input.newType;
            console.log("type changed");
            console.log(data.types);
          }
        }
      }
    },
    AddAttack: (parent, args) => {
      for (let key in data.attacks) {
        if (key === args.input.name) {
          data.attacks[key].push({ name: args.input.newAttack });
          console.log("Attack added");
          console.log(data.attacks[key]);
        }
      }
    },
    DeleteAttack: (parent, args) => {
      for (let key in data.attacks) {
        for (let i = 0; i < data.attacks.length; i++) {
          if (data.attacks[i] === args.input.name) {
            data.attacks.splice(i, 1);
            console.log("attack deleted");
            console.log(data.attacks);
          }
        }
      }
    },
    ModifyAttack: (parent, args) => {
      if (args.input.newAttack) {
        for (let key in data.attacks) {
          for (let i = 0; i < data.attacks.length; i++) {
            if (data.attacks[i] === args.input.name) {
              data.attacks[i] = args.input.newAttack;
              console.log("attack changed");
              console.log(data.attacks);
            }
          }
        }
      }
    },
  },
};
