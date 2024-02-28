const router = require(`express`).Router();
const salesBasketModel = require(`../models/salesbasket`);

const createNewSalesBasketDocument = (req, res, next) => {
    // Use the PayPal details to create a new sale basket document
    let saleBasketDetails = {
        paypalPaymentID: req.params.orderID,
        items: req.body.items,
        totalPrice: req.body.totalPrice
    };

    salesBasketModel.create(saleBasketDetails, (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json({ success: true });
        }
    });
};

router.post('/salesbasket/:orderID', createNewSalesBasketDocument);

module.exports = router;