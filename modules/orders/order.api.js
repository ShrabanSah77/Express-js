const router = require("express").Router();
const mw = (req, res, next) => {
  const { username, password} = req.headers;
  if ()
}

/*

create
list
read one order
delete the order
change the status of order

*/

module.exports = router;

/*

[5:05 PM] Shubham  Kadariya
const express = require('express');
const router = express.Router();
//1) Create A Order
try{
    router.post('/createOrder', (req, res) => {
        res.json({"message": "Order Created!"});
    });
}catch (e){
    next(e);
}
//2) List The Orders
try{
    router.post('/listOrders', (req, res) => {
        res.json({"message": "Order Listed!"});
    });
}catch (e){
    next(e);
}
//3) Read One Order
try{
    router.post('/listOrder/:id', (req, res) => {
        const id = req.params;
        res.json({"message": `Order No ${id} Listed!`});
    });
}catch (e){
    next(e);
}
//4) Change The Order Data
try{
    router.put('/changeOrder/:id', (req, res) => {
        const id = req.params;
        const {data} = req.query;
        res.json({"message": `Order id: ${id}, Changed: ${data}!`});
    });
}catch (e){
    next(e);
}
//5) Delete The Order
try{
    router.delete('/deleteOrder/:id', (req, res) => {
        const id = req.params;
        res.json({"message": `Order No ${id} Deleted!`});
    });
}catch (e){
    next(e);
}
module.exports = router;



// saral sainju

require("express").Router();
 
let Orders = [];
 
// create new order
router.post("/", (req, res, next) => {
  try {
    const { movieName, quantity } = req.body;
    // const id = Orders.length + 1;
    // const newOrders = { movieName, quantity, id };
    // Orders = [...Orders, newOrders];
    // console.log({ Orders });
    res.json({ msg: "Order Created" });
  } catch (e) {
    next(e);
  }
});
 
// get all orders
router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "All orders" });
  } catch (e) {
    next(e);
  }
});
 
// get order by id
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: "order" });
  } catch (e) {
    next(e);
  }
});
 
//delete order by id
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: "order deleted" });
  } catch (e) {
    next(e);
  }
});
 
module.exports = router;
has context menu

*/