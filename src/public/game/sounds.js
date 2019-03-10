sound = document.createElement("audio");
sound.src = "test.mp3";
sound.setAttribute("preload", "auto");
sound.setAttribute("controls", "none");
sound.style.display = "none";
document.body.appendChild(sound);
play = function () {
    sound.play();
}
stop = function () {
    sound.pause();
}