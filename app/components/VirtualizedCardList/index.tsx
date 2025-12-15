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

export function VirtualizedCardList({ filters }: VirtualizedCardListProps) {
  const dispatch = useAppDispatch();
  const {
    cards = [],
    loading,
    hasMore,
    page,
  } = useAppSelector((state) => state.cards);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  useEffect(() => {
    dispatch(fetchCards({ ...filters, page: 1, append: false }));
  }, [dispatch, filters]);
  const loadMore = useCallback(() => {
    if (loading || !hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    dispatch(fetchCards({ ...filters, page: page + 1, append: true })).finally(
      () => {
        isLoadingRef.current = false;
      }
    );
  }, [dispatch, filters, page, hasMore, loading]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadMore]);

  if (cards.length === 0 && !loading) {
    return (
      <div
        className="text-center py-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Карточки не найдены. Попробуйте изменить фильтры.
      </div>
    );
  }

  if (cards.length === 0 && loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
        {cards.map((card: ICard) => (
          <CardItemPreview key={card.id} card={card} />
        ))}
      </div>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full mt-5 sm:mt-6 lg:mt-[30px]">
          {[...Array(2)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}
    </>
  );
}
