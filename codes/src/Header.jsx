function Header() {
    return (
      <>
         <header>   
            <nav aria-label="Main navigation">
                <a href="https://www.instagram.com/promisefeat/" className="logo-link">
                    <img className="logo" src="/images/logo/PF.icon-remove.bg.png" alt="Promise Feats Logo"/>
                </a>
        
                <ul className="nav-links" id="navLinks">
                    <li><a href="/codes/src/html/home-page.html" aria-current="page">HOME</a></li>
                    <li><a href="/codes/src/html/design.html">DESIGN</a></li>
                    <li><a href="/codes/src/html/store.html">STORE</a></li>
                    <li><a href="/codes/src/html/about-us.html">ABOUT US</a></li>
                </ul>
        
                <button className="menu-btn" id="menu-toggle" aria-label="Toggle navigation menu">
                    <i className="bx bx-menu"></i>
                </button>
            </nav>
         </header>
      </>
    );
}

export default Header;
