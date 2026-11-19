export interface EventResponse {
  id: number;
  organizerName: string;
  name: string;
  date: string;
  city: string;
  capacityMax: number;
  availableCapacity: number;
  basePrice: number;
  imageUrl: string;
  categoryId: number | null;
  categoryName: string | null;
}
