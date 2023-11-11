import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    /* case "add_blogpost":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload.title,
          content: action.payload.content,
        },
      ]; */
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogposts");
      dispatch({
        type: "get_blogposts",
        payload: response.data,
      });
    } catch {
      (e) => console.log(e);
    }
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    /* dispatch({
      type: "add_blogpost",
      payload: { title: title, content: content },
    }); */
    try {
      await jsonServer.post("/blogposts", { title, content });
      callback && callback();
    } catch {
      (e) => console.log(e);
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    try {
      await jsonServer.delete(`/blogposts/${id}`);
      dispatch({ type: "delete_blogpost", payload: id });
    } catch {
      (e) => console.log(e);
    }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    try {
      await jsonServer.put(`/blogposts/${id}`, {
        title,
        content,
      });
      dispatch({
        type: "edit_blogpost",
        payload: { id, title, content },
      });
      callback && callback();
    } catch {
      (e) => console.log(e);
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
