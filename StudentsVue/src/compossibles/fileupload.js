// useFileUpload.js
import { ref } from "vue";
import axios from "axios";
// import axiosInst from "@/services/api";//

const api = axios.create({
    baseURL: 'http://localhost:8000/product_api/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default function useFileUpload() {
  const isUploading = ref(false);
  const uploadedFilesUrls = ref([]);
  const uploadErrors = ref([]);

  const uploadFiles = async (files) => {
    isUploading.value = true;
    uploadedFilesUrls.value = []; // Reset previously uploaded files URLs
    uploadErrors.value = []; // Reset previous errors

    // Loop through each file and upload it
    for (const file of files) {
      const formData = new FormData();
      formData.append("file_url", file);

      try {
        const response = await api.post("uploads/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedFilesUrls.value.push(response.data.file_url); // Save successfully uploaded file URL
      } catch (error) {
        console.error("File upload error:", error);
        uploadErrors.value.push({ file, error }); // Save the error for this file
      }
    }

    isUploading.value = false;
  };

  return { isUploading, uploadedFilesUrls, uploadFiles };
}
