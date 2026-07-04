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

  if (!d) {
    hasilDiv.innerHTML = "KOMODITAS ERROR";
    return;
  }

  const faktor = luas / d.luasPatokan;

  // =====================
  // 🌾 PER MUSIM
  // =====================
  const upah = (d.upah || 0) * faktor;
  const produksi = (d.produksi || 0) * faktor;
  const operasional = (d.operasional || 0) * faktor;
  const nonOp = (d.nonOperasional || 0) * faktor;

  const totalBiaya = upah + produksi + operasional + nonOp;

  const hasilKg = (d.hasilPanen || 0) * faktor;
  const hargaKg = d.harga || 0;

  const pendapatan = hasilKg * hargaKg;
  const profit = pendapatan - totalBiaya;

  // =====================
  // 📅 PER TAHUN (FIX LOGIC)
  // =====================
  const panen = d.panenTahun || 1;

  const hasilKgTahun = hasilKg * panen;
  const totalBiayaTahun = totalBiaya * panen;
  const pendapatanTahun = pendapatan * panen;
  const profitTahun = profit * panen;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <!-- PER MUSIM -->
    <h3>🌾 PER MUSIM</h3>

    <p><b>Upah Pekerja:</b> ${formatRupiah(upah)}</p>
    <p><b>Biaya Produksi:</b> ${formatRupiah(produksi)}</p>
    <p><b>Biaya Operasional:</b> ${formatRupiah(operasional)}</p>
    <p><b>Biaya Non Operasional:</b> ${formatRupiah(nonOp)}</p>

    <hr>

    <p><b>Hasil Panen:</b> ${hasilKg.toFixed(0)} kg</p>
    <p><b>Harga / kg:</b> ${formatRupiah(hargaKg)}</p>

    <p><b>Total Biaya:</b> ${formatRupiah(totalBiaya)}</p>
    <p><b>Pendapatan:</b> ${formatRupiah(pendapatan)}</p>
    <p><b>Profit:</b> ${formatRupiah(profit)}</p>

    <hr>

    <!-- PER TAHUN -->
    <h3>📅 PER TAHUN (${panen}x panen)</h3>

    <p><b>Hasil Panen:</b> ${hasilKgTahun.toFixed(0)} kg</p>
    <p><b>Total Biaya:</b> ${formatRupiah(totalBiayaTahun)}</p>
    <p><b>Pendapatan:</b> ${formatRupiah(pendapatanTahun)}</p>
    <p><b>Profit:</b> ${formatRupiah(profitTahun)}</p>
  `;
}
