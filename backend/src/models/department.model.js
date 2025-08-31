import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: {
      type: String,       //Full forms of department
      required: true,
      trim: true,
      unique: true,
      maxlength: 80,
      index: true
    },

    code: {
      type: String,       // DS, ECE, ECM
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 10,
      unique: true,
      index: true
    },

    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    isActive: { 
    type: Boolean, 
    default: true 
    }
}, 
{ timestamps: true });

const Department= mongoose.model('Department', DepartmentSchema);

export default Department;