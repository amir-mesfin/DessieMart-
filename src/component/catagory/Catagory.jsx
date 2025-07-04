import React, { useEffect, useState } from 'react'
import styles from './Catagory.module.css'
import CatagoryCard from './CatagoryCard'
import {ProductUrl} from '../../Api/EndPoint'
function Catagory() {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch(`${ProductUrl}/products/categories`)
      .then(res => res.json())
      .then(categoryList => {
        // categoryList is now: [{slug, name, url}, ...]
        setCategories(categoryList);

        // Fetch products for each category
        Promise.all(
          categoryList.map(cat =>
            fetch(`${ProductUrl}/products/category/${cat.slug}`)
              .then(res => res.json())
              .then(data => ({
                title: cat, // full object { slug, name, url }
                products: data.products.slice(0, 4),
                linkUrl: cat.url
              }))
          )
        ).then(results => setFilteredData(results));
      });
  }, []);

  return (
    <div className={styles.catagoryWrapper}>
      {filteredData.map((item, index) => (
        <CatagoryCard
          key={index}
          title={item.title}       // Pass full category object
          products={item.products}
          linkUrl={item.linkUrl}
        />
      ))}
    </div>
  );
}

export default Catagory;
