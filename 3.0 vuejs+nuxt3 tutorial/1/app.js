const app = Vue.createApp({
    //data, functions
    //template: '<h2> i am the template </h2>',
    data(){
        return{
            url:"https://geeksforgeeks.com",
            showBooks: true,
            books:[{title: 'the final empire',author: 'John Johnson',img:'assets/1.jpg',isFav:true},
            {title: 'the way of kings',author: 'John brandon',img:'assets/2.jpg',isFav:false},
            {title: 'the final empire',author: 'brandon sanderson',img:'assets/3.jpg',isFav:true}
            ],
            x:0,
            y:0,
        }
    },
    methods:{
        changeTitle(title){
            if(title){
                this.title = title
            }
            else{
                this.title = 'words of radiance';
            }
        },
        toggleBooks(){
            this.showBooks = !this.showBooks;
        },
        handleEvent(e ,data){
            console.log(e,e.type);
            if(data)
                console.log(data);
        },
        handleMouseMove(e){
            this.x = e.offsetX;
            this.y = e.offsetY;

        },
        toggleFav(book){
            book.isFav = !book.isFav;
        }
    },
    computed:{
        filteredBooks(){
            return this.books.filter((book)=>book.isFav);
        },
        notFavBooks(){
            return this.books.filter((book)=>!book.isFav);
        }
    },
});

app.mount('#app');