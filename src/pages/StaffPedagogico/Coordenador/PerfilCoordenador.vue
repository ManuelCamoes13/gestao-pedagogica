<template>
  <div class="tables-basic">
    
      <b-button @click="getProfCadeira">
        ok
      </b-button>
            <b-row>
              <Widget>
                  {{professor}}
              </Widget>
            </b-row>
            <b-row>
      <b-col>
    <h2 class="page-title"><span class="fw-semi-bold"></span></h2>
    </b-col>
    <b-col>
      <div class="d-flex">
              <b-button v-b-modal.novo variant="inverse" class="mr-3" size="sm"><i class="fa fa-plus"></i> Alocar Cadeiras</b-button>
              
            </div>
            </b-col>
            </b-row>
    <b-row>
      <b-col>
        <Widget
          customHeader 
        >

        <div class="clearfix">
             <div class="messageTableHeader">
    <div>

    </div>
    <b-form-input placeholder="Procurar" size="sm" @input="search" />
  </div>
          </div>
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <!-- <th>Contador</th> -->
                  <th class="hidden-sm-down">Cadeiras</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="cadeira in profcadeira"
                 :key="cadeira.id">
                  <td> {{cadeira.descricao}}</td>
                  <td class="width-200">
                    <b-button  variant="info" size="sm" @click="openUpdate(curso)">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="deleteData(cadeira)" class="ml-3" variant="danger">
                      <i class="fa fa-trash" ></i>
                    </b-button>
                     <b-button :to="{ name: 'CursoCadeira', params: { idCurso: curso.id } }" class="ml-3" variant="success">
                      <i class="fa fa-eye" ></i>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </Widget>
      </b-col>
      
    </b-row>
   
     <b-modal ref="novo" id="novo" size="md" body-class="bg-white"  title="Adicionar Cadeira ao curso"  hide-footer>
        <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
      <b-form @submit.prevent="">
        <b-row>
         
          <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Descricao"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Descricao"
            >
              <input
                v-validate="'required|min:2|alpha_spaces'"
                name="Nome"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Nome'),
                }"
                type="text"
                id="name_company"
                v-model="descricao"
              />
              <span class="text-danger" v-if="errors.has('Nome')">
                {{ errors.first("Nome") }}
              </span>
            </b-form-group>
          </b-col>
            <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Curso"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Coordenador"
            >
              <v-select name="curso" :options="cursos" v-model="selectedCurso" label="descricao">

              </v-select>
             
            </b-form-group>
          </b-col>
   

      <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Cadeira"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Coordenador"
            >
              <v-select name="curso" :options="cadeiras" v-model="selectedCadeira" label="descricao">

              </v-select>

             
            </b-form-group>
          </b-col>

          <b-col>
            <div>
    <multiselect v-model="value" ></multiselect>
  </div>
          </b-col>
   

        </b-row>
        <div class="form-action bg-transparent px-0">
          <b-button
            @click="close"
            type="button"
            variant="default"
            class="btn-rounded"
          >
            Cancelar
          </b-button>

          <b-button
            type="submit"
            variant="inverse"
            class="btn-rounded float-right"
            @click.prevent="saveData"
          >
            Registrar
            <b-spinner v-show="process" small></b-spinner>
          </b-button>
        </div>
      </b-form>
   </b-modal>


 <b-modal ref="edit" id="edit" size="md" body-class="bg-white"  title="Actualizar Curso"  hide-footer>
        <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
      <b-form @submit.prevent="">
        <b-row>
         
          <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Descricao"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Descricao"
            >
              <input
                v-validate="'required|min:2|alpha_spaces'"
                name="Nome"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Nome'),
                }"
                type="text"
                id="name_company"
                v-model="curso.descricao"
              />
             
            </b-form-group>
          </b-col>
          <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Curos"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Coordenador"
            >
              <v-select name="curso" :options="cadeiras" v-model="selectedCadeira" label="descricao">

              </v-select>
             
            </b-form-group>
          </b-col>
   

       <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Coordenador"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Coordenador"
            >
              <v-select name="curso" :options="cadeiras" v-model="selectedCadeira" label="descricao">

              </v-select>
             
            </b-form-group>
          </b-col>
   

        </b-row>
        <div class="form-action bg-transparent px-0">
          <b-button
            @click="close"
            type="button"
            variant="default"
            class="btn-rounded"
          >
            Cancelar
          </b-button>

          <b-button
            type="submit"
            variant="inverse"
            class="btn-rounded float-right"
            @click.prevent="updateData"
          >
            Actualizar
            <b-spinner v-show="process" small></b-spinner>
          </b-button>
        </div>
      </b-form>
   </b-modal>


   
  </div>
