document.addEventListener("DOMContentLoaded", () => {
  
    // Counter
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
            <div><span class="d-block fs-2 color-secondary">${days}</span><small>días</small></div>
            <div><span class="d-block fs-2 color-secondary">${hours}</span><small>horas</small></div>
            <div><span class="d-block fs-2 color-secondary">${minutes}</span><small>min</small></div>
            <div><span class="d-block fs-2 color-secondary">${seconds}</span><small>seg</small></div>
        `;

    }, 1000);

    // Control Music --> Play/Pause
    const musica = document.getElementById("raule");
    const btnAudio = document.getElementById("btn-audio");

    btnAudio.addEventListener("click", () => {
        if (musica.paused) {
            musica.play();
            btnAudio.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // icono de pausa            
        } 
        else {
            musica.pause();
            btnAudio.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; // icono de play            
        }
    });

    // Formulario
    const scriptURL = "https://script.google.com/macros/s/AKfycbzk_JGGd2c4GF2aB2MdZaeBjBBCvuFplsr2NryyM9KMnxTGpr_Y3bQctEbkub1Fyvap2w/exec"
    const form = document.getElementById("myRVSP");    

    form.addEventListener("submit", e => {
        
        e.preventDefault(); // evitamos recarga

        // Limpiar errores previos
        document.querySelectorAll(".error-text").forEach(el => el.innerText = "");

        // Validaciones básicas
        let valido = true;
        const asistencia = document.getElementById("asistencia").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const qty = document.getElementById("adultos").value.trim();
        const nombre_asistentes = document.getElementById("asistentes").value.trim();
        const bus = document.getElementById("bus").value.trim();
        
        if (asistencia.length < 1) {
            document.getElementById("errorAsistencia").innerText = "Debes indicar si asistes o no.";
            valido = false;            
        }
        
        if (nombre.length < 1) {
            document.getElementById("errorNombre").innerText = "Debes indicar tu nombre y apellidos.";
            valido = false;
        }

        if (asistencia === "si") {

            if (qty.length < 1) {
                document.getElementById("errorQtyAdultos").innerText = "Indica cuántos adultos seréis.";
                valido = false;
            }

            if (nombre_asistentes.length < 1) {
                document.getElementById("errorAsistentes").innerText = "Indica el nombre de todos los asistentes.";
                valido = false;
            }

            if (bus.length < 1) {
                document.getElementById("errorBus").innerText = "Indica si haréis uso del bus.";
                valido = false;
            }

        }

        if (!valido) return;

        document.querySelector('.loader-overlay').style.display = '';
        // Enviar a Google Sheets
        const data = { nombre, qty, mensaje };

        fetch(scriptURL, {
            method: "POST",
            //body: JSON.stringify(data)
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(res => {
            document.querySelector('.loader-overlay').style.display = 'none';
            if (res.status === "ok") {
                // Mensaje OK
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Confirmación enviada correctamente!",
                    showConfirmButton: false,
                    timer: 3000
                });
                
                // Reseteamos los campos del formulario
                form.reset();

                // Limpiar mensajes de error                
                document.querySelectorAll(".error-text").forEach(el => el.innerText = "");
                
            }
            else {
                // Mensaje Error
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ha ocurrido un error",
                    text: "Tu confirmación no se enviado. Inténtelo de nuevo.",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        
        })
        .catch(err => {
            document.querySelector('.loader-overlay').style.display = 'none';
            // Mensaje Error
            Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ha ocurrido un error",
                    text: "Tu confirmación no se enviado. Inténtelo de nuevo." + err.message,
                    showConfirmButton: false,
                    timer: 3000
                });
        });
    }); 

});
