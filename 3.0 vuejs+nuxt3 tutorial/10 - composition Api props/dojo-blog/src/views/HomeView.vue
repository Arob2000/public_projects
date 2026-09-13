<template>
  <div class="home">
    <h1>Home</h1>
    <!-- <PostList v-if="showPosts" :posts="posts" /> -->
    <!-- <button @click="showPosts = !showPosts">toggle posts</button>
    <button @click="posts.pop()">delete a post</button> -->
    <div v-if="error" class="error">{{error}}</div>
    <div v-if="posts.length">
       <PostList :posts="posts" />
    </div>
    <div v-else>
      <div>Loading ....</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import getPosts from '../composables/getPosts.js'
// component imports
import PostList from '../components/PostList.vue'

export default {
  name: 'HomeView',
  components: { PostList },
  setup() {  
    // const posts = ref([
    //   { title: 'welcome to the blog', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in imperdiet nisi. Vestibulum eu dui dictum, ornare est non, dignissim dui. Donec at ex nulla. Aenean sem tortor, bibendum ac accumsan vel, elementum vel turpis. Nam auctor egestas pulvinar. Aenean placerat finibus finibus. Praesent dictum velit at purus aliquam, sit amet mattis est molestie. Duis a nulla et mauris luctus feugiat nec cursus odio. Nam elementum vitae est eu porttitor. Nulla vestibulum gravida magna eu ultricies. Nunc posuere tincidunt pellentesque. Sed id condimentum nisl, ultricies viverra orci. Fusce sit amet massa ut nibh feugiat elementum ac id est.', id: 1 },
    //   { title: 'top 5 CSS tips', body: 'lorem ipsum', id: 2 },
    // ])
    // const showPosts = ref(true)
    
    // return { posts, showPosts }
    // const posts = ref([]);
    // const error= ref(null);

    // const load = async()=>{
    //   try{
    //     let data = await fetch('http://localhost:3000/posts');
    //     if(!data.ok){
    //       throw Error('no data available')
    //     }
    //     posts.value = await data.json();
    //     console.log(posts.value)
    //   } catch(err){
    //     error.value = err.message;
    //     console.log(error.value);
    //   }
    // }
    // load();
    const{posts , error, load} = getPosts();
    load();
    return { posts, error }

  },
}
</script>