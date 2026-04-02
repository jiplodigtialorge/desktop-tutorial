/* J and J Culinary - Mute and autoplay first video on the page */
document.addEventListener("DOMContentLoaded", function () {
  var video = $("video").get(0);
  if (video) {
    video.volume = 0;
    $("video").attr("playsinline", true);
    $("video").attr("muted", "muted");
    video.play();
  }
});
