<template>
    <UCard class="flex flex-col h-screen items-center justify-center" :ui="{body:{padding:'px-0 py-0 sm:p-0'}}">
      <div class=" flex flex-row w-[600px]" >
       <PageHeader/>
      </div>
      <!-- Page Content -->
      <UContainer class="flex flex-row w-[600px] h-[650px]" :ui="{padding:'px-0 sm:p-0 lg:px-0'}">
        <slot/>
      </UContainer>

    </UCard>
</template>

<script setup>
import PageHeader from '~/components/PageHeader.vue';
</script>

<style>

</style>