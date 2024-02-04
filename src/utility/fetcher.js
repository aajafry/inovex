import axios from 'axios';

const tokenGenerator = async (...args) => {
    try {
      const response = await axios.post(...args);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
};

const fetcher = async (URL,  authToken) => {
  try {
    const response = await axios.get(URL,  {headers: { Authorization: "Bearer " + authToken}});
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


const postGenerator = async (...args) => {
  try {
    const response = await axios.post(...args);
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export {
  fetcher, postGenerator, tokenGenerator
};

