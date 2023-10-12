import lightGallery from "https://cdn.skypack.dev/lightgallery@2.3.0-beta.4";

import lgVideo from "https://cdn.skypack.dev/lightgallery@2.3.0-beta.4/plugins/video";

lightGallery(document.getElementById("gallery-container"), {
  speed: 500,
  plugins: [lgVideo]
});

