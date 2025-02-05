import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    author: "",
    content: "",
    image: "",
    tags: "",
    category: "",
    available: false,
  });

  const [postData, setPostData] = useState([]);

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
        setPostData((currentPostData) => [...currentPostData, res.data])
      );
  };

  // delete
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) =>
        setPostData((currentPostData) =>
          currentPostData.filter((post) => post.id !== id)
        )
      );
  };

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

    const newArticle = {
      id: postData[postData.length - 1].id + 1,
      title: formData.title,
      image: formData.image,
      author: formData.author,
      content: formData.content,
      tags: formData.tags,
      category: formData.category,
      available: formData.available,
    };

    setPostData([...postData, newArticle]);

    // Reset input after submit
    setFormData({
      title: "",
      author: "",
      image: "",
      content: "",
      tags: "",
      category: "",
      available: false,
    });
  };

  // remove post (frontend)
  const removeArticle = (id) => {
    const updatedArticles = postData.filter((article) => {
      return article.id !== id;
    });
    setPostData(updatedArticles);
  };

  // remove every post (frontend)
  const removeList = () => {
    setPostData([]);
  };

  // get posts at the page's load
  useEffect(fetchPosts, []);

  return (
    <main>
      <section>
        <div className="container">
          <ul className="articles-list">
            {postData.map((post) => {
              return (
                <li key={post.id} className="article">
                  <a href={post.url} className="article__title">
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
                      removeArticle(post.id);
                      deletePost(post.id);
                    }}
                    className="article__btn--delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
          {postData.length > 0 && (
            <button className="article__btn--deleteList" onClick={removeList}>
              Cancella lista
            </button>
          )}
        </div>
      </section>
      <hr />
      <section>
        <div className="container">
          {/* FORM */}

          <form onSubmit={handleSubmit} className="form__addArticle">
            <input
              className="form__inputArea"
              type="text"
              name="title"
              placeholder="Inserisci titolo nuovo articolo"
              value={formData.title}
              onChange={handleFormData}
              required
            />
            <input
              className="form__inputArea"
              type="text"
              name="author"
              placeholder="Inserisci autore nuovo articolo"
              value={formData.author}
              onChange={handleFormData}
              required
            />
            <input
              className="form__inputArea"
              type="url"
              name="image"
              placeholder="Inserisci URL immagine"
              value={formData.image}
              onChange={handleFormData}
              required
            />
            <textarea
              className="form__inputArea form__contentArea"
              type="text"
              name="content"
              placeholder="Inserisci contenuto nuovo articolo"
              value={formData.content}
              onChange={handleFormData}
              required
            />
            <input
              className="form__inputArea"
              type="text"
              name="tags"
              placeholder="Inserisci i tag - ricorda di separarli con la virgola"
              value={formData.tags}
              onChange={handleFormData}
              required
            />
            <div className="form__select">
              <label htmlFor="category">Scegli una categoria:</label>
              <select
                id="category"
                name="category"
                className="form__inputArea form__inputArea--selector"
                value={formData.category}
                onChange={handleFormData}
                required
              >
                <option value="" disabled>
                  ---
                </option>
                <option value="Dolce">Dolce</option>
                <option value="Snack">Snack</option>
                <option value="Pasta">Pasta</option>
                <option value="Verdura">Verdura</option>
                <option value="Pesce">Pesce</option>
                <option value="Carne">Carne</option>
              </select>
            </div>
            <div className="form__checkbox">
              <label htmlFor="pubblicato">Pubblicato</label>
              <input
                id="pubblicato"
                type="checkbox"
                name="available"
                className="form__checkbox--input"
                checked={formData.available}
                onChange={handleFormData}
              />
            </div>
            <button onClick={addPost} className="form__submitBtn" type="submit">
              Aggiungi articolo
            </button>
          </form>

          {/* /FORM */}
        </div>
      </section>
    </main>
  );
}
