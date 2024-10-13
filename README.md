# M-Pedia WhatsApp Webhook dengan Google Apps Script

Proyek ini menyediakan implementasi webhook M-Pedia untuk WhatsApp menggunakan Google Apps Script. Dengan script ini, Anda dapat mengotomatisasi respons pesan WhatsApp, menyimpan log interaksi, dan mengelola media yang diterima.

## Fitur

- Penanganan pesan WhatsApp otomatis
- Respons berbasis keyword
- Logging interaksi ke Google Spreadsheet
- Penyimpanan gambar yang diterima ke Google Drive
- Dukungan untuk berbagai jenis pesan (teks, media, tombol, template, list)

## Cara Penggunaan

1. Buat proyek baru di Google Apps Script
2. Salin kode dari `webhook.gs` ke editor Google Apps Script Anda
3. Sesuaikan ID Spreadsheet dan folder Drive sesuai kebutuhan Anda
4. Deploy script sebagai web app
5. Gunakan URL yang dihasilkan sebagai endpoint webhook di platform M-Pedia Anda

## Konfigurasi

Pastikan untuk mengganti nilai-nilai berikut sesuai dengan pengaturan Anda:

- `'<ID-SPREADSHEET>'`: ID Google Spreadsheet untuk logging
- `'<ID-FOLDER-DRIVE>'`: ID folder Google Drive untuk penyimpanan gambar

## Kontribusi

Kontribusi untuk proyek ini sangat diterima. Silakan fork repository ini, lakukan perubahan, dan ajukan pull request.

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

---

## Penjelasan Kode

Berikut adalah penjelasan detail untuk setiap bagian utama dari kode webhook M-Pedia:

1. Fungsi `doPost(e)`:
   - Ini adalah fungsi utama yang menangani permintaan POST dari webhook.
   - Mengurai data JSON yang diterima dari M-Pedia.
   - Memanggil fungsi `logToSpreadsheet()` untuk mencatat setiap interaksi.
   - Memproses pesan berdasarkan keyword dan memanggil fungsi format yang sesuai.
   - Menangani penyimpanan gambar jika ada.
   - Mengembalikan respons yang sesuai atau status 200 jika tidak ada respons.

2. Fungsi `logToSpreadsheet(data)`:
   - Mencatat setiap interaksi ke Google Spreadsheet yang ditentukan.
   - Berguna untuk analisis dan pelacakan interaksi pengguna.

3. Fungsi `saveImageToDrive(bufferImage)`:
   - Menyimpan gambar yang diterima ke folder Google Drive yang ditentukan.
   - Mengonversi data base64 menjadi file gambar.

4. Fungsi `formatText(text, quoted)`:
   - Memformat respons teks sederhana.
   - Parameter `quoted` menentukan apakah respons mengutip pesan asli.

5. Fungsi `formatExampleMedia(quoted)`:
   - Memformat respons media (dalam contoh ini, gambar).
   - Menyertakan URL gambar, caption, dan nama file.

6. Fungsi `formatExampleButton(quoted)`:
   - Memformat respons dengan tombol interaktif.
   - Mendefinisikan teks, footer, dan array tombol.

7. Fungsi `formatExampleTemplate(quoted)`:
   - Memformat respons template dengan tombol URL dan panggilan.
   - Berguna untuk mengarahkan pengguna ke situs web atau nomor telepon.

8. Fungsi `formatExampleList(quoted)`:
   - Memformat respons list dengan beberapa bagian dan item.
   - Memungkinkan pengguna memilih dari daftar opsi yang disediakan.

Setiap fungsi format ini mengembalikan objek JavaScript yang kemudian diubah menjadi JSON untuk dikirim kembali ke M-Pedia, yang selanjutnya akan mengirimkan respons yang sesuai ke pengguna WhatsApp.
