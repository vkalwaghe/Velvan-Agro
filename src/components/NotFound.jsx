import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>We couldn’t find what you were looking for.</p>
      <p>
        <Link to="/">Go back to home</Link>
      </p>
    </section>
  )
}
