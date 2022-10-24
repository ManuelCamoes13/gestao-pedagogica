<template>
  <div class="tables-basic">
    <h1 class="page-title">
      Itens do Plano Analitico 
      <small>tal plano</small>
      <div class="float-right">
        <b-button v-b-modal.novo variant="inverse" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> ADICIONAR NOVO</b-button
        >
      </div>
    </h1>
   
    <b-row>
      <b-col>
        <Widget
          customHeader 
        >

        <div class="clearfix">
            
             <div class="messageTableHeader">
    <div>

    </div>
    <!-- <b-form-input placeholder="Procurar" size="sm" @input="search" /> -->
  </div>
          </div>
          <div class="table-resposive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <!-- <th>Contador</th> -->
                  <th>Itens</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items"
                 :key="item.id">
                  <td> {{item.descricao}}</td>
                  <td >
                    <b-badge variant="success" v-if="item.concluido==true">Concluido</b-badge>
                    <b-badge variant="primary" v-if="item.concluido==false">Pendente</b-badge>
                  </td>
                  <!-- <td>{{curso.coordenador_nome}}</td> -->
                  <td class="width-200">
                    <b-button  variant="info" size="sm" @click="openUpdate(item)">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="deleteData(item)" class="ml-3" variant="danger">
                      <i class="fa fa-trash" ></i>
                    </b-button>
                     <b-button :to="{ name: 'Plano', params: { idPlano: item.id } }" class="ml-3" variant="success">
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
   
     <b-modal ref="novo" id="novo" size="md" body-class="bg-white"  title="Novo Item"  hide-footer>
        <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
      <b-form @submit.prevent="">
        <b-row>
         
          <b-col md="12" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Nome"
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


 <b-modal ref="edit" id="edit" size="md" body-class="bg-white"  title="Actualizar"  hide-footer>
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

import http from "../../../../../http-common";
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
      items:[],
      planos:[],
      cadeiras:[],
      cursos:[],
      curso:[{
        descricao:"",
        id:""
      }
        

      ],
      coordenadores:[],
      selectedCadeira:"",
      selectedCurso:"",
    };
  },

   created() {
    this.getData();
    this.getCadeira();
    this.getCurso();
   
  },
  methods: {

     deleteData(curso) {
       this.curso = curso;
      
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
     
      setTimeout(function () {
      }, 1000);
      http
        .delete(`/curso/${curso.id}`, config)
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
         descricao:this.descricao,
         planoanalitico_id:this.$route.params.idPlano
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .post("/item",data, config)
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
            text: "Adicionado com sucesso",
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
        .get(`/item/${this.$route.params.idPlano}`, config)
        .then((result) => {
          this.items = result.data.data
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },
     getCurso() {
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

openUpdate(curso){
  this.curso= curso
  this.$refs["edit"].show();
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

<style src="./Basic.scss" lang="scss" scoped />
