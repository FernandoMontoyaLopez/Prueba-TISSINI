<template>
    <div>
        <v-app-bar style="background-color:#F2749F;" dense dark >

            <v-btn v-for="(link,i) in menu"  :key="i" :to="'/'+link" class="mr-3" small>
                {{link}}
            </v-btn>
            
        </v-app-bar>

    </div>
</template>
<script>

export default {
    data() {
        return{
            menu:[
                "login",
               
            ]
        }       
    },
}
</script>