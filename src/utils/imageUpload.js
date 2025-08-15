// Upload Image and return image url

import axios from "axios";

export const imageUpload = async (imageData) => {
    try {
        const imgData = new FormData();
        imgData.append('image', imageData);

        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_API_KEY}`, imgData);

        const imgURL = data.data.url;

        return imgURL;
    } catch (error) {
        console.error("Error uploading image:", error.message || error);
        return { error: "Image upload failed. Please try again." };
    }
};
