
import { CarDetailHero } from '#build/components';
<template>
    <div>
    <!-- CAR DETAIL PAGE -->

    <!-- CAR HERO -->
    <CarDetailHero/>
    <!-- CAR HERO -->

    <!-- CAR ATTRIBUTES -->
    <CarDetailAttributes/>
    <!-- CAR ATTRIBUTES -->

    <!-- CAR DESCRISPTION -->
    <CarDetailDescription/>
    <!-- CAR DESCRISPTION -->

    <!-- CAR CONTACT -->
    <CarDetailContact/>
    <!-- CAR CONTACT -->

    <!-- CAR DETAIL PAGE   -->

    </div>
</template>
<script setup>
definePageMeta({
    layout: 'custom',
})
   const route = useRoute();
   const {toTitleCase} = useUtilities();
    useHead({
        title: `${toTitleCase(route.params.name)}`,
    })
</script>