<template>
    <div>
        <div class="mt-32 flex">
            <!-- CAR SIDE BAR -->
            <CarSideBar/>
            <!-- CAR SIDE BAR -->

            <!-- CAR CARDS -->
           <NuxtPage />
            <!-- CAR CARDS -->
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: "custom",
    })
   const route = useRoute();
   const {toTitleCase} = useUtilities();

    useHead({
        title: `${route.params.make? toTitleCase(route.params.make) :"Cars"} Cars in ${toTitleCase(route.params.city)}`,
    })
</script>