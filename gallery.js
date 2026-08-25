const shots = [...document.querySelectorAll(".shot")].map((shot) => {
  const img = shot.querySelector("img");
  const caption = shot.querySelector("figcaption");
  return {
    src: img.src,
    alt: img.alt,
    caption: caption.textContent.trim(),
  };
});

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog.querySelector("img");
const dialogCaption = dialog.querySelector(".lightbox-caption");
const openers = document.querySelectorAll(".shot-open");

let index = 0;

function show(nextIndex) {
  index = (nextIndex + shots.length) % shots.length;
  const shot = shots[index];
  dialogImage.src = shot.src;
  dialogImage.alt = shot.alt;
  dialogCaption.textContent = shot.caption;
}

function openGallery(nextIndex) {
  show(nextIndex);
  if (!dialog.open) {
    dialog.showModal();
  }
}

openers.forEach((button) => {
  button.addEventListener("click", () => {
    openGallery(Number(button.dataset.galleryIndex));
  });
});

dialog.querySelector(".lightbox-close").addEventListener("click", () => {
  dialog.close();
});

dialog.querySelector(".lightbox-prev").addEventListener("click", () => {
  show(index - 1);
});

dialog.querySelector(".lightbox-next").addEventListener("click", () => {
  show(index + 1);
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") show(index - 1);
  if (event.key === "ArrowRight") show(index + 1);
});
