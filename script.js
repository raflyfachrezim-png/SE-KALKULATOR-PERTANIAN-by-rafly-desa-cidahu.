document.getElementById("hitung").addEventListener("click", function () {

  const komoditas = document.getElementById("komoditas").value;
  const luas = Number(document.getElementById("luas").value);

  const data = database.find(item => item.nama === komoditas);

  if (!data) {
    alert("Komoditas tidak ditemukan!");
    return;
  }

  if (isNaN(luas) || luas <= 0) {
    alert("Luas lahan tidak valid!");
    return;
  }

  // scaling dari 1000m² (patokan database kamu)
  const faktor = luas / 1000;

  const produksi = data.hasilPanen * faktor;
  const biaya = (data.produksi + data.operasional + data.nonOperasional) * faktor;
  const pendapatan = produksi * data.harga;
  const laba = pendapatan - biaya;

  document.getElementById("produksi").innerText = produksi.toFixed(2);
  document.getElementById("biaya").innerText = biaya.toLocaleString("id-ID");
  document.getElementById("pendapatan").innerText = pendapatan.toLocaleString("id-ID");
  document.getElementById("laba").innerText = laba.toLocaleString("id-ID");
});
