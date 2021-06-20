export interface AdminItems {
  id?: number | null,
  description?: string | null;
  imagePath?: string | null;
  name?: string | null;
  price?: {
    m?: number | null;
    l?: number | null;
  };
}