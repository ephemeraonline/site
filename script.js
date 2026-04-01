/* ==================================================
   FALLING STARS
================================================== */
const STAR_IMAGES = [
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_BLUE_STAR.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_GREEN_STAR.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_PINK_STAR.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_RED_STAR.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_ORANGE_STAR.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_STAR_PURPLE.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_STAR_YELLOW.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_STAR_WKDBLUE.png",
  "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/EPH_STAR_MAGENTA.png"
];

function spawnStars(count = 50) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const img = document.createElement("img");
    img.src = STAR_IMAGES[Math.floor(Math.random() * STAR_IMAGES.length)];

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.width = Math.random() * 18 + 12 + "px";
    star.style.animationDuration = Math.random() * 15 + 10 + "s";
    star.style.animationDelay = Math.random() * -15 + "s";

    star.appendChild(img);
    document.body.appendChild(star);
  }
}

spawnStars(50);

window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach((star) => {
    star.style.left = Math.random() * window.innerWidth + "px";
  });
});

/* ==================================================
   ORBIT HOVER RANDOMISER
================================================== */
(function setupRandomOrbitHover() {
  const orbits = Array.from(document.querySelectorAll(".orbit"));
  if (!orbits.length) return;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pickSign() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function applyRandom(el) {
    const w1 = rand(0.4, 1.2) * pickSign();
    const w2 = rand(0.6, 1.6) * pickSign();
    const w3 = rand(0.4, 1.4) * pickSign();
    const ws1 = rand(0.98, 1.04);
    const ws2 = rand(0.98, 1.04);
    const speed = rand(0.55, 1.05);

    el.style.setProperty("--w1", w1.toFixed(2) + "deg");
    el.style.setProperty("--w2", w2.toFixed(2) + "deg");
    el.style.setProperty("--w3", w3.toFixed(2) + "deg");
    el.style.setProperty("--ws1", ws1.toFixed(3));
    el.style.setProperty("--ws2", ws2.toFixed(3));
    el.style.setProperty("--wiggle-speed", speed.toFixed(2) + "s");
  }

  orbits.forEach((el) => {
    applyRandom(el);
    el.addEventListener("mouseenter", () => applyRandom(el), { passive: true });
  });
})();

/* ==================================================
   FLYERS POPUP
================================================== */
(function () {
  const trigger = document.getElementById("flyers-trigger");
  const overlay = document.getElementById("aero-gallery-overlay");
  const closeX = document.getElementById("aero-gallery-close-x");

  const flyerThumbs = document.querySelectorAll(".flyer-thumb");
  const flyerGrid = document.querySelector(".flyer-grid");
  const flyerIntro = document.querySelector(".flyer-intro");
  const flyerInlineView = document.getElementById("flyer-inline-view");
  const flyerInlineImg = document.getElementById("flyer-inline-img");
  const flyerInlineClose = document.getElementById("flyer-inline-close");
  const flyerBody = document.querySelector(".aero-gallery-body");

  if (!trigger || !overlay || !closeX) return;

  function lockFlyerStage() {
    document.body.style.overflow = "hidden";

    if (flyerBody) {
      flyerBody.style.overflow = "hidden";
      flyerBody.scrollTop = 0;
    }
  }

  function unlockFlyerStage() {
    document.body.style.overflow = overlay.classList.contains("is-open") ? "hidden" : "";

    if (flyerBody) {
      flyerBody.style.overflow = "auto";
    }
  }

  function openInlineFlyer(src, altText = "Expanded flyer preview") {
    if (!flyerInlineView || !flyerInlineImg) return;

    flyerInlineImg.src = src;
    flyerInlineImg.alt = altText;

    flyerInlineView.classList.add("is-open");
    flyerInlineView.setAttribute("aria-hidden", "false");

    if (flyerGrid) flyerGrid.classList.add("is-blurred");
    if (flyerIntro) flyerIntro.classList.add("is-blurred");

    lockFlyerStage();
  }

  function closeInlineFlyer() {
    if (!flyerInlineView || !flyerInlineImg) return;

    flyerInlineView.classList.remove("is-open");
    flyerInlineView.setAttribute("aria-hidden", "true");
    flyerInlineImg.src = "";

    if (flyerGrid) flyerGrid.classList.remove("is-blurred");
    if (flyerIntro) flyerIntro.classList.remove("is-blurred");

    unlockFlyerStage();
  }

  function open() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (flyerBody) {
      flyerBody.style.overflow = "auto";
    }

    closeX.focus();
  }

  function close() {
    closeInlineFlyer();
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (flyerBody) {
      flyerBody.style.overflow = "auto";
    }
  }

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  closeX.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  flyerThumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();

      const src = thumb.getAttribute("data-full") || thumb.getAttribute("href");
      const img = thumb.querySelector("img");
      const altText = img ? img.alt : "Expanded flyer preview";

      openInlineFlyer(src, altText);
    });
  });

  if (flyerInlineClose) {
    flyerInlineClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeInlineFlyer();
    });
  }

  if (flyerInlineView) {
    flyerInlineView.addEventListener("click", (e) => {
      if (e.target === flyerInlineView) {
        closeInlineFlyer();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      if (flyerInlineView && flyerInlineView.classList.contains("is-open")) {
        closeInlineFlyer();
      } else {
        close();
      }
    }
  });
})();

