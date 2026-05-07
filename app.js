/* SanDisk Clip - Core Logic 
   Includes: Playlist Management, UI Sync, Tab Switching, and Pet Animations
*/

(function() {
  // 1. DATA & STATE
  const tracks = [
	{ "title": "Get Go", "artist": "ARLO PARKS", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/Arlo%20Parks%20-%20Get%20Go.mp3" },
	{ "title": "GAS STATION", "artist": "SLAYYYTER", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/06%20-%20Gas%20Station.mp3" },
	{ "title": "Starlight feat PinkPantheress", "artist": "Danny L Harle", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/01.%20Danny%20L%20Harle,%20PinkPantheress%20-%20Starlight.mp3" },
	{ "title": "Dying for You", "artist": "Charli xcx", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/Dying%20for%20You.mp3" },
	{ "title": "Have Your Lovin", "artist": "Johnny Orlando", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/Johnny%20Orlando%20-%20Have%20Your%20Lovin'.mp3" },
	{ "title": "Sojourn", "artist": "Joji", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/14.%20Joji%20-%20Sojourn.mp3" },
	{ "title": "WITH ME", "artist": "John Summit & Julia Wolf", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/055.%20John%20Summit%20-%20WITH%20ME.mp3" },
	{ "title": "Lost Cause", "artist": "Maggie Lindemann", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/09-maggie_lindemann-lost_cause.mp3" },
	{ "title": "Zzz", "artist": "EDEN", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/02-02%20-%20Zzz.mp3" },
	{ "title": "Beautiful", "artist": "Anyma & Joji", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/Anyma%20&%20Joji%20-%20Beautiful%20(Extended%20Mix).mp3" },
	{ "title": "lemonlime", "artist": "purity ring", "audio": "https://github.com/amadmoney/amadilyas/raw/refs/heads/main/AMADPOD/Purity%20Ring%20-%20lemonlime.mp3" }
  ];

  let currentTrackIndex = 0;
  let hasStarted = false;

  // 2. UI ELEMENTS (Matching your specific IDs)
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  
  const trackTitleWrap = document.getElementById("trackTitleWrap");
  const trackTitleText = document.getElementById("trackTitleText");
  const trackArtistText = document.getElementById("trackArtistText");
  const trackCount = document.getElementById("trackCount");
  
  const progressFill = document.getElementById("progressFill");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  const lcdPet = document.getElementById("lcdPet");
  const lcdPetImg = document.getElementById("lcdPetImg");

  const PLAY_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236a6a72'><path d='M8 5.14v13.72c0 .72.78 1.17 1.4.8l10.2-6.86a.93.93 0 0 0 0-1.6L9.4 4.34A.93.93 0 0 0 8 5.14z'/></svg>";
  const PAUSE_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236a6a72'><rect x='6' y='5' width='4' height='14' rx='1'/><rect x='14' y='5' width='4' height='14' rx='1'/></svg>";

  // 3. CORE LOGIC
  function formatTime(time) {
	if (!Number.isFinite(time)) return "0:00";
	const mins = Math.floor(time / 60);
	const secs = Math.floor(time % 60);
	return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function loadTrack(index, shouldAutoplay = false) {
	currentTrackIndex = (index + tracks.length) % tracks.length;
	const track = tracks[currentTrackIndex];
	
	audio.src = track.audio;
	trackTitleText.textContent = track.title;
	trackArtistText.textContent = track.artist;
	trackCount.textContent = `${currentTrackIndex + 1}/${tracks.length}`;
	
	// Marquee check for long titles
	if (trackTitleWrap) {
	  trackTitleWrap.classList.toggle("is-marquee", track.title.length > 15);
	}

	if (shouldAutoplay) {
	  audio.play().catch(() => console.log("User interaction required"));
	  if (playIcon) playIcon.src = PAUSE_SVG;
	  updatePet(true);
	}
  }

  function updatePet(isPlaying) {
	if (lcdPetImg) {
	  lcdPetImg.style.animationPlayState = isPlaying ? "running" : "paused";
	}
  }

  // 4. EVENT LISTENERS
  playBtn?.addEventListener("click", () => {
	if (!hasStarted) {
	  hasStarted = true;
	  loadTrack(currentTrackIndex, true);
	  return;
	}
	if (audio.paused) {
	  audio.play();
	  if (playIcon) playIcon.src = PAUSE_SVG;
	  updatePet(true);
	} else {
	  audio.pause();
	  if (playIcon) playIcon.src = PLAY_SVG;
	  updatePet(false);
	}
  });

  nextBtn?.addEventListener("click", () => loadTrack(currentTrackIndex + 1, true));
  prevBtn?.addEventListener("click", () => {
	if (audio.currentTime > 3) audio.currentTime = 0;
	else loadTrack(currentTrackIndex - 1, true);
  });

  audio.ontimeupdate = () => {
	const perc = (audio.currentTime / audio.duration) * 100;
	if (progressFill) progressFill.style.width = (perc || 0) + "%";
	if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
	if (durationEl) durationEl.textContent = formatTime(audio.duration);
  };

  audio.onended = () => loadTrack(currentTrackIndex + 1, true);

  // Initialize
  loadTrack(0, false);
})();