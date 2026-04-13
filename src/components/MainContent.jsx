import { useEffect, useRef } from 'react';
import '../styles/main.css';

// ============================================================
// 🔥 EASY MEDIA MANAGER - EDIT ONLY THIS SECTION 🔥
// ============================================================

const WEDDING_PHOTOS = [
  "nebula logo.jpg", "wedding1.jpeg", "wedding2.jpeg", "wedding3.webp", "wedding4.jpg",
  "wedding5.jpg", "wedding6.jpg", "wedding7.jpg", "wedding8.jpg", "wedding9.jpg",
  "wedding10.jpg", "wedding11.jpg", "wedding12.jpg", "wedding13.jpg", "wedding14.jpg",
  "wedding15.jpg", "wedding16.jpg", "wedding17.jpg", "wedding18.jpg", "wedding19.jpg", "wedding20.jpg"
];

export const PORTFOLIO_VIDEOS = {
  weddingHighlight: ["https://www.youtube.com/watch?v=FdylwkCk9Zs", "https://www.youtube.com/watch?v=dQw4w9WgXcQ",],
  commercialAd: ["https://www.youtube.com/watch?v=E8LRr7P_qhY", "https://www.youtube.com/watch?v=kJQP7kiw5Fk"],
  movies: ["https://www.youtube.com/watch?v=E8LRr7P_qhY", "https://www.youtube.com/watch?v=L_jWHffIx5E"],
  musicVideo: ["https://www.youtube.com/watch?v=E8LRr7P_qhY", "https://www.youtube.com/watch?v=9bZkp7q19f0"],
  brand: ["https://www.youtube.com/watch?v=E8LRr7P_qhY", "https://www.youtube.com/watch?v=OPf0YbXqDm0"],
  documentary: ["https://www.youtube.com/watch?v=E8LRr7P_qhY", "https://www.youtube.com/watch?v=tgbNymZ7vqY"],
  
};

const TEAM_MEMBERS = [
  { name: "Surendra Joshi", post: "Founder & Lead Cinematographer", photo: "Surendra.png", desc: "Visionary filmmaker with over a decade of experience.", fb: "#", ig: "#", linkedin: "#" },
  { name: "Rita Thapa", post: "Creative Director", photo: "Rita.png", desc: "Award-winning photographer specializing in candid moments.", fb: "#", ig: "#", linkedin: "#" },
  { name: "Bikash Shrestha", post: "Senior Editor & Colorist", photo: "Bikash.png", desc: "Master colorist with cinematic grading expertise.", fb: "#", ig: "#", linkedin: "#" },
  { name: "Suman Rai", post: "Drone Operator", photo: "Suman.png", desc: "Certified drone pilot capturing breathtaking aerial shots.", fb: "#", ig: "#", linkedin: "#" },
  { name: "Rakshya Neupane", post: "Managing Director & CEO", photo: "Rakshya.png", desc: "Driving the company towards creative success.", fb: "#", ig: "#", linkedin: "#" },
  { name: "Chandan Jha", post: "Line Producer", photo: "Chandan.png", desc: "Handled 200+ international projects.", fb: "#", ig: "#", linkedin: "#" }
];

// ============================================================
// DO NOT EDIT BELOW THIS LINE
// ============================================================

export const portfolioCategories = {
  "Wedding Highlight": { icon: "🎬", desc: "Cinematic wedding film | 4K", order: 1, videoKey: "weddingHighlight" },
  "Commercial Ad":    { icon: "📢", desc: "30 sec TV commercial",        order: 2, videoKey: "commercialAd" },
  "Movies":           { icon: "🎥", desc: "Short films & Feature stories",order: 3, videoKey: "movies" },
  "Music Video":      { icon: "🎵", desc: "Official music video release", order: 4, videoKey: "musicVideo" },
  "Brand":            { icon: "🏷️", desc: "Corporate & Brand films",      order: 5, videoKey: "brand" },
  "Documentary":      { icon: "🎞️", desc: "Short documentary film",       order: 6, videoKey: "documentary" }
};

const testimonials = [
  { name: "Ramesh Adhikari", photo: "⭐", review: "Absolutely stunning work! The wedding video brought tears to our eyes. Professional and creative team!" },
  { name: "Sita Gurung",     photo: "❤️", review: "Best production house in Kathmandu. The short film they made won an award! Highly recommend." },
  { name: "Anil Shah",       photo: "🎉", review: "On time, creative, and high quality. The documentary exceeded our expectations. 10/10." }
];

