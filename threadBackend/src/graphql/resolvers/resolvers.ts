import { getAllUsers, getUserById } from "../../controllers/user.js";
import { geAllCourses, getCourseById } from "../../controllers/course.js";


export const graphQLResolver =  {
      Query: {
        hello: () => "Hey there, I am a GraphQL server",
        say: (_: any, { name }: { name: string }) =>
          `Hello ${name}, how are you?`,
        users:getAllUsers,
        courses:geAllCourses,
        course:getCourseById,

      },
      Course:{
        instructor:async (parent:any)=>{
          return await getUserById(parent.instructor);

        }
      }
    }