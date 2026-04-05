import { Link } from 'react-router-dom'
import { divisions } from '../data/siteData'
import './Divisions.css'
export default function Divisions() {
  return (
    <section className="divisions">
      <h1>Our Divisions</h1>

      <p className="section__lead">
        Each division is designed to serve farmers with specialized products and services.
      </p>

      <div className="divisions__grid">
        {divisions.map((division) => {
          const slug = division.name.toLowerCase()

          return (
            <article key={division.name} className="division-card">

              <div
                className="division-card__image"
                style={{
                  backgroundImage: `url(${division.image})`,
                }}
              />

              <div className="division-card__body">
                <h2>{division.name}</h2>

                <p>
                  We provide a curated range of {division.name.toLowerCase()} solutions
                  designed for local growing conditions.
                </p>

                <Link
                  to={`/division/${slug}`}
                  className="button button--secondary"
                >
                  Explore {division.name}
                </Link>
              </div>

            </article>
          )
        })}
      </div>
    </section>
  )
}