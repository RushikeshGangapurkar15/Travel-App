import axios from "axios";
// import querystring from "querystring";
// import CookieManager from "react-native-cookies";
export const API_BASE_URL = "http://10.0.2.2:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Use CookieManager to handle cookies
api.interceptors.request.use(async (config) => {
  // Get cookies and add them to the request headers
  const cookies = await CookieManager.get(API_BASE_URL);
  if (cookies && cookies.hasOwnProperty("Cookie")) {
    config.headers.Cookie = cookies.Cookie;
  }
  return config;
});

// Export the custom Axios instance
export default api;

export const signupUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signinUser = async (email, password) => {
  try {
    // console.log("id", response.data.id);
    const response = await axios.post(`${API_BASE_URL}/api/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBlogPost = async (title, content, image) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: image,
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/blogs/`,
      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogPost = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  id, // Include the user's ID
  name,
  first_name,
  last_name,
  phone_number,
  about
  // cover_image,
  // profile_image
) => {
  try {
    const formData = new FormData();
    // formData.append("id", id);
    formData.append("name", name);
    formData.append("firstName", first_name);
    formData.append("lastName", last_name);
    formData.append("phone", phone_number);
    formData.append("about", about);
    // formData.append("cover_image", cover_image);
    // formData.append("profile_image", profile_image);

    const response = await axios.patch(
      `${API_BASE_URL}/api/update-profile/${id}/`, // Provide the specific blog post ID to update
      {
        id,
        name,
        first_name,
        last_name,
        phone_number,
        about,
        // cover_image,
        // profile_image,

        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to JSON
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlogPost = async (id, title, content) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    const response = await axios.patch(
      `${API_BASE_URL}/blogs/${id}/`, // Provide the specific blog post ID to update
      {
        id,
        title,
        content,

        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to JSON
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateProfile = async (profileData) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", profileData.name);
//     formData.append("cover_image", profileData.cover_image); // Base64 image data
//     formData.append("profile_image", profileData.profile_image); // Base64 image data
//     formData.append("first_name", profileData.first_name);
//     formData.append("last_name", profileData.last_name);
//     formData.append("phone", profileData.phone);
//     formData.append("about", profileData.about);

//     const response = await axios.patch(
//       `${API_BASE_URL}/api/update-profile/${profileData.id}/`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
