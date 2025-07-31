import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 mt-5 text-center">
      <p>📍 Annapurna Rice and General Stores</p>
      <p>📞 9951226232</p>
      <p>📞 9390502418 </p>
      <p>🧑 Owner: B.Mohan Krishna</p>
      <div className="mt-3 d-flex justify-content-center">
        <iframe
          title="Annapurna Shop Location"
          width="100%"
          height="200"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3825.0662044559326!2d80.679947!3d16.522755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMxJzIxLjkiTiA4MMKwNDAnNDcuOCJF!5e0!3m2!1sen!2sin!4v1753985776796!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
