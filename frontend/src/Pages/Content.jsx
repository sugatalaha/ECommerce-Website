import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import { ProductItem } from "../Components/ProductItem.jsx";
import { Title } from "../Components/Title.jsx";

export const Content = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { products,fetchData } = useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {search}=useContext(ShopContext);

  // Function to toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Function to toggle type selection
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  // Filter products based on selected categories and types
  useEffect(() => {
    const filteredProductsCopy = products.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(product.type))
    );
    setFilteredProducts(filteredProductsCopy);
  }, [selectedCategories, selectedTypes, products]); // Dependency array updated

  // Apply sorting whenever sortType changes
  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) => {
      let sortedProducts = [...prevFilteredProducts];
      switch (sortType) {
        case "low-high":
          return sortedProducts.sort((a, b) => a.price - b.price);
        case "high-low":
          return sortedProducts.sort((a, b) => b.price - a.price);
        default:
          return sortedProducts;
      }
    });
  }, [sortType]);

  useEffect(()=>
  {
    let productCopy=products.slice();
    setFilteredProducts(productCopy.filter((product)=>
    (
      product.name.toLowerCase().includes(search.toLowerCase())
    )))
  },[search,products])

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-gray-100 min-h-screen">
        <h2 className="text-lg font-semibold">Filters</h2>

        {/* Category Filter */}
        <div className="mt-4">
          <h3 className="text-md font-semibold">Category</h3>
          <div className="flex flex-col mt-2 space-y-2">
            {["men", "women", "kids"].map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-black"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="mt-4">
          <h3 className="text-md font-semibold">Type</h3>
          <div className="flex flex-col mt-2 space-y-2">
            {["topwear", "bottomwear", "winterwear"].map((t) => (
              <label key={t} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(t)}
                  onChange={() => toggleType(t)}
                  className="accent-black"
                />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="w-3/4 p-4">
        <div className="flex items-center justify-between">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            name="sort"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              e.preventDefault();
              setSortType(e.target.value);
            }}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((item, index) => (
              <div key={index}>
                <ProductItem
                  productId={item?._id}
                  name={item?.name}
                  image={item?.image}
                  price={item?.price}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};
