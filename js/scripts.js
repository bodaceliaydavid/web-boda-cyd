document.addEventListener("DOMContentLoaded", () => {
  //console.log("Coming Soon cargado 🚀");

  // FECHA DE LANZAMIENTO (cámbiala a la que quieras)
  const launchDate = new Date("2025-12-06T12:00:00").getTime();

  const countdownEl = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {
      clearInterval(timer);
      countdownEl.innerHTML = "<span class='text-success'>¡Ya estamos de bodorrio! 🎉</span>";
      return;
    }

    // Cálculo de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Renderizar en HTML
    countdownEl.innerHTML = `
      <div><span class="d-block fs-2">${days}</span><small>días</small></div>
      <div><span class="d-block fs-2">${hours}</span><small>horas</small></div>
      <div><span class="d-block fs-2">${minutes}</span><small>min</small></div>
      <div><span class="d-block fs-2">${seconds}</span><small>seg</small></div>
    `;

  }, 1000);

    // Control Play/Pause
    const musica = document.getElementById("raule");
    const btnAudio = document.getElementById("btn-audio");

    btnAudio.addEventListener("click", () => {
        if (musica.paused) {
            musica.play();
            btnAudio.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // icono de pausa
        } else {
    musica.pause();
    btnAudio.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; // icono de play
        }
    });

});
