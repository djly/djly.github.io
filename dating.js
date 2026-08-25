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

  // Undoes the promotion to viewport-fixed positioning, returning the
  // button to its plain CSS resting spot next to the like button. Used on
  // resize/orientation change and whenever the match overlay closes, so
  // there's never a state where it's stranded off-screen.
  function resetToRestingSpot() {
    dislikeBtn.classList.remove("is-fleeing");
    dislikeBtn.style.left = "";
    dislikeBtn.style.top = "";
    dodgeCount = 0;
  }

  function dodge() {
    if (matched || dodging) return;
    dodging = true;

    // First escape: capture wherever it's actually sitting right now (its
    // ordinary CSS position) before switching to position:fixed, so the
    // switch itself never causes a jump — only the dodge after it moves.
    if (!dislikeBtn.classList.contains("is-fleeing")) {
      const startRect = dislikeBtn.getBoundingClientRect();
      dislikeBtn.style.left = `${startRect.left}px`;
      dislikeBtn.style.top = `${startRect.top}px`;
      dislikeBtn.classList.add("is-fleeing");
      void dislikeBtn.offsetWidth; // force layout before the next style change
    }

    const w = dislikeBtn.offsetWidth || 67;
    const h = dislikeBtn.offsetHeight || 67;
    const margin = 16;
    const maxLeft = Math.max(margin, window.innerWidth - w - margin);
    const maxTop = Math.max(72, window.innerHeight - h - margin);
    dislikeBtn.style.left = `${margin + Math.random() * (maxLeft - margin)}px`;
    dislikeBtn.style.top = `${72 + Math.random() * (maxTop - 72)}px`;

    dodgeCount += 1;
    setStatus(taunts[Math.min(dodgeCount - 1, taunts.length - 1)]);

    window.setTimeout(() => {
      dodging = false;
    }, 240);
  }

  if (reduceMotion) {
    // Respect reduced motion: no animated chase, just a static dead control.
    dislikeBtn.addEventListener("click", () => {
      setStatus("That one doesn't do anything. The heart does.");
    });
  } else {
    window.addEventListener("resize", () => {
      if (!matched) resetToRestingSpot();
    });
    window.addEventListener("orientationchange", () => {
      if (!matched) window.setTimeout(resetToRestingSpot, 50);
    });

    document.addEventListener("pointermove", (event) => {
      if (matched) return;
      const rect = dislikeBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
      if (distance < 90) dodge();
    });

    // pointerdown covers touch too: on a phone there's no hover to react to
    // before contact, so the earliest possible signal is the touch itself —
    // this still moves it before the matching pointerup/click can land.
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
    if (!reduceMotion) resetToRestingSpot();
  }

  // Not written as plain HTML for the same reason as the rest of the
  // site's footer — contact.js assembles the address the same way.
  const emailUser = "davidly16";
  const emailHost = ["gmail", "com"].join(".");
  const emailAddress = `${emailUser}@${emailHost}`;

  const emailLink = document.getElementById("match-email");
  const copyBtn = document.getElementById("match-copy");

  if (emailLink) {
    const subject = encodeURIComponent("It's a match (davidly.ca/dating)");
    const body = encodeURIComponent("Hey David — your ✕ button is broken, so here I am.\n\n");
    emailLink.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  if (copyBtn) {
    const defaultLabel = copyBtn.textContent;
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyBtn.textContent = "Copied ✓";
      } catch (err) {
        copyBtn.textContent = emailAddress;
      }
      copyBtn.classList.add("is-confirmed");
      window.setTimeout(() => {
        copyBtn.textContent = defaultLabel;
        copyBtn.classList.remove("is-confirmed");
      }, 1800);
    });
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
