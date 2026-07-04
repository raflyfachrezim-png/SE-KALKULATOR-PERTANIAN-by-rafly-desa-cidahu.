function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

function hitung() {
  const luasInput = parseFloat(document.getElementById("luas").value);
  const komoditas = document.getElementById("komoditas").value;

  if (!luasInput || luasInput <= 0) {
    alert("Isi luas lahan dulu!");
    return;
  }

  const data = database[komoditas];

  // faktor skala
  const faktor = luasInput / data.luasPatokan;

  // biaya
  const upah = data.upah * faktor;
  const produksi = data.produksi * faktor;
  const operasional = data.operasional * faktor;
  const nonOperasional = data.nonOperasional * faktor;

  const totalPengeluaran =
    upah + produksi + operasional + nonOperasional;

  // hasil panen & pendapatan
  const hasilPanen = data.hasilPanen * faktor;
  const pendapatan = hasilPanen * data.harga;

  // PROFIT
  const profit = pendapatan - totalPengeluaran;

  // OUTPUT
  const hasilDiv = document.getElementById("hasil");

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <!-- SUMMARY BOX -->
    <div class="summary">
      <div class="box">
        <h3>Pendapatan</h3>
        <p>${formatRupiah(pendapatan)}</p>
      </div>

      <div class="box">
        <h3>Total Biaya</h3>
        <p>${formatRupiah(totalPengeluaran)}</p>
      </div>

      <div class="box">
        <h3>Profit</h3>
        <p style="color:${profit >= 0 ? '#1b5e20' : 'red'}">
          ${formatRupiah(profit)}
        </p>
      </div>
    </div>

    <hr/>

    <!-- DETAIL BREAKDOWN -->
    <div class="row"><span>Upah Pekerja</span><b>${formatRupiah(upah)}</b></div>
    <div class="row"><span>Biaya Produksi</span><b>${formatRupiah(produksi)}</b></div>
    <div class="row"><span>Biaya Operasional</span><b>${formatRupiah(operasional)}</b></div>
    <div class="row"><span>Biaya Non Operasional</span><b>${formatRupiah(nonOperasional)}</b></div>

    <hr/>

    <div class="row"><span>Hasil Panen</span><b>${hasilPanen.toFixed(0)} kg</b></div>
    <div class="row"><span>Harga / kg</span><b>${formatRupiah(data.harga)}</b></div>
  `;
}
