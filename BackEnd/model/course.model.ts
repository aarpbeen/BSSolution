import mongoose, {Document, Schema, Model} from "mongoose";
import { DocCommentTemplateOptions } from "typescript";
import { IUser } from "./user.model";

interface IThumbnail {
    public_id : string;
    url :string;
}

interface IComment extends Document {
    user:IUser;  // Ref to user model if needed
    question: string;
    questionReplies: IComment[];  // Nested comments (replies)
}

interface IReview extends Document {
    user: IUser;  // Ref to user model if needed
    rating: number;
    comment: string;
    reviewReply?: IComment[];  // Optional, for handling replies to reviews
}

interface ILink extends Document {
    title: string;
    url: string;
}


interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestion: string;
    questions: IComment[];  // Array of comments
}

interface ICourse extends Document {
    name: string;
    description: string;
    price: number;
    estimationPrice: number;
    thumbnail: IThumbnail;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: IReview[];  // Array of reviews
    courseData: ICourseData[];  // Array of course data
    ratings?: number;
    purchased?: number;
}

const CommentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to user model
    question: { type: String, required: true },
    questionReplies: [
        {
            user : {type:Schema.Types.ObjectId, ref:'User', required:true},
            answer : {type : String, required:true}
        }
    ]
});

const ReviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to user model
    rating: { type: Number, default: 0, max:5},
    comment: { type: String, required: true },
    reviewReply: [
        {
            user : {type:Schema.Types.ObjectId, ref:'User', required:true},
            answer : {type : String, required:true}
        }
    ]
});

const LinkSchema = new Schema<ILink>({
    title: { type: String, required: true },
    url: { type: String, required: true }
});

const CourseDataSchema = new Schema<ICourseData>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoThumbnail: { type: Object, required: true },
    videoSection: { type: String, required: true },
    videoLength: { type: Number, required: true },
    videoPlayer: { type: String, required: true },
    links: [LinkSchema],  // Array of links
    suggestion: { type: String, required: true },
    questions: [CommentSchema]  // Array of comments
});

const CourseSchema = new Schema<ICourse>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    estimationPrice: { type: Number },
    thumbnail: {
        public_id: { type: String},
        url: { type: String},
    },
    tags: { type: String, required: true },
    level: { type: String, required: true },
    demoUrl: { type: String },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [ReviewSchema],  // Array of reviews
    courseData: [CourseDataSchema],  // Array of course data
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    purchased: { type: Number, default: 0 },
}, { timestamps: true });

// Add indexes if necessary
CourseSchema.index({ name: 1, tags: 1, level: 1 });

const CourseModel: Model<ICourse> = mongoose.model("Course", CourseSchema);

export default CourseModel;


