<template>
  <div class="tables-basic">
    <h1 class="page-title">
      Cadeiras
      <div class="float-right">
        <b-button v-b-modal.novo variant="inverse" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> ADICIONAR NOVA</b-button
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
            <table class="table  table-striped">
              <thead>
                <tr>
                  <!-- <th>Contador</th> -->
                  <th class="hidden-sm-down">Nome da cadeira</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cadeira in cadeiras"
                 :key="cadeira.id">
                  <td> {{cadeira.descricao}}</td>
                  
                  <td class="width-200">
                    <b-button  variant="info" size="sm" @click="openUpdate(cadeira)">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="deleteData(cadeira)" size="sm" class="ml-3" variant="danger">
                      <i class="fa fa-trash" ></i>
                    </b-button>
                    <b-button :to="{ name: 'items', params: { idCadeira: cadeira.id } }" size="sm" class="ml-3" variant="success">
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
   
     <b-modal ref="novo" id="novo" size="md" body-class="bg-white"  title="Nova Cadiera"  hide-footer>
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


 <b-modal ref="edit" id="edit" size="md" body-class="bg-white"  title="Actualizar Cadeira"  hide-footer>
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
                v-model="cadeira.descricao"
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
      cadeiras:[],
      cadeira:[{
        descricao:"",
        id:""
      }
        

      ],
    };
  },

   created() {
    this.getData();
  },
  methods: {

     deleteData(cadeira) {
       this.cadeira = cadeira;
      
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
     
      setTimeout(function () {
      }, 1000);
      http
        .delete(`/cadeira/${cadeira.id}`, config)
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
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .post("/cadeira",data, config)
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
            text: "Utilizador criado!",
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
        .get("/cadeira", config)
        .then((result) => {
          this.cadeiras = result.data.data;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

openUpdate(cadeira){
  this.cadeira= cadeira
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
         descricao:this.cadeira.descricao,
         id:this.cadeira.id
         
      }
      setTimeout(function () {
      }, 1000);
      http
        .put("/cadeira",data, config)
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
