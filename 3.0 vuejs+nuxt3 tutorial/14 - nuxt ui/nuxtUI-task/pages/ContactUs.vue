<template>
    <UCard class=" w-full h-full" :ui="{body:{base:'flex flex-col content-center h-full gap-4',padding:'px-14 py-14 sm:p-14'}}">

        <div class="flex flex-row">
            <h2 class="text-4xl font-bold">Support</h2>
        </div>

        <div class="flex flex-row">
          <div class="flex flex-col w-full">
                <div class="flex flex-row">
                    <div class="flex-col w-full">
                        <p class="py-1">How can we help you?</p>
                        <UButton
                         color="white" 
                         icon="i-heroicons-envelope"
                         size="xl"
                         type="submit"
                         class="w-full py-8 px-5"
                         @click="" 
                        :ui="{ 
                            rounded: 'rounded-lg',
                            icon:{
                                size:{
                                    xl:'h-10 w-10'
                                }
                            }
                        }"

                        >Email Us</UButton>
                    </div>
                </div>
          </div>
        </div>
        
        <div class="flex flex-row ">
            <div class="flex flex-col space-y-2.5 ">
                <div class="flex flex-row">
                    <p class="">Frequently Asked questions</p>
                </div>
                <div class="flex flex-row">
                    <UAccordion :items="FAQItems" :ui="{ wrapper: 'flex flex-col w-full border border-gray-200 dark:border-gray-700 rounded-lg' }">
                        <template #default="{ item, open }">
                            <UButton color="gray" variant="ghost" class="border-b border-t border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-lg', padding: { sm: 'p-3' } }">
                                <span class="truncate">{{ item.label }}</span>
                                <template #trailing>
                                <UIcon
                                    name="i-heroicons-chevron-down-20-solid"
                                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                    :class="[open && 'rotate-180']"
                                />
                                </template>
                            </UButton>
                        </template>
                    </UAccordion>
                </div>
            </div>  
        </div>
    </UCard>
</template>

<script setup>
    definePageMeta({
        layout: "contact-us",
    })
    const FAQItems = [{
    label: 'How do I create an account?',
    defaultOpen: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
    }, {
    label: 'How can I change my email address or phone number?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
    }, {
    label: 'How do I report a problem or bug?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
    }, {
    label: 'Can I use your service on multiple devices?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
    },]

</script>

<style>
[id^="headlessui-disclosure-panel"] {
  padding: 10px;
}
</style>