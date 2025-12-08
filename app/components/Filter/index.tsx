"use client";

import { FilterButton } from "@/app/components/Filter/ui/FilterButton";
import { FiltersModal } from "@/app/components/Filter/ui/FiltersModal";
import { ModalShell } from "@/app/components/Filter/ui/ModalShell";
import { ICardFilters } from "@/app/types";
import { useCallback, useEffect, useState } from "react";

interface FiltersPanelProps {
  onApplyFilters: (filters: ICardFilters) => void;
  currentFilters?: ICardFilters;
}

export default function FiltersPanel({
  onApplyFilters,
  currentFilters = {},
}: FiltersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ICardFilters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleApply = useCallback(
    (f: ICardFilters) => {
      setFilters(f);
      onApplyFilters(f);
      setIsOpen(false);
    },
    [onApplyFilters]
  );

  return (
    <>
      <FilterButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <ModalShell onClose={handleClose}>
          <FiltersModal
            initial={filters}
            onClose={handleClose}
            onApply={handleApply}
          />
        </ModalShell>
      )}
    </>
  );
}