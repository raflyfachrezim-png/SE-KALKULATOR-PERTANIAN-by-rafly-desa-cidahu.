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

  <div class="row"><span>Upah Pekerja</span><b>${formatRupiah(upah)}</b></div>
  <div class="row"><span>Biaya Produksi</span><b>${formatRupiah(produksi)}</b></div>
  <div class="row"><span>Biaya Operasional</span><b>${formatRupiah(operasional)}</b></div>
  <div class="row"><span>Biaya Non Operasional</span><b>${formatRupiah(nonOperasional)}</b></div>

  <hr/>

  <div class="row"><span>Total Pengeluaran</span><b>${formatRupiah(totalPengeluaran)}</b></div>

  <hr/>

  <div class="row"><span>Hasil Panen</span><b>${hasilPanen.toFixed(0)} kg</b></div>
  <div class="row"><span>Harga</span><b>${formatRupiah(data.harga)}</b></div>
  <div class="row"><span>Pendapatan</span><b>${formatRupiah(pendapatan)}</b></div>
`;
