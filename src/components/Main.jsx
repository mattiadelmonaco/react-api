import { useState } from "react";
import articles from "../data/articlesData";

export default function Main() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    available: false,
  });

  const [articlesData, setArticleData] = useState(articles);

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
      id: articlesData[articlesData.length - 1].id + 1,
      title: formData.title,
      url: "#",
      author: formData.author,
      content: formData.content,
      category: formData.category,
      available: formData.available,
    };

    e.preventDefault();

    setArticleData([...articlesData, newArticle]);

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
    const updatedArticles = articlesData.filter((article) => {
      return article.id !== id;
    });
    setArticleData(updatedArticles);
  };

  const removeList = () => {
    setArticleData([]);
  };

  return (
    <main>
      <section>
        <div className="container">
          <ul className="articles-list">
            {articlesData.map((article) => {
              return (
                <li key={article.id} className="article">
                  <a href={article.url} className="article__title">
                    <h2>{article.title}</h2>
                  </a>
                  <h3 className="padding-bottom-4">{article.author}</h3>
                  <p className="padding-bottom-4">{article.content}</p>
                  <p className="padding-bottom-4">{article.category}</p>
                  <p className="padding-bottom-4">
                    {article.available ? "Pubblicato" : "Non pubblicato"}
                  </p>
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="article__btn--delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
          {articlesData.length > 0 && (
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
