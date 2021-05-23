import mongoose from 'mongoose';
import contentTypes from './contentTypes';

const { model, Schema } = mongoose;
const contentSchema = new Schema({
  contentKey: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  contentType: {
    type: Schema.Types.String, required: true, enum: Object.values(contentTypes),
  },
}, {
  discriminatorKey: 'contentType',
});

export default model('Content', contentSchema);
