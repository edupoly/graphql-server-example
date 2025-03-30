import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

var books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
      id:"1"
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
      id:"2"
    },
    {
      title: 'Parts of Life',
      author: 'Praveen',
      id:"3"
    },
    {
      title: 'Tomorrow Never Dies',
      author: 'Srikanth',
      id:"4"
    }
];

const typeDefs = `
    type Book {
        title: String
        author: String
        id:ID
    }
    
    type Query {
        getAllBooks: [Book]
        getBookById(id:ID!):Book
    }
    type Mutation {
        createBook(title:String!,author:String):Book
        deleteBook(id:ID!):Book
        updateBook(title:String!,author:String,id:ID!):Book
    }
`;

const resolvers = {
    Query: {
      getAllBooks: () => books,
      getBookById(parent, args, contextValue, info){
        return books.find(book=>{
            console.log(args);
            return book.id===args.id
        })
      }
    },
    Mutation:{
        updateBook:(_,args)=>{
            var updatedBooks = books.map((book)=>{
                if(book.id===args.id){
                    return args
                }
                return book
            })
            books=updatedBooks
            return args
        },
        createBook:(_,args)=>{
            console.log("ikkadiki vachinda");
            var newBook = {
                title:args.title,
                author:args.author,
                id:(books[books.length-1].id)+1
            }
            books.push(newBook)
            return newBook
        },
        deleteBook:(_,args)=>{
            console.log("inda",args.id);
            var x;
            books.some((book,i)=>{
                if(book.id===args.id){
                    x = books.splice(i,1)
                    console.log("Endi ra idi",x);
                    return true
                }
            })
            console.log(x);
            console.log(books);
            return x
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// updateBook(id:ID!,title:String,author:String):Book