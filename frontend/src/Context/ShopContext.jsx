import { createContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendUrl from "../constant.js";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>
{
    const currency='$';
    const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem("user") || null));
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [isDataFetching,setIsDataFetching]=useState(false);
    const [orders,setOrders]=useState([]);

    const fetchData=async ()=>
    {
      try {
        setIsDataFetching(true);
        const response=await axios(`${backendUrl}/products/product-list`);
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response.data.message || "An error occured");
      }
      finally
      {
        setIsDataFetching(false);
      }

    }
    const [cartItems,setCartItems]=useState({});
    const [search, setSearch]=useState("");
    const [showSearch,setShowSearch]=useState(true);
    const deliveryFee=10;
    const getCartData=async ()=>
    {
        try {
          setLoading(true);
          const response=await axios.get(`${backendUrl}/cart/get`,{withCredentials:true});
          if(response.data.success)
          {
            setCartItems(response.data.cartData);
          }
          
        } catch (error) {
          setCartItems({});
        }finally{
          setLoading(false);
        }
    }
    const getCartNumber=()=>
    {
      let sum=0;
      for(const itemId in cartItems)
      {
        for(const size in cartItems[itemId])
        {
          sum+=cartItems[itemId][size];
        }
      }
      return sum;
    }
    const sendReview=async (data)=>
    {
      try {
        const response=await axios.post(`${backendUrl}/products/add-review`,data,{withCredentials:true});
        console.log(response.data.message);
        toast.success("Review added");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/users/user-check-auth`, { withCredentials: true });
        console.log("Fetch user:",response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user in local storag
        setUser(JSON.parse(localStorage.getItem("user")));
        // console.log(localStorage.getItem("user"));
      } catch (error) {
        localStorage.removeItem("user");
        setUser(localStorage.getItem("user"));
      } finally {
        setLoading(false);
      }
    };
    
    const addToCart=async (item,size)=>
    {
      try {
        if(!size)
          {
            toast.error("Select size!");
            return;
          }
          const cartData=structuredClone(cartItems);
          if(cartData[item._id])
          {
            if(cartData[item._id][size])
            {
              cartData[item._id][size]+=1;
            }
            else
            {
              cartData[item._id][size]=1;
            }
          }
          else
          {
            cartData[item._id]={};
            cartData[item._id][size]=1;
          }
          setCartItems(cartData);
          const response=await axios.post(`${backendUrl}/cart/add`,{itemId:item._id,size:size},{withCredentials:true});
        
          if(response.data.success)
          {
            toast.success(response.data.message);
          }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    const fetchOrders=async ()=>
    {
      try {
        const response=await axios.get(`${backendUrl}/order/my-orders`,{withCredentials:true});
        console.log(response.data.orders);
        if(response.data.success)
        {
          setOrders(response.data.orders);
        }
      } catch (error) {
      }
    }

    const updateCartItem=async (itemId,size,quantity)=>
    {
      try {
        const cartDataCopy=structuredClone(cartItems);
        cartDataCopy[itemId][size]=quantity;
        setCartItems(cartDataCopy);
        const response=await axios.post(`${backendUrl}/cart/update`,{itemId:itemId,size:size,quantity:quantity},{withCredentials:true});
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } 

    const removeCartItem=async (itemId,size)=>{
      try {
        const cartDataCopy=structuredClone(cartItems);
        cartDataCopy[itemId][size]=0;
        setCartItems(cartDataCopy);
        const response=await axios.post(`${backendUrl}/cart/update`,{itemId:itemId,size:size,quantity:0},{withCredentials:true});
        if(response.data.success)
        {
          toast.success("Item removed from your cart!");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    const getItemName=(itemId)=>
    {
      const filteredArray= products.find((product)=>product._id===itemId);
      return filteredArray.name;
    }

    const getCartAmount= ()=>
    {
      let total=0;
      for(const item in cartItems)
      {
        const productInfo=products.find((product)=>product._id===item);
        for(const size in cartItems[item])
        {
          if(cartItems[item][size]>0)
          {
            total+=cartItems[item][size]*productInfo?.price;
          }
        }
      }
      return total;
    }
    useEffect(()=>
    {
      fetchUser();
    },[]);
    useEffect(()=>
    {
      fetchData();
    },[]);
    useEffect(()=>
    {
      getCartData();
    },[]);
    useEffect(()=>
    {
      fetchOrders();
    },[]);

    const navigate=useNavigate();

    const value={
      products, currency,deliveryFee,
      showSearch,setShowSearch,search,setSearch,
      addToCart,getCartNumber,cartItems,updateCartItem,
      removeCartItem,getCartAmount,navigate,
      fetchData,fetchUser,loading,
      getCartData,user,setUser,setLoading,
      getItemName,orders,isDataFetching,
      sendReview
   };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;