import {
  GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from 'graphql';
import ProjectModel from '../mongo/project';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'Data type for own projects and contributions',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project name',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project description',
    },
    imageLink: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Project image link',
    },
    pageLink: {
      type: GraphQLString,
      description: 'Link to project website if available',
    },
  },
});

export const projectQuery = {
  projects: {
    type: GraphQLList(ProjectType),
    description: 'Own projects and contributions',
    resolve: async () => ProjectModel.find(),
  },
};

export const projectMutation = {
  addProject: {
    type: ProjectType,
    description: 'Add new project or contribution',
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project name',
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project description',
      },
      imageLink: {
        type: GraphQLNonNull(GraphQLString),
        description: 'Project image link',
      },
      pageLink: {
        type: GraphQLString,
        description: 'Link to project website if available',
      },
    },
    resolve: async (_, args) => {
      const project = new ProjectModel();
      project.name = args.name;
      project.description = args.description;
      project.imageLink = args.imageLink;
      project.pageLink = args.pageLink;
      return project.save();
    },
  },
};
