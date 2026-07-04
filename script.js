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

  // =====================
  // 🌾 PER MUSIM
  // =====================
  const upah = d.upah * faktor;
  const produksi = d.produksi * faktor;
  const operasional = d.operasional * faktor;
  const nonOp = d.nonOperasional * faktor;

  const biaya = upah + produksi + operasional + nonOp;

  const hasilKg = d.hasilPanen * faktor;
  const harga = d.harga;

  const pendapatan = hasilKg * harga;

  // =====================
  // 📅 PER TAHUN
  // =====================
  const panen = d.panenTahun || 1;

  const pendapatanTahun = pendapatan * panen;
  const biayaTahun = biaya * panen;

  hasilDiv.innerHTML = `

    <!-- 🔥 2 KOLOM PENDAPATAN -->
    <div class="grid-2">

      <div class="box green">
        <div class="title">🌾 Pendapatan Per Musim</div>
        <div class="row"><span>Total Pendapatan</span><b>${formatRupiah(pendapatan)}</b></div>
      </div>

      <div class="box blue">
        <div class="title">📅 Pendapatan Per Tahun (${panen}x Panen)</div>
        <div class="row"><span>Total Pendapatan</span><b>${formatRupiah(pendapatanTahun)}</b></div>
      </div>

    </div>

    <!-- 🌾 DETAIL MUSIM -->
    <div class="box" style="margin-top:15px;">
      <div class="title">🌾 Rincian Biaya & Produksi Per Musim</div>

      <div class="row"><span>Upah Pekerja</span><b>${formatRupiah(upah)}</b></div>
      <div class="row"><span>Biaya Produksi</span><b>${formatRupiah(produksi)}</b></div>
      <div class="row"><span>Biaya Operasional</span><b>${formatRupiah(operasional)}</b></div>
      <div class="row"><span>Biaya Non Operasional</span><b>${formatRupiah(nonOp)}</b></div>

      <div class="row"><span>Hasil Panen</span><b>${hasilKg.toFixed(0)} kg</b></div>
      <div class="row"><span>Harga Jual per Kg</span><b>${formatRupiah(harga)}</b></div>

      <div class="row"><span>Total Biaya Produksi</span><b>${formatRupiah(biaya)}</b></div>
    </div>

    <!-- 📅 DETAIL TAHUN -->
    <div class="box" style="margin-top:10px;">
      <div class="title">📅 Rincian Biaya & Produksi Per Tahun</div>

      <div class="row"><span>Upah Pekerja (Total Tahunan)</span><b>${formatRupiah(upah * panen)}</b></div>
      <div class="row"><span>Biaya Produksi (Total Tahunan)</span><b>${formatRupiah(produksi * panen)}</b></div>
      <div class="row"><span>Biaya Operasional (Total Tahunan)</span><b>${formatRupiah(operasional * panen)}</b></div>
      <div class="row"><span>Biaya Non Operasional (Total Tahunan)</span><b>${formatRupiah(nonOp * panen)}</b></div>

      <div class="row"><span>Total Hasil Panen</span><b>${(hasilKg * panen).toFixed(0)} kg</b></div>
      <div class="row"><span>Harga Jual per Kg</span><b>${formatRupiah(harga)}</b></div>

      <div class="row"><span>Total Biaya Produksi Tahunan</span><b>${formatRupiah(biayaTahun)}</b></div>
    </div>

  `;
}
