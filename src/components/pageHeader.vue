<template>
    <div>
        <v-app-bar style="background-color:#F2749F;" dense dark >
            <v-spacer></v-spacer>

            <v-btn @click="logout()" class="mr-3 white--text" small>
                <v-icon>
                    mdi-logout 
                </v-icon>
                Salir
            </v-btn>  
        </v-app-bar>

        <div>
            
        </div>

    </div>
</template>
<script>

export default {
    data() {
        return{
            menu:[
                "Salir",
               
            ]
        }       
    },
    methods:{
        

        logout(){
            this.$router.push({name:"login"});
        },
    }

}


</script>