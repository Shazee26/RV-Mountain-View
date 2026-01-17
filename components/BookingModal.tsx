
import React, { useState } from 'react';
import Icon from './Icon';
import { supabase } from '../services/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      check_in: formData.get('checkIn'),
      check_out: formData.get('checkOut'),
      rv_type: formData.get('rvType'),
      guests: parseInt(formData.get('guests') as string, 10),
      created_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Booking submission error:', err);
      alert('There was an error submitting your request. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {isSuccess ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Icon name="Check" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-stone-900">Request Sent!</h3>
            <p className="text-stone-600">We've received your inquiry for Mountain View RV Park. Our team will contact you shortly to confirm your site availability.</p>
          </div>
        ) : (
          <>
            <div className="bg-emerald-700 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Book Your Site</h3>
                <p className="text-emerald-100 text-sm">Mountain View RV Park • Van Horn, TX</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase">Check-in</label>
                  <input name="checkIn" type="date" required className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase">Check-out</label>
                  <input name="checkOut" type="date" required className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase">RV Type</label>
                <select name="rvType" className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="Travel Trailer">Travel Trailer</option>
                  <option value="Fifth Wheel">Fifth Wheel</option>
                  <option value="Class A Motorhome">Class A Motorhome</option>
                  <option value="Class B/C Motorhome">Class B/C Motorhome</option>
                  <option value="Van / Truck Camper">Van / Truck Camper</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase">Guests</label>
                <div className="flex items-center gap-4">
                  <input name="guests" type="number" min="1" max="10" defaultValue="1" className="w-full px-4 py-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && <Icon name="Loader2" size={20} className="animate-spin" />}
                {isSubmitting ? 'Processing...' : 'Confirm Availability'}
              </button>
              
              <p className="text-center text-stone-400 text-xs">
                Submitting this form does not guarantee a reservation. We will call you to confirm site availability and payment.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
