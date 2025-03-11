function suppressAlerts() {
    const iframe = document.getElementById("contact-form-iframe")
    if (iframe) {
      iframe.onload = () => {
        try {
          iframe.contentWindow.alert = () => {}
        } catch (e) {
          console.warn(
            "Couldn't access iframe content to suppress alerts. This is likely due to cross-origin restrictions.",
          )
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", suppressAlerts)



document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.nav');

    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('show');
            mobileMenuButton.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Responsive image loading
    function loadResponsiveImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Call the function on load and resize
    window.addEventListener('load', loadResponsiveImages);
    window.addEventListener('resize', loadResponsiveImages);



     // Form submission handling
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        formStatus.innerHTML = "Sending...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('data', data)
        try {
            const response = await fetch('api/sendEmail', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                formStatus.textContent = result.message || "Thanks for reaching out! We'll get back to you soon!";
                form.reset();
            } else {
                formStatus.textContent = "Oops! Something went wrong. Mind trying again?";            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = "Oops! Something went wrong. Mind trying again?";        }
    });

    function adjustIframeHeight() {
        const iframe = document.querySelector("#contact-form-iframe")
        const container = document.querySelector(".iframe-container")
      
        if (iframe && container) {
          const updateHeight = () => {
            try {
              const height = iframe.contentWindow.document.body.scrollHeight
              container.style.height = `${height}px`
              iframe.style.height = "100%"
            } catch (e) {
              console.warn("Couldn't access iframe content. Using fallback method.")
              const fallbackHeight = window.innerWidth <= 768 ? 800 : 700
              container.style.height = `${fallbackHeight}px`
              iframe.style.height = "100%"
            }
          }
      
          iframe.onload = () => {
            updateHeight()
            suppressAlerts() // Call suppressAlerts after the iframe loads
          }
          window.addEventListener("resize", updateHeight)
      
          // Initial call to set the height
          updateHeight()
        }
      }
      // Call the function when the window loads and resizes
      
      window.addEventListener("resize", adjustIframeHeight)


    document.getElementById('currentYear').textContent = new Date().getFullYear();

    function resizeIframe() {
        var iframe = document.querySelector('.iframe-container iframe');
        if (iframe) {
          iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
      }
    
      // Resize on load
      window.addEventListener('load', resizeIframe);
    
      // Resize on window resize
      window.addEventListener('resize', resizeIframe);
    
      // Check size every second (in case of dynamic content changes in the iframe)
      setInterval(resizeIframe, 1000);

      

});

// window.addEventListener("load", adjustIframeHeight)

