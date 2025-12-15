"use client";

import { ICardFilters } from "@/app/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function parseFiltersFromUrl(
  searchParams: URLSearchParams
): ICardFilters {
  const filters: ICardFilters = {};
  const city = searchParams.get("city");
  if (city) {
    const cityNum = Number(city);
    if ([1, 2, 3].includes(cityNum)) {
      filters.city = cityNum as 1 | 2 | 3;
    }
  }
  const category = searchParams.get("category");
  if (category && ["flat", "new_building"].includes(category)) {
    filters.category = category as "flat" | "new_building";
  }
  const house_type = searchParams.get("house_type");
  if (house_type && ["private", "apartment"].includes(house_type)) {
    filters.house_type = house_type as "private" | "apartment";
  }
  const elevator = searchParams.get("elevator");
  if (elevator && ["cargo", "none", "passenger"].includes(elevator)) {
    filters.elevator = elevator as "cargo" | "none" | "passenger";
  }
  const parking = searchParams.get("parking");
  if (parking && ["none", "underground"].includes(parking)) {
    filters.parking = parking as "none" | "underground";
  }
  const building_material = searchParams.get("building_material");
  if (
    building_material &&
    ["brick", "monolith", "panel"].includes(building_material)
  ) {
    filters.building_material = building_material as
      | "brick"
      | "monolith"
      | "panel";
  }
  const balcony = searchParams.get("balcony");
  if (balcony) filters.balcony = balcony === "true";
  const price_min = searchParams.get("price_min");
  if (price_min) filters.price_min = Number(price_min);

  const price_max = searchParams.get("price_max");
  if (price_max) filters.price_max = Number(price_max);

  const area_min = searchParams.get("area_min");
  if (area_min) filters.area_min = Number(area_min);

  const area_max = searchParams.get("area_max");
  if (area_max) filters.area_max = Number(area_max);

  const floors_min = searchParams.get("floors_min");
  if (floors_min) filters.floors_min = Number(floors_min);

  const floors_max = searchParams.get("floors_max");
  if (floors_max) filters.floors_max = Number(floors_max);

  const rooms_min = searchParams.get("rooms_min");
  if (rooms_min) filters.rooms_min = Number(rooms_min);

  const rooms_max = searchParams.get("rooms_max");
  if (rooms_max) filters.rooms_max = Number(rooms_max);

  return filters;
}

/**
 * Сериализует фильтры в URL параметры
 */
export function serializeFiltersToUrl(filters: ICardFilters): string {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", String(filters.city));
  if (filters.category) params.set("category", filters.category);
  if (filters.house_type) params.set("house_type", filters.house_type);
  if (filters.elevator) params.set("elevator", filters.elevator);
  if (filters.parking) params.set("parking", filters.parking);
  if (filters.building_material)
    params.set("building_material", filters.building_material);
  if (filters.balcony !== undefined) {
    params.set("balcony", String(filters.balcony));
  }
  if (filters.price_min !== undefined && filters.price_min !== null) {
    params.set("price_min", String(filters.price_min));
  }
  if (filters.price_max !== undefined && filters.price_max !== null) {
    params.set("price_max", String(filters.price_max));
  }
  if (filters.area_min !== undefined && filters.area_min !== null) {
    params.set("area_min", String(filters.area_min));
  }
  if (filters.area_max !== undefined && filters.area_max !== null) {
    params.set("area_max", String(filters.area_max));
  }
  if (filters.floors_min !== undefined && filters.floors_min !== null) {
    params.set("floors_min", String(filters.floors_min));
  }
  if (filters.floors_max !== undefined && filters.floors_max !== null) {
    params.set("floors_max", String(filters.floors_max));
  }
  if (filters.rooms_min !== undefined && filters.rooms_min !== null) {
    params.set("rooms_min", String(filters.rooms_min));
  }
  if (filters.rooms_max !== undefined && filters.rooms_max !== null) {
    params.set("rooms_max", String(filters.rooms_max));
  }

  return params.toString();
}

/**
 * Хук для работы с фильтрами через URL
 */
export function useFiltersFromUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ICardFilters>({});
  useEffect(() => {
    const parsedFilters = parseFiltersFromUrl(searchParams);
    setFilters(parsedFilters);
  }, [searchParams]);
  const updateFilters = useCallback(
    (newFilters: ICardFilters) => {
      setFilters(newFilters);
      const queryString = serializeFiltersToUrl(newFilters);
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  return { filters, updateFilters };
}
