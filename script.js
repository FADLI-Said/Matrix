fetch("credits.json")
    .then((reponse) => reponse.json())
    .then((credit) => {



        fetch("details.json")
            .then((reponse) => reponse.json())
            .then((matrix) => {
                let heure = Math.floor(matrix.runtime / 60)
                let minute = matrix.runtime % 60
                // .filter = if et .map = chercher un objet dans un groupe d'objet
                let directors = credit.crew.filter(member => member.job === "Director").map(member => member.name);
                // .join = les avoir tous a la suite avec une virgule entre 2
                document.getElementById("affiche").innerHTML = `<div class="row m-0 content">
            <img src="https://image.tmdb.org/t/p/w500/pEoqbqtLc4CcwDUDqxmEDSWpWTZ.jpg" alt="${matrix.original_title}"
                class="col-3 p-0 m-3">
            <div class="col-8">
                <h1 class="fs-2 p-0 m-3">${matrix.original_title}</h1>
                <p class="m-3">${matrix.release_date}(FR) · ${matrix.genres.map((genres) => genres.name).join(", ")} · ${heure}h${minute}</p>
                <p class="m-3 p-2 fs-4 rounded-circle border">${matrix.vote_average * 10}<span class="fs-6">%</span> </p>
                <p class="m-3 text-secondary">${matrix.tagline}</p>
                <h2 class="m-3 fs-5">Synopsis</h2>
                <p class="m-3">${matrix.overview}</p>
                <div class="m-3 row">
                    <div class="col-6 p-0">
                        <h3 class="fs-6">${directors[0]}</h3>
                        <p>Director, Writer</p>
                    </div>
                    <div class="col-6 p-0">
                        <h3 class="fs-6">${directors[1]}</h3>
                        <p>Director, Writer</p>
                    </div>
                </div>
            </div>
        </div>`
        document.getElementById("affiche").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${matrix.backdrop_path})`;
        })

        for (let acteur = 0; acteur < 10; acteur++) {
            document.getElementById("scroll").innerHTML += `
            <div class="card p-0" style="width: 10rem;">
                <img src="https://image.tmdb.org/t/p/w500${credit.cast[acteur].profile_path}" class="card-img-top"
                    alt="Image de ${credit.cast[acteur].name}">
                <div class="card-body">
                    <h5 class="card-title">${credit.cast[acteur].name}</h5>
                    <p class="card-text">${credit.cast[acteur].character}</p>
                </div>
            </div>`;
        }
    })

    // Permet de scroller une barre horizonatl avec la souris
    document.getElementById("scroll").addEventListener('wheel', (e) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
      });

      