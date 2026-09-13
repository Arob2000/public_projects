<template>
  <UCard class="rounded-lg shadow-lg w-full h-full space-y-2.5" 
    :ui="{
        base:'flex flex-col h-full',
        body:{padding:' px-14 py-14 sm:p-14'}}" >

        <div class="flex flex-row">
            <div class="flex-col">
                <h2 class="text-4xl font-bold my-3">Verification</h2>
            </div>
        </div>


        <div class="flex flex-row my-8">

            <div class="flex flex-col w-full space-y-2.5">  

                <div class="flex flex-row ">
                    <p class="py-1">How Would You Prefer to Proceed?</p>
                </div>

                <UButton
                @click="handleOption('phone')"
                icon="" 
                color="gray" 
                size="xl"
                variant="ghost" 
                class="flex flex-row justify-between w-full h-auto border gap-2 border-gray-200 dark:border-gray-700 " 
                :ui="{ rounded: 'rounded-lg', padding: { xl: 'py-8 pr-10 pl-5' },icon:{size:{xl:'h-8 w-8'}} }">
                    <div class="flex flex-col items-start">
                        <div class="flex flex-row gap-4">
                            <div class="flex flex-col justify-center">
                                <UIcon
                                    name="i-heroicons-device-phone-mobile w-10 h-10"
                                />
                            </div>
                            <div class="flex flex-col items-start">
                                <p>
                                    +1 XXX-XXX-{{phone_Ending}}
                                </p>
                                <p class="text-sm text-gray-600">
                                    Messaging and data rates may apply.
                                </p>
                            </div>
                        </div>

                    </div>
                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-right"
                        />
                    </template>
                </UButton>

                <UButton 
                @click="handleOption('email')"
                icon="" 
                size="xl"
                color="gray" 
                variant="ghost" 
                class="flex flex-row justify-between w-full h-auto border border-gray-200 dark:border-gray-700 p-"
                :ui="{ rounded: 'rounded-lg', padding: { xl: 'py-8 pr-10 pl-5' } }">

                    <div class="flex flex-col items-start">
                        <div class="flex flex-row gap-4 items-center">
                            <div class="flex flex-col">
                                <UIcon
                                    name="i-heroicons-envelope w-10 h-10"
                                />
                            </div>
                            <div class="flex flex-col items-start">
                                <p>
                                   {{truncateEmail(user_email)}}
                                </p>
                            </div>
                        </div>

                    </div>
                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-right"
                            class=""
                        />
                    </template>
                </UButton>
                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div class="text-[#D8D8D5] text-base">A message containing the verification code will be sent to the option you select.</div>
                    </div>
                </div>
            </div>

        </div>


    </UCard>
</template>
    
<script setup>
const phone_Ending = sessionStorage.getItem('phone_Ending');
const user_email = sessionStorage.getItem('user_email');
const user_password = sessionStorage.getItem('user_password');
// const user_email = "user@example.com";
// const user_password = "password";
function truncateEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const firstLetter = email[0];
    const lastLetter = email[atIndex - 1];
    const truncatedEmail = `${firstLetter}...${lastLetter}${email.slice(atIndex)}`;
    return truncatedEmail;
  }
  return email; // If no "@" symbol found, return the original email
}

async function callLoginApi(send_email_otp){
    const apiUrl = 'https://vintrackers.buildonlinestaging.com/api/v1/auth/login';

    const requestBody = {
    email: user_email,
    password: user_password,
    send_email_otp: send_email_otp,
    };

    sessionStorage.setItem("send_email_otp", send_email_otp);

    try {
        const response = await $fetch(apiUrl,{
            method:'POST',
            body:requestBody,
            headers: {
            'Content-Type': 'application/json',
            },
        });

    }catch(error){

    }

}

async function handleOption(pageType){
    if(pageType==='phone')
        await callLoginApi(false);
    else
        await callLoginApi(true);

    navigateTo(`verification/${pageType}`);

}

</script>

<style>

</style>