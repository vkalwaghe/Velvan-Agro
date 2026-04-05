import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { divisions } from '../data/siteData'
import { useCart } from '../contexts/CartContext'
import './DivisionPage.css'
import { useNavigate } from "react-router-dom";


function getDivisionLabel(slug) {

  const match = divisions.find(
    (d) => d.name.toLowerCase() === slug
  )

  return match ? match.name : slug
}


export default function DivisionPage() {

  const { division } = useParams()

  const key = division?.toLowerCase() ?? ''

  const productList = products[key] ?? []

  const label = getDivisionLabel(key)

  const { addItem } = useCart()

  const hasProducts = productList.length > 0


  const slugLinks = useMemo(
    () =>
      divisions.map((d) => {

        const slug = d.name.toLowerCase()

        return (
          <Link
            key={slug}
            to={`/division/${slug}`}
            className="division-nav__link"
          >
            {d.name}
          </Link>
        )

      }),
    []
  )


  return (

    <section className="division-page">

      <header className="division-page__header">

        <h1>{label}</h1>

        <p className="section__lead">
          Explore our range of {label.toLowerCase()} products.
        </p>

        <nav className="division-nav">
          {slugLinks}
        </nav>

      </header>



      {hasProducts ? (

        <div className="products-grid">

          {productList.map((product) => (

            <article
              key={product.id}
              className="product-card"
            >

              <div
                className="product-image"
                style={{
                  backgroundImage:
                    `url(${product.image})`,
                }}
              />

              <div className="product-body">

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <p>
                  ₹{product.price} / {product.unit}
                </p>

                <button
                  className="add-btn"
                  onClick={() => addItem(product, 1)}
                >
                 const navigate = useNavigate();
                 <button
                  onClick={() => {
                  addItem(product, 1);
                  navigate("/cart");
                  }}  
                  >
                    Add to cart
                  </button>
                </button>

              </div>

            </article>

          ))}

        </div>

      ) : (

        <div className="section-empty">
          No products available
        </div>

      )}


      <div className="section-cta">

        <Link
          to="/order"
          className="button"
        >
          Place Order
        </Link>

      </div>

    </section>

  )

}