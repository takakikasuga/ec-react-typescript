export interface AdminItems {
  uniqueId?: string;
  id?: number | null;
  description?: string | null;
  imagePath?: string | null;
  name?: string | null;
  price?: {
    m?: number | null;
    l?: number | null;
  };
}

export interface FetchAdminItems {
  adminItems?: Array<AdminItems>;
}
