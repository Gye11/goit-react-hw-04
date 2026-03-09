import axios from "axios";

const API_KEY = "BURAYA_UNSPLASH_KEY";

export const fetchImages = async (query, page) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });

  return response.data;
};
