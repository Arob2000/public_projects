<template>
  <!-- added dragover ,drop  and leave handlers-->
  <div @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragleave.prevent="handleDragLeave">
    <Head>
      <Title>Image Gallery</Title>
    </Head>
    <div class="container mx-auto " >
      <div class="flex justify-between px-4 pt-14">
        <h1 class="text-4xl font-bold">Gallery</h1>
        <button
          id="uploadBtn"
          @click="handleUploadClick"
          class="bg-blue-400 hover:shadow-lg text-black px-4 py-0 rounded-full"
        >
          Upload
        </button>
      </div>
      <div class="border-b-2 pb-2"></div>

      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileUpload"
      />

      <div id="imageGallery" class="flex flex-wrap gap-4 py-10 px-8">
        <!-- Images will be dynamically added here -->
      </div>

      <!-- Confirmation Modal -->
      <div v-if="isModalOpen" class="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50" @click.self="closeModal">
        
        <div class="modal-content bg-white p-8 rounded-md shadow-md max-w-xs max-h-s overflow-y-auto" @click.stop>
          <div class="flex justify-between items-center mb-4">
            <p v-if="modalMessage" class="text-lg">{{ modalMessage }}</p>
            <button @click="closeModal" class="modal-close-btn rounded-full bg-black text-white">X</button>
          </div>
          <img v-if="imageSrc" :src="imageSrc" alt="Image Preview" class="modal-img p-10 max-w-s h-auto object-contain">
          <div v-if="showButtons" class="modal-buttons flex items-center justify-around w-full">
            <button @click="handleConfirmAction" id="confirmButton"class="modal-confirmButton px-4 py-2 bg-blue-500 text-white rounded-md">Confirm</button>
            <button @click="closeModal" id="cancelButton" class="modal-cancelButton ml-4 px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          </div>
        </div>
      </div>
      
      <button @click="window.history.go(-2)"></button>
      <!-- Drag and drop overlay -->
      <div v-if="isDragging" class="drag-overlay">
        <p>Drop the image here to upload</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const images = ref([]);

const isModalOpen = ref(false);
const previewImage = ref('');
const modalMessage = ref('');
const time = "2024-04-05T23:29:00Z";
//4/5/2024 - 11:29 PM
const convertedTime = new Date(time);
console.log("Converted Time",format(convertedTime, 'dd/MM/yyyy - HH:mm A'));

let actionType = ''; // 'upload' or 'delete'
let imageSrc='';
let imageIndex='';
let showButtons = true;
const isDragging = ref(false);

// Methods to handle drag and drop events
const handleDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};

//handle file drop
const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    fileInput.value.files = event.dataTransfer.files; // Set the dropped file to the file input
    handleFileUpload(); // Trigger the upload function
  }
};

//handle leaving the page
const handleDragLeave = () => {
  if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
    isDragging.value = false; // Hide the overlay only when leaving the entire container
  }};

//openning the modal 
const openModal = (imageSrc, message, type) => {
  if(type != 'message'){
    showButtons = true;
    previewImage.value = imageSrc;
  }
  else showButtons = false;
  modalMessage.value = message;
  actionType = type;
  isModalOpen.value = true;
};

//function to handle the close modal
const closeModal = () => {
  isModalOpen.value = false;
  previewImage.value = '';
  modalMessage.value = '';
  actionType = '';
  fileInput.value.value = '';
  showButtons = false;
};

//function to show the modal
const showModal = (imageSrc, message, type) => {
  openModal(imageSrc, message, type);
};

//handle the confirmation  of deleting or uploading an image in the modal
const handleConfirmAction = () => {
  let modalMessage = '';

  if (actionType === 'upload') {
    // Handle upload action
    uploadImage(imageSrc).then((ImageUploaded)=>{
    closeModal();
    if(ImageUploaded)
      modalMessage = 'upload successful';
    else 
      modalMessage = 'failed to upload the image';
    showModal('',modalMessage,'message');
    });
  } else if (actionType === 'delete') {
    // Handle delete action
    deleteImage();
    closeModal();
    modalMessage = 'deleted successfully';
    showModal('',modalMessage,'message'); 
 } 
  fileInput.value.value = '';
};

const handleUploadClick = () => {
  fileInput.value.click();
};

//function to handle the file upload
const handleFileUpload = async () => {
  const file = fileInput.value.files[0];
  if (file.size > 2 * 1024 * 1024) {
    console.error('Image size exceeds 2MB');
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    //extracting the base64 from the uploaded image
    const base64Image = reader.result.split(',')[1];
    const message = 'Are you sure you want to upload this image?';
    imageSrc = 'data:image/jpeg;base64,' + base64Image;
    showModal(imageSrc , message, 'upload');
  };
};

//function to handle the image upload to the api
const uploadImage = (imageDataBase64)=>{
  return new Promise((resolve)=>{
    x = 20;
    console.log(x);
    const apiUrl = "https://vintrackers.buildonlinestaging.com/upload/images/%3Flimit%3D20";
    const seachedLimit = new URLSearchParams(window.location.search)
    localStorage.setItem('loginToken',);
    localStorage.getItem('')
    console.log(seachedLimit.has('limit'));
    seachedLimit.get('limit');
    const requestBody = {
      images: [imageDataBase64]
    };

    //Post Request to the Api with Image Data Base64
    fetch( apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {

      console.log(response);
        if (response.ok) {
          //add the image to images array to render it
          images.value.push({ src: imageDataBase64, alt: 'Uploaded Image' });
          renderImages();
          //return true
          resolve(true);
        } else {
          console.log('Failed to upload image');
          resolve(false);
        }
    })
    .catch((error) =>{
      console.log("Error : ", error );
      resolve(false);
    });
   }
  );
};
const pureFunction = (number)=>{

  number*0.25;
}
//function to handle the image deletion click
const deleteImageClick = (index)=>{
  const message = 'Are you sure you want to delete this image?';
  imageSrc =  images.value[index].src;
  imageIndex = index;
  showModal(imageSrc , message, 'delete');
}

//function to delete the image
const deleteImage = () => {
  images.value.splice(imageIndex, 1);
  renderImages(); // Update the displayed images after deletion
};

//function to render the images in div for the image gallery
const renderImages = () => {
  const imageGallery = document.getElementById('imageGallery');
  imageGallery.innerHTML = '';
  images.value.forEach((image, index) => {
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('gallery-photo','border', 'rounded-md', 'overflow-hidden', 'relative');
    
    //creating the delete button and positioning it in the top right corner of the image
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn','absolute', 'top-2', 'right-2', 'rounded-full', 'bg-white', 'text-black', 'py-0', 'hidden'); // Updated button classes
    deleteBtn.style.width = "25px";
    deleteBtn.style.height = "25px";
    deleteBtn.addEventListener('click', () => deleteImageClick(index));
    imgDiv.appendChild(deleteBtn);

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add('gallery-img','w-291', 'h-520', 'object-contain','md:object-scale-down','mx-auto');
    imgDiv.appendChild(img);

    imgDiv.addEventListener('mouseenter', () => {
      deleteBtn.classList.remove('hidden');
    });
    imgDiv.addEventListener('mouseleave', () => {
      deleteBtn.classList.add('hidden');
    });

    imageGallery.appendChild(imgDiv);
  });
};
</script>

<style>
/* styles for the elements are placed inside the styles/styles.css file*/
</style>
