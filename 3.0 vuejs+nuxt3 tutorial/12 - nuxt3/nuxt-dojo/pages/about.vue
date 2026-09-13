<template>
    <div>
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, corporis repudiandae!</p>
        <p> Aperiam officia facilis, ad optio consectetur assumenda dignissimos iure odit ab quae repellat animi itaque temporibus nostrum similique perferendis.</p>
      <div>{{data}}</div>
      <div>{{data2}}</div>
   </div>
</template>

<script setup>
  // const {data} = await useFetch('./api/ninja?name=mario'); // get
  // const {data: data2} = await useFetch('./api/ninja?name=mario',{ //get with post
  //   method:'post',
  //   body:{age:30},
  // });
  const {data} = await useFetch('./api/ninja/currency/GBP');
</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
    font-size: 36px;
  }
  p {
    margin: 20px 0;
  }
</style>