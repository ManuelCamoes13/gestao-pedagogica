<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
    <h2 class="page-title"><span class="fw-semi-bold">Turma</span></h2>
    </b-col>
    <b-col>
      <div class="d-flex">
              <b-button v-b-modal.novo variant="inverse" class="mr-3" size="sm"><i class="fa fa-plus"></i>   Nova</b-button>
              
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
                  <th class="hidden-sm-down">Designacao</th>
                  <th class="hidden-sm-down">Curso</th>
                  <th class="hidden-sm-down">Turno</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="turma in turmas"
                 :key="turma.id">
                  <td> {{turma.designacao}}</td>
                   <td> {{turma.curso}}</td>
                   <td> {{turma.turno}}</td>
                  
                  <td class="width-150">
                    <b-button  variant="info" size="sm" @click="openUpdate(turma)">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="deleteData(turma)" class="ml-3" variant="danger">
                      <i class="fa fa-trash" ></i>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </Widget>
      </b-col>
      
    </b-row>
   
     <b-modal ref="novo" id="novo" size="md" body-class="bg-white"  title="Nova Turma"  hide-footer>
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
                v-validate="'required|min:2|'"
                name="Nome"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Nome'),
                }"
                type="text"
                id="name_company"
                v-model="designacao"
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
              label-for="curso"
            >
              <v-select name="curso" :options="cursos" v-model="selectedCurso" label="descricao">

              </v-select>
              <span class="text-danger" v-if="errors.has('curso')">
                {{ errors.first("curso") }}
              </span>
            </b-form-group>
          </b-col>

           <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Turno"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Turno"
            >
              <v-select v-model="turno" :options="['Diurno','Nocturno']">

              </v-select>
              <span class="text-danger" v-if="errors.has('Nome')">
                {{ errors.first("Nome") }}
              </span>
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
            @click.prevent="saveData"
          >
            Registrar
            <b-spinner v-show="process" small></b-spinner>
          </b-button>
        </div>
      </b-form>
   </b-modal>


 <b-modal ref="edit" id="edit" size="md" body-class="bg-white"  title="Actualizar Turma"  hide-footer>
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
                v-model="turma.designacao"
              />
             
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

import http from "../../../../http-common";
export default {
  name: 'Coordenadores',
  components: {
  vSelect,
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
      turmas:[],
      turma:[{
        designacao:"",
        id:""
      }
      ],
      cursos:[],
      selectedCurso:""
      
    };
  },

   created() {
    this.getData();
    this.getCursos();
  },
  methods: {

     deleteData(turma) {
       this.curso = turma;
      
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
     
      setTimeout(function () {
      }, 1000);
      http
        .delete(`/turma/${turma.id}`, config)
        .then((success) => {
          success;
          this.getData();
         
        
        })
        .catch((error) => {
          error;
        });
    },

 saveData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
         designacao:this.designacao,
         curso_id:this.selectedCurso.id,
         turno:this.turno,

         
      }
      setTimeout(function () {
      }, 1000);
      http
        .post("/turma",data, config)
        .then((success) => {
          success;
          this.$refs["novo"].hide();
          this.getData();
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
        .get("/turma", config)
        .then((result) => {
          this.turmas = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

openUpdate(turma){
  this.turma= turma
  this.$refs["edit"].show();
},


 updateData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
         designacao:this.turma.designacao,
         id:this.turma.id
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .put("/turma",data, config)
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

   
  },
};
</script>

<style src="./Basic.scss" lang="scss" scoped />
