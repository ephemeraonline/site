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

  trigger.addEventListener("click", function (e) {
	e.preventDefault();
	open();
  });

  closeX.addEventListener("click", function (e) {
	e.preventDefault();
	close();
  });

  overlay.addEventListener("click", function (e) {
	if (e.target === overlay) close();
  });

  document.addEventListener("keydown", function (e) {
	if (!overlay.classList.contains("is-open")) return;
	if (e.key === "Escape") close();
  });
})();

/* ==================================================
   FLYER LIGHTBOX / ZOOM
================================================== */
(function () {
  const thumbs = Array.from(document.querySelectorAll(".flyer-thumb"));
  const lightbox = document.getElementById("flyer-lightbox");
  const lightboxImg = document.getElementById("flyer-lightbox-img");
  const lightboxClose = document.getElementById("flyer-lightbox-close");

  if (!thumbs.length || !lightbox || !lightboxImg || !lightboxClose) return;

  function openLightbox(src, altText) {
	lightboxImg.src = src;
	lightboxImg.alt = altText || "Expanded flyer";
	lightboxImg.classList.remove("is-zoomed");
	lightbox.classList.add("is-open");
	lightbox.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
	lightbox.classList.remove("is-open");
	lightbox.setAttribute("aria-hidden", "true");
	lightboxImg.classList.remove("is-zoomed");
	lightboxImg.src = "";
	document.body.style.overflow = "";
  }

  thumbs.forEach((thumb) => {
	thumb.addEventListener("click", function (e) {
	  e.preventDefault();
	  const img = thumb.querySelector("img");
	  const fullSrc = thumb.getAttribute("data-full") || thumb.getAttribute("href");
	  openLightbox(fullSrc, img ? img.alt : "Expanded flyer");
	});
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
	if (e.target === lightbox) closeLightbox();
  });

  lightboxImg.addEventListener("click", function (e) {
	e.stopPropagation();
	lightboxImg.classList.toggle("is-zoomed");
  });

  document.addEventListener("keydown", function (e) {
	if (!lightbox.classList.contains("is-open")) return;
	if (e.key === "Escape") closeLightbox();
  });
})();

/* ==================================================
   ABOUT OVERLAY
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

  trigger.addEventListener("click", function (e) {
	e.preventDefault();
	open();
  });

  closeX.addEventListener("click", function (e) {
	e.preventDefault();
	close();
  });

  overlay.addEventListener("click", function (e) {
	if (e.target === overlay) close();
  });

  document.addEventListener("keydown", function (e) {
	if (!overlay.classList.contains("is-open")) return;
	if (e.key === "Escape") close();
  });
})();

/* ==================================================
   MUSIC PLAYER
================================================== */
const track_name = document.querySelector("#player-drag .songtitle");
const seek_slider = document.querySelector("#player-drag .seek_slider");
const curr_time = document.querySelector("#player-drag .current-time");
const total_duration = document.querySelector("#player-drag .total-duration");

const mobile_track_name = document.querySelector("#mobile-player .songtitle");
const mobile_play_button = document.querySelector("#mobile-player .playpause-track");

let track_index = 0;
let isPlaying = false;
let updateTimer = null;

const curr_track = document.getElementById("music");

const track_list = [
  { name: "Charli xcx - Sympathy is knife featuring ariana grande", path: "https://files.catbox.moe/xlx839.mp3" },
  { name: "Mckayla Twiggs - What A Girl Wants", path: "https://files.catbox.moe/xw4kit.mp3" },
  { name: "Danny L Harle - Raft in the Sea Featuring Julia Michaels", path: "https://files.catbox.moe/7ehw00.mp3" },
  { name: "2charm - prerogative", path: "https://files.catbox.moe/srlpzf.mp3" },
  { name: "Mercy On Me - The Cat's Whiskers", path: "https://files.catbox.moe/w7nnf9.mp3" }
];

function syncDesktopPlayerUI() {
  const desktopPlayButton = document.querySelector("#player-drag .playpause-track");
  if (desktopPlayButton) {
	desktopPlayButton.className = isPlaying
	  ? "playpause-track fas fa-pause"
	  : "playpause-track fas fa-play";
  }

  if (track_name) {
	track_name.textContent = track_list[track_index].name;
  }
}

function syncMobilePlayerUI() {
  if (mobile_track_name) {
	mobile_track_name.textContent = track_list[track_index].name;
  }

  if (mobile_play_button) {
	mobile_play_button.className = isPlaying
	  ? "playpause-track fas fa-pause"
	  : "playpause-track fas fa-play";
  }
}

function syncAllPlayerUI() {
  syncDesktopPlayerUI();
  syncMobilePlayerUI();
}

function resetValues() {
  if (curr_time) curr_time.textContent = "0:00";
  if (total_duration) total_duration.textContent = "0:00";
  if (seek_slider) seek_slider.value = 0;
}

function loadTrack(index) {
  if (!curr_track) return;

  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[index].path;
  curr_track.load();
  curr_track.onended = nextTrack;

  syncAllPlayerUI();

  updateTimer = setInterval(seekUpdate, 1000);
}

function playpauseTrack() {
  if (!curr_track) return;
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  if (!curr_track) return;

  curr_track.play();
  isPlaying = true;
  syncAllPlayerUI();
}

function pauseTrack() {
  if (!curr_track) return;

  curr_track.pause();
  isPlaying = false;
  syncAllPlayerUI();
}

function nextTrack() {
  track_index = track_index < track_list.length - 1 ? track_index + 1 : 0;
  loadTrack(track_index);
  if (isPlaying) playTrack();
}

function prevTrack() {
  track_index = track_index > 0 ? track_index - 1 : track_list.length - 1;
  loadTrack(track_index);
  if (isPlaying) playTrack();
}

