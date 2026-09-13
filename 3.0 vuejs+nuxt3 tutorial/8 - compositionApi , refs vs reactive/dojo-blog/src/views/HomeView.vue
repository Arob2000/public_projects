<template>
  <div class="home">
    <h1>Home </h1>
    <p ref="p">My name is {{name}} and I am {{age}} years old</p>
    <button @click="handleClick"> click me</button>
    <button @click="age++"> add 1 to age</button>

    <input type = "text" v-model="name"/>
    <div>
      <h2>Refs</h2>
      <p>{{ ninjaOne.name }} - {{ninjaOne.age}} - {{nameOne}}</p>
      <button @click="updateNinjaOne"> update ninjaOne</button>

      <h2>reactive</h2>
      <p>{{ ninjaTwo.name }} - {{ninjaTwo.age}} - {{nameTwo}}</p>
      <button @click="updateNinjaTwo"> update ninjaTwo</button>

    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

// @ is an alias to /src

export default {
  name: 'HomeView',
  setup(){
    console.log('setup');

    const p = ref(null);
    console.log(p,p.value);

    const name = ref('mario');
    const age = ref(30);

    const ninjaOne = ref({name: 'mario', age: 30});
    const ninjaTwo = reactive({name: 'luigi', age: 35});

    const nameOne = ref('maarioo');
    const nameTwo = reactive('luiigii');

    const handleClick=()=>{
      console.log('you clicked me');
      console.log(p,p.value);
      p.value.classList.add('test');
      name.value = 'luigi';
      age.value = 28;
      //p.value.textContent='helloooo im' + name + 'and '+ age+ 'years old';
      // p.value.innerHTML='heeyyyy';

    }
    const updateNinjaOne=()=>{
      ninjaOne.value.age=45;
      nameOne.value='luigi'
    }
    const updateNinjaTwo=()=>{
      ninjaTwo.age=40;
      //nameTwo = 'mario'; dont work

    }
    return {name, age, handleClick, p, ninjaOne,updateNinjaOne,ninjaTwo,updateNinjaTwo, nameOne,nameTwo}
  },
  data(){
    return {
      score: 40
    }
  }
}
</script>
