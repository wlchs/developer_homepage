import mongoose from 'mongoose';
import ContentModel from './content';

const { Schema } = mongoose;

export const NavTextContentModel = ContentModel.discriminator('NAV_CONTENT_TEXT', new Schema({
  text: { type: Schema.Types.String, required: true },
}));

export const NavLinkContentModel = ContentModel.discriminator('NAV_CONTENT_LINK', new Schema({
  text: { type: Schema.Types.String, required: true },
  url: { type: Schema.Types.String, required: true },
}));
