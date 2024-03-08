<template>
  <div class="main">
    <div class="page">
        <button @click="previous" class="prev">Previos</button>
        <button @click="next" class="next">Next</button>
    </div>
    <div class="movies">
      <div class="movie" v-for="movie in allMovies" :key="movie.id">
        <div class="image">
          <img :src="movie.img"/>
        </div>
        <div class="name"><p>{{ movie.name }}</p></div>
        <div class="info">
          <div class="year"><p>{{ movie.year }}</p></div>
          <div class="rating"><p>rating: {{ movie.rating }}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      allMovies: [],
      totalPages: 0,
      currentPage: 1
    }
  },
  async created(){
    this.allMovies = await axios.get("http://localhost:3000/movies/sort?limit=3&page=1")
    this.totalPages = this.allMovies.data.totalPages
    this.allMovies = this.allMovies.data.movies
    console.log(this.allMovies)
    console.log(this.totalPages)
  },
  methods: {
    async previous(){
      if(this.currentPage > 1){
        this.currentPage -= 1
        this.allMovies = await axios.get(`http://localhost:3000/movies/sort?limit=3&page=${this.currentPage}`)
        this.allMovies = this.allMovies.data.movies
        console.log(this.allMovies);
      }
    },
    async next(){
      if(this.currentPage < this.totalPages){
        this.currentPage += 1
        this.allMovies = await axios.get(`http://localhost:3000/movies/sort?limit=3&page=${this.currentPage}`)
        this.allMovies = this.allMovies.data.movies
        console.log(this.allMovies);
      }
    }
  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: rgb(232, 232, 232);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.movies{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

img{
  width: 300px;
  transition: 0.5s ease;
}

.image{
  border: none;
  border-radius: 20px;
  overflow: hidden;
}

.image:hover img{
  scale: 1.2;
}

.info{
  display: flex;
  width: 98%;
  justify-content: space-between;
}

p{
  font-size: 20px;
  margin: 2px;
}

.page{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 450px;
  margin: 50px;
}

button{
  width: 200px;
  padding: 10px;
  background: rgb(0, 0, 0);
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover{
  background: gray;
  color: white;
}

</style>
