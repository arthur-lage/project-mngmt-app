const ClientModel = require("../models/Client");
const ProjectModel = require("../models/Project");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      async resolve(parent, args) {
        return await ClientModel.find();
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return ClientModel.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      async resolve(parent, args) {
        return await ProjectModel.find();
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return ProjectModel.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parents, args) {
        const client = new ClientModel({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
