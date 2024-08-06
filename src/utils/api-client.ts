import axios from 'axios';
// import { cookies } from 'next/headers';

const baseURL = process.env.NODE_ENV === "development"? 'http://localhost:4200' : 'http://localhost:4200'; // Replace with your API base URL
// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://grahsti-be.kalgury.in"|| 'http://localhost:4200'; // Replace with your API base URL

const apiClient = axios.create({
    baseURL,
    headers: {
        // authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxZTM4ZWE1ZC1kYmQ2LTQxMmEtYjFhYy0zZjgxOTc1YmE4NzEiLCJpYXQiOjE3MTQ3NzM0ODIsImV4cCI6MTcxODM3MzQ4Mn0.30RDIVpM6AwkSBlutqny8L9OVm0yIjz7vWO3S81qWew",
        // Add any default headers here (e.g., authorization token)
        'Content-Type': 'application/json',
    },
});

// Function to handle errors consistently
const handleError = (error: any) => {
    console.log(error);
    
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls outside the range of 2xx
        console.error(error?.response?.data);
        throw new Error(error.response?.data?.detail ||error.response?.data?.title || error.response?.data?.message || 'API request failed');
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in browser environments and an instance of http.Client in node.js environments
    console.error(error.request);
        throw new Error('No response received from API');
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        throw new Error('API request setup error');
    }
};

const getAuthorisationHeaders = () => {
    // const token = cookies().get("token")
    // return {
    //     authorisation : token
    // }
}

export const get = async (url: string, params = {},headers={}) => {

    try {
        const response = await apiClient.get(url, { params, headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const post = async (url: string, data: any, headers={}) => {
    try {
        const response = await apiClient.post(url, data,{headers});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const put = async (url: string, data: any, headers ={}) => {
    try {
        const response = await apiClient.put(url, data,{headers});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteRequest = async (url: string,headers={}) => {
    try {
        const response = await apiClient.delete(url,{headers});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default apiClient; // Optional: export the entire Axios instance
