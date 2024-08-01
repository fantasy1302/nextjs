import scrollToSection from "../utils/scrollToSection";

export default function() {

  const container = document.querySelector('.product__tab-content--donations');
  const productIntro = document.querySelector('.product__tab-donations').closest('.product__tab');
  let preloader = productIntro.querySelector('.product__preloader');
  let sortDirectionDate = 'desc';
  let sortDirectionSum = 'desc';

  const productDonations = () => {
    const pagination = document.querySelectorAll('.product__tab-pagination--donations .page-numbers');
    const buttonDateSort = document.querySelector('.product__tab-sort--date');
    const buttonSumSort = document.querySelectorAll('.product__tab-sort--sum');
    const recurringFilter = document.querySelector('.product__tab-filter[data-filter="recurring"]');
    const oneTimeFilter = document.querySelector('.product__tab-filter[data-filter="one-time"]');
    const allFilters = document.querySelector('.product__tab-filter[data-filter="all"]');

    pagination.forEach(item => {
      item.removeEventListener('click', handlePaginationClick);
      item.addEventListener('click', handlePaginationClick);
    });

    buttonDateSort && buttonDateSort.removeEventListener('click', handleDateSortClick);
    buttonDateSort && buttonDateSort.addEventListener('click', handleDateSortClick);

    buttonSumSort.forEach(item => {
      item.removeEventListener('click', handleSumSortClick);
      item.addEventListener('click', handleSumSortClick);
    });

    recurringFilter && recurringFilter.removeEventListener('click', handleRecurringFilterClick);
    recurringFilter && recurringFilter.addEventListener('click', handleRecurringFilterClick);

    oneTimeFilter && oneTimeFilter.removeEventListener('click', handleOneTimeFilterClick);
    oneTimeFilter && oneTimeFilter.addEventListener('click', handleOneTimeFilterClick);

    allFilters && allFilters.removeEventListener('click', handleAllFiltersClick);
    allFilters && allFilters.addEventListener('click', handleAllFiltersClick);
  };

  const handleRecurringFilterClick = (e) => {
    e.preventDefault();
    let eventTarget = e.target;
    let productId = eventTarget.dataset.id;
    let filter = eventTarget.dataset.filter;

    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sendRequest(productId, 1, 'sum', 'asc', filter);
  }

  const handleAllFiltersClick = (e) => {
    e.preventDefault();
    let eventTarget = e.target;
    let productId = eventTarget.dataset.id;
    let filter = eventTarget.dataset.filter;

    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sendRequest(productId, 1, 'sum', 'asc', filter);
  }

  const handleOneTimeFilterClick = (e) => {
    e.preventDefault();
    let eventTarget = e.target;
    let productId = eventTarget.dataset.id;
    let filter = eventTarget.dataset.filter;
    let page = container.querySelector('.product__tab-pagination--donations .current').innerText;

    console.log('productId', productId)
    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sendRequest(productId, page, 'sum', 'asc', filter);
  }

  const handlePaginationClick = (e) => {
    e.preventDefault();

    let eventTarget = e.target;
    let page = parseInt(eventTarget.innerText) || eventTarget.dataset.page || 1;
    let productId = eventTarget.closest('.product__tab-pagination--donations').dataset.productId;

    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sendRequest(productId, page, 'date', sortDirectionDate);
  };

  const handleDateSortClick = (e) => {
    e.preventDefault();
    let eventTarget = e.target;
    let productId = eventTarget.dataset.id;
    let page = container.querySelector('.product__tab-pagination--donations .current').innerText;

    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sortDirectionDate = sortDirectionDate === 'desc' ? 'asc' : 'desc';

    sendRequest(productId, page, 'date', sortDirectionDate);
  };

  const handleSumSortClick = (e) => {
    e.preventDefault();
    let eventTarget = e.target;
    let productId = eventTarget.dataset.id;
    let page = container.querySelector('.product__tab-pagination--donations .current').innerText;

    if (preloader) {
      preloader.classList.remove('hidden');
    }

    sortDirectionSum = sortDirectionSum === 'desc' ? 'asc' : 'desc';
    sendRequest(productId, page, 'sum', sortDirectionSum);
  };

  const sendRequest = (productId, page, sortType, direction = '', activeTab) => {
    fetch(true_obj.ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'product_donations',
        page: page,
        product_id: productId,
        sortType: sortType,
        direction: direction,
        activeTab: activeTab,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        setTimeout(() => {
          preloader.classList.add('hidden');
          container.innerHTML = data;
          scrollToSection(productIntro);
          productDonations();
        }, 1000);
      })
      .catch(error => {
        console.error('Error during fetch operation:', error);
      });
  };

  productDonations();
}
