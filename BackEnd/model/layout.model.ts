import mongoose, { Schema, Document } from 'mongoose';

// TypeScript Interfaces
export interface FaqItem {
  question: string;
  answer: string;
}

export interface Category {
  title: string;
}

export interface BannerImage {
    image : {
        public_id: string;
        url: string;
    } 
  title: string;
  subTitle: string;
}

export interface Layout {
  type?: string; // Optional 'type' field
  faq: FaqItem[];
  categories: Category[];
  banner: BannerImage;
}

// Mongoose Schemas

// FaqItem schema
const FaqItemSchema: Schema<FaqItem> = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Category schema
const CategorySchema: Schema<Category> = new Schema({
  title: { type: String, required: true }
});

const BannerImageSchema: Schema<BannerImage> = new Schema({
    // image: {
    //   public_id: { type: String, required: true },
    //   url: { type: String, required: true }
    // },
    title: { type: String, required: true },
    subTitle: { type: String, required: true }
  });

// Layout schema that embeds the other schemas
const LayoutSchema: Schema<Document & Layout> = new Schema({
  type: { type: String },  // Optional 'type' field added here
  faq: [FaqItemSchema],
  categories: [CategorySchema],
  banner: { type: BannerImageSchema}
});

// Mongoose model for Layout
export const LayoutModel = mongoose.model<Document & Layout>('Layout', LayoutSchema);
