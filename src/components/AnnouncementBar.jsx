import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const announcements = [
  'FREE SHIPPING on orders over $50 | Use code SHIP50',
  'SUMMER SALE — Up to 55% OFF select items!',
  '30-Day Free Returns | 1 Year Guarantee',
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-primary text-white text-sm py-2.5 px-4 relative text-center">
      <p className="animate-fade-in" key={current}>{announcements[current]}</p>
      <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity" aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
