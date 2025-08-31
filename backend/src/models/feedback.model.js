import mongoose from "mongoose";

// const ResponseSubSchema = new mongoose.Schema({
//     questionId: { 
//         type: String, 
//         required: true 
//     },   // e.g. "q1", or question code
  
//     rating: { 
//         type: Number, 
//         required: true, 
//         min: 1, 
//         max: 5 
//     }
// }, 
// { _id: false });

const FeedbackSchema = new mongoose.Schema({
  
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
        index: true
    },

    batch: { 
        type: String, 
        required: true, 
        index: true 
    },  // "2022-2026"

    year: { 
        type: Number, 
        required: true, 
        min: 1, 
        max:6,
        index: true 
    },
    
    section: { 
        type: String, 
        required: true, 
        trim: true, 
        index: true 
    },

    semister: { 
        type: Number, 
        default: 1, 
        min: 1 
    },

    subject: { 
        type: String, 
        required: true, 
        trim: true, 
        index: true 
    }, // course code

    // responses: {
    //     type: [ResponseSubSchema],
    //     validate: {
    //     validator: function(arr) { return Array.isArray(arr) && arr.length > 0; },
    //     message: 'responses must be a non-empty array'
    //     }
    // },

    q1: { type: Number, min: 1, max: 5, required: true },
    q2: { type: Number, min: 1, max: 5, required: true },
    q3: { type: Number, min: 1, max: 5, required: true },
    q4: { type: Number, min: 1, max: 5, required: true },
    q5: { type: Number, min: 1, max: 5, required: true },

    avg_score: {
        type: Number,
        min: 1,
        max: 5,
        index: true
    },

    comments: { 
        type: String, 
        maxlength: 2000 
    },

   
}, { timestamps: true });



const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;
