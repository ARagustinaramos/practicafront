import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';

const Cards = ({ brandFilter, categoryFilter, nameFilter }) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:3001/products';
        if (brandFilter) {
          url += `?brands=${brandFilter}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setFilteredProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, [brandFilter, categoryFilter, nameFilter]);

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : [];

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <Card 
              key={product.id_Product} 
              id_Product={product.id_Product} 
              name={product.name} 
              image={product.image} 
              price={product.price} 
              brand={product.BrandIdBrand}  
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Cards;




