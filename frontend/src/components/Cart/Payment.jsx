import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import { newOrder } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import useRazorpay from "react-razorpay";
import baseurl from "../../urlconfig"
import { getPaymentStatus } from '../../actions/orderAction';


const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Razorpay = useRazorpay();
  const { enqueueSnackbar } = useSnackbar();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [payDisable, setPayDisable] = useState(false);

  const paymentData = {
    amount: Math.round(totalPrice * 100),
    phoneNo: shippingInfo.phoneNo,
    email:user.email
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);

    try {
      const { data: order } = await axios.post(`${baseurl}/payment/process`, paymentData);

      const options = {
        key: 'rzp_test_u743lHilR2AxPn',
        amount: order.amount,
        currency: order.currency,
        name: 'Flipkart',
        description: 'Order Payment',
        email: "kumar@example.com",
        contact: "+917667798942",
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAnFBMVEVHcEzy0UDInSPYqizbripqYVHWzHzy20Tq2F3u2VXzwTB3XBrz2D7ery315UnhsS0wcKL15k7y20oAbr4Hb7sHa7b64DH55DD82TEGheP45y8Kg9n63THxxi/4xzHuvC/+yjHlsyz80zLowysEetP/3h7vxBUHecyMp6L450G0qWhxlaQgi9hMkMB3pLTksBbWu1G0uomVnYXXyWSrIjT1AAAAFnRSTlMAcUl4/Q0a9T9Q7B20jsuoXL2GgoFsvBma+wAAAadJREFUOI11kw1zojAQhiN+BGxte+2dBoEQQggB+dL+//92uwmeIL1nnGHG53V32URCpmz9IPB35D/4r9XZUv0KftABPU+oVs/+bWJPwJnOOu2qiRup/Cd/euJ4eiSqhXTcu7wtlYOO8y9lAcAj/rQB+vS7U0GvpjM0Bux+ZvYYH+MuRLqCMYbreHVfW4XQxvqw0RDAKeJ/CmEFeBtpdQIJOJ+JBAqDuqm11nkuGfOJf1eOAouHQ44kiZQrErAZ32ETQfUxwBeB4hpGUWi08wkXK+LflaPDQI0DJBjgK7Kzml4793YRgM8BvUyER4hk0kK7yNLYTO0KiC0symomv030INxkdoQ9nhXoob4ZcwFatO3lUmdZyqHAAQ+DS5nkuc5hN9ooCNz6Pttk2diBkLXERJrCR7eqVKregE7TlIt3dyH2Ugjrcx0pFSn0NsDHG/XChRQ4dTJAgbLpXYBz734nPQHATLxWZVle+rHA+nGtPW4DwkBA3fqFhy57LCJaKKBqV8Ajcw5QRGAHha+QvW8Xf87tej9goIQlHF4W2mU+/vz++vBm9i+r/FSYRl4w2gAAAABJRU5ErkJggg==',
        order_id: order.id,
        handler: async function (response) {
          try {
            const paymentResult = {
              id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
            };

            let paymentResponse = await axios.post(`${baseurl}/callback`, paymentResult);
            console.log(paymentResponse.data)
             let  paymentInfo={
              id:paymentResponse.data.id,
              status:paymentResponse.data.status
             }
            const order = {
              paymentInfo,
              shippingInfo,
              orderItems: cartItems,
              totalPrice,
            }
            // dispatch(createOrder(order));
            // dispatch(newOrder(order));
            // dispatch(emptyCart());
            dispatch(getPaymentStatus(paymentResponse.data.order_id))
            navigate(`/order/${paymentResponse.data.order_id}`);
            // Redirect to success page or display success message
          } catch (error) {
            enqueueSnackbar('Payment failed', { variant: 'error' });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          phone: shippingInfo.phoneNo,
        },
      };
      function loadScript(url) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (scriptLoaded) {
        const rzp = new Razorpay(options);
 
         rzp.open();
      } else {
        enqueueSnackbar('Failed to load Razorpay. Please try again later.', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Payment failed', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Flipkart: Secure Payment | Razorpay" />
      <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white">
                <form
                  onSubmit={(e) => submitHandler(e)}
                  autoComplete="off"
                  className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden"
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-radio-group"
                      defaultValue="paytm"
                      name="payment-radio-button"
                    >
                      <FormControlLabel
                        value="paytm"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-4">
                            <img
                              draggable="false"
                              className="h-6 w-6 object-contain"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAWlBMVEVHcEwzlf8zlf8zlf8zlf8vhcozlf8zlv8zlf8zlf8zlf80mP80mP8zlf80l/8zlf8zlf8zlf8CDzUmdc07q/8GJVMHJlQHJlQFIE0GJVQHJlQHJlQEIk8HJlRFd1ufAAAAHnRSTlMAkjv/qwS+VxDTaCBHhC7kdfkmDBeI6P9Cpr1RZ9dOi+BjAAAA1ElEQVR4AX3RhQHDQAwDQKUKMzu4/5qtS6H/3AAGCbcc3HrQxQ3PJwPYBXwJYRNGfIlgE5PKgVkS8SOFUUalYJIXVNYTHG5KXFVURUSVm7JTGahoWVAkyKlMOUe6uEZJFeOiYdSi6xHRknMQo+6lA1UBk05E6tR6wiAKjiVnbxQ1oaDycDLLx+IZc24m+aqDb1oHi/zBpXpgp17lb0R1zXmUzdJS+diTHa+8Vl3LpodPlRzj24ygqrC3ymYwVS07yKiCSwNfKwqq0HbCVrXlhG/VDv6ecxEVjOgZDPAAAAAASUVORK5CYII="
                              alt="Razorpay Logo"
                            />
                            <span>Razorpay</span>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  <input
                    type="submit"
                    value={`Pay ₹${totalPrice.toLocaleString()}`}
                    disabled={payDisable ? true : false}
                    className={`${payDisable ? 'bg-primary-grey cursor-not-allowed' : 'bg-primary-orange cursor-pointer'} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                  />
                </form>
              </div>
            </Stepper>
          </div>
          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
