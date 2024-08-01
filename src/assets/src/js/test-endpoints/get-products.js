export default function getProduct() {

  let productID = '<?php echo $product_id; ?>';

  console.log('product id', productID)

  const wooUrl = '/wp-json/wc/v3/products/';
  const consumerKey = 'ck_cdd7b90fb9e9127ede967783753e69358cb0fb66';
  const consumerSecret = 'cs_08483067356e579810eaf9bf79072594e7e4f1bb';

  function basicAuth(key, secret) {
    let hash = btoa(key + ':' + secret);
    return "Basic " + hash;
  }

  let auth = basicAuth(consumerKey, consumerSecret);

  fetch(wooUrl, {
    headers: {
      Authorization: auth,
    },
  })
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
