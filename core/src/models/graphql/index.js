import { GraphQLObjectType } from 'graphql';
import { projectMutation, projectQuery } from './project';
import { configMutation, configQuery } from './config';
import { navContentMutation, navContentQuery } from './navContent';

export const GuestQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Guest query type',
  fields: {
    ...projectQuery,
    ...navContentQuery,
  },
});

export const AdminQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Admin query type',
  fields: {
    ...projectQuery,
    ...configQuery,
    ...navContentQuery,
  },
});

export const AdminMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Admin mutation type',
  fields: {
    ...configMutation,
    ...projectMutation,
    ...navContentMutation,
  },
});
