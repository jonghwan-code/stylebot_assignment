export interface GetKakaoImagesParams {
  query: string;
  page: number;
}

export interface GetKakaoResponse {
  documents: ImageProps[];
  meta: metaProps;
}

export interface ImageProps {
  collection: string;
  datetime: string;
  display_sitename: string;
  doc_url: string;
  height: number;
  image_url: string;
  thumbnail_url: string;
  width: number;
}

export interface metaProps {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}
