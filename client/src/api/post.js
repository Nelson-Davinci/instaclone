import axiosInstance from "../utils/axiosInstance";

export const createPost = async (formData, accessToken) => {
  return await axiosInstance.post("/post/create", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAllPosts = async (page, limit, accessToken) => {
  return await axiosInstance.get(`/post/get?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const handlePostLikes = async (postId, accessToken) => {
  return await axiosInstance.patch(
    `/post/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const handleSavePost = async (postId, accessToken) => {
  return await axiosInstance.patch(
    `/post/save/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const seePostLikes = async (postId, accessToken) => {
  return await axiosInstance.get(`/post/see-who-liked/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAPost = async (postId, accessToken) => {
  return await axiosInstance.get(`/post/get/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


export const deletePost = async (postId, accessToken) => {
  return await axiosInstance.delete(`/post/delete/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};