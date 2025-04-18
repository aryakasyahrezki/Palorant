document.addEventListener("DOMContentLoaded", function () {
  const skillIcons = document.querySelectorAll(".skill-icon-wrapper");

  skillIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      document.querySelectorAll(".skill-icon-wrapper").forEach((i) => {
        i.classList.remove("active");
      });
      document.querySelectorAll(".skill-video-desc").forEach((content) => {
        content.classList.remove("active");
      });

      this.classList.add("active");
      const targetId = this.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  document.querySelector(".skill-icon-wrapper").click();
});
