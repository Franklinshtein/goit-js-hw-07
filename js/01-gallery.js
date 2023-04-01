import { galleryItems } from "./gallery-items.js";

// знаходження галереї на сторінці
const gallery = document.querySelector(".gallery");

// створення розмітки галереї
const createGalleryMarkup = (items) =>
  items
    .map(
      ({ preview, original, description }) => `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
        </a>
      </div>
    `
    )
    .join("");

// додавання створеної розмітки до галереї
gallery.innerHTML = createGalleryMarkup(galleryItems);

// додавання слухача подій до галереї
gallery.addEventListener("click", (event) => {
  event.preventDefault(); // відміна поведінки за замовчуванням

  const { nodeName, dataset: { source } = {} } = event.target; // значення атрибуту data-source

  // перевірка чи клік був на зображенні
  if (nodeName !== "IMG" || !source) return;

  // створення шаблону випадаючого зображення
  const instance = basicLightbox.create(`<img src="${source}">`);

  // показ шаблону зображення
  instance.show();

  // додавання слухача подій для закриття шаблону
  document.addEventListener("keydown", closeModal);

  // закриття шаблону
  function closeModal({ key }) {
    if (key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeModal);
    }
  }
});

console.log(galleryItems);
