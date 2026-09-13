<!-- ConfirmationModal.vue -->
<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-8 rounded-md shadow-md">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg">{{ message }}</p>
          <button @click="closeModal(false)" class="text-gray-500">&times;</button>
        </div>
        <img v-if="imageSrc" :src="imageSrc" alt="Image Preview" class="mb-4">
        <div class="flex justify-end">
          <button @click="confirmAction(true)" class="px-4 py-2 bg-blue-500 text-white rounded-md">Confirm</button>
          <button @click="closeModal(false)" class="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showModal = ref(false);
  const message = ref('');
  const imageSrc = ref('');
  let resolveFn = null;
  
  const openModal = (msg, imgSrc = '') => {
    message.value = msg;
    imageSrc.value = imgSrc;
    showModal.value = true;
    return new Promise((resolve, reject) => {
      resolveFn = resolve;
    });
  };
  
  const closeModal = (confirmed) => {
    showModal.value = false;
    if (resolveFn) {
      resolveFn(confirmed);
      resolveFn = null;
    }
  };
  
  const confirmAction = (confirmed) => {
    closeModal(confirmed);
  };
  </script>
  