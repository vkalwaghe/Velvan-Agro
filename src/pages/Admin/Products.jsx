import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>All Products</h2>

      {products.map((p) => (
        <div key={p._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>Price: ₹{p.price}</p>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;