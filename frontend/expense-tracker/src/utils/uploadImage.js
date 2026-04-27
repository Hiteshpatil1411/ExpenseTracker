import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage= async (imageFile) => {
    const formData = new FormData();
    //Append the image file to formData
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data; // Assuming the response contains the image URL in data
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export default uploadImage;