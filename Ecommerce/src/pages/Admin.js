import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import OpenCart from '../components/OpenCart';
import OrderHistory from "../components/OrderHistory";
import MonthlyIncom from '../components/MonthlyIncom';
import Test from "../components/Test";
import axios from 'axios';
import { BASE_URL } from '../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';

// Card Component
const Cards = ({ img, heading, price, msg, description, productId, setCartItemCount }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const cartItem = { img, heading, price, productId, description };
        dispatch(cartActions.addToCart(cartItem));

        const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if an item with the same productId already exists
        const itemExists = existingItems.some(item => item.productId === productId);

        if (!itemExists) {
            const updatedItems = [...existingItems, cartItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            setCartItemCount(updatedItems.length); // Update cart item count
        } else {
            console.log('Item with the same productId already exists in the cart.');
        }
    };

    return (
        <div className='px-5 py-10'>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '1rem', backgroundColor: '#0E1125', textAlign: 'center', padding: '35px', borderRadius: "20px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={img}
                        alt={heading}
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent sx={{ flex: 1, color: "#C8A357" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            <p className='text'>{heading}</p>
                            <p className='text'>Pan Masala</p>
                        </Typography>
                        <div className='text-white text-center text-2xl font-bold'>
                            MRP {price}
                        </div>
                    </CardContent>
                </CardActionArea>
                <div onClick={handleAddToCart}><Test /></div>
                <h1 className='text-white'>{msg}</h1>
            </Card>
        </div>       
    );
};

// Main Admin Component
export default function Admin() {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const cart = useSelector((store) => store.cart || []); // Safe fallback for cart state

    // Function to fetch product items
    const getProductItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/producteomm/`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductItems();
                setProducts(data.products); // Store all products in state
            } catch (error) {
                setError(error.message);
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Load cart item count from local storage on initial render
        const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItemCount(existingItems.length);
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Filter products based on search input
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
console.log("filteredProducts   ","  ", filteredProducts)

    return (
        <div className="mx-auto max-w-screen-xl home-bg py-10 flex flex-col md:p-10">
            <section className='h-10 mb-4'>
                <input
                    type='search'
                    placeholder='Search Products...'
                    value={searchInput}
                    onChange={handleSearchChange}
                    className='border-2 border-gray-300 rounded-md px-3 py-2'
                />
                <div className='flex float-right gap-2'>
                    <button>
                        <OpenCart show="!openDrawer" />
                        {cartItemCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-6 right-88">{cartItemCount}</span>}
                    </button>
                    <div className='flex items-center justify-center px-4 rounded-md'>
                        <button><MonthlyIncom /></button>
                    </div>
                    <div className='flex items-center justify-center px-4 rounded-md'>
                        <button><OrderHistory /></button>
                    </div>
                </div>
            </section>

            <section className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Cards
                            key={product._id}
                            img={`${BASE_URL}/uploads/${product.image}`}
                            heading={product.title}
                            productId={product._id}
                            description="1 Pack"
                            price={product.price}
                            msg={product.description}
                            setCartItemCount={setCartItemCount}
                        />
                    ))
                ) : (
                    <Typography variant="h6" sx={{ color: "white", textAlign: "center", width: "100%" }}>
                        No products found
                    </Typography>
                )}
                {error && (
                    <Typography variant="h6" sx={{ color: "red", textAlign: "center", width: "100%" }}>
                        Error fetching products: {error}
                    </Typography>
                )}
            </section>
        </div>
    );
}
