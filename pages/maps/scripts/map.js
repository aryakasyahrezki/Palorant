document.addEventListener("DOMContentLoaded", function () {
  const callouts = document.querySelectorAll(".callout");
  const heroImg = document.querySelector(".hero-img");
  const mapName = document.querySelector("#banner-image img");

  const normalInterval = 5000;
  const interactionInterval = 7000;
  let currentTimeout;
  let isAutoCycling = true;

  function setActive(element, manualInteraction = false) {
    clearTimeout(currentTimeout);

    callouts.forEach((c) => c.classList.remove("active"));

    element.classList.add("active");
    heroImg.style.opacity = 0;

    const imgFile = element.getAttribute("data-img");
    heroImg.src = `../../../assets/images/maps/${mapName.id}/${imgFile}`;

    heroImg.onload = () => {
      heroImg.style.transition = "opacity 0.5s ease";
      heroImg.style.opacity = 1;
    };

    if (isAutoCycling) {
      const delay = manualInteraction ? interactionInterval : normalInterval;
      currentTimeout = setTimeout(cycleToNext, delay);
    }
  }

  function cycleToNext() {
    const activeIndex = Array.from(callouts).findIndex((c) =>
      c.classList.contains("active")
    );
    const nextIndex = (activeIndex + 1) % callouts.length;
    setActive(callouts[nextIndex]);
  }

  callouts.forEach((callout) => {
    callout.addEventListener("click", () => {
      isAutoCycling = true;
      setActive(callout, true);
    });
  });

  setActive(document.querySelector(".callout.overview"));
});
