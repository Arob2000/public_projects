<template>
    <form @submit.prevent="handleSubmit">
        <label>name</label>
        <input type="text"  v-model="v$.name.$model">

        <div v-if="v$.name.required.$invalid" class="error" >Name is required  </div>
        <div v-if="v$.name.minLength.$invalid" class="error" >Name must be atleast must be atleast {{v$.name.minLength.$params.min}} letters.</div>


        <label>email</label>
        <input type="email"  v-model="v$.email.$model">

        <div  v-if="v$.email.required.$invalid" class="error">email is required</div>
        <div  v-if="v$.email.minLength.$invalid" class="error">email must have at least {{v$.email.minLength.$params.min}} letters.</div>

        <label>phone</label>
        <input type="text"  v-model="v$.phone.$model">

        <div  v-if="v$.phone.required.$invalid" class="error">phone is required</div>
        <div  v-if="v$.phone.minLength.$invalid" class="error">phone must have at least {{v$.phone.minLength.$params.min}} letters.</div>

        <label>address</label>
      <input type="text"  v-model="v$.address.$model">
        <div  v-if="v$.address.required.$invalid" class="error">address is required</div>
        <div  v-if="v$.address.minLength.$invalid" class="error">address must have at least {{v$.address.minLength.$params.min}} letters.</div>
        <div class="submit" >
          <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
        </div>
        <p class="" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>

  

</template>

<script>

    import {useVuelidate} from '@vuelidate/core'
    import { required, minLength } from '@vuelidate/validators'

    export default{

        name: 'SignupForm',
        setup(){
          return {  v$: useVuelidate()  }
        },
        props:[],
        data(){
            return {
                name:'',
                email:'',
                phone:'',
                address:'',
                submitStatus:'',
            }
        },
        validations:{
            name: {
                required,
                minLength: minLength(4),
                $lazy:true,
            },
            email: {
                required,
                minLength: minLength(5),
                $lazy:true,
            },
            phone: {
                required,
                minLength: minLength(10),
                $lazy:true,
            },
            address: {
                required,
                minLength: minLength(4),
                $lazy:true,
            },
        },
        methods:{
          async handleSubmit(){
                const isFormCorrect =  await this.v$.$validate()
                console.log(isFormCorrect)
                console.log('submit!');
                if (!isFormCorrect) {
                  this.submitStatus = 'ERROR';
                } else {
                  this.submitStatus = 'PENDING';
                  setTimeout(() => {
                    this.submitStatus = 'OK';
                  }, 500)
                }
            },
        },

    }
    
</script>

<style>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }

  button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin:auto;
    margin-top: 20px;
    color: white;
    border-radius: 10px;
  }
  .submit {
    text-align: center;
  }
  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>