import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLEnumType,
} from 'graphql';
import {
  navContentJointQueryResolver,
  navLinkContentQueryResolver,
  navTextContentQueryResolver,
  createOrUpdateNavContentResolver,
  deleteNavContentResolver,
  mapNavContentTypesToEnum,
} from './resolvers';

const NavContentTypeEnum = new GraphQLEnumType({
  name: 'NavContentTypeEnum',
  description: 'Navigation bar content type enum',
  values: mapNavContentTypesToEnum(),
});

const NavContentInterfaceType = new GraphQLInterfaceType({
  name: 'NavContent',
  description: 'Interface type for navigation bar content',
  fields: {
    contentKey: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique content key',
    },
    contentType: {
      type: GraphQLNonNull(NavContentTypeEnum),
      description: 'Content type identifier',
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Content text',
    },
  },
});

const NavTextContentType = new GraphQLObjectType({
  name: 'NavTextContent',
  description: 'Data type for simple text component on the navigation bar',
  interfaces: [NavContentInterfaceType],
  fields: () => ({
    contentKey: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique content key',
    },
    contentType: {
      type: GraphQLNonNull(NavContentTypeEnum),
      description: 'Content type identifier',
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Content text',
    },
  }),
  isTypeOf: (obj) => obj.contentType === 'NAV_CONTENT_TEXT',
});

const NavLinkContentType = new GraphQLObjectType({
  name: 'NavLinkContent',
  description: 'Data type for simple link component on the navigation bar',
  interfaces: [NavContentInterfaceType],
  fields: {
    contentKey: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Unique content key',
    },
    contentType: {
      type: GraphQLNonNull(NavContentTypeEnum),
      description: 'Content type identifier',
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Content text',
    },
    url: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Link URL',
    },
  },
  isTypeOf: (obj) => obj.contentType === 'NAV_CONTENT_LINK',
});

export const navContentQuery = {
  navLinkContent: {
    type: GraphQLList(NavLinkContentType),
    description: 'Navigation bar links',
    resolve: navLinkContentQueryResolver,
  },
  navTextContent: {
    type: GraphQLList(NavTextContentType),
    description: 'Navigation bar text components',
    resolve: navTextContentQueryResolver,
  },
  navContent: {
    type: GraphQLList(NavContentInterfaceType),
    description: 'Navigation bar content',
    resolve: navContentJointQueryResolver,
  },
};

export const navContentMutation = {
  createOrUpdateNavContent: {
    type: GraphQLNonNull(NavContentInterfaceType),
    description: 'Create or update navigation bar content',
    args: {
      contentKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique content key',
      },
      text: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Content text',
      },
      url: {
        type: GraphQLString,
        description: 'Link URL',
      },
    },
    resolve: createOrUpdateNavContentResolver,
  },
  deleteNavContent: {
    type: NavContentInterfaceType,
    description: 'Delete navigation bar content',
    args: {
      contentKey: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Unique content key',
      },
    },
    resolve: deleteNavContentResolver,
  },
};
