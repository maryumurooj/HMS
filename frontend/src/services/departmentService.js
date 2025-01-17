import axios from "axios";

const API_URL = "http://localhost:3000/api/department";

class DepartmentService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    // Add request interceptor for auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Create department
  async createDepartment(departmentData) {
    try {
      const response = await this.api.post("/", departmentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all departments
  async getDepartments() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update department
  async updateDepartment(id, departmentData) {
    try {
      const response = await this.api.put(`/${id}`, departmentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete department
  async deleteDepartment(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      console.log("Error details:", {
        status: error.response.status,
        data: error.response.data,
      });
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
}

export default new DepartmentService();
