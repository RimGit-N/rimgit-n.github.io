document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".dynamic-link");

  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Mencegah link dibuka secara default
        const currentLinkHref = this.href;

        // Ukuran pop-up
        const popUpWidth = 400;
        const popUpHeight = 200;

        // Menghitung posisi tengah layar dan lebih ke atas
        const screenLeft =
          window.screenLeft !== undefined ? window.screenLeft : screen.left;
        const screenTop =
          window.screenTop !== undefined ? window.screenTop : screen.top;
        const screenWidth = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth;
        const screenHeight = window.innerHeight
          ? window.innerHeight
          : document.documentElement.clientHeight;

        const left = screenWidth / 2 - popUpWidth / 2 + screenLeft;
        const top = 0; // Menggeser ke atas dengan menggunakan screenHeight / 4

        // Membuat pop-up di tengah bagian atas layar
        const popUp = window.open(
          "",
          "popup",
          `width=${popUpWidth},height=${popUpHeight},top=${top},left=${left}`
        );

        // HTML di dalam pop-up
        popUp.document.write(`
            <html>
              <head>
                <title>Choose an option</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 30px;
                  }
                  button {
                    margin: 10px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                  }
                </style>
              </head>
              <body>
                <p>Where do you want to open this link?</p>
                <button id="blank">New Tab (Blank)</button>
                <button id="parent">Parent Frame</button>
                <button id="top">Full Window (Top)</button>
                <button id="cancel">Cancel</button>
                <script>
                  document.getElementById("blank").addEventListener("click", function () {
                    window.opener.open('${currentLinkHref}', '_blank'); // Buka di tab baru
                    window.close(); // Tutup pop-up
                  });
  
                  document.getElementById("parent").addEventListener("click", function () {
                    window.opener.open('${currentLinkHref}', '_parent'); // Buka di bingkai induk
                    window.close(); // Tutup pop-up
                  });
  
                  document.getElementById("top").addEventListener("click", function () {
                    window.opener.open('${currentLinkHref}', '_top'); // Buka di jendela penuh
                    window.close(); // Tutup pop-up
                  });
  
                  document.getElementById("cancel").addEventListener("click", function () {
                    window.close(); // Tutup pop-up tanpa tindakan, pengguna tetap di halaman yang sama
                  });
                </script>
              </body>
            </html>
          `);

        // Tutup dokumen pop-up untuk memastikan seluruh konten dimuat
        popUp.document.close();
      });
    });
  } else {
    console.warn('No links found with the class "dynamic-link".');
  }
});
