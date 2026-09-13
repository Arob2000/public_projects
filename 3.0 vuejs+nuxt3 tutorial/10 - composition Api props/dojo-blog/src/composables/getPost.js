import { ref } from 'vue'

const getPost = (id)=>{
    const post = ref(null);
    const error= ref(null);

    const load = async()=>{
      try{
        // let data = await fetch('http://localhost:3000/posts?id='+id); we use await data.json()[0]; to get the result
        let data = await fetch('http://localhost:3000/posts/'+id)
        if(!data.ok){
          throw Error('post doesnt exist')
        }
        post.value = await data.json();
        console.log(post.value)
      } catch(err){
        error.value = err.message;
        console.log(error.value);
      }
    }
    return {post, error, load}
};

export default getPost