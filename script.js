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

  const totalBiaya = upah + produksi + operasional + nonOp;

  const hasilKg = d.hasilPanen * faktor;
  const hargaKg = d.harga;

  const pendapatan = hasilKg * hargaKg;
  const profit = pendapatan - totalBiaya;

  // =====================
  // 📅 PER TAHUN (SEMUA KOMPONEN DIKALI PANEN)
  // =====================
  const panen = d.panenTahun || 1;

  const upahTahun = upah * panen;
  const produksiTahun = produksi * panen;
  const operasionalTahun = operasional * panen;
  const nonOpTahun = nonOp * panen;

  const hasilKgTahun = hasilKg * panen;
  const pendapatanTahun = pendapatan * panen;
  const profitTahun = profit * panen;

  const totalBiayaTahun =
    upahTahun + produksiTahun + operasionalTahun + nonOpTahun;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <h3>🌾 PER MUSIM</h3>

    <p>Upah Pekerja: ${formatRupiah(upah)}</p>
    <p>Biaya Produksi: ${formatRupiah(produksi)}</p>
    <p>Biaya Operasional: ${formatRupiah(operasional)}</p>
    <p>Biaya Non Operasional: ${formatRupiah(nonOp)}</p>

    <hr>

    <p>Hasil: ${hasilKg.toFixed(0)} kg</p>
    <p>Harga/kg: ${formatRupiah(hargaKg)}</p>

    <p>Total Biaya: ${formatRupiah(totalBiaya)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatan)}</p>
    <p>Profit: ${formatRupiah(profit)}</p>

    <hr>

    <h3>📅 PER TAHUN (${panen}x panen)</h3>

    <p>Upah Pekerja: ${formatRupiah(upahTahun)}</p>
    <p>Biaya Produksi: ${formatRupiah(produksiTahun)}</p>
    <p>Biaya Operasional: ${formatRupiah(operasionalTahun)}</p>
    <p>Biaya Non Operasional: ${formatRupiah(nonOpTahun)}</p>

    <hr>

    <p>Hasil: ${hasilKgTahun.toFixed(0)} kg</p>
    <p>Harga/kg: ${formatRupiah(hargaKg)}</p>

    <p>Total Biaya: ${formatRupiah(totalBiayaTahun)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatanTahun)}</p>
    <p>Profit: ${formatRupiah(profitTahun)}</p>
  `;
}
