import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors";

class DoctorService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    // Add a request interceptor to include the auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Create a new doctor
  async createDoctor(doctorData) {
    try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);
    
      console.log("Making API request with data:", doctorData);
      const response = await this.api.post("/", doctorData);
      return response.data;
    } catch (error) {
      console.log("Full error response:", error.response?.data);
      throw this.handleError(error);
    }
  }

  // Get doctor by ID
  async getDoctor(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update doctor
  async updateDoctor(id, doctorData) {
    try {
      const response = await this.api.put(`/${id}`, doctorData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search doctors
  async searchDoctors(params) {
    try {
      const response = await this.api.get("/", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete doctor
  async deleteDoctor(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getHospitals() {
    try {
      const response = await axios.get("http://localhost:3000/api/hospitals");
      console.log("Hospital response:", response);
      return response.data.data;
    } catch (error) {
      console.error("Error in getHospitals:", error.response?.data || error);
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Log the full error response
      console.log("Error details:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      const message =
        error.response.data.message ||
        error.response.data.error ||
        "An error occurred";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
}

export default new DoctorService();
