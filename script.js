// EMAIL ADDRESS
    const emailAddress = "ellexieskyryllenetorres@gmail.com";

    // HAMBURGER MENU
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeNavigation() {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", function(event) {
      event.stopPropagation();

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // CLOSE AFTER SELECTING A NAVIGATION LINK
    document.querySelectorAll(".nav-links a").forEach(function(link) {
      link.addEventListener("click", closeNavigation);
    });

    // CLOSE WHEN CLICKING OUTSIDE
    document.addEventListener("click", function(event) {
      if (!event.target.closest("nav")) {
        closeNavigation();
      }

      const actionTarget = event.target.closest("[data-action]");
      if (actionTarget) {
        switch (actionTarget.dataset.action) {
          case "copy-email":
            copyEmail();
            break;
          case "open-project":
            openProjectModal(
              actionTarget.dataset.title,
              actionTarget.dataset.description
            );
            break;
          case "open-certificate":
            openCertificateModal(
              actionTarget.dataset.title,
              actionTarget.dataset.description,
              actionTarget.dataset.image
            );
            break;
          case "close-modal":
            closeModalDirect();
            break;
        }
      } else if (event.target.classList.contains("modal-overlay")) {
        closeModalDirect();
      }
    });

    // CLOSE USING ESCAPE KEY
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeNavigation();
        closeModalDirect();
      }
    });

    // RESET MENU WHEN SWITCHING TO DESKTOP
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768) {
        closeNavigation();
      }
    });

    // COPY EMAIL
    function copyEmail() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailAddress)
          .then(function() {
            showToast("Email address copied to clipboard!");
          })
          .catch(function() {
            showToast("Email: " + emailAddress);
          });
      } else {
        showToast("Email: " + emailAddress);
      }
    }

// Open Modal for standard projects
      function openProjectModal(title, desc) {
        document.getElementById('modalImageContainer').innerHTML = '';
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('projectModal').classList.add('active');
      }

    // CLOSE MODAL
    function closeModalDirect() {
      document.getElementById("projectModal").classList.remove("active");
    }

    // TOAST NOTIFICATION
    let toastTimer;

    function showToast(message) {
      const toast = document.getElementById("toast");
      const toastMsg = document.getElementById("toast-message");

      toastMsg.textContent = message;
      toast.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(function() {
        toast.classList.remove("show");
      }, 3000);
    }

    // AUTOMATIC COPYRIGHT YEAR
    document.getElementById("copyrightYear").textContent =
      new Date().getFullYear();

      // Open Modal for certificates with full image preview
      function openCertificateModal(title, desc, imgSrc) {
        const image = document.createElement("img");
        image.src = imgSrc;
        image.alt = title;
        image.className = "modal-certificate-image";
        document.getElementById("modalImageContainer").replaceChildren(image);
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('projectModal').classList.add('active');
      }