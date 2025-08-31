import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:true, 
            trim:true,
        },

        email:{
            type:String,
            required:true, 
            unique:true,
            lowercase:true,
            trim:true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email']
        }, 

        password:{
            type:String,
            required:true,
            trim:true,
            minlength:6,
            maxlength:25,
        },
        
        role:{
            type:String, 
            lowercase:true,
            enum:['student','faculty','hod','dean'], 
            required:true
        },
  
        departmentId:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Department',
            required: function(){ 
                        return this.role !== 'dean';
                    } 
        },

        year: {
            type: Number,
            min: 1,
            max: 6,
            required:checkStudent,//if ncessary
        },

        section: {
            type: String,
            trim: true,
            required: checkStudent,//if ncessary
        },

        subjects: [
            {
                type: String,
                trim: true,
            },
        ], 
        
        designation:{
            type: String,
            trim: true
        }
    },
    { timestamps:true }
);

//Student role based access for year and section
function checkStudent(){
    return this.role==="student" ;
}

//Hashing the password before storing in the database
userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")) return next();

    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        console.log("Error at users password pre hook process: ", error)
        next(error);
    }
});

//Matching the password for authentication
userSchema.methods.matchPassword =async function(enteredPassword){
    const isPasswordCorrect=await bcrypt.compare(enteredPassword,this.password)
    return isPasswordCorrect;
}

const User=mongoose.model("User",UserSchema);
export default User;