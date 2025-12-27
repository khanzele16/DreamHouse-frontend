"use client";

import { useCallback, useEffect, useRef } from "react";
import { CardItemPreview } from "@/app/components/CardItemPreview";
import { CardSkeleton } from "@/app/components/CardSkeleton";
import { ICard } from "@/app/types/models";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { fetchCards } from "@/app/shared/redux/slices/cards";
import { ICardFilters } from "@/app/types";

interface VirtualizedCardListProps {
  filters: ICardFilters;
}

// Тестовые данные для демонстрации
const MOCK_CARDS: ICard[] = [
  {
    id: 1,
    title: "Алые Паруса",
    address: "Турали",
    description: "Современный жилой комплекс в центре города",
    price: "75000",
    rooms: 2,
    city: 1,
    house_type: "Многоквартирный",
    area: "65.5",
    building_material: "Кирпич",
    category: "Квартира",
    floors_total: 12,
    elevator: "Есть",
    parking: "Подземная",
    balcony: true,
    ceiling_height: "2.8",
    latitude: 42.9849,
    longitude: 47.5047,
    rating: "4.7",
    rating_count: 128,
    owner: "+79123456789",
    developer: { id: 1, name: "СтройИнвест", logo: "/placeholder.jpg" },
    images: [{ id: 1, image: "https://optim.tildacdn.com/stor3664-3966-4634-b239-663538366538/-/format/webp/27089237.jpg.webp" }],
    videos: [],
    documents: [],
    questions: [],
    recommendations: [],
    list_curations: [],
    renovation: "Евроремонт",
    created_at: "2025-01-01",
    is_favorite: false,
  },
  {
    id: 2,
    title: "Золотой Берег",
    address: "Махачкала, пр. Гамидова",
    description: "Элитный комплекс с видом на море",
    price: "95000",
    rooms: 3,
    city: 1,
    house_type: "Монолит",
    area: "82.3",
    building_material: "Монолит",
    category: "Апартаменты",
    floors_total: 18,
    elevator: "2 шт",
    parking: "Наземная",
    balcony: true,
    ceiling_height: "3.0",
    latitude: 42.9849,
    longitude: 47.5047,
    rating: "4.8",
    rating_count: 89,
    owner: "+79123456790",
    developer: { id: 2, name: "ПремиумСтрой", logo: "/placeholder.jpg" },
    images: [{ id: 2, image: "https://optim.tildacdn.com/stor3664-3966-4634-b239-663538366538/-/format/webp/27089237.jpg.webp" }],
    videos: [],
    documents: [],
    questions: [],
    recommendations: [],
    list_curations: [],
    renovation: "Под ключ",
    created_at: "2025-01-05",
    is_favorite: false,
  },
  {
    id: 3,
    title: "Виктория Парк",
    address: "Махачкала, ул. Ярагского",
    description: "Уютный жилой комплекс в зеленой зоне",
    price: "68000",
    rooms: 1,
    city: 1,
    house_type: "Панельный",
    area: "45.0",
    building_material: "Панель",
    category: "Квартира",
    floors_total: 9,
    elevator: "Есть",
    parking: "Во дворе",
    balcony: false,
    ceiling_height: "2.7",
    latitude: 42.9849,
    longitude: 47.5047,
    rating: "4.5",
    rating_count: 56,
    owner: "+79123456791",
    developer: { id: 3, name: "ГорСтрой", logo: "/placeholder.jpg" },
    images: [{ id: 3, image: "https://optim.tildacdn.com/stor3664-3966-4634-b239-663538366538/-/format/webp/27089237.jpg.webp" }],
    videos: [],
    documents: [],
    questions: [],
    recommendations: [],
    list_curations: [],
    renovation: "Без отделки",
    created_at: "2025-01-10",
    is_favorite: false,
  },
  {
    id: 4,
    title: "Резиденция Престиж",
    address: "Махачкала, р-н Учхоза",
    description: "Премиальное жилье бизнес-класса",
    price: "120000",
    rooms: 4,
    city: 1,
    house_type: "Монолит",
    area: "125.8",
    building_material: "Монолит-кирпич",
    category: "Пентхаус",
    floors_total: 20,
    elevator: "3 шт",
    parking: "Подземная 2 уровня",
    balcony: true,
    ceiling_height: "3.2",
    latitude: 42.9849,
    longitude: 47.5047,
    rating: "4.9",
    rating_count: 42,
    owner: "+79123456792",
    developer: { id: 4, name: "ЭлитСтрой", logo: "/placeholder.jpg" },
    images: [{ id: 4, image: "https://optim.tildacdn.com/stor3664-3966-4634-b239-663538366538/-/format/webp/27089237.jpg.webp" }],
    videos: [],
    documents: [],
    questions: [],
    recommendations: [],
    list_curations: [],
    renovation: "Дизайнерский",
    created_at: "2025-01-15",
    is_favorite: false,
  },
];

export function VirtualizedCardList({ filters }: VirtualizedCardListProps) {
  const dispatch = useAppDispatch();
  const {
    cards = [],
    loading,
    hasMore,
    page,
    error,
  } = useAppSelector((state) => state.cards);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  
  // Используем только тестовые данные
  const displayCards = MOCK_CARDS;
  
  // useEffect(() => {
  //   dispatch(fetchCards({ ...filters, page: 1, append: false }));
  // }, [dispatch, filters]);
  
  // const loadMore = useCallback(() => {
  //   if (loading || !hasMore || isLoadingRef.current) return;
  //   isLoadingRef.current = true;
  //   dispatch(fetchCards({ ...filters, page: page + 1, append: true })).finally(
  //     () => {
  //       isLoadingRef.current = false;
  //     }
  //   );
  // }, [dispatch, filters, page, hasMore, loading]);

  // useEffect(() => {
  //   if (observerRef.current) {
  //     observerRef.current.disconnect();
  //   }

  //   observerRef.current = new IntersectionObserver(
  //     (entries) => {
  //       const firstEntry = entries[0];
  //       if (firstEntry.isIntersecting && hasMore && !loading) {
  //         loadMore();
  //       }
  //     },
  //     {
  //       threshold: 0.1,
  //       rootMargin: "100px",
  //     }
  //   );

  //   if (loadMoreRef.current) {
  //     observerRef.current.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //   };
  // }, [hasMore, loading, loadMore]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
      {displayCards.map((card: ICard) => (
        <CardItemPreview key={card.id} card={card} />
      ))}
    </div>
  );
}
