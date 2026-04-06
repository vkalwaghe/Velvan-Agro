import { useMemo, useState } from 'react'
import { dealerships } from '../data/siteData'
import './Dealerships.css'

const categories = [
  { id: 'fertilizer', label: 'Fertilizer Dealers' },
  { id: 'waterSoluble', label: 'Water Soluble' },
  { id: 'pesticide', label: 'Pesticide' },
]

// Default images (you can replace later)
const defaultImages = {
  fertilizer:
    'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
  waterSoluble:
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
  pesticide:
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
}

function getImage(company, category) {
  return company.image || defaultImages[category]
}

export default function Dealerships() {
  const [search, setSearch] = useState('')
  const term = search.trim().toLowerCase()

  const results = useMemo(() => {
    if (!term) return dealerships

    const filterList = (list) =>
      list.filter((item) =>
        item.name.toLowerCase().includes(term)
      )

    return {
      fertilizer: filterList(dealerships.fertilizer),
      waterSoluble: filterList(dealerships.waterSoluble),
      pesticide: filterList(dealerships.pesticide),
    }
  }, [term])

  return (
    <section className="dealerships">
      <h1>Dealership Partners</h1>
      <p className="section__lead">
        Trusted suppliers for fertilizers and agro products.
      </p>

      {/* Search */}
      <div className="dealerships__search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company name..."
        />
      </div>

      {/* Categories */}
      {categories.map(({ id, label }) => (
        <section key={id} className="dealerships__section">
          <h2>{label}</h2>

          {results[id]?.length ? (
            <div className="dealerships__grid">
              {results[id].map((company) => (
                <div key={company.name} className="dealerships__card">

                  {/* Image (FIXED) */}
                  <img
                    src={getImage(company, id)}
                    alt={company.name}
                    className="dealerships__cardImage"
                  />

                  {/* Content */}
                  <div className="dealerships__cardBody">
                    <div className="dealerships__cardTitle">
                      {company.name}
                    </div>

                    {/* Map Link */}
                    {company.lat && company.lng && (
                      <a
                        href={`https://www.google.com/maps?q=${company.lat},${company.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mapLink"
                      >
                        📍 View on Map
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No matching partner found.</p>
          )}
        </section>
      ))}

      <p className="dealerships__note">
        *List may update as partnerships grow.
      </p>
    </section>
  )
}