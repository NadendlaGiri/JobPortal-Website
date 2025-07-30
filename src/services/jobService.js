import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const addJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};
