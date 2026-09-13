
<template>


 <codeVerification pageType="phone">
      <template v-slot:verficationPageHeader>
        <div class="flex flex-col space-y-4 my-3">
          
          <div class="flex flex-row items-center justify-center">
            <svg width="105.2" height="106.99" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 27V5C24 3.89543 23.1046 3 22 3L10 3C8.89543 3 8 3.89543 8 5L8 27C8 28.1046 8.89543 29 10 29H22C23.1046 29 24 28.1046 24 27Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 9C16.8284 9 17.5 8.32843 17.5 7.5C17.5 6.67157 16.8284 6 16 6C15.1716 6 14.5 6.67157 14.5 7.5C14.5 8.32843 15.1716 9 16 9Z" fill="black"/>
              </svg>
          </div>
          <div class=" flex flex-row">
             <p >Please enter the security code sent to +1 XXX-XXX-1050</p>
          </div>
        </div>
      </template>
      </codeVerification>
  </template>
      
  <script setup>
 import codeVerification from '~/components/codeVerification.vue';

   const handleBtnClick=()=>{
  }
  
  </script>
  
  <style >

  </style>