<template>
  <UCard class=" w-full h-full " :ui="{body:{base:'flex flex-col content-center h-full',padding:'px-14 py-14 sm:p-14'}}">

    <div class="flex flex-row">
      <div class="flex-col">
          <h2 class="text-4xl font-bold">Sign in</h2>
      </div>
    </div>

    <div class="flex flex-row">
        <UForm :state="formState" :schema="signInSchema" class="flex flex-col w-full" @submit="onSubmit">
          <div class="flex-row my-14">
            <div class="flex flex-col ">
              <UFormGroup name="email" label="Email Address" class="">
              <UInput
                placeholder="michelle.rivera@example.com"
                icon="i-heroicons-envelope"
                v-model="formState.email"
                variant="none"
                size="xl"
                class="border-b border-gray-200 dark:border-gray-700" 
                :ui="{
                  icon:{
                    size:{
                      xl:'h-5 w-5'
                    }
                  }
                }"
                />
              </UFormGroup>

              <UFormGroup name="password" label="Password" class="mt-8" >
              <UInput
                type="password"
                placeholder="Password"
                icon="i-heroicons-lock-closed"
                v-model="formState.password"
                variant="none"
                size="xl"
                :ui="{
                  icon:{
                    size:{
                      xl:'h-5 w-5'
                    }
                  }
                }"
                class="border-b border-gray-200 dark:border-gray-700"
                />
              <span >
                <NuxtLink to="/Recover" class="text-[#EE7203] float-right text-sm mt-4">Forgot Password?</NuxtLink>
              </span>
              </UFormGroup>
              </div>
              <span v-if="invalidCred" class="text-[#E32B00]">
                  Invalid email or password
              </span>
          </div>
          <div v-if="showError===true" class="flex flex-row -mt-2 mb-12  justify-center ">
            <UCard class="flex flex-col  border-t-8 border-[#E32B00] space-y-2.5 w-full" :ui="{body:{rounded:'rounded-lg',padding:'px-2 py-2 sm:p-2'}}">
              <p>
                oops something went wrong
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </UCard>
          </div>
          <div class="flex-row">
            <UButton  block color="orange" size="xl" type="submit" :disabled="!formState.email || !signInSchema.safeParse(formState).success">Cotinue</UButton>
          </div>

        </UForm>
    </div>

          
  </UCard>
</template>

<script setup lang="ts">


import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import {signInSchema} from '~/schemas/SignInFormSchema'
import { useRouter } from 'vue-router'; // Import the router
import type { variants } from '#tailwind-config';
type SignInSchema = z.output<typeof signInSchema>

var showError = false;
var invalidCred = false;
const formState= ref({
  email:'',
  password:'',
});

async function onSubmit (event: FormSubmitEvent<SignInSchema>) {

  const apiUrl = 'https://vintrackers.buildonlinestaging.com/api/v1/auth/login';

    const requestBody = {
      email: formState.value.email,
      password: formState.value.password,
      send_email_otp: false,
    };
    try {
    // Send form data to the server for validation

    const response = await $fetch(apiUrl,{
      method:'POST',
      body:requestBody,
      headers: {
      'Content-Type': 'application/json',
      },
      
    })
      console.log({response});
    // Handle the response from the server
    if (response.success) {
      // Successful authentication
      // Save the token (e.g., in local storage or Vuex store)
      // Redirect the user to the dashboard or another route
      sessionStorage.setItem("user_email", response.data.email);
      sessionStorage.setItem("user_password",formState.value.password);
      sessionStorage.setItem("phone_Ending", response.data.phone_ending);
      navigateTo({path:'/VerificationStart'});
      console.log('Authentication successful!', response.data);
    } else {
      // Invalid credentials
      invalidCred = true;
      console.error('Invalid email or password.');
    }
  } catch (error) {
    // Handle any network errors or server issues
    showError = true;
    console.error('An error occurred during authentication:', error);
  }
    console.log(event.data)
}
</script>

