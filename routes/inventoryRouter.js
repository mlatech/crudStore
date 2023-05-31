const express = require("express");
const inventory = require("../models/inventory");
const inventoryRouter = express.Router();
const Inventory = require("../models/inventory.js")

//get all
inventoryRouter.get("/", (req, res, next) =>{
    Inventory.find((err, items)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

//get one 
inventoryRouter.get("/:itemId", (req, res, next) => {
    const itemId = req.params.itemId;
    Inventory.findById(itemId, (err, foundItem) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        if (!foundItem) {
            const error = new Error("The item was not found");
            res.status(404);
            return next(error);
        }
        res.status(200).send(foundItem);
    });
});


//post an item 
inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory)=>{
     if(err){
         res.status(500)
         return next(err)
     }
     return res.status(201).send(savedInventory)
    })
 })

 //put (edit)
 inventoryRouter.put("/:itemId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.itemId},
        req.body,
        {new: true},
        (err, updatedInventory) => {
            if (err) {
                res.status(500);
                return next(err);
                }
                return res.status(201).send(updatedInventory)
            }
    )
 })

 //delete
 inventoryRouter.delete("/:itemId", (req, res, next) => {
    Inventory.findOneAndDelete({_id: req.params.itemId},(err, deletedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem.name}`)
    })
})
      

module.exports = inventoryRouter;
