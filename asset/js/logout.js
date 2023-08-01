const out = document.querySelector("#logout-button");
out.addEventListener("click", () => {
  window.sessionStorage.removeItem("user-data");
  window.location.href = "landing_page.html";
});
