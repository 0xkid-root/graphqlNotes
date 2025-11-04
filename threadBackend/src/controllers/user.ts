import { User } from "../models/userModel.js";

export const getAllUsers = async () => {
  const users = await User?.find();
  console.log(users);
  return users;
};


export const getUserById = async(id:string)=>{
    const user = await User.findById(id);
    return user;
}
