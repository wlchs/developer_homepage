import mongoose from 'mongoose';
import ContentModel from './content';
import CONTENT_TYPE from './contentTypes';

const { Schema } = mongoose;

export const NavTextContentModel = ContentModel.discriminator(
  CONTENT_TYPE.NAV_CONTENT_TEXT,
  new Schema({ text: { type: Schema.Types.String, required: true } }),
);

export const NavLinkContentModel = ContentModel.discriminator(
  CONTENT_TYPE.NAV_CONTENT_LINK,
  new Schema({
    text: { type: Schema.Types.String, required: true },
    url: { type: Schema.Types.String, required: true },
  }),
);
