// js/contact.js

// Reconstructs the contact email at runtime rather than writing it into the
// HTML as plain text, to cut down on address-harvesting bots that scrape
// raw page content.

window.addEventListener('DOMContentLoaded', () => {
    const user = 'fmsoper';
    const domain = 'outlook.com';
    const address = `${user}@${domain}`;

    const link = document.getElementById('email-link');
    const text = document.getElementById('email-text');
    link.href = `mailto:${address}`;
    text.textContent = address;
});