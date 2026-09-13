<template>
    <UCard class="w-full h-full" :ui="{body:{base:'h-full flex flex-col content-center',padding:'px-14 py-14 sm:p-14'}}">
  
      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <h2 class="text-4xl font-bold">Verification</h2>

        </div>
      </div>

      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <slot name="verficationPageHeader">
            
          </slot>
        </div>
      </div>

      
      <div class="flex flex-row">
        <div class=" flex flex-col items-center justify-center">
          <UForm :state="state" :schema="schema" class=" flex flex-row items-baseline gap-3" @submit="handleBtnClick" @error="onError">
            <div class="flex-col">
              <div class="flex flex-row space-x-1">
                <UFormGroup v-for="(input, index) in state.numbers" :eager-validation="true" :key="index" :id="`input-${index}`" name="state.numbers" class="">
                    <UInput  
                      ref="inputRefs"
                      size="xl"
                      type="text"
                      :id="`validate-input-${index}`"
                      maxlength="1"
                      inputClass="text-center h-[64px]"
                      v-model="state.numbers[index]"
                    />
                </UFormGroup>
              </div>

              <div class=" w-full flex flex-row items-center justify-center my-12">
                
                <div class="flex flex-col">
                  <p v-if="invalidCred" class=" flex flex-row text-[#E32B00] justify-center ">
                      Invalid security Code
                    </p>

                    <CountdownTimer @timer-finished="showRequestAgain=true" :key="resendCount" class="flex flex-row justify-center" />
   
                  <p v-show="showRequestAgain===true">Request Again?
                    <NuxtLink @click="handleResendClick,resendCount++,showRequestAgain=false" class="text-[#EE7203] cursor-pointer">Resend  </NuxtLink>
                    <span class="text-gray-500"> | </span>
                    <NuxtLink v-if="pageType==='email'" to="/verification/phone" @click="resendCount++" class="text-[#EE7203]">Get Via SMS</NuxtLink>
                    <NuxtLink v-else-if="pageType==='phone'" to="/verification/email" @click="resendCount++" class="text-[#EE7203]">Get Via Email</NuxtLink>
                  </p>
                </div>
              </div>

              <div v-if="showError===true" class="flex flex-row mb-12  justify-center ">
              <UCard class="flex flex-col  border-t-8 border-[#E32B00] space-y-2.5 w-full" :ui="{body:{rounded:'rounded-lg',padding:'px-2 py-2 sm:p-2'}}">
                <p>
                  oops something went wrong
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </UCard>
            </div>

              <div class="w-full flex flex-row">
                <UButton  block color="orange" size="xl" type="submit" :disabled="!schema.safeParse(state).success" >Cotinue</UButton>
              </div>

            </div>
 
          </UForm>
        </div>
      </div>
    </UCard>
  </template>
      
  <script setup lang="ts">
    import { z } from 'zod';
    import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'

   import CountdownTimer from '~/components/CountdownTimer.vue';
   const emit = defineEmits(['restart-timer']);

   let showRequestAgain = ref(false);
   const resendCount=ref(0);
   
   const props = defineProps(['pageType']);
   const pageType = props.pageType;
   let showError= false;
   let invalidCred=false;
  const state = reactive({
    numbers: [null, null, null, null, null, null]
  })

  const inputRefs = ref([])

  const schema = z.object({
      numbers: z.array(z.string()).refine(inputs => inputs.filter(value => value != null).length == 6)
  })

  async function handleBtnClick(){

    const apiUrl = 'https://vintrackers.buildonlinestaging.com/api/v1/auth/otp';
    const user_email = sessionStorage.getItem('user_email');
    const user_password = sessionStorage.getItem('user_password');
    const otp = state.numbers.toString().replaceAll(',','');
    
    const requestBody = {
      email: user_email,
      password: user_password,
      otp: otp,
      processing: true
    };


    try{
      const response = await $fetch(apiUrl,{
      method:'POST',
      body:requestBody,
      headers: {
      'Content-Type': 'application/json',
      },
    });

    if (response.success) {
      // Successful authentication
    } else {
      // Invalid credentials
      invalidCred = true;
      console.error('Invalid security Code.');
    }

    }catch(error){
      showError=true;
      console.error('An error occurred during authentication:', error);
    }

  }

    async function callLoginApi(send_email_otp){
      
      const apiUrl = 'https://vintrackers.buildonlinestaging.com/api/v1/auth/login';
      const user_email = sessionStorage.getItem('user_email');
      const user_password = sessionStorage.getItem('user_password');

      const requestBody = {
        email: user_email,
        password: user_password,
        send_email_otp: send_email_otp,
      };

      try {
          const response = await $fetch(apiUrl,{
              method:'POST',
              body:requestBody,
              headers: {
              'Content-Type': 'application/json',
              },
          });

      }catch(error){
        showError=true;
        console.error('An error occurred during authentication:', error);
      }

  }

  async function handleResendClick(){
    if(pageType==='phone')
      await callLoginApi(false);
    else
      await callLoginApi(true);

  }
  async function onError (event: FormErrorEvent) {
    console.log({ event })
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }



  onMounted(()=>{
    inputRefs.value.forEach((input,index)=>{
      input.input.addEventListener('input',(event)=>{ 
          if(event.inputType==='deleteContentBackward'){

            if(event.target.value.trim()===''){
            const prevIndex = (index-1)%inputRefs.value.length;
            inputRefs.value[prevIndex].input.focus();
            }
          } else if(event.inputType ==='insertText'){
            if(event.target.value.trim()!==''){
              const nextIndex = (index+1)%inputRefs.value.length;
            inputRefs.value[nextIndex].input.focus();
            }
          }
        });
      })
    })
  </script>
  
  <style scoped>
    
  </style>