import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { companyInfo, divisions } from '../data/siteData'
import { products } from '../data/products'

const featureCards = [
  {
    title: 'Trusted Fertilizers',
    description:
      'Premium fertilizers sourced from leading manufacturers, tailored for local crops.',
    image:
      'https://images.unsplash.com/photo-1593840890080-5e2ab8c6f938?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Easy Ordering',
    description:
      'Add products to cart and send your order instantly — we’ll follow up to confirm.',
    image:
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Field Support',
    description:
      'Get expert agronomy advice for better yields and sustainable crop health.',
    image:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
  },
]

const featuredProducts = Object.values(products)
  .flat()
  .slice(0, 6)

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate--active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="home">
      <div className="hero" data-animate="fade-up">
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__info">
            <h1>Grow with {companyInfo.name}</h1>
            <p className="hero__lead">
              Your local partner for fertilizers, crop protection, seeds and expert
              field support.
            </p>

            <div className="hero__actions">
            <Link to="/products" className="button">
              View products
            </Link>
            <Link to="/divisions" className="button button--secondary">
              Browse divisions
            </Link>
          </div>

          <div className="hero__badges">
            <span>Since {companyInfo.established}</span>
            <span>{companyInfo.location}</span>
            <span>Family owned</span>
          </div>
        </div>
      </div>

        <div className="hero__visual" aria-hidden="true" />
      </div>

     <section className="home__intro" data-animate="fade-up">

  <div className="intro-card">

    <h2>Why choose us?</h2>

    <ul>
      <li>✔ Trusted agriculture products with quality assurance</li>
      <li>✔ Fast ordering & reliable delivery support</li>
      <li>✔ Expert agronomy guidance for every crop cycle</li>
    </ul>

  </div>


  <div className="intro-card">

    <h2>Get started in minutes</h2>

    <ol>
      <li>Browse products or select a division</li>
      <li>Add items to your cart and place an order</li>
      <li>We’ll follow up to finalize delivery and pricing</li>
    </ol>

  </div>

</section>
    </section>
  )
}