/* ==================================================
   MUSIC PLAYER (FIXED)
================================================== */
const mobile_track_name = document.querySelector("#mobile-player .songtitle");
const mobile_play_button = document.querySelector("#mobile-player .playpause-track");
const mobile_mute_icon = document.querySelector("#mobile-player .mute-track i");

let track_index = 0;
let isPlaying = false;

const curr_track = document.getElementById("music");

const track_list = [
  { name: "HYD - Angel", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "2Charm - prerogative", path: "https://files.catbox.moe/srlpzf.mp3" },
  { name: "Charli xcx - Sympathy is a knife featuring ariana grande", path: "https://files.catbox.moe/xlx839.mp3" },
  { name: "Mckayla Twiggs - What A Girl Wants", path: "https://files.catbox.moe/xw4kit.mp3" },
  { name: "Danny L Harle - Raft in the Sea Featuring Julia Michaels", path: "https://files.catbox.moe/7ehw00.mp3" },
  { name: "Slayyyter - GAS STATION", path: "https://files.catbox.moe/3ahhlz.mp3" },
  { name: "Justine Skye - Just A Girl", path: "https://files.catbox.moe/29chhm.mp3" },
  { name: "Daya - Bandit", path: "https://files.catbox.moe/lzmwtq.mp3" },
  { name: "Camila Cabello feat. JT & Yung Miami - Dade County Dreaming", path: "https://files.catbox.moe/ulber5.mp3" },
  { name: "Hemloke Springs - Sever the Blight", path: "https://files.catbox.moe/5zb6s6.mp3" },
  { name: "Addison Rae - Fame is a Gun", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Madison Beer - Yes Baby", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "5 Seconds of Summer - Boyband", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 14", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 15", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 16", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 17", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 18", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 19", path: "https://files.catbox.moe/sre606.mp3" },
  { name: "Placeholder Track 20", path: "https://files.catbox.moe/sre606.mp3" }
];

function syncUI() {
  if (mobile_track_name) {
    mobile_track_name.textContent = track_list[track_index].name;
  }

  if (mobile_play_button) {
    mobile_play_button.className = isPlaying
      ? "playpause-track fas fa-pause"
      : "playpause-track fas fa-play";
  }

  if (mobile_mute_icon && curr_track) {
    mobile_mute_icon.classList.toggle("fa-volume-mute", curr_track.muted);
    mobile_mute_icon.classList.toggle("fa-volume-up", !curr_track.muted);
  }
}

function loadTrack(index) {
  if (!curr_track) return;

  curr_track.src = track_list[index].path;
  curr_track.load();
  curr_track.onended = nextTrack;

  syncUI();
}

function playpauseTrack() {
  if (!curr_track) return;

  if (isPlaying) {
    curr_track.pause();
    isPlaying = false;
  } else {
    curr_track.play().then(() => {
      isPlaying = true;
      syncUI();
    }).catch(() => {
      isPlaying = false;
    });
  }

  syncUI();
}

function nextTrack() {
  track_index = (track_index + 1) % track_list.length;
  loadTrack(track_index);
  if (isPlaying) curr_track.play();
}

function prevTrack() {
  track_index = (track_index - 1 + track_list.length) % track_list.length;
  loadTrack(track_index);
  if (isPlaying) curr_track.play();
}

function toggleMute() {
  if (!curr_track) return;

  curr_track.muted = !curr_track.muted;
  syncUI();
}

/* ==================================================
   INIT (UPDATED: NO AUTOPLAY)
================================================== */
if (curr_track) {
  loadTrack(track_index);
  isPlaying = false;
  syncUI();
}

/* ==================================================
   LIVE AFFIRMATIONS DATE + TIME
================================================== */
(function () {
  const desktopClock = document.getElementById("live-date");
  const mobileClock = document.getElementById("live-date-mobile");

  if (!desktopClock && !mobileClock) return;

  function updateLiveDateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    });

    const dateString = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    const output = `${timeString}<br>${dateString}`;

    if (desktopClock) desktopClock.innerHTML = output;
    if (mobileClock) mobileClock.innerHTML = output;
  }

  updateLiveDateTime();
  setInterval(updateLiveDateTime, 1000);
})();

