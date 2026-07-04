document.getElementById("hitung").addEventListener("click", function () {

  const komoditas = document.getElementById("komoditas").value;
  const luas = Number(document.getElementById("luas").value);

  if (isNaN(luas) || luas <= 0) {
    alert("Luas lahan tidak valid!");
    return;
  }

  const data = database.find(item => item.nama === komoditas);

  if (!data) {
    alert("Komoditas tidak ditemukan!");
    return;
  }

  // scaling
  const faktor = luas / 1000;

  // produksi
  const produksi = data.hasilPanen * faktor;

  // biaya total
  const biaya =
    (data.upah + data.operasional + data.nonOperasional) * faktor;

  // pendapatan
  const pendapatan = produksi * data.harga;

  const laba = pendapatan - biaya;

  // output aman
  document.getElementById("produksi").innerText = produksi.toFixed(2);
  document.getElementById("biaya").innerText = biaya.toLocaleString("id-ID");
  document.getElementById("pendapatan").innerText = pendapatan.toLocaleString("id-ID");
  document.getElementById("laba").innerText = laba.toLocaleString("id-ID");
});
