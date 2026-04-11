import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { products } from '../data/products'
import './Products.css'

// 🔥 SAFE conversion (prevents crash if undefined)
const allProducts = products
  ? Object.values(products).flat()
  : []

export default function Products() {
  const { addItem, items } = useCart()

  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('best')
  const [toast, setToast] = useState('')

  // ✅ DEBUG (you can remove later)
  console.log('Products loaded:', allProducts)

  // =========================
  // Categories
  // =========================
  const categories = useMemo(() => {
    if (!allProducts.length) return ['All']

    const set = new Set(allProducts.map((p) => p.category))
    return ['All', ...Array.from(set).sort()]
  }, [])

  // =========================
  // Filter + Search + Sort
  // =========================
  const filteredProducts = useMemo(() => {
    let list = [...allProducts]

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

    // Sorting
    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      list.sort(
        (a, b) =>
          (b.bestSeller ? 1 : 0) -
          (a.bestSeller ? 1 : 0)
      )
    }

    return list
  }, [category, search, sortBy])

  // =========================
  // Animation (SAFE)
  // =========================
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]')
    if (!elements.length) return

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

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // =========================
  // Cart check
  // =========================
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
          Browse fertilizers, pesticides, herbicides and seeds.
        </p>

        {/* CONTROLS */}
        <div className="products-controls">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="best">Best sellers</option>
            <option value="priceAsc">Price low → high</option>
            <option value="priceDesc">Price high → low</option>
            <option value="name">Name</option>
          </select>

        </div>

        {items.length > 0 && (
          <Link to="/cart" className="button">
            View Cart ({items.length})
          </Link>
        )}
      </header>

      {/* PRODUCTS */}
      {allProducts.length === 0 ? (

        <div className="section-empty">
          ⚠ No products data found (check import)
        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="section-empty">
          No products match your search
        </div>

      ) : (

        <div className="products-grid" data-animate>

          {filteredProducts.map((p) => (

            <div key={p.id} className="product-card">

              {/* IMAGE (SAFE FALLBACK) */}
              <div
                className="product-image"
                style={{
                  backgroundImage: `url(${p.image || 'https://via.placeholder.com/300'})`,
                }}
              />

              <div className="product-body">

                <h3>{p.name}</h3>

                <p className="price">
                  ₹{p.price} / {p.unit}
                </p>

                <p className="desc">
                  {p.description}
                </p>

                {p.bestSeller && (
                  <span className="badge">
                    ⭐ Best Seller
                  </span>
                )}

                <button
                  className="add-btn"
                  disabled={inCart(p.id)}
                  onClick={() => handleAdd(p)}
                >
                  {inCart(p.id) ? 'Added' : 'Add to Cart'}
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