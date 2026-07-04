function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitung() {
  const luasInput = parseFloat(document.getElementById("luas").value);
  const komoditas = document.getElementById("komoditas").value;

  if (!luasInput || luasInput <= 0) {
    alert("Isi luas lahan dulu!");
    return;
  }

  const data = database[komoditas];

  const faktor = luasInput / data.luasPatokan;

  const upah = data.upah * faktor;
  const produksi = data.produksi * faktor;
  const operasional = data.operasional * faktor;
  const nonOperasional = data.nonOperasional * faktor;

  const totalPengeluaran = upah + produksi + operasional + nonOperasional;

  const hasilPanen = data.hasilPanen * faktor;
  const pendapatan = hasilPanen * data.harga;

  const hasilDiv = document.getElementById("hasil");

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>
    <p><b>Upah Pekerja:</b> ${formatRupiah(upah)}</p>
    <p><b>Biaya Produksi:</b> ${formatRupiah(produksi)}</p>
    <p><b>Biaya Operasional:</b> ${formatRupiah(operasional)}</p>
    <p><b>Biaya Non Operasional:</b> ${formatRupiah(nonOperasional)}</p>
    <p><b>Total Pengeluaran:</b> ${formatRupiah(totalPengeluaran)}</p>
    <hr/>
    <p><b>Hasil Panen:</b> ${hasilPanen.toFixed(0)} kg</p>
    <p><b>Harga:</b> ${formatRupiah(data.harga)}</p>
    <p><b>Pendapatan:</b> ${formatRupiah(pendapatan)}</p>
  `;
}
