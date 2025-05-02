import axiosInstance from "../utils/axiosInstance";

export const createComment = async (postId, comment, accessToken) => {
    return await axiosInstance.post(`/comments/create/${postId}`, comment, {
        headers: {
            Authorization: `Bearer: ${accessToken}`
        }
    })
}

export const getComments = async (postId, accessToken) => {
    return await axiosInstance.get(`/comments/get/${postId}`, {
        headers: {
            Authorization: `Bearer: ${accessToken}`
        }
    })
}

export const deleteComment = async (commentId, accessToken) => {
  return await axiosInstance.delete(`/comments/delete/${commentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};