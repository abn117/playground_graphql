const { ApolloServer } = require('apollo-server');
const courses = require('./includes/courses');

const typeDefs = `
    enum Categories {
        WEB
        DEV
        OTH
    }

    type Courses {
        id: Int
        name: String
        description: String
        price: Int
        category: Categories!
    }

    input CoursesInput {
        name: String!
        description: String!
        image: String!
        price: String!
        category: Categories=WEB
    }

    type Query {
        hello: String!
        courses: [Courses]!
        getCourse(id: ID!): Courses
        totalcourses: Int!
    }

    type Mutation {
        postCourse(input: CoursesInput!): Courses!
    }
`
var _id = 3;

const resolvers = {
    Query: {
        hello: () => "Hello! the API works",
        totalcourses: () => courses.courses.length,
        courses: () => courses.courses,
        getCourse: (parent, args) => courses.courses[args["id"] - 1]
    },
    Mutation: {
        postCourse(parent, args) {
            var incrementId = {
                id: _id++,
                ...args.input
            }
            courses.courses.push(incrementId)
            return incrementId;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
.listen()
.then(({url}) => console.log(`API running on ${url}`));