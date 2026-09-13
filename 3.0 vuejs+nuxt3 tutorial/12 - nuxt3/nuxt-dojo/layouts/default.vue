<template>
    <div>
        <header class="shadow-sm bg-whie">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">Nuxt Dojo</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/products" class="btn">products</NuxtLink></li>
                    <li><NuxtLink to="/products/abc">abc sa</NuxtLink></li>
                </ul>
            </nav>
        </header>

        <!--output the page content-->
        <div class="container mx-auto">
            <slot />
        </div>
    </div>
</template>
<style scoped>
  .router-link-exact-active {
    color: #12b488;
  }
</style>