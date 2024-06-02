// Image Lazy Loading
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("birthday-background.jpg"));

  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });

      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  } else {
      // Fallback for older browsers
      let lazyLoad = function() {
          lazyImages.forEach(function(lazyImage) {
              if (lazyImage.getBoundingClientRect().top < window.innerHeight && lazyImage.getBoundingClientRect().bottom > 0 && getComputedStyle(lazyImage).display !== "none") {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImages = lazyImages.filter(image => image !== lazyImage);

                  if (lazyImages.length === 0) {
                      document.removeEventListener("scroll", lazyLoad);
                      window.removeEventListener("resize", lazyLoad);
                      window.removeEventListener("orientationchange", lazyLoad);
                  }
              }
          });
      };

      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
  }
});
