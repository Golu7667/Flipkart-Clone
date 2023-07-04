// const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');

// Configure Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Process Payment
exports.processPayment = async (req, res, next) => {
  const { amount, email, phoneNo } = req.body;
  
  const options = {
    amount: amount,
    currency: 'INR',
    notes:{
      email:email,
      contact: phoneNo,
    }
  };

  try {
    const order = await razorpay.orders.create(options);
     console.log(order)
    res.status(200).json({
      id: order.id,
      amount: order.amount,

      notes: order.notes,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler('Payment Failed', 500));
  }
};

// Verify Payment
exports.verifyPayment = async (req, res, next) => {
  const { id, order_id } = req.body;


  try {
    const payment = await razorpay.payments.fetch(id);
    console.log(payment.order_id,order_id)
    if (payment.order_id === order_id && payment.status === 'captured') {
      // Payment is successful
      const data = {
        txnId: payment.id,
        orderId: payment.order_id,
        txnAmount: payment.amount/100 , 
        bankName:payment.bank,
        paymentMode:payment.method,
        refundAmt:payment.amount_refunded,
        txnDate:payment.created_at
      };
      console.log(data)
      const paymentsave=Payment.create(data);
      paymentsave.then(()=>
       console.log("Successful")
      ).catch((error)=>{
        console.log(error)
      })
      res.status(200).json({
        id:payment.id,
        order_id:payment.order_id,
        status:"success",
      });
    } else {
      // Payment is not successful
      return next(new ErrorHandler('Payment Verification Failed', 400));
    }
  } catch (error) {
    return next(new ErrorHandler('Payment Verification Failed', 500));
  }
};


exports.getPaymentStatus = async (req, res, next) => {
  const payment = await Payment.findOne({ orderId: req.params.id });
   console.log(req.params.id,"hi friend")
  if (!payment) {
    return next(new ErrorHandler('Payment Details Not Found', 404));
  }

  const txn = {
    id: payment.orderId,
    status: 'captured',
  };

  res.status(200).json({
    success: true,
    txn,
  });
};
