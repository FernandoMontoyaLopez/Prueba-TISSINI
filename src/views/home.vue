<template>
    <div>
        <pageHeader/>
        <v-container>
        
        

            <v-layout v-for="(section,i) in sections" :key="i" row wrap mb-3  xs4>
                <v-flex xs12>
                    <img :src="url_base + section.image">
                </v-flex>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                        v-for="(product,e) in section.products" 
                        :key="e"
                        :src="url_base + product.image.url"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>

            </v-layout>


        
            <v-layout v-for="(category,i) in categories" :key="i" row wrap mb-3 xs4>
                <v-flex  xs12 class="img-category-container">
                    <img :src="url_base + category.image">
                </v-flex>
            </v-layout>


        
        </v-container>
    </div>
</template>
<script>
import pageHeader from '../components/pageHeader.vue'
export default {
     components: { 
        pageHeader
    },
    data() {
        return{
            
            sections:[],
            categories:[],
            url_base: "https://v3.tissini.app",
        }       
    },
    mounted(){
        this.getCategories()
        this.getSections()
    },
    methods:{
        

        async getCategories(){
            this.cargando = true;

            await this.axios.get("https://v3.tissini.app/api/v3/categories").then((res)=>{


                this.categories = res.data

            }).catch((err) =>{
                this.cargando = false;
                this.$swal("Error",err,"error");
            })
        },

        async getSections(){
            this.cargando = true;

            await this.axios.get("https://v3.tissini.app/api/v3/categories/sections").then((res)=>{


                this.sections = res.data

            }).catch((err) =>{
                this.cargando = false;
                this.$swal("Error",err,"error");
            })
        },


    }
}
</script>

