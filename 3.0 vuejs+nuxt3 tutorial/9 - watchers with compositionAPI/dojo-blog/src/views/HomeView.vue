<template>
  <div class="home">
    <h1>Home</h1>
    <p>name: {{name}}</p>
    <input type="text" v-model="search">
    <p>search term - {{search}}</p>
    <div v-for="name in MatchingNames" :key="name">{{name}}</div>
    <button @click="handleStopWatchFunctions">Stop Watch Functions</button>
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect } from 'vue';

// @ is an alias to /src

export default {
  name: 'HomeView',
  setup(){
    const search = ref('');

    const names = ref(['mario', 'yoshi', 'luigi', 'toad', 'bowser', 'koopa', 'peach'])
    const name= computed(()=>{
      return 'Eyas'
    })
    const stopWatch = watch(search ,()=>{
      console.log("watch function ran");
    });
    const stopWatchEffect = watchEffect(()=>{
      console.log("watchEffect function ran",search.value);
    });
    const MatchingNames= computed(()=>{
      return names.value.filter((name)=>name.includes(search.value))
    })
    const handleStopWatchFunctions = ()=>{
      stopWatch();
      stopWatchEffect();
    }
    return {name,names, search, MatchingNames,handleStopWatchFunctions}
  }
}
</script>
