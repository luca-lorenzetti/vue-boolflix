let app = new Vue({
    el: '#root',
    data:{
        input: '',
        indexFilm: null,
        indexStar: null,
        filmsSearched: [],
        movies: [],
        tvs: []

    },
    methods:{

        serachByTitle(title,movie,tv){

            if( movie ){
                this.getMovies(title);
            }

            if( tv ){
                this.getTvs(title);
            }
            this.filmsSearched = [...this.movies, ...this.tvs];
           
        },

        getMovies( title ){
            
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
        getTvs( title ){

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
