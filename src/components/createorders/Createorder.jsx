import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import Orders from './Orders';
import store from '../../store/store.js';
import { setProducts } from '../../store/allProducts.js';
import { getAllProducts, updateProduct } from '../../actions/Product.js';

function CreateOrder() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.allProductData.allProductData);
  const user = store?.getState()?.auth?.user;
  const userId = user?._id;
  const navigate = useNavigate()

        

  const [loading, setLoading] = useState(true); // State variable to track loading state
  const [refreshFlag, setRefreshFlag] = useState(false); // State variable to trigger component remount

  const handleUpdate = async (order) => {
    const updatedData = {
      ordered: true,
      delivered: false,
      shipped: false,
      price: order.price,
      quantity: 1
    };

    const response = await updateProduct(order._id, userId, updatedData);
    console.log(response);

    // Toggle refresh flag to trigger component remount
    setRefreshFlag(!refreshFlag);
  };

  useEffect(() => {

    if (!user) {
      navigate("/login");
  }

    const fetchData = async () => {
      try {
        const response = await getAllProducts(userId);
        const productData = response.data;
        console.log(productData);
        dispatch(setProducts({ data: productData }));
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchData();
  }, [dispatch, userId, refreshFlag]); // Include refreshFlag in dependency array

  return (
    <div className='w-full h-180 flex-grow overflow-y-auto p-4 bg-blue-200'>
      <div>
        <h1 className='font-bold mt-8 ml-7 text-blue font-cerebriSans text-blue-900 co text-5xl'>Create Orders</h1>
        <p className='ml-12 mt-1 text-gray-600 '>Place Order and Enjoy </p>
      </div>

      {/* Display loading indicator or message while data is being fetched */}
      {!user && (
        <p className='text-black font-semibold text-xl ml-7 '>Authentication required to access this feature.</p>
      )}

      {user && loading ? (
        <p className='text-black font-semibold text-5xl ml-[350px] mt-[20%]'>Loading...</p>
      ) : (
        <div className='flex flex-wrap'>
          {productData?.map((product) => (
            <Orders key={product._id} orderData={product} handleUpdate={handleUpdate} />
          ))}
        </div>
      )}

      <div className='h-18 w-full ml-10 flex mt-32'>
        {/* <Button  className='hover:bg-red-600 ' children={'Delete Product'} /> */}
      </div>
    </div>
  );
}

export default CreateOrder;
