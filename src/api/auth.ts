import { config } from "dotenv";

const requestURL = process.BASE_URL;

const request = async (endpoint: string, method = "GET", body: any = null) => {
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // cookies
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${requestURL}${endpoint}`, config);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error with request: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
