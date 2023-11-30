# Apa itu IDCamp?
IDCamp adalah sebuah program beasiswa yang diselenggarakan oleh Indosat Ooredoo Hutchison dengan tujuan untuk mencetak developer/programmer muda Indonesia yang siap bersaing di dunia ekonomi digital.

## Front End Web Developer Learning Path
Saya sendiri memilih alur belajar sebagai Front End Web Developer. Untuk mendapatkan beasiswa lanjutan di level Intermediate dan Expert saya diwajibkan untuk menuntaskan kelas Basic dan Beginner sebaik mungkin, baik dari segi kualitas submission (tugas akhir) maupun waktu (durasi belajar). Kualitas submission dinilai berdasarkan hasil rating kelulusan dari bintang 1 sampai bintang 5 dengan detail sebagai berikut:

- **Bintang 1** - Semua ketentuan terpenuhi, tetapi terdapat indikasi plagiat yaitu dengan menggunakan proyek orang lain dan hanya mengubah kontennya saja.
- **Bintang 2** - Semua ketentuan terpenuhi, tetapi terdapat kekurangan pada tampilan website. Contohnya tidak menerapkan responsibilitas, kombinasi warna tidak tepat, dsb.
- **Bintang 3** - Semua ketentuan terpenuhi, tetapi hanya mengikuti apa yang ada pada modul.
- **Bintang 4** - Semua ketentuan terpenuhi dan menerapkan minimal salah satu saran di atas.
- **Bintang 5** - Semua ketentuan terpenuhi dan menerapkan semua saran di atas.

# [2/2] Front-End Dasar  
Setelah menyelesaikan project pertama [Pemrograman Web Dasar](https://github.com/dipintoo/IDCamp-Scholarship_Pemrograman-Web-Dasar/tree/main) selanjutnya kita akan mengerjakan submission membuat Front-End Web Dasar. Berikut kriteria dan penilaiannya:

## Kriteria
Berikut kriteria submission yang harus Anda penuhi.
- Kriteria 1: Mampu Menambahkan Data Buku
  - Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:
    

    <pre>
    {
      id: string | number,
      title: string,
      author: string,
      year: number,
      isComplete: boolean
    }
    </pre>  
    
    Contohnya:  
    <pre>
    {
      id: 3657848524,
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K Rowling',
      year: 1997,
      isComplete: false
    }
    </pre>  
  
    **Catatan:**
    Untuk id buku pada tiap buku yang disimpan haruslah unik. Tips dalam menetapkan nilai untuk adalah Anda bisa memanfaatkan nilai timestamp. Untuk mendapatkan nilai timestamp di   JavaScript cukup mudah, cukup dengan menuliskan expressions `+new Date()`.

- Kriteria 2: Memiliki Dua Rak Buku
  - Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
  - Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.
  - Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.

- Kriteria 3: Dapat Memindahkan Buku antar Rak
  - Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

- Kriteria 4: Dapat Menghapus Data Buku
  - Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

- Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku
  - Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
    Dengan begitu, Anda harus menyimpan data buku pada localStorage.

## Penilaian
Submission Anda akan dinilai oleh reviewer dengan skala 1-5 berdasarkan dari parameter yang ada. Anda dapat menerapkan beberapa saran untuk mendapatkan nilai tinggi. Berikut sarannya.

- Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.
- Berkreasilah dengan membuat proyek Bookshelf Apps tanpa menggunakan project starter.
- Menuliskan kode dengan bersih.
  
  - Bersihkan comment dan kode yang tidak digunakan.
  - Indentasi yang sesuai.
- Terdapat improvisasi fitur seperti (pilih satu):
- Custom Dialog ketika menghapus buku.
- Dapat edit data buku.
 
# Hasil Submission Saya  
Saya membuat aplikasi website bernama [**Databook**](https://idcampfront-end-dasar.dipintoo.repl.co/) dengan fungsi bisa menambahkan, menghapus, mengedit dan dapat mengelompokkan buku yang belum selesai dibaca (ongoing) dan sudah selesai dibaca (completed). Selain itu ada fitur pencarian untuk memfilter judul buku tertentu dan custom dialog yang muncul sebagai notifikasi ataupun konfirmasi saat menambahkan dan menghapus data buku untuk meningkatkan pengalaman pengguna. Saya juga berusaha membuat desain UI yang simple dan menarik agar mudah dinavigasikan.  

Dari penilaian yang diberikan saya berhasil mendapatkan rating bintang 5.

![Submission Rating](https://github.com/dipintoo/IDCamp-Scholarship_Front-End-Dasar/blob/main/img/Submission%20Rating%20Front-End%20Dasar.png)  

# Sertifikat  
![Submission Rating](https://github.com/dipintoo/IDCamp-Scholarship_Front-End-Dasar/blob/main/img/Submission%20Rating%20Front-End%20Dasar.png)  
