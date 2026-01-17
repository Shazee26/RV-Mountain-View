
import React from 'react';
import Icon from './Icon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-emerald-700 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">Book Your Site</h3>
            <p className="text-emerald-100 text-sm">Mountain View RV Park • Van Horn, TX</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Booking request sent! We will contact you shortly.'); onClose(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Check-in</label>
              <input type="date" required className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Check-out</label>
              <input type="date" required className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase">RV Type</label>
            <select className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>Travel Trailer</option>
              <option>Fifth Wheel</option>
              <option>Class A Motorhome</option>
              <option>Class B/C Motorhome</option>
              <option>Van / Truck Camper</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase">Guests</label>
            <div className="flex items-center gap-4">
              <input type="number" min="1" max="10" defaultValue="1" className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20">
            Confirm Availability
          </button>
          
          <p className="text-center text-stone-400 text-xs">
            Submitting this form does not guarantee a reservation. We will call you to confirm site availability and payment.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
