import { useMemo, useState } from 'react'
import { dealerships } from '../data/siteData'

const categories = [
  { id: 'fertilizer', label: 'Fertilizer Dealers' },
  { id: 'waterSoluble', label: 'Water Soluble' },
  { id: 'pesticide', label: 'Pesticide' },
]

const categoryImages = {
  fertilizer:
    'data:image/webp;base64,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',
  waterSoluble:
    'https://5.imimg.com/data5/SELLER/Default/2023/6/316955617/GK/CM/QR/150731759/water-soluble-fertilizers-1000x1000.jpeg',
  pesticide:
    'https://th.bing.com/th/id/OIP.9e50hGJFv779FFZluVEnYwHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
}

function getDealershipImage(categoryId) {
  return categoryImages[categoryId] ?? categoryImages.fertilizer
}

export default function Dealerships() {
  const [search, setSearch] = useState('')
  const term = search.trim().toLowerCase()

  const results = useMemo(() => {
    if (!term) return dealerships
    const filterList = (list) => list.filter((item) => item.name.toLowerCase().includes(term)
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
        Our trusted partners ensure consistent supply of quality fertilizers and
        agrochemicals.
      </p>

      <div className="dealerships__search">
        <label htmlFor="search" className="sr-only">
          Search partners
        </label>
        <input
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by company name"
        />
      </div>

      {categories.map(({ id, label }) => (
        <section key={id} className="dealerships__section">
          <h2>{label}</h2>
          {results[id]?.length ? (
            <div className="dealerships__grid">
              {results[id].map((company) => (
                <div key={company.name} className="dealerships__card">
                <div
                  className="dealerships__cardImage"
                  style={{ backgroundImage: `url(${company.image})` }}
                  aria-hidden="true"
                  />
                  <div className="dealerships__cardBody">
                    <div className="dealerships__cardTitle">
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">
              No matching partner found for your search. Try a different term.
            </p>
          )}
        </section>
      ))}

      <p className="dealerships__note">
        Note: This list is based on supplier associations and may update as new
        partnerships form.
      </p>
    </section>
  )
}
