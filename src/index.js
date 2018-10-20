import {GraphQLServer} from 'graphql-yoga'

// Demo post data
const posts = [{
    id: '1',
    title: '1st book',
    body: 'This is the 1st book',
    published: true,
    user_id : '1',
    comment_id : '1'
}, {
    id: '2',
    title: '2nd book',
    body: '2nd book',
    published: false,
    user_id : '2',
    comment_id : '2'
}]


// Demo user data
const users = [{
        id: '1',
        name: 'Shubhankar',
        email: 'shborade@gmail.com',
        age: 21,
        post_id : '1',
        comment_id : '1'
    }, {    
        id: '2',
        name: 'Shubh',
        email : 'shumangborade@gmail.com',
        age : 21,
        post_id : '2',
        comment_id : '2'
    }
]

// Demo comment
const comments = [{
    id : '1',
    text : 'This looks great',
    user_id : '1',
    post_id : '1'
}, {
    id : '2',
    text : 'Comment is working',
    user_id : '2',
    post_id : '2'
}]

// Type Defination
const typeDefs = `
    type Query {
        posts(query: String) : [Post!]!
        users(query: String) : [User!]!
        comments(query : String) : [Comment!]!
    }

    type Post {
        id : ID!
        title : String!
        body : String!
        published : Boolean!
        users: User!
        comments : Comment!
    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int!
        posts : [Post!]!
        comments : [Comment!]!
    }

    type Comment {
        id : ID!
        text : String!
        users : User!
        posts : Post!

    }

`
// Resolvers
const resolvers = {
    Query: {
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },

        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
             return users.filter((user)=>{
                 const name = user.name.toLowerCase().includes(args.query.toLowerCase())
                 const email = user.email.toLowerCase().includes(args.query.toLowerCase())
                 return name || email
             })
        } ,

        comments(parent, args, ctx, info) {
            if(!args.query) {
                return comments
            }

            return comments.filter((comment) =>{
                const text = comment.text.toLowerCase().includes(args.query.toLowerCase())
                return text
            })
        }
    },
    Post : {
        users(parent, args, ctx, info) {
            return users.find((user)=>{
                return user.id === parent.user_id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.find((comment)=>{
                return comment.post_id === parent.comment_id
            })
        }
    },

    User : {
        posts(parent, args, ctx, info) {
            return posts.filter((post)=>{
                return post.user_id === parent.post_id
            })
        },

        comments(parent, args, ctx, info) {
            return comments.filter((comment)=>{
                return comment.user_id === parent.comment_id
            })
        }
    },
    
    Comment : {
        users(parent, args, ctx, info) {
            return users.find((user)=>{
                return user.comment_id === parent.user_id
            })
        },

        posts(parent, args, ctx, info) {
            return posts.find((post)=>{
                return post.comment_id === parent.post_id
            })
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