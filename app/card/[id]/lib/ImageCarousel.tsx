"use client";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import useEmblaCarousel from "embla-carousel-react";
import { getValidImageSrc } from "./index";
import { useState, useCallback, useEffect } from "react";
import "yet-another-react-lightbox/styles.css";

interface ImageCarouselProps {
  images: Array<{ id?: number; image: string }>;
  videos?: Array<{ id?: number; video: string }>;
  title: string;
}

type MediaItem = 
  | { type: 'image'; src: string; id?: number }
  | { type: 'video'; src: string; id?: number };

export function ImageCarousel({ images, videos = [], title }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    ...videos.map(vid => ({ type: 'video' as const, src: vid.video, id: vid.id })),
    ...images.map(img => ({ type: 'image' as const, src: img.image, id: img.id }))
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const handleResize = () => {
      emblaApi.reInit();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [emblaApi]);

  const lightboxSlides = images.map((img) => ({
    src: getValidImageSrc(img.image),
  }));

  const handleImageClick = useCallback((itemSrc: string) => {
    const imageIndex = images.findIndex(img => img.image === itemSrc);
    if (imageIndex !== -1) {
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  }, [images]);

  return (
    <>
      <div className="relative group">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative"
                style={{ aspectRatio: '16/9' }}
              >
                {(item.type === 'image') ? (
                  <div 
                    className="cursor-zoom-in w-full h-full relative"
                    onClick={() => {
                      handleImageClick(item.src);
                    }}
                  >
                    <Image
                      src={getValidImageSrc(item.src)}
                      alt={`${title} - фото ${index + 1}`}
                      fill
                      sizes="(max-width: 1300px) 100vw, 1300px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ) : (
                  <video
                    src={item.src}
                    controls
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: '#000' }}
                    preload="metadata"
                  >
                    Ваш браузер не поддерживает видео
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>

        {mediaItems.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                backgroundColor: "var(--card-bg)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                border: "1px solid var(--border-color)",
                opacity: 0.95,
              }}
              onClick={scrollPrev}
              aria-label="Предыдущее"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                backgroundColor: "var(--card-bg)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                border: "1px solid var(--border-color)",
                opacity: 0.95,
              }}
              onClick={scrollNext}
              aria-label="Следующее"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {mediaItems.map((item, index) => (
                <button
                  key={index}
                  className="rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === selectedIndex
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                    opacity: index === selectedIndex ? 1 : 0.5,
                    width: index === selectedIndex ? "24px" : "8px",
                    height: "8px",
                  }}
                  onClick={() => scrollTo(index)}
                  aria-label={`Перейти к ${item.type === 'image' ? 'фото' : 'видео'} ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </>
  );
}
