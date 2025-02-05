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

  const fetchPosts = () => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setPostData(res.data));
  };

  const handleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const newArticle = {
      id: postData[postData.length - 1].id + 1,
      title: formData.title,
      url: "#",
      author: formData.author,
      content: formData.content,
      category: formData.category,
      available: formData.available,
    };

    e.preventDefault();

    setPostData([...postData, newArticle]);

    // Reset input after submit
    setFormData({
      title: "",
      author: "",
      content: "",
      category: "",
      available: false,
    });
  };

  const removeArticle = (id) => {
    const updatedArticles = postData.filter((article) => {
      return article.id !== id;
    });
    setArticleData(updatedArticles);
  };

  const removeList = () => {
    setArticleData([]);
  };

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
                    {post.tags.join(", ")}
                  </p>
                  <p className="padding-bottom-4">
                    <strong>Categoria: </strong>
                    {post.category}
                  </p>
                  <p className="padding-bottom-4">
                    {post.available ? "Pubblicato" : "Non pubblicato"}
                  </p>
                  <button
                    onClick={() => removeArticle(post.id)}
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
            <textarea
              className="form__inputArea form__contentArea"
              type="text"
              name="content"
              placeholder="Inserisci contenuto nuovo articolo"
              value={formData.content}
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
                <option value="">---</option>
                <option value="FrontEnd">FrontEnd</option>
                <option value="BackEnd">BackEnd</option>
                <option value="UI/UX">UI/UX</option>
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
            <button className="form__submitBtn" type="submit">
              Aggiungi articolo
            </button>
          </form>

          {/* /FORM */}
        </div>
      </section>
    </main>
  );
}
