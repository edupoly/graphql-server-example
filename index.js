import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Payment {
        "username":String,
        "amount":Int,
        "timestamp":String,
        "modeofPayment":String,
        "transactionID":String
    }

    type Query {
        getAllPayments: [Payment]
        getPaymentById(id:ID!):[Payment]
    }

    type Mutation {
        makePayment(username:String,amount:Int,timestamp:String,modeofPayment:String,transactionID:String):Payment
        deletePayment(id:ID!):Payment
    }
`;

const resolvers = {
    Query: {
      kithab: () => books,
      getBookById(parent, args, contextValue, info){
        return books.find(book=>{
            console.log(args);
            return book.id===args.id
        })
      }
    },
    Mutation:{
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