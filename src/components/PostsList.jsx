export default function PostsList({ postData, deletePost }) {
  return (
    <ul className="posts-list">
      {postData.map((post) => {
        return (
          <li key={post.id} className="post">
            <a href="#" className="post__title">
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
  );
}
