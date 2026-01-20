import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

let books=[
    {
        bookName:"Wings of Fire",
        bookAuthor:"A P J Abdul Kalam",
        bookPages:180,
        bookPrice:260,
        bookState:"Available"
    },
    {
        bookName:"Gitanjali",
        bookAuthor:"Rabindranath Tagore",
        bookPages:124,
        bookPrice:113,
        bookState:"Available"
    }
];

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home",{data:books});
});

app.post("/",(req,res)=>{
    const newBook={
        bookName:req.body.bookName,
        bookAuthor:req.body.bookAuthor,
        bookPages:req.body.bookPages,
        bookPrice:req.body.bookPrice,
        bookState:"Available"
    };

    books.push(newBook);
    res.render("home",{data:books});
});

app.post("/issue",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books.forEach(book=>{
        if(book.bookName===requestedBookName){
            book.bookState="Issued";
        }
    });
    res.render("home",{data:books});
});

app.post("/return",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books.forEach(book=>{
        if(book.bookName===requestedBookName){
            book.bookState="Available";
        }
    });
    res.render("home",{data:books});
});

app.post("/delete",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books=books.filter(book=>book.bookName!==requestedBookName);
    res.render("home",{data:books});
});

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});