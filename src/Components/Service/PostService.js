import axios from "axios";

export const getAllPosts = () => {
  return axios.get("/api/posts");
};

export const getSinglePost = (postId) => {
  return axios.get(`/api/posts/${postId}`);
};

export const createPost = ({ _id,content,img, token,userId, username, trending,createdAt,updatedAt }) => {
  return axios.post(
    "/api/posts",
    { postData: { _id:_id,content: content,img:img,userId:userId, username:username,trending:trending, createdAt:createdAt, updatedAt:updatedAt } },
    {
      headers: { authorization: token },
    }
  );
};

export const editPost = ({ token, postImage,  id, input }) => {
  return axios.post(
    `/api/posts/edit/${id}`,
    { postData: { content: input, postImage } },
    {
      headers: { authorization: token },
    }
  );
};


export const deletePost = ({ _id, token }) => {
  return axios.delete(`/api/posts/${_id}`, {
    headers: { authorization: token },
  });
};

export const likePost = ( _id, token  ) => {
  console.log("id===>"+_id)
  console.log("token===>"+token)
  return axios.post(
    `/api/posts/like/${_id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

export const dislikePost = ( _id, token ) => {
  return axios.post(
    `/api/posts/dislike/${_id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

export const addComment = ( postId, commentData, token ) => {
  console.log("add comm ");
  return axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    {
      headers: { authorization: token },

    }
  );
};

export const editComment = ({ token, commentData, postId, commentId }) => {
  return axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    { commentData },
    {
      headers: { authorization: token },
    }
  );
};

export const deleteComment = ({ token, postId, commentId }) => {
  return axios.post(
    `/api/comments/delete/${postId}/${commentId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