/* ==================================================
   EPHEMERA HEADER FADE / RETURN
   desktop only for now
================================================== */
(function () {
  const DESKTOP_BREAKPOINT = 769;

  const topHeader = document.querySelector(".image-header-top");
  const bottomHeader = document.querySelector(".image-header-bottom");
  const tableWrap = document.querySelector(".image-table-wrap");

  if (!topHeader || !bottomHeader || !tableWrap) return;

  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  function resetHeaderState() {
    topHeader.classList.remove("is-hidden");
    bottomHeader.classList.remove("is-visible");
    topHeader.style.opacity = "";
  }

  function handleEphemeraHeader() {
    if (!isDesktop()) {
      resetHeaderState();
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset;

    const fadeDistance = 260;
    const topOpacity = Math.max(0, 1 - scrollY / fadeDistance);

    topHeader.style.opacity = String(topOpacity);

    if (topOpacity <= 0.02) {
      topHeader.classList.add("is-hidden");
    } else {
      topHeader.classList.remove("is-hidden");
    }

    const tableRect = tableWrap.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const revealPoint = viewportHeight * 0.92;

    if (tableRect.bottom <= revealPoint) {
      bottomHeader.classList.add("is-visible");
    } else {
      bottomHeader.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", handleEphemeraHeader, { passive: true });
  window.addEventListener("resize", handleEphemeraHeader);
  window.addEventListener("load", handleEphemeraHeader);

  handleEphemeraHeader();
})();

/* ==================================================
   UNDER CONSTRUCTION WINDOW
   mobile trigger only
================================================== */
(function () {
  const trigger = document.getElementById("pikachu-trigger-mobile");
  const windowEl = document.getElementById("under-construction-window");
  const closeBtn = document.getElementById("close-under-construction-window");

  if (!trigger || !windowEl) return;

  function openWindow() {
    windowEl.classList.add("is-visible");
  }

  function closeWindow() {
    windowEl.classList.remove("is-visible");
  }

  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = windowEl.classList.contains("is-visible");

    if (isOpen) {
      closeWindow();
    } else {
      openWindow();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWindow();
    });
  }

  windowEl.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("keydown", function (e) {
    if (!windowEl.classList.contains("is-visible")) return;

    if (e.key === "Escape") {
      closeWindow();
    }
  });
})();

/* ==================================================
   PETS WINDOW
================================================== */
(function () {
  const triggers = document.querySelectorAll(".pets-window-trigger");
  const windowEl = document.getElementById("pets-window");
  const closeBtn = document.getElementById("close-pets-window");
  const prevBtn = document.getElementById("pets-prev");
  const nextBtn = document.getElementById("pets-next");
  const petImage = document.getElementById("pets-image");
  const petName = document.getElementById("pets-name");
  const petCaption = document.getElementById("pets-caption");

  const pets = [
    {
      name: "Daisy",
      image: "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/DAISY.png",
      caption: "gone but never forgotten, prayers up for this diva."
    },
    {
      name: "Toona",
      image: "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/PETS_PLACEHOLDER.png",
      caption: "sub copy here"
    },
    {
      name: "Pixel",
      image: "https://raw.githubusercontent.com/ephemeraonline/site/refs/heads/main/IMAGES/PETS_PLACEHOLDER.png",
      caption: "professionally cute and possibly in charge of the whole site."
    }
  ];

  let currentPetIndex = 0;

  if (!triggers.length || !windowEl) return;

  function renderPet(index) {
    if (!pets[index]) return;

    if (petImage) {
      petImage.src = pets[index].image;
      petImage.alt = pets[index].name;
    }

    if (petName) {
      petName.textContent = pets[index].name;
    }

    if (petCaption) {
      petCaption.textContent = pets[index].caption;
    }
  }

  function openWindow() {
    windowEl.classList.add("is-visible");
    renderPet(currentPetIndex);
  }

  function closeWindow() {
    windowEl.classList.remove("is-visible");
  }

  function showNextPet() {
    currentPetIndex = (currentPetIndex + 1) % pets.length;
    renderPet(currentPetIndex);
  }

  function showPrevPet() {
    currentPetIndex = (currentPetIndex - 1 + pets.length) % pets.length;
    renderPet(currentPetIndex);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();

      const isOpen = windowEl.classList.contains("is-visible");

      if (isOpen) {
        closeWindow();
      } else {
        openWindow();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeWindow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      showNextPet();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      showPrevPet();
    });
  }

  windowEl.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    closeWindow();
  });

  document.addEventListener("keydown", function (e) {
    if (!windowEl.classList.contains("is-visible")) return;

    if (e.key === "Escape") {
      closeWindow();
    }

    if (e.key === "ArrowRight") {
      showNextPet();
    }

    if (e.key === "ArrowLeft") {
      showPrevPet();
    }
  });

  renderPet(currentPetIndex);
})();

/* ==================================================
   COME BACK SOON WINDOW
   mobile trigger
================================================== */
(function () {
  const trigger = document.getElementById("come-back-soon-trigger-mobile");
  const windowEl = document.getElementById("come-back-soon-window");
  const closeBtn = document.getElementById("close-come-back-soon-window");

  if (!trigger || !windowEl) return;

  function openWindow() {
    windowEl.classList.add("is-visible");
  }

  function closeWindow() {
    windowEl.classList.remove("is-visible");
  }

  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = windowEl.classList.contains("is-visible");

    if (isOpen) {
      closeWindow();
    } else {
      openWindow();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWindow();
    });
  }

  windowEl.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    closeWindow();
  });

  document.addEventListener("keydown", function (e) {
    if (!windowEl.classList.contains("is-visible")) return;

    if (e.key === "Escape") {
      closeWindow();
    }
  });
})();

/* ==================================================
   ABOUT POPUP
================================================== */
(function () {
  const trigger = document.getElementById("about-trigger");
  const overlay = document.getElementById("about-overlay");
  const closeX = document.getElementById("about-close-x");

  if (!trigger || !overlay || !closeX) return;

  function open() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeX.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  closeX.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
  });
})();
