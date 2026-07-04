function formatRupiah(x) {
  return "Rp " + Math.round(x || 0).toLocaleString("id-ID");
}

function hitung() {

  const hasilDiv = document.getElementById("hasil");
  const luas = parseFloat(document.getElementById("luas").value);
  const komoditas = document.getElementById("komoditas").value;

  if (!luas || luas <= 0) {
    hasilDiv.innerHTML = "ISI LUAS DULU";
    return;
  }

  const d = database[komoditas];
  const faktor = luas / d.luasPatokan;

  // 🌾 MUSIM
  const upah = d.upah * faktor;
  const produksi = d.produksi * faktor;
  const operasional = d.operasional * faktor;
  const nonOp = d.nonOperasional * faktor;

  const biaya = upah + produksi + operasional + nonOp;

  const hasilKg = d.hasilPanen * faktor;
  const harga = d.harga;

  const pendapatan = hasilKg * harga;
  const profit = pendapatan - biaya;

  // 📅 TAHUN
  const panen = d.panenTahun || 1;

  const pendapatanTahun = pendapatan * panen;
  const biayaTahun = biaya * panen;
  const profitTahun = profit * panen;

  hasilDiv.innerHTML = `

    <!-- 🔥 BOX PENDAPATAN MUSIM -->
    <div class="box box-green">
      <div class="title">🌾 Pendapatan Per Musim</div>
      <div class="row"><span>Pendapatan</span><b>${formatRupiah(pendapatan)}</b></div>
      <div class="row"><span>Biaya</span><b>${formatRupiah(biaya)}</b></div>
      <div class="row"><span>Profit</span><b>${formatRupiah(profit)}</b></div>
    </div>

    <!-- 🔥 BOX PENDAPATAN TAHUN -->
    <div class="box box-blue">
      <div class="title">📅 Pendapatan Per Tahun (${panen}x)</div>
      <div class="row"><span>Pendapatan</span><b>${formatRupiah(pendapatanTahun)}</b></div>
      <div class="row"><span>Biaya</span><b>${formatRupiah(biayaTahun)}</b></div>
      <div class="row"><span>Profit</span><b>${formatRupiah(profitTahun)}</b></div>
    </div>

    <!-- 🔥 RINCIAN -->
    <div class="box">
      <div class="title">📊 Rincian Per Musim</div>
      <div class="row"><span>Upah</span><b>${formatRupiah(upah)}</b></div>
      <div class="row"><span>Produksi</span><b>${formatRupiah(produksi)}</b></div>
      <div class="row"><span>Operasional</span><b>${formatRupiah(operasional)}</b></div>
      <div class="row"><span>Non Ops</span><b>${formatRupiah(nonOp)}</b></div>
      <div class="row"><span>Hasil</span><b>${hasilKg.toFixed(0)} kg</b></div>
      <div class="row"><span>Harga/kg</span><b>${formatRupiah(harga)}</b></div>
    </div>

    <!-- 🔥 RINCIAN TAHUN -->
    <div class="box">
      <div class="title">📊 Rincian Per Tahun</div>
      <div class="row"><span>Upah</span><b>${formatRupiah(upah * panen)}</b></div>
      <div class="row"><span>Produksi</span><b>${formatRupiah(produksi * panen)}</b></div>
      <div class="row"><span>Operasional</span><b>${formatRupiah(operasional * panen)}</b></div>
      <div class="row"><span>Non Ops</span><b>${formatRupiah(nonOp * panen)}</b></div>
      <div class="row"><span>Hasil</span><b>${(hasilKg * panen).toFixed(0)} kg</b></div>
      <div class="row"><span>Harga/kg</span><b>${formatRupiah(harga)}</b></div>
    </div>

  `;
}
