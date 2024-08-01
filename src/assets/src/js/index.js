import "./spec"
import "./fixes"

import Router from './utils/Router';
import pages from './pages';
import scrollToSection from './utils/scrollToSection';
import productNews from "./ajax/product-news";
import productDonations from "./ajax/product-donations";
import getBlocks from './test-endpoints/get-blocks'
import getProduct from "./test-endpoints/get-products";
// import sendCf7Form from "./test-endpoints/post-cf7";

const routes = new Router({
    // components,
    pages,
})

window.addEventListener("DOMContentLoaded", () => {
    routes.loadEvents();
    getBlocks();
    getProduct();

    // components.init();
    pages.init();
    scrollToSection();
    productNews();
    productDonations();

})
