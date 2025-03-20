const API_URL = import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL; // API URL from .env file
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?"); // Check if API_URL is defined in the environment variables
const baseURL = `${API_URL}/posts`; // Base URL for the API, constructed using the API_URL environment variable

// Get all posts from the API
export const getPosts = async () => {
  // Fetch all posts from the API
  const res = await fetch(baseURL);

  // Check if the response is not ok  and throw an error if it is not
  if (!res.ok) {
    // Parse the error response and throw an error if it is not in the expected format
    const errorData = await res.json();
    // Check if the error response contains an error message
    if (!errorData.error) {
      // If the error response does not contain an error message, throw a generic error
      throw new Error("An error occurred while fetching the posts");
    }
    // If the error response contains an error message, throw the error message
    throw new Error(errorData.error);
  }
  // Parse the response data and return it
  const data = await res.json();
  // return the parsed data
  return data;
};

// Get a single post by ID from the API
export const getSinglePost = async (id) => {
  // Fetch a single post by ID from the API
  const res = await fetch(`${baseURL}/${id}`);
  // Check if the response is not ok and throw an error if it is not
  if (!res.ok) {
    // Parse the error response and throw an error if it is not in the expected format
    const errorData = await res.json();
    // Check if the error response contains an error message
    if (!errorData.error) {
      // If the error response does not contain an error message, throw a generic error
      throw new Error("An error occurred while fetching the post");
    }
    // If the error response contains an error message, throw the error message
    throw new Error(errorData.error);
  }
  // parse the response data to JSON
  const data = await res.json();
  // return the parsed data
  return data;
};

// Create a new post in the API
export const createPost = async (formData) => {
  // Fetch the API to create a new post
  // The method is set to POST to create a new resource
  // The headers specify that the request body is in JSON format
  // The body contains the form data converted to JSON format
  // The formData object should contain the data for the new post
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  // Check if the response is not ok and throw an error if it is not
  if (!res.ok) {
    // Parse the error response and throw an error if it is not in the expected format
    const errorData = await res.json();
    // Check if the error response contains an error message
    if (!errorData.error) {
      // If the error response does not contain an error message, throw a generic error
      throw new Error("An error occurred while creating the post");
    }
    // If the error response contains an error message, throw the error message
    throw new Error(errorData.error);
  }
  // Parse the response data json
  const data = await res.json();
  // return the parsed data
  return data;
};
