const express=require('express')
const mongoose=require('mongoose')
const Product=require('./models/product.model.js');
const app=express()
//middleware
app.use(express.json());
//app.use(express.urlencoded({encoded:false}));
//routes
//app.use("/api/products",productRoute);





app.listen(3000,()=>{
    console.log('server running');
});
app.get('/',(req,res)=>{
res.send("hello from node api");
});

app.get('/api/products',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message});
    }

});

app.get('/api/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }

});





app.post('/api/products',async (req,res)=>{
    //console.log(req.body);
    //res.send(req.body);
    try{
        const product=await Product.create(req.body);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
);

mongoose.connect("mongodb+srv://admin:admin@cluster0.hsz9q8e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('connected to db');
})
.catch(()=>{
    console.log('connection failed');
})


//update a product

app.put('/api/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: "product not found"});
        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);


    }catch(error){
        res.status(500).json({message:error.message});
    }

});
//delete a product
app.delete('/api/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product deleted successfully"});

    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})