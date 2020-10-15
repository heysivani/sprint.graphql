// The data below is mocked.
const data = require("./data");

module.exports = {
  Query: {
    Pokemons: () => {
      return data.pokemon;
    },
    Pokemon: (parent, args) => {
      if (args.input.id) {
        return data.pokemon.find((pokemon) => pokemon.id === args.input.id);
      }
      return data.pokemon.find((pokemon) => pokemon.name === args.input.name);
    },
    Type: (parent, args) => {
      return data.pokemon.filter((pokemon) =>
        pokemon.types.includes(args.input.name)
      );
    },
    Attack: (parent, args) => {
      return data.pokemon.filter((pokemon) => {
        for (let key in pokemon.attacks) {
          for (let element of pokemon.attacks[key]) {
            if (element.name === args.input.name) {
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
      data.pokemon.push({ name: args.input.name });
      return `${args.input.name} added`;
    },
    DeletePokemon: (parent, args) => {
      for (let i = 0; i < data.pokemon.length; i++) {
        if (
          data.pokemon[i].name.toLowerCase() === args.input.name.toLowerCase()
        ) {
          data.pokemon.splice(i, 1);
          return `${args.input.name} deleted`;
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
            return data.pokemon[i];
          }
        }
      }
    },
    AddType: (parent, args) => {
      if (!data.types.includes(args.input.name)) {
        data.types.push(args.input.name);
        return `${args.input.name} added to types`;
      }
    },
    DeleteType: (parent, args) => {
      for (let i = 0; i < data.types.length; i++) {
        if (data.types[i] === args.input.name) {
          data.types.splice(i, 1);
          return `${args.input.name} deleted from types`;
        }
      }
    },
    ModifyType: (parent, args) => {
      if (args.input.newName) {
        for (let i = 0; i < data.types.length; i++) {
          if (data.types[i] === args.input.name) {
            data.types[i] = args.input.newName;
            return "Type modified";
          }
        }
      }
    },
    AddAttack: (parent, args) => {
      for (let key in data.attacks) {
        if (key === args.input.attackType) {
          data.attacks[key].push({
            name: args.input.name,
            type: args.input.type,
            damage: args.input.damage,
          });
          return `${args.input.name} added`;
        }
      }
    },
    DeleteAttack: (parent, args) => {
      for (let key in data.attacks) {
        for (let i = 0; i < data.attacks[key].length; i++) {
          if (
            data.attacks[key][i].name.toLowerCase() ===
            args.input.name.toLowerCase()
          ) {
            data.attacks[key].splice(i, 1);
            return `${args.input.name} deleted`;
          }
        }
      }
    },
    ModifyAttack: (parent, args) => {
      for (let key in data.attacks) {
        for (let i = 0; i < data.attacks[key].length; i++) {
          if (data.attacks[key][i].name === args.input.name) {
            if (args.input.newName) {
              data.attacks[key][i].name = args.input.newName;
            }
            if (args.input.type) {
              data.attacks[key][i].type = args.input.type;
            }
            if (args.input.damage) {
              data.attacks[key][i].damage = args.input.damage;
            }
            return `${args.input.name} modified`;
          }
        }
      }
    },
  },
};
