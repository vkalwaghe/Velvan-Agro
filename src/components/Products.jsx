import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { products } from '../data/products'
import './Products.css'

const allProducts = Object.values(products).flat()

export default function Products() {
  const { addItem, items } = useCart()

  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('best')
  const [toast, setToast] = useState('')


  // categories

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category))
    return ['All', ...Array.from(set).sort()]
  }, [])


  // filter + search + sort

  const filteredProducts = useMemo(() => {
    let list = allProducts

    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const term = search.toLowerCase()

      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    }

    const sorted = [...list]

    if (sortBy === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      sorted.sort(
        (a, b) =>
          (b.bestSeller ? 1 : 0) -
          (a.bestSeller ? 1 : 0)
      )
    }

    return sorted
  }, [category, search, sortBy])


  // animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate--active')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])


  const inCart = (id) =>
    items.some((item) => item.id === id)


  function handleAdd(product) {
    addItem(product)

    setToast(product.name + ' added to cart')

    setTimeout(() => {
      setToast('')
    }, 2000)
  }


  return (
    <section className="products-page">

      {/* HEADER */}

      <header className="products-header" data-animate>

        <h1>Products</h1>

        <p className="section__lead">
          Browse our fertilizers, pesticides, herbicides and seeds.
        </p>


        {/* FILTERS */}

        <div className="products-controls">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>


          <input
            placeholder="Search product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="best">
              Best sellers
            </option>

            <option value="priceAsc">
              Price low → high
            </option>

            <option value="priceDesc">
              Price high → low
            </option>

            <option value="name">
              Name
            </option>
          </select>

        </div>


        {items.length > 0 && (

          <Link
            to="/cart"
            className="button"
          >
            View Cart ({items.length})
          </Link>

        )}

      </header>



      {/* PRODUCTS */}

      {filteredProducts.length === 0 ? (

        <div className="section-empty">

          No products found

        </div>

      ) : (

        <div
          className="products-grid"
          data-animate
        >

          {filteredProducts.map((p) => (

            <div
              key={p.id}
              className="product-card"
            >

              <div
                className="product-image"
                style={{
                  backgroundImage:
                    `url(${p.image})`,
                }}
              />

              <div className="product-body">

                <h3>{p.name}</h3>

                <p>
                  ₹{p.price} / {p.unit}
                </p>

                <p>
                  {p.description}
                </p>

                {p.bestSeller && (
                  <span className="badge">
                    Best Seller
                  </span>
                )}

                <button
                  className="add-btn"
                  disabled={inCart(p.id)}
                  onClick={() =>
                    handleAdd(p)
                  }
                >
                  {inCart(p.id)
                    ? 'Added'
                    : 'Add to Cart'}
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* TOAST */}

      {toast && (

        <div className="toast">

          {toast}

        </div>

      )}

    </section>
  )
}