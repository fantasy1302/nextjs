import scrollToSection from "../utils/scrollToSection";

export default function() {
  const productNews = () => {
    const pagination = document.querySelectorAll('.product__tab-pagination[data-news="true"] a');
    const productIntro = document.querySelector('.product__tab--news');

    pagination && pagination.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        let eventTarget = e.target;
        let page = parseInt(eventTarget.innerText) ? parseInt(eventTarget.innerText) : eventTarget.dataset.page || 1;
        let productId = eventTarget.closest('.product__tab-pagination').dataset.productId;
        const container = document.querySelector('.product__tab-content--news');
        let preloader = document.querySelector('.product__tab--news .product__preloader');

        preloader && preloader.classList.remove('hidden');

        fetch(true_obj.ajaxurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'product_news',
            nonce: true_obj.nonce,
            page: page,
            product_id: productId,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            preloader.classList.add('hidden')
            setTimeout(() => {
              container.innerHTML = data;
              productNews();
            }, 1000)
            scrollToSection(productIntro);
          })
          .catch(error => {
            console.error('Error during fetch operation:', error);
          });

      });
    });
  };

  productNews();
}
