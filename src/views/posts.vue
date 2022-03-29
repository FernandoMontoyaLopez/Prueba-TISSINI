<template>
    <div>
        <v-container>

        <v-dialog v-model="modal" width="500">
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Post
                        </v-card-title>

                        <v-card-text>
                            <v-form ref="form" lazy-validation>
                                <v-layout row wrap mb-3 pt-3>
                                    <v-flex xs12  >
                                        <v-autocomplete :items="categorias" item-value="id" item-text="nombre" v-model="post.categorias_id" :rules="requerido"  label="Categoria.."></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12  >
                                        <v-text-field v-model="post.titulo" :rules="requerido"  label="Titulo.."></v-text-field>
                                    </v-flex>
                                    <v-flex xs12  >
                                        <v-textarea :rows="6" v-model="post.contenido" :rules="requerido"  label="contenido.."></v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-form>    
                            
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  color="red"  class="white--text" @click="cerrarModal()" >
                                Cerrar
                            </v-btn>
                            <v-btn color="success"  @click="post.id == null ? guardarItem() : actualizarItem()" >
                                {{post.id == null ? 'Guardar' : 'Actualizar'}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
        </v-dialog>

        <v-layout row wrap>
            <v-flex xs12>
                <h2>Posts</h2>
            </v-flex>
        </v-layout>

        <v-layout row wrap :justify-space-between="true">
            <v-flex xs12 md9>
                <v-text-field @keyup.enter="getData()" v-model="buscador" label="Buscar..."></v-text-field>
            </v-flex>
            <v-flex xs12 md1 class="mt-3">
                 <v-btn color="primary"  block @click="getData()">
                        <v-icon>
                            search
                        </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12 md1 class="mt-3 ">
                 <v-btn color="success" block @click="agregar()">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 class="card-flex mt-3" v-if="cargando == true">
                <v-progress-linear
                            color="success"
                            indeterminate
                            rounded
                            height="6"
                ></v-progress-linear>
            </v-flex>

            <v-flex xs12 v-else>
                <v-data-table
                    :headers="headers"
                    :items="posts"
                    class="elevation-1"
                >
                    <template v-slot:item.action="{ item }">
                        <v-layout row warp>
                            <v-flex>
                                <v-btn fab x-small color="orange" class="white--text" @click="editarItem(item)">
                                    <v-icon>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn fab x-small color="red"  class="white--text" @click="eliminarItem(item)">
                                    <v-icon>
                                        remove
                                    </v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
       

       
    </v-container>
    </div>
</template>
<script>

export default {
    data() {
        return{
            modal:false,
            posts:[],
            categorias:[],
            post:{
                id:null,
                categorias_id:null,
                titulo:"",
                contenido:""
            },
            headers: [
                { text: 'Acciones', value: 'action' },
                { text: 'Categoria', value: 'categoria' },
                { text: 'Titulo', value: 'titulo' },
                { text: 'Contenido', value: 'contenido' },
            ],
            requerido: [
                v => !!v || 'Este campo es requerido' 
            ],

            /*url_api:"http://localhost:8000/api/posts",
            url_api_categorias:"http://localhost:8000/api/categorias",*/

            url_api:"https://app-opper-backend.herokuapp.com/api/posts",
            url_api_categorias:"https://app-opper-backend.herokuapp.com/api/categorias",
            
            cargando:false,
            buscador:""
        }       
    },
    mounted(){
        this.getData()
        this.getCategorias()
    },
    methods:{
        agregar(){
            this.modal = true
            this.resetItem()
        },
        cerrarModal(){
            this.modal = false
            this.resetItem()
        },
        resetItem(){
            this.post.id = null
            this.post.categorias_id =null
            this.post.titulo = ""
            this.post.contenido = ""
        },
        async getData(){
            this.cargando = true;

            await this.axios.get(this.url_api,{
            params: {
                search:this.buscador
            }
            }).then((res)=>{
                this.posts = res.data.posts
                this.cargando = false;
            }).catch((err) =>{
                this.cargando = false;
                this.$swal("Error",err,"error");
            })

        },
        async getCategorias(){
            this.cargando = true;

            await this.axios.get(this.url_api_categorias,{
            params: {
                search:this.buscador
            }
            }).then((res)=>{
                this.categorias = res.data.categorias
                this.cargando = false;
            }).catch((err) =>{
                this.cargando = false;
                this.$swal("Error",err,"error");
            })

        },

        async guardarItem(){
            this.cargando = true;

            if(!this.$refs.form.validate())
            {
                this.cargando = false;
                return false;
            }

            await this.axios.post(this.url_api, this.post).then((res)=>{
                this.getData();
                this.cerrarModal();
                this.$swal("Correcto",res.data,"success");
                this.cargando = false;
            }).catch((err) =>{
                
                var mensaje = err;

                try {
                    var errores = err.response.data

                Object.keys(errores).forEach(element => {
                        errores[element].forEach(value => {
                            mensaje = mensaje + ": " +value 
                        });                      
                    });
                } catch (error) {
                    mensaje = err.response.data.error;
                }
                
                this.$swal("Error",mensaje,"error");   
                
                this.cargando = false;       
            })

            
        },

        editarItem(item){
            this.post.id = item.id
            this.post.titulo = item.titulo
            this.post.categorias_id = item.id_categoria
            this.post.contenido = item.contenido
            this.modal = true;
        },

        async actualizarItem(){
            this.cargando = true;

            if(!this.$refs.form.validate())
            {
                this.cargando = false;
                return false;
            }

            await this.axios.put(this.url_api+'/'+this.post.id, this.post).then((res)=>{
                this.cerrarModal();
                this.getData();
                this.$swal("Correcto",res.data,"success");
                this.cargando = false;
            }).catch((err) =>{

                var mensaje = "";

                var errores = "";

                try {
                   mensaje = err.response.data.error
                } catch (error) {
                    
                }

                try {
                    Object.keys(errores).forEach(element => {
                        errores[element].forEach(value => {
                            mensaje = mensaje + ": " +value 
                        });
                        
                    });
                } catch (error) {
                    
                }

                this.cargando = false;
                this.$swal("Error",`${mensaje}`,"error");     
            })
        },

        async eliminarItem(item){
            this.cargando = true;

            await this.axios.delete(this.url_api+'/'+ item.id).then((res)=>{
                this.getData();
                this.$swal("Correcto",res.data,"success"); 
                this.cargando = false;
            }).catch((err) =>{

               var mensaje = "";
               var errores = err.response.data

               Object.keys(errores).forEach(element => {
                    errores[element].forEach(value => {
                         mensaje = mensaje + ": " +value 
                    });
                    
                });
                this.$swal("Error",err,"error"); 
                this.cargando = false;              
            })

        },
    }
}
</script>