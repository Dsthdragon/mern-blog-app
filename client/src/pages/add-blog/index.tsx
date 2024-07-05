import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext, IGlobalContent } from "../../context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IFormData } from "../../interfaces/form";

export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext<IGlobalContent>(GlobalContext);
  const navigate = useNavigate();
  const loc = useLocation();

  async function handleSaveBlogToDatabase() {
    const response = await (isEdit
      ? axios.put(
          `http://${location.hostname}:5000/api/blogs/${
            (loc.state.getCurrentBlogItem as IFormData)._id
          }`,
          { ...formData }
        )
      : axios.post(`http://${location.hostname}:5000/api/blogs/`, {
          ...formData
        }));

    const result = await response.data;
    if (result) {
      setFormData({
        title: "",
        description: ""
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(loc);
    if (loc.state) {
      setIsEdit(true);
      const getCurrentBlogItem = loc.state.getCurrentBlogItem as IFormData;
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description
      });
    } else {
      setIsEdit(false);
    }
  }, [loc]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit" : "Add"} A Blog</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Blog Title"
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value
            })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit" : "Add"} Blog
        </button>
      </div>
    </div>
  );
}
