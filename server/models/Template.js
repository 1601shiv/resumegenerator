import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  layoutType: { type: String, required: true }, // single, double-left, double-right, grid
  headerStyle: { type: String, required: true }, // centered, split, block, banner, sidebar
  fontPairing: { type: String, required: true }, // sans, serif, mono, display
  defaultColor: { type: String, required: true }, // HSL string
  borderStyle: { type: String, required: true }, // none, solid, double, dotted
  description: { type: String, default: '' },
  isPreset: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false }
});

export default mongoose.model('Template', TemplateSchema);
