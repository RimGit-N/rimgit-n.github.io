document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".dynamic-link");

  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Mencegah link dibuka secara default
        const currentLinkHref = this.href;

        // Membuat modal
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = 1000; // Pastikan modal di atas elemen lain
        modal.innerHTML = `
                  <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; position: relative;">
                      <p>Where do you want to open this link?</p>
                      <button id="blank">New Tab (Blank)</button>
                      <button id="parent">Parent Frame</button>
                      <button id="top">Full Window (Top)</button>
                      <button id="cancel">Cancel</button>
                  </div>
              `;

        document.body.appendChild(modal);

        // Menangani klik tombol
        modal.querySelector("#blank").addEventListener("click", function () {
          window.open(currentLinkHref, "_blank"); // Buka di tab baru
          document.body.removeChild(modal); // Tutup modal
        });

        modal.querySelector("#parent").addEventListener("click", function () {
          window.open(currentLinkHref, "_parent"); // Buka di bingkai induk
          document.body.removeChild(modal); // Tutup modal
        });

        modal.querySelector("#top").addEventListener("click", function () {
          window.open(currentLinkHref, "_top"); // Buka di jendela penuh
          document.body.removeChild(modal); // Tutup modal
        });

        modal.querySelector("#cancel").addEventListener("click", function () {
          document.body.removeChild(modal); // Tutup modal tanpa tindakan
        });
      });
    });
  } else {
    console.warn('No links found with the class "dynamic-link".');
  }
});
