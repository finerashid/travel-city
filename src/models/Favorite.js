const mongoose = require('./db');
require('./User')
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    itemType: {
      type: String,
      enum: ['Country', 'City', 'Place', 'Mosque', 'Restaurant', 'Hotel', 'TravelItinerary'],
      required: [true, 'Item type is required'],
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
