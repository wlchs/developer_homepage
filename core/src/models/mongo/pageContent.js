import mongoose from 'mongoose';
import ContentModel from './content';

const { Schema } = mongoose;

export const PageTextContentModel = ContentModel.discriminator('PAGE_CONTENT_TEXT', new Schema({
  text: { type: Schema.Types.String, required: true },
  size: { type: Schema.Types.Number },
  font: { type: Schema.Types.String },
  color: { type: Schema.Types.String },
}));

export const PageButtonLinkContentModel = ContentModel.discriminator('PAGE_CONTENT_LINK_BUTTON', new Schema({
  text: { type: Schema.Types.String, required: true },
  url: { type: Schema.Types.String, required: true },
  size: { type: Schema.Types.Number },
  font: { type: Schema.Types.String },
  color: { type: Schema.Types.String },
}));

export const PageImageContentModel = ContentModel.discriminator('PAGE_CONTENT_IMAGE', new Schema({
  url: { type: Schema.Types.String, required: true },
  width: { type: Schema.Types.Number },
  height: { type: Schema.Types.Number },
}));
