import css from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image.urls.regular)}
      />
    </div>
  );
}
