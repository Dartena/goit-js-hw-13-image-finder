const BASE_URL = 'https://pixabay.com/api';
const IMG_PARAM = '?image_type=photo&orientation=horizontal';
const KEY = '24217347-3de4fa5c802b554a105d674c1';


export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 12;
    }
    
    async fetchImages() {
        const url = `${BASE_URL}/${IMG_PARAM}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        };
        return await Promise.reject({
            title: response.status,
            message: response.statusText
        }); 
    }

    console(response) {
        console.log(response);
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}