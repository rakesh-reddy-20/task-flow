import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Check if upload was successful and return the expected field
    return response.data; // Should contain `imageurl` or similar
  } catch (error) {
    console.error(
      "Image upload failed: ",
      error?.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
};

export default uploadImage;
