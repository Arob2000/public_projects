<template>
    <div class="text-center">
      <p v-if="timeInSeconds > 0" class="text-[#EE7203]">{{ minutes }}:{{ seconds }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref} from 'vue';

  //this.on('restart-timer',()=>{startTimer()})
  const emit = defineEmits(['timer-finished']);
  
  const timeInSeconds = ref(59);

  const minutes = ref(Math.floor(timeInSeconds.value / 60));
  const seconds = ref(timeInSeconds.value % 60);
  let timerInterval;
  const updateTimer = () => {
    timeInSeconds.value--;
    minutes.value = Math.floor(timeInSeconds.value / 60);
    seconds.value = timeInSeconds.value % 60;


    if (timeInSeconds.value === 0) {
      emit('timer-finished');
      clearInterval(timerInterval);
    }
  };

  function startTimer(){
    timerInterval =  setInterval(updateTimer, 1000);
  }

  onMounted(()=>{
    startTimer();
  });  
  
  </script>
  