import { Link } from 'react-router-dom'
import './Category.css'

const pages = [
  {
    name: 'Divisions',
    path: '/divisions',
    image: 'https://img.freepik.com/premium-photo/agribusiness-as-agricultural-business-with-food-industry-outline-concept-transparent-background-ma_1041545-40296.jpg',
  },
  {
    name: 'Products',
    path: '/products',
    image: 'https://tse3.mm.bing.net/th/id/OIP.22Ojcxdwiv932MbXTQneewHaEG?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    name: 'Dealerships',
    path: '/dealerships',
    image: 'https://gripinternational.in/wp-content/uploads/2020/06/Become-a-Dealer.jpg',
  },
]

export default function Category() {
  return (
    <section className="category">
      <h1>Agro Service Platform</h1>

      <p className="category__lead">
        Choose a section to explore services, products, and partners.
      </p>

      <div className="category__grid">
        {pages.map((page) => (
          <Link to={page.path} key={page.name} className="category__card">
            
            <div
              className="category__image"
              style={{ backgroundImage: `url(${page.image})` }}
            />

            <div className="category__content">
              <h2>{page.name}</h2>
              <span>Explore →</span>
            </div>

          </Link>
        ))}
      </div>
    </section>
  )
}