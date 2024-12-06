import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <aside className="contain-icone">
        <a
          href="https://www.facebook.com/"
          aria-label="Suivez-nous sur Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.instagram.com/"
          aria-label="Suivez-nous sur Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://x.com/" aria-label="Suivez-nous sur Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </aside>
      <p>&copy; 2024 E-change - Benjamin carderon - All rights reserved.</p>
    </footer>
  );
}

export default Footer;
