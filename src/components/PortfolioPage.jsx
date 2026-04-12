import '../styles/portfolio.css';

function getYoutubeEmbedUrl(url) {
  let videoId = '';
  if (url.includes('youtube.com/watch?v=')) videoId = url.split('v=')[1].split('&')[0];
  else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
  else videoId = url;
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function PortfolioPage({ portfolioPage, onBack }) {
  const { category, data, videos } = portfolioPage;

  return (
    <div className="portfolio-page">
      <div className="portfolio-page-header">
        <h2>{data.icon} {category} — {videos.length} Videos</h2>
        <button className="back-button" onClick={onBack}>← Back to Site</button>


    
      </div>

      {videos.length === 0 ? (
        <div className="no-videos">⚠️ No videos added yet.</div>
      ) : (
        <div className="video-grid-page">
          {videos.map((video, idx) => (
            <div className="video-card" key={idx}>
              <iframe
                src={getYoutubeEmbedUrl(video)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${category} video ${idx + 1}`}
              />
              <p>{category} - Video {idx + 1}</p>
              <small>📌 Edit this link in PORTFOLIO_VIDEOS section</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}