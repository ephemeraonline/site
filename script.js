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

  lightboxClose.addEventListener("click", function () {
	closeLightbox();
  });

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
let track_name = document.querySelector(".songtitle");
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.getElementById("music");

let track_list = [
  { name: "Charli xcx - Sympathy is knife featuring ariana grande", path: "https://files.catbox.moe/xlx839.mp3" },
  { name: "Mckayla Twiggs - What A Girl Wants", path: "https://files.catbox.moe/xw4kit.mp3" },
  { name: "Danny L Harle - Raft in the Sea Featuring Julia Michaels", path: "https://files.catbox.moe/7ehw00.mp3" },
  { name: "My Sweetest Love - The Cat's Whiskers ft. Kazuma Mitchell", path: "https://files.catbox.moe/qe4he5.mp3" },
  { name: "Mercy On Me - The Cat's Whiskers", path: "https://files.catbox.moe/w7nnf9.mp3" }
];

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[index].path;
  curr_track.load();

  track_name.textContent = track_list[index].name;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  let playButton = document.querySelector(".playpause-track");
  playButton.className = "playpause-track fas fa-pause";
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  let playButton = document.querySelector(".playpause-track");
  playButton.className = "playpause-track fas fa-play";
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  loadTrack(track_index);
  if (isPlaying) playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  loadTrack(track_index);
  if (isPlaying) playTrack();
}

let currentVolume = curr_track.volume;

function volumeUp() {
  if (currentVolume < 1.0) {
	currentVolume = Math.min(1.0, currentVolume + 0.2);
	curr_track.volume = currentVolume;
  }
}

function volumeDown() {
  if (currentVolume > 0.0) {
	currentVolume = Math.max(0, currentVolume - 0.2);
	curr_track.volume = currentVolume;
  }
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
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
}

loadTrack(track_index);

/* ==================================================
   MOBILE SCALE LAYOUT
================================================== */
function applyMobileScale() {
  const stage = document.getElementById("scale-stage");
  const root = document.getElementById("scale-root");
  if (!stage || !root) return;

  const DESIGN_WIDTH = 1400;
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
	root.style.transform = "none";
	root.style.width = DESIGN_WIDTH + "px";
	stage.style.height = "auto";
	stage.style.minHeight = "";
	return;
  }

  const scale = window.innerWidth / DESIGN_WIDTH;

  root.style.width = DESIGN_WIDTH + "px";
  root.style.transform = `scale(${scale})`;

  const scaledHeight = root.scrollHeight * scale;
  stage.style.height = scaledHeight + "px";
  stage.style.minHeight = scaledHeight + "px";
}

window.addEventListener("load", applyMobileScale);
window.addEventListener("resize", applyMobileScale);
setTimeout(applyMobileScale, 300);

/* ==================================================
   LIVE DATE
================================================== */
function updateLiveDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();

  const hours24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2,"0");

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
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.getElementById("download-error").style.display = "none";
}

function closeDownloadWindow() {
  const overlay = document.getElementById("download-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
}

function checkDownload() {
  const pass = document.getElementById("download-pass").value;
  const error = document.getElementById("download-error");

  if (pass === "ephemera") {
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
