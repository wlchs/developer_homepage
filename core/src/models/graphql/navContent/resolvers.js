import { NavTextContentModel, NavLinkContentModel } from '../../mongo/navContent';
import { NAV_CONTENT_TYPES } from '../../mongo/contentTypes';
import ContentModel from '../../mongo/content';

export function mapNavContentTypesToEnum() {
  return Object.fromEntries(Object.entries(NAV_CONTENT_TYPES)
    .map(([key, value]) => [key, { value }]));
}

export async function navLinkContentQueryResolver() {
  return NavLinkContentModel.find();
}

export async function navTextContentQueryResolver() {
  return NavTextContentModel.find();
}

export async function navContentJointQueryResolver() {
  const jointQuery = await Promise.all([NavTextContentModel.find(), NavLinkContentModel.find()]);
  return jointQuery.flat(1);
}

async function createNavContent(args, id) {
  let navContent;

  if (args.url) {
    navContent = new NavLinkContentModel();
    navContent.url = args.url;
  } else {
    navContent = new NavTextContentModel();
  }

  navContent.contentKey = args.contentKey;
  navContent.text = args.text;

  if (id) {
    navContent._id = id;
  }

  return navContent.save();
}

export async function createOrUpdateNavContentResolver(_, args) {
  const content = await ContentModel.findOne({ contentKey: args.contentKey }).exec();

  if (!content) {
    return createNavContent(args);
  }

  if ((!content.url && args.url) || (content.url && !args.url)) {
    const id = content._id;
    await ContentModel.findByIdAndDelete(id);
    return createNavContent(args, id);
  }

  content.url = args.url;
  content.text = args.text;

  return content.save();
}

export async function deleteNavContentResolver(_, args) {
  return ContentModel.findOneAndDelete({ contentKey: args.contentKey });
}
