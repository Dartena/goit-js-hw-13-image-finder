import ApiService  from './apiService'
import  galleryItem  from '../partials/gallery.hbs'
import * as basicLightbox from 'basiclightbox';

const api = new ApiService();
const observer = new IntersectionObserver(observeHandler, {threshold: 0})
let searchQuerySave = '';
function observeHandler([entrie]) {
    if (!entrie.isIntersecting) return;
    if (!refs.loading.classList.contains('is-hidden'))
        refs.loading.classList.add('is-hidden');
    render(searchQuerySave);
};
    
const refs = {
    gallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('.search-form__input'),
    anchor: document.querySelector('#anchor'),
    photoLink: document.querySelectorAll('.photo-link'),
    loading: document.querySelector('.windows8')
};
    
async function render(searchQuery) {
    try {
        if (refs.loading.classList.contains('is-hidden'))
            refs.loading.classList.remove('is-hidden');
        api.query = searchQuery.trim();
        if (api.query === '') {
            refs.gallery.innerHTML = '';
            api.resetPage();
            return;
        };
        const searchResult = await api.fetchImages();
        const galleryItems = galleryItem(searchResult.hits)
        refs.gallery.insertAdjacentHTML('beforeend', galleryItems);
        api.incrementPage();
        console.log(api.page)
        api.console(searchResult)
        if (galleryItems.length < api.perPage) {
            refs.loading.classList.add('is-hidden');
            observer.unobserve(refs.anchor);
            return;
        }
    } catch (error) {
        
        console.log(`${error.message}`);
    }
};

const openPhoto = (event) => {
    console.log(event)
    if (!event.target.matches('img')) return;
    event.preventDefault();
    const instance = basicLightbox.create(`<img src=${event.target.dataset.source} width="800" height="600">`);
    instance.show();
    }

const search = (event) => {
    let submitter = event.submitter;
    let searchQuery = refs.searchInput.value;

    if (submitter) {
        event.preventDefault();
        api.resetPage();
        refs.gallery.innerHTML = '';
        observer.unobserve(refs.anchor);
        render(searchQuery);
    }
    setTimeout(() => {
        observer.observe(refs.anchor)        
        searchQuerySave = searchQuery;
    }, 1000);
};


refs.searchForm.addEventListener('submit', search)
refs.gallery.addEventListener('click', openPhoto)