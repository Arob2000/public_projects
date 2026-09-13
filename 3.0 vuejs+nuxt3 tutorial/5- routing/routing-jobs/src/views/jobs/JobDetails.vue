<template>
    <div v-if="job" class="jobDetails">
        <h1>job details page</h1>
        <p>job id is : {{id}}</p>
        <p>job title is : {{job.title}}</p>
        <p>job details is : {{job.details}}</p>
    </div>
    <div v-else>
        <p>loading...</p>
    </div>

</template>

<script>
    export default{
        props:['id'],
        data(){
            return {
                // id:this.$route.params.id,
                job:null,
            }
        },
        mounted(){
            fetch('http://localhost:3000/jobs?id='+this.id)
            .then(res=>res.json())
            .then(data=> this.job = data[0])
            .catch(err=>console.log(err.message));
          


        }
        
    }
</script>
<style>

</style>