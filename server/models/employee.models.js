import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  designation:{
    type:String,
    required:true,
  },
  gender:{
    type:String,
    required:true
  },
  course:{
    type:String,
    required:true
  },
  imgUpload:{
        type:String,
        
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

export const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;