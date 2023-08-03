function backToForm() {
  let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));

  if (booking_data["jenis_transaksi"] === "Booking") {
    window.sessionStorage.removeItem("booking-data");
    window.location.href = "../booking/book_form.html";
  } else if (booking_data["jenis_transaksi"] === "Extend") {
    window.sessionStorage.removeItem("booking-data");
    window.location.href = "../transaction_page.html";
  }
}
