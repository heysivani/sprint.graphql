const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema goes here.
  # The schema should model the full data object available!

  type weight {
    minimum: String
    maximum: String
  }

  type height {
    minimum: String
    maximum: String
  }

  type evolutionRequirements {
    amount: Int
    name: String
  }

  type evolutions {
    id: String
    name: String
  }

  type attackTypes {
    fast: [attack]
    special: [attack]
  }

  type attack {
    name: String
    type: String
    damage: Int
  }

  type Pokemon {
    id: String
    name: String!
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    weight: weight
    height: height
    fleeRate: Float
    previousEvolutions: [evolutions]
    evolutionRequirements: evolutionRequirements
    evolutions: [evolutions]
    maxCP: Int
    maxHP: Int
    attacks: attackTypes
  }
  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String!): Pokemon
  }
`;

module.exports = typeDefs;
