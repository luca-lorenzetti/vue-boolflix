let app = new Vue({
    el: '#root',
    data:{
        input: '',
        typeSearch: 'all',
        indexFilm: null,
        indexStar: null,
        searchBar: false,
        filmsSearched: [],
        movies: [],
        tvs: []

    },
    methods:{

        serachByTitle(title,movie,tv){

            switch(this.typeSearch){
                case 'all':
                    this.setAllFilms(title);
            }
        },

        setAllFilms( title){
            axios.get('https://api.themoviedb.org/3/search/multi', {
                params: {
                    api_key: "feaf6db23feb7f3f96d8b38aa0e56ba0",
                    query: title
                }
                })
                .then( (response) => {
                    this.filmsSearched = response.data.results;
                    this.convertFlags(this.filmsSearched );
                    console.log(this.filmsSearched )
           
                });
        },

        setMovies( title ){
            
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: "feaf6db23feb7f3f96d8b38aa0e56ba0",
                    query: title
                }
                })
                .then( (response) => {
                    this.movies = response.data.results;

                    this.convertFlags(this.movies);
           
                });
                
        },
        setTvs( title ){

            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: "feaf6db23feb7f3f96d8b38aa0e56ba0",
                    query: title
                }
                })
                .then( (response) => {
                 this.tvs = response.data.results;
                 this.convertFlags(this.tvs);

                });
        },
        convertFlags(list){
            list.forEach((item)=>{
                switch(item.original_language){
                    case "en":
                        item.original_language = 'gb';
                        break;
                    case 'ja':
                        item.original_language = 'jp';
                        break;    
                }
            })

        }  
    },

    created(){

    }
});
