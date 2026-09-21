// Base URL for the backend API.
// Set VITE_API_BASE_URL in frontend/.env for local development, e.g.
// VITE_API_BASE_URL=http://localhost:3000
// Falls back to the deployed backend so production builds keep working.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://talentforge-8ag4.onrender.com";

export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;
