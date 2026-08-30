import { contact } from "@/data/contact";

export function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="contact-footer">
      <div className="contact-route" aria-hidden="true">
        <span className="contact-route-origin" />
        <span className="contact-route-turn" />
        <span className="contact-route-terminal" />
      </div>

      <div className="contact-composition">
        <h2 id="contact-title">{contact.statement}</h2>

        <div className="contact-channel">
          <span className="contact-channel-label">Contact</span>

          {contact.email.status === "verified" ? (
            <a
              className="contact-email"
              href={`mailto:${contact.email.address}`}
            >
              {contact.email.address}
            </a>
          ) : (
            <p className="contact-pending">
              <span aria-hidden="true" />
              {contact.pendingMessage}
            </p>
          )}

          {contact.links.length > 0 ? (
            <ul className="contact-social-links" aria-label="Social links">
              {contact.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="footer-metadata">
        <p>
          <span>© {year} Navin Kumar Yadav</span>
          <span>{contact.role}</span>
        </p>

        <nav aria-label="Footer navigation">
          <a href="#top">Top</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </footer>
  );
}
