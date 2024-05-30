import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';


const Cards = ({ brandFilter, categoryFilter, nameFilter, nameOrder, priceOrder, currentPage, setCurrentPage, filterProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dataQt = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:3001/products';
        const params = new URLSearchParams();

        if (brandFilter) params.append('brand', brandFilter);
        if (categoryFilter) params.append('category', categoryFilter);
        if (nameFilter) params.append('name', nameFilter);

        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        let data = await response.json();

        let sortedData = [...data];

        if (nameOrder) {
          if (nameOrder === 'a-z') {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
          } else if (nameOrder === 'z-a') {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
          }
        } else if (priceOrder) {
          if (priceOrder === 'asc') {
            sortedData.sort((a, b) => a.price - b.price);
          } else if (priceOrder === 'desc') {
            sortedData.sort((a, b) => b.price - a.price);
          }
        }

        setFilteredProducts(sortedData);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (!filterProducts.length) {
      fetchProducts();
    } else {
      setFilteredProducts(filterProducts);
    }
  }, [brandFilter, categoryFilter, nameFilter, nameOrder, priceOrder, currentPage, filterProducts]);

  const totalPages = Math.ceil(filteredProducts.length / dataQt);
  const indexFinal = currentPage * dataQt;
  const indexInicial = indexFinal - dataQt;
  const productsToDisplay = filteredProducts.slice(indexInicial, indexFinal);

  return (
    <div>
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
            <Spinner className='w-full' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;