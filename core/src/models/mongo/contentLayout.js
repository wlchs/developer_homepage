import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const contentLayoutSchema = new Schema({
  layoutKey: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  navContent: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
  pageContent: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
});

export default model('Layout', contentLayoutSchema);
