<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>{{title}}</h1>
  <p> Welcome</p>
  <!-- <Modal header="sign up for the giveaway!" text="grab your ninja swag for half price"/> -->
  <teleport to=".modals" v-show="showModal">
    <!-- <Modal :header="header" :text="text" theme="sale" @closeModal="toggleModal"/> -->
    <Modal theme="sale" @closeModal="toggleModal">
      <template v-slot:links>
          <a href="#"> sign up now </a>
          <a href="#"> more </a>
        </template>
        <h1>{{header}}</h1>
        <p> {{text}}</p>
    </Modal>

  </teleport>
  <input type="text" ref="name">
  <button @click="handleClick">click me</button>
  
  <div v-show="showModal2">
    <Modal  @closeModal="toggleModal2">
      <template v-slot:links>
          <a href="#"> sign up later </a>
          <a href="#"> more please</a>
        </template>
        <h1>sign up to news letter</h1>
        <p> for promo codes and updates</p>
    </Modal>
  </div>
  <br>
  <button @click="toggleModal">show modal</button>
  <button @click="toggleModal2">show modal 2</button>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  data(){
    return{
      title: 'my first vue app :)',
      header: 'sign up for the giveaway!',
      text: 'grab your ninja swag for half price',
      showModal: false,
      showModal2: false,
    } 
  },
  methods:{
    handleClick(){
      console.log(this.$refs.name);
      this.$refs.name.classList.add('active');
      this.$refs.name.focus();
    },
    toggleModal(){
      this.showModal=!this.showModal;
    },
    toggleModal2(){
      this.showModal2=!this.showModal2;
    }
  },
  components:{
    Modal
  },
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
