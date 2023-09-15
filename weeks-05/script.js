class Pendaftar {
  constructor(nama, umur, uangsangu) {
    this.nama = nama;
    this.umur = umur;
    this.uangsangu = uangsangu;
  }

  getResume() {
    return `Nama: ${this.nama}, Umur: ${this.umur}, Uang Sangu: ${this.uangsangu}`;
  }
}

function validateForm() {
  const nama = document.getElementById("nama");
  const umur = document.getElementById("umur");
  const uangsangu = document.getElementById("uangsangu");

  const pendaftarForm = document.getElementById("registrationForm");

  const isNamaValid =
    nama.value.length >= 10
      ? true
      : (nama.setCustomValidity("Nama harus minimal 10 karakter"), false);
  const isUmurValid =
    umur.value >= 25
      ? true
      : (umur.setCustomValidity("Umur harus minimal 25 tahun"), false);
  const isUangSanguValid =
    uangsangu.value >= 100000 && uangsangu.value <= 1000000
      ? true
      : (uangsangu.setCustomValidity(
          "Uang sangu harus antara 100.000 dan 1.000.000"
        ),
        false);

  const isValid = isNamaValid && isUmurValid && isUangSanguValid;

  if (!isValid) {
    return false;
  }

  const pendaftar = new Pendaftar(nama.value, umur.value, uangsangu.value);
  addDataToTable(pendaftar);

  pendaftarForm.reset();
  nama.setCustomValidity("");
  umur.setCustomValidity("");
  uangsangu.setCustomValidity("");

  return false;
}

function addDataToTable(pendaftar) {
  const table = document
    .getElementById("pendaftarTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.rows.length);

  const cellNama = newRow.insertCell(0);
  const cellUmur = newRow.insertCell(1);
  const cellUangSangu = newRow.insertCell(2);

  cellNama.innerHTML = pendaftar.nama;
  cellUmur.innerHTML = pendaftar.umur;
  cellUangSangu.innerHTML = pendaftar.uangsangu;

  calculateResume();

  const notification = document.createElement("div");
  notification.classList.add("alert", "alert-success", "mt-3");
  notification.innerText = "Registrasi Berhasil";

  const formContainer = document.querySelector(".form-container");
  formContainer.insertBefore(notification, formContainer.firstChild);

  setTimeout(function () {
    notification.remove();
  }, 1000);
}

function calculateResume() {
  const table = document
    .getElementById("pendaftarTable")
    .getElementsByTagName("tbody")[0];
  let totalUangSangu = 0;
  let totalUmur = 0;

  for (let i = 0; i < table.rows.length; i++) {
    const uangsangu = parseInt(table.rows[i].cells[2].innerHTML);
    const umur = parseInt(table.rows[i].cells[1].innerHTML);

    totalUangSangu += uangsangu;
    totalUmur += umur;
  }

  const rataRataUangSangu = totalUangSangu / table.rows.length;
  const rataRataUmur = totalUmur / table.rows.length;

  const resumeDiv = document.getElementById("resume");
  resumeDiv.innerHTML = `<p>Rata-rata pendaftar memiliki uang sangu sebesar : Rp. ${rataRataUangSangu.toFixed(
    2
  )} dengan rata-rata umur : ${rataRataUmur.toFixed(2)} tahun </p>`;
}
