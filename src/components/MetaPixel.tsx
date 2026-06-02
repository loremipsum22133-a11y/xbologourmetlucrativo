import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    // Standard page view tracking for all routes in SPA
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  useEffect(() => {
    // Custom ViewContent event specifically for the main product page
    if (location.pathname === '/') {
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_name: 'X-Bolo Gourmet Lucrativo',
          content_category: 'Ebook / Course',
          currency: 'BRL',
          value: 97.00
        });
      }
    }
  }, [location.pathname]);

  return null;
}
