function backToForm() {
  // nanti bikin if jika booking maka balik ke book form sedangkan klo extend maka balik ke extend form
  window.location.href = "../booking/book_form.html";
  window.sessionStorage.removeItem("booking-data");
}
