(function () {
  const dislikeBtn = document.getElementById("dislike-btn");
  const likeBtn = document.getElementById("like-btn");
  const statusEl = document.getElementById("dating-status");
  const overlay = document.getElementById("match-overlay");
  const closeBtn = document.getElementById("match-close");

  if (!dislikeBtn || !likeBtn || !statusEl || !overlay) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const taunts = [
    "Nice try.",
    "Not today.",
    "There's only one option here.",
    "So close. Almost.",
    "The heart's right there →",
    "This button has trust issues.",
    "It's not you, it's the code.",
    "Okay, that one was actually close.",
  ];

  let dodgeCount = 0;
  let dodging = false;
  let matched = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function place(left, top) {
    dislikeBtn.style.left = `${left}px`;
    dislikeBtn.style.top = `${top}px`;
  }

  function placeInitial() {
    const likeRect = likeBtn.getBoundingClientRect();
    const w = dislikeBtn.offsetWidth || 67;
    place(Math.max(12, likeRect.left - w - 16), likeRect.top);
  }

  function dodge() {
    if (matched || dodging) return;
    dodging = true;

    const w = dislikeBtn.offsetWidth || 67;
    const h = dislikeBtn.offsetHeight || 67;
    const margin = 16;
    const maxLeft = Math.max(margin, window.innerWidth - w - margin);
    const maxTop = Math.max(72, window.innerHeight - h - margin);
    const left = margin + Math.random() * (maxLeft - margin);
    const top = 72 + Math.random() * (maxTop - 72);
    place(left, top);

    dodgeCount += 1;
    setStatus(taunts[Math.min(dodgeCount - 1, taunts.length - 1)]);

    window.setTimeout(() => {
      dodging = false;
    }, 240);
  }

  // Web fonts swapping in (or images loading) can reflow the layout after
  // the initial placement runs, stranding the button at a stale position.
  // Re-settle until the first real dodge happens; after that, a random
  // position is the point, so leave it alone.
  function resettleIfUndodged() {
    if (!matched && dodgeCount === 0) placeInitial();
  }

  if (reduceMotion) {
    // Respect reduced motion: no animated chase, just a static dead control.
    dislikeBtn.style.transition = "none";
    placeInitial();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resettleIfUndodged);
    }
    window.addEventListener("load", resettleIfUndodged);
    dislikeBtn.addEventListener("click", () => {
      setStatus("That one doesn't do anything. The heart does.");
    });
  } else {
    placeInitial();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resettleIfUndodged);
    }
    window.addEventListener("load", resettleIfUndodged);
    window.addEventListener("resize", () => {
      if (!matched) placeInitial();
    });
    window.addEventListener("orientationchange", () => {
      if (!matched) window.setTimeout(placeInitial, 50);
    });

    document.addEventListener("pointermove", (event) => {
      if (matched) return;
      const rect = dislikeBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
      if (distance < 90) dodge();
    });

    dislikeBtn.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      dodge();
    });

    dislikeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      dodge();
    });
  }

  function openMatch() {
    matched = true;
    overlay.classList.add("is-open");
    overlay.querySelector(".match-card").focus();
  }

  function closeMatch() {
    matched = false;
    overlay.classList.remove("is-open");
    if (!reduceMotion) placeInitial();
  }

  likeBtn.addEventListener("click", openMatch);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMatch);
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeMatch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && matched) closeMatch();
  });
})();
