const selectKomoditas = document.getElementById("komoditas");
const inputLuas = document.getElementById("luas");

const produksi = document.getElementById("produksi");
const biaya = document.getElementById("biaya");
const pendapatan = document.getElementById("pendapatan");
const laba = document.getElementById("laba");

// Isi dropdown otomatis
database.forEach(item => {

    let option = document.createElement("option");

    option.value = item.nama;

    option.textContent = item.nama;

    selectKomoditas.appendChild(option);

});

function hitung(){

    let data = database.find(item => item.nama === selectKomoditas.value);

    let faktor = Number(inputLuas.value) / data.luasPatokan;

    let hasilPanen = data.hasilPanen * faktor;

    let totalBiaya =
        (data.biayaProduksi +
        data.biayaOperasional +
        data.biayaNonOperasional) * faktor;

    let totalPendapatan =
        hasilPanen * data.harga;

    let totalLaba =
        totalPendapatan - totalBiaya;

    produksi.innerHTML =
        hasilPanen.toFixed(0) + " Kg";

    biaya.innerHTML =
        "Rp " + totalBiaya.toLocaleString("id-ID");

    pendapatan.innerHTML =
        "Rp " + totalPendapatan.toLocaleString("id-ID");

    laba.innerHTML =
        "Rp " + totalLaba.toLocaleString("id-ID");

}

inputLuas.addEventListener("input", hitung);

selectKomoditas.addEventListener("change", hitung);

hitung();
