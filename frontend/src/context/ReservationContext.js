import React, { createContext, useState } from 'react';

export const ReservationContext = createContext({
  reservations: [],
  pendingReservations: [],
  acceptReservation: () => {},
  rejectReservation: () => {},
});

export const ReservationProvider = ({ children }) => {
  // 🔹 accepted / active reservations
  const [reservations, setReservations] = useState([]);

  // 🔹 notification wali pending reservations
  const [pendingReservations, setPendingReservations] = useState([
    {
      id: '#R21',
      name: 'Rahul Sharma',
      guests: '4 Guests',
      datetime: 'Today • 8:30 PM',
      time: '1 min ago',
    },
    {
      id: '#R20',
      name: 'Anjali Verma',
      guests: '2 Guests',
      datetime: 'Tomorrow • 7:00 PM',
      time: '6 min ago',
    },
  ]);

  const acceptReservation = (reservation) => {
    setReservations(prev => [...prev, reservation]);
    setPendingReservations(prev =>
      prev.filter(r => r.id !== reservation.id)
    );
  };

  const rejectReservation = (id) => {
    setPendingReservations(prev =>
      prev.filter(r => r.id !== id)
    );
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,          // 👈 Dashboard length yahin se
        pendingReservations,   // 👈 Notification page
        acceptReservation,
        rejectReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
