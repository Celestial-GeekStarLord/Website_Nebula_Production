import { useState } from 'react';
import './styles/hero.css';
import MainContent from './components/MainContent';
import PortfolioPage from './components/PortfolioPage';


export default function App() {
  const [portfolioPage, setPortfolioPage] = useState(null);
  // portfolioPage = { category, data, videos } or null

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function scrollTo(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  }

  if (portfolioPage) {
    return <PortfolioPage
  portfolioPage={portfolioPage}
  onBack={() => {
    setPortfolioPage(null);
    setTimeout(() => {
      const el = document.querySelector('#portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }}
/>;
  }

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="main-navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="nebula_logo.png" alt="Nebula Logo" onError={e => e.target.style.display = 'none'} />
          </div>
          <ul className="nav-links">
            {['#home','#about','#services','#weddingGallery','#portfolio','#pricing','#testimonials','#team','#contact'].map((href, i) => (
              <li key={href}>
                <a href={href} onClick={e => { e.preventDefault(); scrollTo(href); }}>
                  {['HOME','ABOUT US','SERVICES','WEDDING GALLERY','PORTFOLIO','PRICING','REVIEWS','OUR TEAM','CONTACT US'][i]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className="mobile-top-bar">
        <div className="mobile-logo">
          <img src="nebula_logo.png" alt="Logo" style={{ height: '45px' }} />
        </div>
        <button className="hamburger" onClick={() => setMobileNavOpen(true)}>
          <span /><span /><span />
        </button>
      </div>

      {/* MOBILE NAV */}
      <div className={`mobile-nav${mobileNavOpen ? ' active' : ''}`}>
        <button className="close-menu" onClick={() => setMobileNavOpen(false)}>&times;</button>
        {['#home','#about','#services','#weddingGallery','#portfolio','#pricing','#testimonials','#team','#contact'].map((href, i) => (
          <a key={href} href={href} onClick={e => { e.preventDefault(); scrollTo(href); }}>
            {['HOME','ABOUT US','SERVICES','WEDDING GALLERY','PORTFOLIO','PRICING','REVIEWS','OUR TEAM','CONTACT US'][i]}
          </a>
        ))}
      </div>

      {/* HERO / VIDEO HEADER */}
      <div className="video-header">
        <video autoPlay loop muted playsInline id="headerVideo">
          <source src="video/Bride-highlight.mp4" type="video/mp4" />
        </video>
        <div className="header-overlay" />
        <div className="hero-text">
          <div className="company-name">
            <span className="nebula">NEBULA</span> PRODUCTION
          </div>
          <div className="tagline">Documentary • Film • Commercial Production</div>
        </div>
      </div>

      {/* WHATSAPP BUTTON */}
      <a href="https://wa.me/9813328713" className="chat-button" target="_blank" rel="noreferrer">
        💬 Chat on WhatsApp
      </a>

      {/* ALL OTHER SECTIONS */}
      <MainContent onOpenPortfolio={setPortfolioPage} />
    </>
  );
}