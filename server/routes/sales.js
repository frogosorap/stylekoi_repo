const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)


const createNewSaleDocument = (req, res, next) => {
    const { orderID, carID, price } = req.params;

    const { orderName, orderEmail, address, phone } = req.body;

    const saleDetails = {
        paypalPaymentID: orderID,
        carID,
        price,
        orderName,
        orderEmail,
        address,
        phone
    };

    carsModel.findByIdAndUpdate({ _id: carID }, { sold: true }, (err, data) => {
        if (err) {
            return next(err);
        }
    });

    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err);
        }
        return res.json({ success: true });
    });
};

const getAllSaleDocuments = (req, res, next) => {
    //user does not have to be logged in to see user details
    salesModel.find((err, data) => {
        if (err) {
            return next(err)
        }
        return res.json(data)
    })
}

const deleteSale = (req, res, next) => {
    const saleId = req.params.id;

    salesModel.findByIdAndDelete(saleId, (err, data) => {
        if (err) {
            return next(err);
        }

        if (!data) {
            return next(createError(404, `User not found`));
        }

        return res.json({ message: `Sale with ID ${saleId} has been deleted successfully` });
    });
};


// Save a record of each Paypal payment
router.post('/sales/:orderID/:carID/:price', createNewSaleDocument)

router.get(`/sales`, getAllSaleDocuments);

router.delete(`/sales/:id`, deleteSale);

module.exports = router