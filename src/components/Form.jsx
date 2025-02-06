export default function Form({
  onSubmit,
  className,
  formData,
  handleFormData,
}) {
  return (
    <form onSubmit={onSubmit} className={className}>
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
      <button className="form__submitBtn" type="submit">
        Aggiungi articolo
      </button>
    </form>
  );
}
