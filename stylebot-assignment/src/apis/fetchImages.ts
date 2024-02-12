import { GetKakaoImagesParams, GetKakaoResponse } from "../types/types";
import axios from "axios";

export const fetchImages = async ({ query, page }: GetKakaoImagesParams) => {
  const apiKey = process.env.REACT_APP_KAKAO_REST_API;
  const url = "https://dapi.kakao.com/v2/search/image";
  if (!Boolean(query)) {
    return { data: [], nextPageParam: undefined };
  }
  return axios
    .get<GetKakaoResponse>(url, {
      params: { query, page, size: 10 },
      headers: { Authorization: `KakaoAK ${apiKey}` },
    })
    .then(({ data }) => {
      return {
        data: data.documents,
        nextPageParam: data.meta.is_end ? undefined : page + 1,
      };
    });
};
