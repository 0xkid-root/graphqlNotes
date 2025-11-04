export const graphSchema = `#graphql

type User{
    _id:ID!
    name:String!
    email:String!
    password:String!
    googleId:String!
    role:String!
    avatar:String!
    verified:Boolean!
    createdAt:String!
    updatedAt:String!
}

type Course{
    _id:ID!
    title:String!
    description:String!
    instructor:String!
    ratingAverage:Int!
    ratingQuantity:Int!
    price:Int!
    category:String!
    subCategory:String!
    level:String!
    language:String!
    wahtYouWillLearn:[String!]!
    requirements:[String!]
    targetAudience:[String!]
    isPublished:Boolean!
    isFree:String!
    isApproved:Boolean!
    isRejected:Boolean!
    isFeatured:Boolean!
    istrending:Boolean!
    isBestseller:Boolean!
    coverImage:String!
    previewVideo:String!
    students:[String!]!
    createdAt:String!
    updatedAt:String!
}

type Section {
    _id: ID!
    title: String!
    description: String
    position: Int!
    course: Course!
    lectures: [Lecture!]
    isPublished: Boolean!
    createdAt: String!
    updatedAt: String!
}

type VideoUrl {
    url: String!
    provider: String!
    providerVideoId: String!
    thumbnailUrl: String
    duration: Int
}
type Resouce{
    title:String
    url:String
    _id:ID
}

type Lecture {
    _id:ID!
    title:String!
    description:String!
    position:Int!
    resources:[Resouce]
    videoUrl: VideoUrl
    duration:Int!
    section:Section!
    course:Course!
    instructor:User!
    isPublished:Boolean!
    isPreview:Boolean!
    createdAt:String!
    updatedAt:String!
}



type Query{
hello:String
say(name:String):String
users:[User]
courses:[Course]
course(id:ID!):Course
# sections:[Section]
# lectures:[Lecture]
}
`