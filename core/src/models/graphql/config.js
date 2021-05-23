import {
  GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';
import bcrypt from 'bcrypt';
import ConfigModel from '../mongo/config';

const ConfigType = new GraphQLObjectType({
  name: 'Config',
  description: 'Data type for server configuration',
  fields: {
    adminUserName: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Admin email address',
    },
    adminPassword: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Admin password hash',
    },
  },
});

export const configQuery = {
  adminData: {
    type: GraphQLNonNull(ConfigType),
    description: 'Admin email address and password hash',
    resolve: async () => ConfigModel.findOne(),
  },
  coreVersion: {
    type: GraphQLNonNull(GraphQLString),
    description: 'core.laszloborbely.com package version number',
    resolve: () => process.env.npm_package_version,
  },
};

export const configMutation = {
  modifyUserName: {
    type: ConfigType,
    description: 'Modify admin email',
    args: {
      adminUserName: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const config = await ConfigModel.findOne();
      config.adminUserName = args.adminUserName;
      try {
        return config.save();
      } catch (err) {
        return err;
      }
    },
  },
  modifyPassword: {
    type: ConfigType,
    description: 'Modify admin password',
    args: {
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const config = await ConfigModel.findOne();
      config.adminPassword = bcrypt.hashSync(args.password, 10);
      try {
        return config.save();
      } catch (err) {
        return err;
      }
    },
  },
};
