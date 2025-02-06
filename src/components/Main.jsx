import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";

const initialData = {
  id: 0,
  title: "",
  author: "",
  content: "",
  image: "",
  tags: "",
  category: "",
  available: false,
};

export default function Main() {
  const [formData, setFormData] = useState(initialData);

  const [postData, setPostData] = useState([]);

  // CRUD

  // index
  const fetchPosts = () => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setPostData(res.data));
  };

  // create
  const addPost = () => {
    axios
      .post("http://localhost:3000/posts", formData)
      .then((res) =>
        setPostData((currentPostData) => [...currentPostData, res.data.post])
      );
  };

  // delete
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then(() =>
        setPostData((currentPostData) =>
          currentPostData.filter((post) => post.id !== id)
        )
      );
  };

  // delete all
  const deleteList = () => {
    axios.delete("http://localhost:3000/posts").then(() => setPostData([]));
  };

  // STATE FUNCTIONS

  // onChange formData
  const handleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: value,
    }));
  };

  // to form's submit
  const handleSubmit = (e) => {
    e.preventDefault();

    addPost();

    // Reset input after submit
    setFormData(initialData);
  };

  // remove post (frontend)
  // const removePost = (id) => {
  //   const updatedPosts = postData.filter((post) => {
  //     return post.id !== id;
  //   });
  //   setPostData(updatedPosts);
  // };

  // remove every post (frontend)
  // const removeList = () => {
  //   setPostData([]);
  // };

  // get posts at the page's load
  useEffect(fetchPosts, []);

  return (
    <main>
      <section>
        <div className="container">
          <ul className="posts-list">
            {postData.map((post) => {
              return (
                <li key={post.id} className="post">
                  <a href={post.url} className="post__title">
                    <h2>{post.title}</h2>
                  </a>
                  <h3 className="padding-bottom-4">{post.author}</h3>
                  <div className="post__image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <p className="padding-bottom-4">{post.content}</p>
                  <p className="padding-bottom-4">
                    <strong>TAGS: </strong>
                    {post.tags}
                  </p>
                  <p className="padding-bottom-4">
                    <strong>Categoria: </strong>
                    {post.category}
                  </p>
                  <p className="padding-bottom-4">
                    {post.available ? "Pubblicato" : "Non pubblicato"}
                  </p>
                  <button
                    onClick={() => {
                      // removePost(post.id);
                      deletePost(post.id);
                    }}
                    className="post__btn--delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
          {postData.length > 0 && (
            <button className="post__btn--deleteList" onClick={deleteList}>
              Cancella lista
            </button>
          )}
        </div>
      </section>
      <hr />
      <section>
        <div className="container">
          {/* FORM */}

          <Form
            onSubmit={handleSubmit}
            className="form__addPost"
            formData={formData}
            handleFormData={handleFormData}
          />

          {/* /FORM */}
        </div>
      </section>
    </main>
  );
}
