<template>
    <div style="height:100vh;background: url(https://mitienda.moda/img/login-desktop.695c98cc.jpg); margin-top:-12px;">
        <v-container>
            <v-layout row align-center>
                <v-flex xs12 class="login-vcard-container">
                    <v-card class="login-vcard">
                        <v-card-title class="text-h5">
                        <img src="https://mitienda.moda/img/logo.e38c8b41.png">
                            <h3>Ingresa el número de teléfono de tu asesora independiente.</h3>
                        </v-card-title>

                        <v-card-text>
                            <v-flex xs12  >
                                <v-text-field :rows="6"  @keyup.enter="login()" v-model="telefono"  label="Telefono.."></v-text-field>
                            </v-flex>
                        </v-card-text>
                    </v-card>
                    
                </v-flex>
                
            </v-layout>
        </v-container>
    </div>
</template>
<script>

export default {
    data() {
        return{
            telefono:""
        }       
    },
    methods:{

        async login(){
            this.cargando = true;

            await this.axios.post("https://v3.tissini.app/api/v3/login/client",{
                mobilephone:this.telefono
            }).then((res)=>{


                this.$router.push({ name: "home", params: {}})
                //     categorias: res.data.categories,
                //     customer: res.data.customer 
                // }})

            }).catch((err) =>{
                this.cargando = false;
                this.$swal("Error",err,"error");
            })

        },

    }
}
</script>
<style>


</style>
