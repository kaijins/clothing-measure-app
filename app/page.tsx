'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const MeasurementApp = dynamic(() => import('./components/MeasurementApp'), {
  ssr: false
})

export default function Page() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return <MeasurementApp />
}