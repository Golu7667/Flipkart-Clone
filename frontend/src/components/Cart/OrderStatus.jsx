import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emptyCart } from '../../actions/cartAction';
import { clearErrors, getPaymentStatus, newOrder } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';

const OrderStatus = () => {
    console.log("orderstatus")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { loading, txn, error } = useSelector((state) => state.paymentStatus);
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.newOrder);
     console.log(loading,txn)
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let  paymentInfo={
        id:txn,
        status:"success"
       }
    const orderData = {
        paymentInfo,
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    useEffect(() => {
        if (loading === false) {
            if(txn) {
                if (txn.status === "captured") {
                    orderData.paymentInfo = {
                        id: txn.id,
                        status: txn.status,
                    };
    
                    dispatch(newOrder(orderData));
    
                } else {
                    enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                    navigate("/orders/failed");
                }
            } else {
                navigate("/cart");
            }
        }
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {
        console.log(orderLoading,order,orderError)
        if (orderLoading === false) {
            if (order) {
                enqueueSnackbar("Order Placed", { variant: "success" });
                dispatch(emptyCart());
                navigate("/orders/success");
            } else {
                navigate("/orders");
            }
        }
        // eslint-disable-next-line
    }, [orderLoading])

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (orderError) {
            enqueueSnackbar(orderError, { variant: "error" });
            dispatch(clearErrors());
        }
   
      
        console.log(params.id,"hot day ")
        dispatch(getPaymentStatus(params.id));
    }, [dispatch, error, orderError, params.id, enqueueSnackbar]);

    return (
        <Loader />
    );
};

export default OrderStatus;
