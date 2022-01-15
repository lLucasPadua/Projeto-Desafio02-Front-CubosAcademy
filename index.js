const divMovies = document.querySelector(".movies");
const divHighlightVideo = document.querySelector(".highlight__video");
const h3HighlightTitle = document.querySelector(".highlight__title");
const spanHighlightRating = document.querySelector(".highlight__rating");
const spanHighlightGenres = document.querySelector(".highlight__genres");
const spanHighlightLaunch = document.querySelector(".highlight__launch");
const pHighlightDescription = document.querySelector(".highlight__description");
const aHighlightVideoLink = document.querySelector(".highlight__video-link");
const divModalHidden = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const h3ModalTitle = document.querySelector(".modal__title");
const modalImg = document.querySelector(".modal__img");
const modalP = document.querySelector(".modal__description");
const modalDivAverage = document.querySelector(".modal__average");
const modalDivGenres = document.querySelector(".modal__genres");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const input = document.querySelector(".input");
const btnTheme = document.querySelector(".btn-theme");
const bodyTheme = document.querySelector("body");

let page = 0;
function exibirFilmes(body) {
  for (let i = 0; i < body.results.length; i++) {
    const element = body.results[i];
    const idFilme = element.id;
    const divCartaz = document.createElement("div");
    const divInfor = document.createElement("div");
    const spanTitle = document.createElement("span");
    const spanRating = document.createElement("span");
    const imgEstrela = document.createElement("img");
    divCartaz.addEventListener("click", () => {
      divModalHidden.classList.remove("hidden");
      fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${idFilme}`
      ).then(function (resposta) {
        const promiseBody = resposta.json();
        promiseBody.then(function (body) {
          console.log(body);
          h3ModalTitle.textContent = body.title;
          modalImg.src = body.backdrop_path;
          modalP.textContent = body.overview;
          modalDivAverage.textContent = body.vote_average;
        });
      });

      closeModal.addEventListener("click", () => {
        divModalHidden.classList.add("hidden");
      });
    });
    if (i >= 5) {
      divCartaz.classList.add("hidden");
    }
    divCartaz.classList.add("movie");
    divInfor.classList.add("movie__info");
    divCartaz.style.backgroundImage = `url(${element.poster_path})`;
    spanTitle.classList.add("movie__title");
    spanTitle.textContent = element.title;
    spanRating.classList.add("movie__rating");
    imgEstrela.src = "./assets/estrela.svg";
    spanRating.append(imgEstrela, element.vote_average);
    divInfor.append(spanTitle, spanRating);
    divCartaz.append(divInfor);
    divMovies.append(divCartaz);
  }
}
filmesIniciais();
function filmesIniciais() {
  divMovies.innerHTML = "";
  fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
  ).then(function (resposta) {
    const respostaBody = resposta.json();

    respostaBody.then(function (body) {
      exibirFilmes(body);
    });
  });
}
fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
).then(function (resposta) {
  const respostaBody = resposta.json();
  respostaBody.then(function (body) {
    divHighlightVideo.style.backgroundImage = `url(${body.backdrop_path})`;
    h3HighlightTitle.textContent = body.title;
    spanHighlightRating.textContent = body.vote_average;
    spanHighlightGenres.textContent = `${body.genres[0].name}, ${body.genres[1].name}, ${body.genres[2].name}`;
    spanHighlightLaunch.textContent = "28 DE JULHO DE 2021";
    pHighlightDescription.textContent = body.overview;
  });
});
fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
).then(function (resposta) {
  const respostaBody = resposta.json();
  respostaBody.then(function (body) {
    aHighlightVideoLink.href = `${aHighlightVideoLink.href}${body.results[0].key}`;
  });
});
btnNext.addEventListener("click", () => {
  const divFilmes = [...document.querySelectorAll(".movie")];
  const arrayFilmes = divFilmes.slice(page * 5, page * 5 + 5);
  console.log(arrayFilmes);
  if (page === 3) {
    page = 0;
  } else {
    page++;
  }
  const proximosFilmes = divFilmes.slice(page * 5, page * 5 + 5);
  arrayFilmes.forEach((element) => {
    element.classList.add("hidden");
  });
  proximosFilmes.forEach((element) => {
    element.classList.remove("hidden");
  });
});
btnPrev.addEventListener("click", () => {
  const divFilmes = [...document.querySelectorAll(".movie")];
  const arrayFilmes = divFilmes.slice(page * 5, page * 5 + 5);
  if (page === 0) {
    page = 3;
  } else {
    page--;
  }
  const proximosFilmes = divFilmes.slice(page * 5, page * 5 + 5);
  arrayFilmes.forEach((element) => {
    element.classList.add("hidden");
  });
  proximosFilmes.forEach((element) => {
    element.classList.remove("hidden");
  });
});
input.addEventListener("keydown", (event) => {
  if (event.key != "Enter") {
    return;
  }
  if (input.value == "") {
    filmesIniciais();
    return;
  }
  fetch(
    `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&query=${input.value}`
  ).then(function (resposta) {
    const promiseBody = resposta.json();
    divMovies.innerHTML = "";
    promiseBody.then(function (body) {
      exibirFilmes(body);
    });
  });
  input.value = "";
});

btnTheme.addEventListener("click", function () {
  btnTheme.src = btnTheme.src.includes("light-mode.svg")
    ? "./assets/dark-mode.svg"
    : "./assets/light-mode.svg";

  btnNext.src = btnTheme.src.includes("light-mode.svg")
    ? "./assets/seta-direita-preta.svg"
    : "./assets/seta-direita-branca.svg";
  btnPrev.src = btnTheme.src.includes("light-mode.svg")
    ? "./assets/seta-esquerda-preta.svg"
    : "./assets/seta-esquerda-branca.svg";

  const novoTheme =
    bodyTheme.style.getPropertyValue("--background-color") === "#000"
      ? "#fff"
      : "#000";
  bodyTheme.style.setProperty("--background-color", novoTheme);
  const novoThemeHighlight =
    bodyTheme.style.getPropertyValue("--highlight-background") === "#454545"
      ? "#fff"
      : "#454545";
  bodyTheme.style.setProperty("--highlight-background", novoThemeHighlight);
  const novaCorTxt =
    bodyTheme.style.getPropertyValue("--highlight-color") === "#fff"
      ? "rgba(0, 0, 0, 0.7)"
      : "#fff";
  bodyTheme.style.setProperty("--highlight-color", novaCorTxt);
  const novaCorTxtDescription =
    bodyTheme.style.getPropertyValue("--highlight-description") === "#fff"
      ? "#000"
      : "#fff";
  bodyTheme.style.setProperty("--highlight-description", novaCorTxtDescription);
  const novaCorTxtInput =
    bodyTheme.style.getPropertyValue("--color") === "#fff" ? "#000" : "#fff";
  bodyTheme.style.setProperty("--color", novaCorTxtInput);
  const novaCorBoxShadow =
    bodyTheme.style.getPropertyValue("--shadow-color") ===
    "0px 4px 8px rgba(202, 187, 187, 0.15)"
      ? "0px 4px 8px rgba(0, 0, 0, 0.15)"
      : "0px 4px 8px rgba(202, 187, 187, 0.15)";
  bodyTheme.style.setProperty("--shadow-color", novaCorBoxShadow);
});
