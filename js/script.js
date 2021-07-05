let app = new Vue({
    el: '#root',
    data: {
        input: '',
        lastInput: '',
        typeSearch: 'all',
        indexFilm: null,
        indexStar: null,
        searchBar: false,
        filmsSearched: [],
        filmsFiltered: [],
        languages:[
            'it',
            'gb',
            'fr',
            'es',
            'de'
        ],
        language: '',
        show_languages: false,

        //Modal
        showModal: false,
        movieModal: {},

        // Pagination
        items_page: [],
        items_per_page: 5,
        pageIndex: 0,
        pagesNumber: 0
    },
    watch: {
        // resta in ascolto al cambio di alcune variabili
        typeSearch: function () {
            this.changeFilterFilms();
        },
        filmsSearched: function () {
            this.pageIndex = 0;
            if(this.input){
                this.lastInput = this.input;
            }
            this.input = '';

            this.filmsFiltered = this.filmsSearched;

            this.changeFilterFilms();

            this.setItemsPerPage(); // richiamo la funzione per settare l'impaginazione
        },
        pageIndex: function () {

            this.setItemsPerPage();
        }
    },

    mounted(){
        this.language = this.languages[0];
    },
    methods: {

        setLanguages(lang){
            this.language = lang;
            this.show_languages = false;

            this.searchByTitle(this.lastInput);
        },
        changeLanguage(){
            this.show_languages = !this.show_languages;
        },
        resetSearch(){
            this.typeSearch = 'all';
            this.filmsSearched = [];
            this.filmsFiltered = [];
        },
        // Ricerca per il titolo
        searchByTitle(title) {
     
            this.setAllFilms(title);
            this.changeFilterFilms();
        },
        // Setta la ricerca sia per i film che per le serie
        setAllFilms(title) {

            let lang = '';
            switch(this.language){
                case 'gb':
                    lang = 'en';
                    break;
                default:
                    lang = this.language;    
            }

            axios.get('https://api.themoviedb.org/3/search/multi', {
                    params: {
                        api_key: "feaf6db23feb7f3f96d8b38aa0e56ba0",
                        language: lang,
                        query: title
                    }
                })
                .then((response) => {
                    this.filmsSearched = response.data.results;
                    this.convertFlags(this.filmsSearched);
                    console.log(this.filmsSearched)

                });
        },

        // Filtra le pellicole da visualizzare
        changeFilterFilms() {

            switch (this.typeSearch) {
                case 'movies':
                    this.filmsFiltered = this.filmsSearched.filter((elem) => {
                        return elem.media_type == "movie"
                    });
                    break;

                case 'series':
                    this.filmsFiltered = this.filmsSearched.filter((elem) => {
                        return elem.media_type == "tv"
                    });
                    break;

                default:
                    this.filmsFiltered = this.filmsSearched;
            }
            this.pageIndex = 0;
            this.setItemsPerPage();
        },
        // Conversione delle flags per risolvere il problema con alcune bandiere
        convertFlags(list) {
            list.forEach((item) => {
                switch (item.original_language) {
                    case "en":
                        item.original_language = 'gb';
                        break;
                    case 'ja':
                        item.original_language = 'jp';
                        break;

                    case 'el':
                        item.original_language = 'gr';
                        break;
                }
            })

        },

        // Funzione per settare gli items per ogni pagina
        setItemsPerPage() {

            this.pagesNumber = Math.floor(this.filmsFiltered.length / this.items_per_page);

            if (this.pageIndex * this.items_per_page <= this.filmsFiltered.length) {
                this.items_page = this.filmsFiltered.slice((this.pageIndex * this.items_per_page), ((this.pageIndex * this.items_per_page) + this.items_per_page));
            } else {
                this.items_page = this.filmsFiltered.slice((this.pageIndex * this.items_per_page), this.filmsFiltered.length - 1);

            }
        },

    },

});
