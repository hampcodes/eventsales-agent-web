export interface EventRequest {
  name: string;
  date: string; // formato yyyy-MM-dd
  city: string;
  capacityMax: number;
  basePrice: number;
  imageUrl: string;
  categoryId: number | null;
}
