import { useContext, useEffect } from "react";
import { GlobalContext, IGlobalContent } from "../../context";
import axios from "axios";

import classes from "./styles.module.css";

import { FaTrash, FaEdit } from "react-icons/fa";
import { IFormData } from "../../interfaces/form";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext<IGlobalContent>(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get(
      `http://${location.hostname}:5000/api/blogs/`
    );

    const result = await response.data;
    if (result) {
      setBlogList(result.blogList);
    }
    setPending(false);
  }

  async function handleDeleteBlog(getCurrentId: string) {
    const response = await axios.delete(
      `http://${location.hostname}:5000/api/blogs/${getCurrentId}`
    );
    const result = await response.data;
    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  function handleEdit(getCurrentBlogItem: IFormData): void {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  return (
    <div className={classes.wrapper}>
      <h1>Blogs List</h1>
      {pending ? (
        <h1>Loading Blogs | please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList.length > 0 ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id!)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
}
