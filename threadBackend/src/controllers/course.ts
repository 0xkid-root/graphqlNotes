import {Course} from "../models/courseModel.js";

export const geAllCourses = async()=>{
    const courses = await Course?.find();
    console.log(courses);
    return courses;
}

export const getCourseById = async (parent:any,arg: { id: string }) => {
    const course = await Course.findById(arg?.id);
    return course;
}