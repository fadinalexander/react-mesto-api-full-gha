import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__paragraph">© {currentYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
