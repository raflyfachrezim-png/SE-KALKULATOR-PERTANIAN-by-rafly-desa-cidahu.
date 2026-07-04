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
  // 📅 PER TAHUN
  // =====================
  const panen = d.panenTahun || 1;

  const upahTahun = upah * panen;
  const produksiTahun = produksi * panen;
  const operasionalTahun = operasional * panen;
  const nonOpTahun = nonOp * panen;

  const totalBiayaTahun = totalBiaya * panen;
  const hasilKgTahun = hasilKg * panen;
  const pendapatanTahun = pendapatan * panen;
  const profitTahun = profit * panen;

  hasilDiv.innerHTML = `
    <h2>HASIL PERHITUNGAN</h2>

    <h3>🌾 PER MUSIM</h3>
    <p>Upah: ${formatRupiah(upah)}</p>
    <p>Produksi: ${formatRupiah(produksi)}</p>
    <p>Operasional: ${formatRupiah(operasional)}</p>
    <p>Non Ops: ${formatRupiah(nonOp)}</p>

    <hr>

    <p>Hasil: ${hasilKg.toFixed(0)} kg</p>
    <p>Harga/kg: ${formatRupiah(hargaKg)}</p>
    <p>Total Biaya: ${formatRupiah(totalBiaya)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatan)}</p>
    <p>Profit: ${formatRupiah(profit)}</p>

    <hr>

    <h3>📅 PER TAHUN (${panen}x panen)</h3>
    <p>Upah: ${formatRupiah(upahTahun)}</p>
    <p>Produksi: ${formatRupiah(produksiTahun)}</p>
    <p>Operasional: ${formatRupiah(operasionalTahun)}</p>
    <p>Non Ops: ${formatRupiah(nonOpTahun)}</p>

    <hr>

    <p>Hasil: ${hasilKgTahun.toFixed(0)} kg</p>
    <p>Harga/kg: ${formatRupiah(hargaKg)}</p>
    <p>Total Biaya: ${formatRupiah(totalBiayaTahun)}</p>
    <p>Pendapatan: ${formatRupiah(pendapatanTahun)}</p>
    <p>Profit: ${formatRupiah(profitTahun)}</p>
  `;
}
