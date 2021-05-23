import mongoose from 'mongoose';
import ContentModel from './content';
import CONTENT_TYPE from './contentTypes';

const { Schema } = mongoose;

export const PageTextContentModel = ContentModel.discriminator(
  CONTENT_TYPE.PAGE_CONTENT_TEXT,
  new Schema({
    text: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.Number },
    font: { type: Schema.Types.String },
    color: { type: Schema.Types.String },
  }),
);

export const PageButtonLinkContentModel = ContentModel.discriminator(
  CONTENT_TYPE.PAGE_CONTENT_LINK_BUTTON,
  new Schema({
    text: { type: Schema.Types.String, required: true },
    url: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.Number },
    font: { type: Schema.Types.String },
    color: { type: Schema.Types.String },
  }),
);

export const PageImageContentModel = ContentModel.discriminator(
  CONTENT_TYPE.PAGE_CONTENT_IMAGE,
  new Schema({
    url: { type: Schema.Types.String, required: true },
    width: { type: Schema.Types.Number },
    height: { type: Schema.Types.Number },
  }),
);

export const PageCardContentModel = ContentModel.discriminator(
  CONTENT_TYPE.PAGE_CONTENT_CARD,
  new Schema({
    imageUrl: { type: Schema.Types.String, required: true },
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
  }),
);