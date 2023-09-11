import React from 'react';

async function postData() {
  try {
    const response = await fetch('/api/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 28,
        departureAirport: "JFK",
        arrivalAirport: "LAX",
        departureDate: "2024-07-01",
        returnDate: "2024-07-05",
        price: 350,
      }),
    });

    const data = await response.json();
    console.log('Veri başarıyla gönderildi:', data);
  } catch (error) {
    console.error('Veri gönderilirken bir hata oluştu:', error);
  }
}

export default function AddData() {
  return (
    <div>
      <h1>Veri Ekleme Sayfası</h1>
      <button onClick={postData}>Ekle</button>
    </div>
  );
}