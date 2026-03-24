function Footer() {
    return (
        <footer>
            <div className="social-icons">
                <a href="https://www.facebook.com/promisefeat" target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
                <a href="https://twitter.com/promisefeat" target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-twitter"></ion-icon>
                </a>
                <a href="https://www.instagram.com/promisefeat" target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-instagram"></ion-icon>
                </a>
                <a href="https://www.linkedin.com/company/promisefeat" target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-linkedin"></ion-icon>
                </a>
            </div>

            <p>&copy; {new Date().getFullYear()} Promise Feats. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
