export default function getBlocks() {
  if (typeof true_page !== 'undefined' && true_page.hasOwnProperty('current_page_id')) {
    const pageId = true_page.current_page_id;

    fetch('/wp-json/custom/v1/acf-blocks/' + pageId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}
