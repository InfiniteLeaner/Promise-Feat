import Header from "./Header";
import Footer from "./footer";

function App() {
  return (
    <>
      <Header />

      {/* Video Background */}
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline 
        src="/promise-feat-videos/ads-videos/seasonal-ads/thank-you-for-an-absolutely-beautiful-2025..mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <main id="main-content" className="hero-content">
        <h1 className="hero-title">Welcome To Promise Feats</h1>
        <h4 className="hero-subtitle">
          Your destination for quality products & services
        </h4>
        <a href="/codes/src/html/login.html" className="login-btn">
          Login / Register
        </a>
      </main>

      <Footer />
    </>
  );
}

export default App;
