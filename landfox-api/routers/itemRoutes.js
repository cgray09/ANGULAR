const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const uploads = require('../management/multer');
const { default: mongoose } = require('mongoose');

router.get('/', async (req,res)=>{
    const items = await Item.find().populate('category');

    if(!items){
        res.status(404).json({
            message:"No items found :/"
        })
    }

    res.status(200).json(items);
    
});

router.get('/:id', async (req,res)=>{
    const item = await Item.findById(req.params.id).populate('category');

    if(!item){
        res.status(404).json({
            message:"No Item was found :/"
        })
    }

    res.status(200).send(item);
})


router.post('/', uploads.single('image'),  async (req,res)=>{

    const category = await Category.findById(req.body.category);

    if(!category){
        return res.status(400).send('Invalid Category');
    }

    const file = req.file;

    if(!file){
        return res.status(400).send('No image in request :/')
    }

    const fileName = req.file.filename;
    const path = `${req.protocol}://${req.get('host')}/public/images/`
    
    let item = new Item({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       image:`${path}${fileName}`,
       category:req.body.category

    })

    item = await item.save()
    .then(()=>{
        res.status(201).json("Created successfully !")
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
            message:"Creation failed :/"
        })
    })
})

router.put('/:id', uploads.single('image'), async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Id');
    }

    const category = await Category.findById(req.body.category);

    if(!category){
        return res.status(400).send('Invalid Category Id')
    }

    const item = await Item.findById(req.params.id);

    if(!item){
        return res.status(400).send('Invalid item Id');
    }

    const file = req.file;
    let image;

    if(file){
        const fileName = file.filename;
        const path = `${req.protocol}://${req.get('host')}/public/images/`;
        image = `${path}${fileName}`
    }else{
        image = item.image;
    }


    const modifiedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:image,
            category:req.body.category  
        },
        {new:true}
    )

    if(!modifiedItem){
        return res.status(500).send('The item cannot be updated');
    }

    res.send(modifiedItem);
})

router.delete('/:id', async (req,res)=>{
   await  Item.findByIdAndRemove(req.params.id)
    .then((item)=>{
        if(item){
            return res.status(200).send(item);
        }
        else{
            return res.status(400).send("Item not found :/");
        }
    })
    .catch((err)=>{
        return res.status(500).json({
            success:false,
            error:err
        })
    })
})


module.exports = router;