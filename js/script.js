let app = new Vue({
    el: '#root',
    data:{
        input: '',
        indexFilm: null,
        filmsSearched: []
    },
    methods:{

        serachByTitle(title){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: "feaf6db23feb7f3f96d8b38aa0e56ba0",
                    query: title
                }
              })
              .then( (response) => {
                    this.filmsSearched = response.data.results;
                    console.log(this.filmsSearched)
              });


              
            }
    },

    created(){
    }
});
