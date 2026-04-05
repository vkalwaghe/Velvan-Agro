import { companyInfo } from '../data/siteData'

export default function About() {
  return (
    <section className="about">
      <header className="about__hero">
        <div className="about__hero-text">
          <h1>About {companyInfo.name}</h1>
          <p className="about__lead">
            Since {companyInfo.established}, we have supported farmers with trusted
            agri inputs, modern techniques, and a personal approach to service.
          </p>
          <div className="about__badges">
            <span>Family-owned since {companyInfo.established}</span>
            <span>Trusted by farmers across Coimbatore</span>
            <span>Focused on sustainable growth</span>
          </div>
        </div>
        <div
          className="about__hero-image"
          role="img"
          aria-label="Fields and agriculture"
        />
      </header>

      <div className="about__grid">
        <div className="about__card">
          <h2>Our History</h2>
          <p>
            Founded by {companyInfo.founder}, our story began as a small
            fertilizer dealership. Over five decades, we've grown into a trusted
            partner for farmers across the region.
          </p>
        </div>

        <div className="about__card">
          <h2>What We Offer</h2>
          <ul>
            <li>Quality fertilizers &amp; agrochemicals</li>
            <li>Seed recommendations for local crops</li>
            <li>On-field advisory and nutrient planning</li>
          </ul>
        </div>

        <div className="about__card">
          <h2>Why Choose Us</h2>
          <ul>
            <li>Focused on farmer success, not just sales</li>
            <li>Fast, friendly support and reliable deliveries</li>
            <li>Partnered with top manufacturers for consistent supply</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