const brands = ["🏢 Wedding Nepal", "🏭 Event Experts", "🏛️ Kathmandu Films", "🏨 Luxury Weddings", "🎥 Media Hub", "💍 Wedding Diary"];

export default function MainContent({ onOpenPortfolio }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const currentDirectionRef = useRef('right');

  // Build wedding gallery
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = WEDDING_PHOTOS.map((src, i) =>
      `<div class="gallery-item"><img src="${src}" class="gallery-img" alt="Wedding shot ${i + 1}" loading="lazy" onerror="this.src='https://placehold.co/400x500/333/ff0000?text=Photo+Not+Found'"></div>`
    ).join('');
    track.innerHTML = items + items;
  }, []);

  // Gallery click direction
  function handleGalleryClick(e) {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.35 && currentDirectionRef.current !== 'right') {
      track.classList.remove('scroll-left');
      track.classList.add('scroll-right');
      currentDirectionRef.current = 'right';
    } else if (clickX > rect.width * 0.65 && currentDirectionRef.current !== 'left') {
      track.classList.remove('scroll-right');
      track.classList.add('scroll-left');
      currentDirectionRef.current = 'left';
    }
  }

  // Contact form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    const statusDiv = document.getElementById('formStatus');
    statusDiv.innerHTML = "Sending...";
    const formData = new FormData();
    formData.append('name', document.getElementById('fullName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('package', document.getElementById('package').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('message', document.getElementById('message').value);
    formData.append('_subject', `New Inquiry from ${document.getElementById('fullName').value}`);
    try {
      const response = await fetch('https://formsubmit.co/ajax/joshisurendra567@gmail.com', { method: 'POST', body: formData });
      if (response.ok) { statusDiv.innerHTML = "✅ Inquiry sent! We'll contact you soon."; e.target.reset(); }
      else { statusDiv.innerHTML = "❌ Error. Please email directly."; }
    } catch {
      statusDiv.innerHTML = "❌ Network error. Call us directly.";
    }
  }

  function handlePortfolioClick(category) {
    const data = portfolioCategories[category];
    const videos = PORTFOLIO_VIDEOS[data.videoKey] || [];
    onOpenPortfolio({ category, data, videos });
  }

  const sortedPortfolio = Object.entries(portfolioCategories).sort((a, b) => a[1].order - b[1].order);

  return (
    <>
      {/* HOME */}
      <section id="home" className="section">
        <div style={{ textAlign: 'center' }}>
          <p>📍 Tokha, Kathmandu | 📞 9813328713 / 9865914781</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">About <span>Us</span></h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p>NEBULA PRODUCTION is a premier creative studio based in Tokha, Kathmandu. We specialize in documentary filmmaking, wedding cinematography, commercials, and short films. With a passion for authentic storytelling and a team of dedicated professionals, we bring your vision to life with cinematic excellence.</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <h2 className="section-title">Our <span>Services</span></h2>
        <div className="services-list-new">
          {['VIDEOGRAPHY','PHOTOGRAPHY','EDITING','ADS FILM','SHORT FILMS','DOCUMENTARIES','MUSIC VIDEOS','EVENT SHOOT'].map(s => (
            <div className="service-item-new" key={s}>{s}</div>
          ))}
        </div>
      </section>

      {/* WEDDING GALLERY */}
      <section id="weddingGallery" className="section">
        <h2 className="section-title">Wedding <span>Gallery</span></h2>
        <div className="gallery-scroll-container" ref={containerRef} onClick={handleGalleryClick}>
          <div className="direction-hint left-hint">◀ CLICK HERE ◀</div>
          <div className="direction-hint right-hint">▶ CLICK HERE ▶</div>
          <div className="gallery-track scroll-right" ref={trackRef}></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: '#666' }}>
          ✨ Click LEFT side → scrolls Right-to-Left | Click RIGHT side → scrolls Left-to-Right ✨
        </p>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section">
        <h2 className="section-title">Our <span>Portfolio</span></h2>
        <div className="portfolio-grid">
          {sortedPortfolio.map(([title, data]) => (
            <div className="portfolio-card" key={title} onClick={() => handlePortfolioClick(title)}>
              <div className="portfolio-icon">{data.icon}</div>
              <div className="team-name" style={{ fontSize: '1.1rem' }}>{title}</div>
              <div className="team-post">{data.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section">
        <h2 className="section-title">Wedding <span>Packages</span></h2>
        <div className="pricing-container">
          <table className="pricing-table">
            <thead>
              <tr><th>Package</th><th>Silver</th><th>Gold</th><th>Diamond</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Price (NPR)</strong></td><td>42,000</td><td>78,000</td><td>113,000</td></tr>
              <tr><td><strong>Best For</strong></td><td>Wedding (1 Day)</td><td>Full Wedding + Reception</td><td>Full Wedding + Reception + Post-wedding</td></tr>
              <tr><td><strong>Team</strong></td><td>1 Photographer + 1 Videographer</td><td>1 Photographer + 1 Videographer</td><td>1 Photographer + 1 Videographer</td></tr>
              <tr><td><strong>Equipment</strong></td><td>2 Sony A7IV, RS4 Gimbal</td><td>2 Sony A7IV + Light & Sound</td><td>2 Sony A7IV + Light & Sound</td></tr>
              <tr><td><strong>Coverage</strong></td><td>6-10 Hours</td><td>Wedding + Reception</td><td>Full Day + Extra Events</td></tr>
              <tr><td><strong>Edited Photos</strong></td><td>150-300</td><td>400-600</td><td>300-500+</td></tr>
              <tr><td><strong>Highlight Video</strong></td><td>3-5 Min</td><td>3-6 Min + Reception</td><td>7-10 Min Cinematic</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <a href="Wedding_Package_Price_List.pdf" className="pdf-link" target="_blank" rel="noreferrer">
            📄 Download Full Price List (PDF)
          </a>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section">
        <h2 className="section-title">Our Creative <span>Team</span></h2>
        <div className="team-grid">
          {TEAM_MEMBERS.map(m => (
            <div className="team-card" key={m.name}>
              <div className="team-photo-wrapper">
                <img src={m.photo} className="team-photo" alt={m.name}
                  onError={e => e.target.src = `https://placehold.co/200x200/333/ff0000?text=${m.name.charAt(0)}`} />
              </div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-post">{m.post}</div>
               
                <div className="team-description">{m.desc}</div>
                <div className="team-divider"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section">
        <h2 className="section-title">Customers <span>Say</span></h2>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div className="testimonial-card" key={t.name}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#ff0000', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>
                {t.photo}
              </div>
              <div className="team-name">{t.name}</div>
              <p style={{ marginTop: '10px', color: '#666' }}>"{t.review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section className="collab-section">
        <h2 style={{ textAlign: 'center', color: '#ff0000', marginBottom: '20px' }}>Our Collaborations</h2>
        <div className="collab-track">
          {[...brands, ...brands].map((b, i) => <span key={i}>{b}</span>)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2 className="section-title">Contact <span>Us</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '45px' }}>
          <div>
            <p><strong>📍 Address:</strong> Tokha, Kathmandu, Nepal</p>
            <p><strong>📞 Phone:</strong> 9813328713 / 9865914781</p>
            <p><strong>✉️ Email:</strong> joshisurendra567@gmail.com</p>
            <p><strong>⏰ Hours:</strong> Mon-Sat: 9AM - 7PM</p>
          </div>
          <div>
            <iframe
              src="https://maps.google.com/maps?q=Tokha%20Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" height="220"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen title="map"
            />
          </div>
        </div>
        <h3 style={{ textAlign: 'center', margin: '35px 0 25px' }}>Client Inquiry Form</h3>
        <div className="client-form">
          <form id="contactForm" onSubmit={handleFormSubmit}>
            <div className="form-group"><label>Full Name *</label><input type="text" id="fullName" required /></div>
            <div className="form-group"><label>Email *</label><input type="email" id="email" required /></div>
            <div className="form-group"><label>Phone *</label><input type="tel" id="phone" required /></div>
            <div className="form-group">
              <label>Choose Package</label>
              <select id="package">
                <option>Silver (NPR 42,000)</option>
                <option>Gold (NPR 78,000)</option>
                <option>Diamond (NPR 113,000)</option>
              </select>
            </div>
            <div className="form-group"><label>Event Location</label><input type="text" id="location" /></div>
            <div className="form-group"><label>Message</label><textarea id="message" rows="4"></textarea></div>
            <div style={{ textAlign: 'center' }}><button type="submit">Send Inquiry →</button></div>
            <div id="formStatus"></div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Nebula Production. All rights reserved. | Tokha, Kathmandu, Nepal</p>
        <div>
          <a href="https://wa.me/9813328713">💬 WhatsApp</a>
          <a href="https://www.facebook.com/nebula.production.com.np">📘 Facebook</a>
          <a href="https://www.tiktok.com/@nebula.production5">🎵 TikTok</a>
          <a href="https://www.youtube.com/@NebulaProduction-l4x">📺 YouTube</a>
        </div>
      </footer>
    </>
  );
}