import {
    GraphQLServer
} from 'graphql-yoga'

<<<<<<< HEAD
// Demo post data
const posts = [{
    id : 1,
    title : '1st book',
    body : 'This is the 1st book',
    published : true
}, {
    id : 2,
    title : '2nd book',
    body : '2nd book',
    published : false
}]


// Type Defination
const typeDefs = `
    type Query {
        posts(query: String) : [Post!]!
        hello : String!
=======
// Type Definations (Scheme)
const typeDefs = `
    type Query {
        me : User!
    }

    type User {
        id : ID!
>>>>>>> c8f27a9b1b866c8a13a485645e8c2a53019742d5
        name : String!
        email : String!
        age : Int
    }

    type Post {
        id : ID!
        title : String!
        body : String!
        published : Boolean!
        author : User!
    }

`
// Resolvers
const resolvers = {
<<<<<<< HEAD
    Query : {
        hello() {
            return 'This is my first query!'
        },
        
        posts(parent, args, ctx, info){
            if(!args.query) {
                return posts
            }

            return posts.filter((post)=>{
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch 
            })
        },

        name() {
            return 'Shubhankar Borade'
        },
        location() {
            return 'Mumbai'
        },
        bio () {
            return 'Software Engineer'
=======
    Query: {
        me () {
            return {
                id : '34896',
                name : 'Shubh',
                email : 'shborade@gmail.com',
                age : 21
            }
>>>>>>> c8f27a9b1b866c8a13a485645e8c2a53019742d5
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server has started');

})