let currentVolume = curr_track ? curr_track.volume : 1;

function volumeUp() {
  if (!curr_track) return;

  currentVolume = Math.min(1, currentVolume + 0.2);
  curr_track.volume = currentVolume;
}

function volumeDown() {
  if (!curr_track) return;

  currentVolume = Math.max(0, currentVolume - 0.2);
  curr_track.volume = currentVolume;
}

function seekTo() {
  if (!curr_track || !seek_slider || isNaN(curr_track.duration)) return;

  const seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  if (!curr_track || !seek_slider || !curr_time || !total_duration) return;
  if (isNaN(curr_track.duration)) return;

  const seekPosition = curr_track.currentTime * (100 / curr_track.duration);
  seek_slider.value = seekPosition;

  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(curr_track.duration / 60);
  let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
  if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

  curr_time.textContent = currentMinutes + ":" + currentSeconds;
  total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

if (curr_track) {
  loadTrack(track_index);
  syncAllPlayerUI();
}

/* ==================================================
   MOBILE SCALE LAYOUT
================================================== */
let mobileScaleRaf = null;

function applyMobileScale() {
  const stage = document.getElementById("scale-stage");
  const shell = document.getElementById("scale-shell");
  const root = document.getElementById("scale-root");

  if (!stage || !shell || !root) return;

  const DESIGN_WIDTH = 1400;
  const mobileWidth = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
  const isMobile = mobileWidth <= 768;

  if (!isMobile) {
	shell.style.transform = "none";
	shell.style.webkitTransform = "none";
	stage.style.height = "auto";
	stage.style.minHeight = "";
	return;
  }

  const scale = mobileWidth / DESIGN_WIDTH;

  shell.style.transform = `scale(${scale}) translateZ(0)`;
  shell.style.webkitTransform = `scale(${scale}) translateZ(0)`;

  requestAnimationFrame(() => {
	const unscaledHeight = root.offsetHeight;
	const scaledHeight = Math.ceil(unscaledHeight * scale);

	stage.style.height = scaledHeight + "px";
	stage.style.minHeight = scaledHeight + "px";
  });
}

function queueMobileScale() {
  if (mobileScaleRaf) cancelAnimationFrame(mobileScaleRaf);

  mobileScaleRaf = requestAnimationFrame(() => {
	applyMobileScale();
	mobileScaleRaf = null;
  });
}

window.addEventListener("load", queueMobileScale);
window.addEventListener("resize", queueMobileScale);
window.addEventListener("orientationchange", () => {
  queueMobileScale();
  setTimeout(queueMobileScale, 250);
  setTimeout(queueMobileScale, 700);
});

setTimeout(queueMobileScale, 300);
setTimeout(queueMobileScale, 800);
setTimeout(queueMobileScale, 1400);

/* ==================================================
   LIVE DATE
================================================== */
function updateLiveDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();

  const hours24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const ampm = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;

  const line = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " " + ampm;
  const el = document.getElementById("live-date");
  if (el) el.textContent = line;
}

updateLiveDate();
setInterval(updateLiveDate, 60000);

/* ==================================================
   DOWNLOAD WINDOW
================================================== */
function openDownloadWindow() {
  const overlay = document.getElementById("download-overlay");
  const error = document.getElementById("download-error");

  if (!overlay) return;

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (error) error.style.display = "none";
}

function closeDownloadWindow() {
  const overlay = document.getElementById("download-overlay");
  if (!overlay) return;

  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function checkDownload() {
  const passInput = document.getElementById("download-pass");
  const error = document.getElementById("download-error");

  if (!passInput) return;

  if (passInput.value === "ephemera") {
	window.location.href = "YOUR_FILE_LINK_HERE";
  } else if (error) {
	error.style.display = "block";
  }
}

(function () {
  const overlay = document.getElementById("download-overlay");
  if (!overlay) return;

  overlay.addEventListener("click", function (e) {
	if (e.target === overlay) closeDownloadWindow();
  });

  document.addEventListener("keydown", function (e) {
	if (!overlay.classList.contains("is-open")) return;
	if (e.key === "Escape") closeDownloadWindow();
  });
})();

/* ==================================================
   MOBILE PLAYER COLLAPSE
================================================== */
(function () {
  const mobilePlayer = document.getElementById("mobile-player");
  if (!mobilePlayer) return;

  const header = mobilePlayer.querySelector(".aero-header");
  if (!header) return;

  function updateMobilePlayerOffset() {
	const isMobile = window.innerWidth <= 768;

	if (!isMobile) {
	  document.documentElement.style.removeProperty("--mobile-player-offset");
	  return;
	}

	const height = mobilePlayer.offsetHeight || 72;
	document.documentElement.style.setProperty("--mobile-player-offset", `${height}px`);
  }

  header.addEventListener("click", function (e) {
	if (e.target.closest("button")) return;
	mobilePlayer.classList.toggle("is-collapsed");
	updateMobilePlayerOffset();
  });

  window.addEventListener("load", updateMobilePlayerOffset);
  window.addEventListener("resize", updateMobilePlayerOffset);
  window.addEventListener("orientationchange", updateMobilePlayerOffset);

  setTimeout(updateMobilePlayerOffset, 100);
})();

function toggleMute() {
  const audio = document.querySelector("audio");
  const icon = document.querySelector(".mute-track i");

  audio.muted = !audio.muted;

  if (audio.muted) {
	icon.classList.remove("fa-volume-up");
	icon.classList.add("fa-volume-mute");
  } else {
	icon.classList.remove("fa-volume-mute");
	icon.classList.add("fa-volume-up");
  }
}
