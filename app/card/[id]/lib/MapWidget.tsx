"use client";

import { useEffect, useRef } from "react";

interface MapWidgetProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export function MapWidget({ latitude, longitude, title, address }: MapWidgetProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;

    // Создаем скрипт для загрузки Яндекс.Карты
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU`;
    script.type = "text/javascript";
    
    script.onload = () => {
      // @ts-expect-error - Yandex Maps API not typed
      if (window.ymaps) {
        // @ts-expect-error - Yandex Maps API not typed
        window.ymaps.ready(() => {
          // @ts-expect-error - Yandex Maps API not typed
          const map = new window.ymaps.Map(mapRef.current, {
            center: [latitude, longitude],
            zoom: 15,
            controls: ["zoomControl", "fullscreenControl"],
          });

          // @ts-expect-error - Yandex Maps API not typed
          const placemark = new window.ymaps.Placemark(
            [latitude, longitude],
            {
              balloonContent: `<strong>${title}</strong><br>${address}`,
            },
            {
              preset: "islands#redDotIcon",
            }
          );

          map.geoObjects.add(placemark);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [latitude, longitude, title, address]);

  return (
    <div
      className="mt-6 rounded-2xl overflow-hidden shadow-md"
      style={{
        backgroundColor: "var(--card-bg)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="p-5">
        <h3
          className="text-xl font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          Расположение
        </h3>
        <div
          ref={mapRef}
          className="w-full h-[300px] md:h-[400px] rounded-lg"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        />
      </div>
    </div>
  );
}