</template>

<script>

import vSelect from 'vue-select';
 import Multiselect from 'vue-multiselect'

import http from "../../../../http-common";
export default {
  name: 'Coordenadores',
  components: {
  vSelect,
  Multiselect
  },
  data() {
    return {
      error:"",
      err:false,
      msg:'',
       nome: "",
      apelido: '',
      email: "",
      telefone: "",
      curso:[],
      coordenadores:[],
      selectedCadeira:"",
      cadeiras:[],
      CursoCadeira:[],
      result:[],
      professor:[],
      selectedCurso:"",
      profcadeira:[],
    };
  },

   created() {
    this.getData();
    this.getProfCadeira();
    this.getCoordenadores();
    this.getCadeira();
    this.getCursoCadeira();
    this.getCursos()
    
  },
  methods: {

        getCursos() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get("/curso", config)
        .then((result) => {
          this.cursos = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

     deleteData(cadeira) {
       this.cadeira = cadeira;
      
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
         curso_id:this.curso.id,
         cadeiras:this.cadeira.id,
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .delete("/cursocadeira",data, config)
        .then((success) => {
          success;
        
        })
        .catch((error) => {
          error;
        });
    },

    

 saveData() {
   alert("ok")
   this.result.push(this.selectedCadeira.id);

      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
         usuario_id:this.professor.id,
         cadeiras:this.result,
         curso: this.selectedCurso.id
      }
      setTimeout(function () {
      }, 1000);
      http
        .post("/profcadeira",data, config)
        .then((success) => {
          success;
          //  this.getCursoCadeira()
          this.$refs["novo"].hide();
          // this.getCursoCadeira()
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Sucesso",
            text: "curso criado!",
          });
        
        })
        .catch((error) => {
          error;
          this.loading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Sucesso",
            text: "Erro ao criar!",
          });
        });
    },
     getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get(`/professor/${this.$route.params.idCoordenador}`, config)
        .then((result) => {
          this.professor = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

      getCursoCadeira() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get(`/cursocadeira/${this.$route.params.idCurso}`, config)
        .then((result) => {
          this.CursoCadeira = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

openUpdate(curso){
  this.curso= curso
  this.$refs["edit"].show();
},

     getCoordenadores() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get("/cord", config)
        .then((result) => {
          this.coordenadores = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },
   getCadeira() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get("/cadeira", config)
        .then((result) => {
          this.cadeiras = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

  getProfCadeira() {
    alert("ok")
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      setTimeout(function () {
      }, 1000);
      http
        .get(`/profcadeira/${this.$route.params.idCoordenador}`, config)
        .then((result) => {
          this.profcadeira = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },


 updateData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
         descricao:this.curso.descricao,
         id:this.curso.id
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .put("/curso",data, config)
        .then((success) => {
          success;
          this.$refs["edit"].hide();
          this.getData();
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Sucesso",
            text: "Actualizado com sucesso!",
          });
        
        })
        .catch((error) => {
          error;
          this.loading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Sucesso",
            text: "Erro ao criar!",
          });
        });
    },
//  getCurrentUser(){
//       let authUser = localStorage.getItem('user');
//       var authUserObject = JSON.parse(authUser);
//       let name   = authUserObject.name;
//       let userId = authUserObject.id;
//        this.name = name.slice(0,1).toUpperCase();
//     },
 
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./Basic.scss" lang="scss" scoped />
