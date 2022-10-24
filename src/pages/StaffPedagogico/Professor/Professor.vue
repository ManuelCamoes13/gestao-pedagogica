<template>
  <div class="tables-basic">
    <h1 class="page-title">
      Professores
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
                  <th class="hidden-sm-down">Nome</th>
                  <th class="hidden-sm-down">apelido</th>
                  <th class="hidden-sm-down">Telefone</th>
                  <th class="hidden-sm-down">email</th>
                  <th class="hidden-sm-down">Cargo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="coordenador in coordenadores"
                 :key="coordenador.id">
                  <td> {{coordenador.nome}}</td>
                  <td class="text-semi-muted">
                    {{coordenador.apelido}}
                  </td>
                  <td>
                    {{coordenador.telefone}}
                  </td>
                  
                  <td>
                   {{coordenador.email}}
                  </td>
                  
                  
                  <td class="width-150">
                    <!-- <b-button variant="success" size="sm">Activo</b-button> -->
                    <b-badge variant="success" v-if="coordenador.role==2">Coordenador</b-badge>
                    <b-badge variant="primary" v-if="coordenador.role==3">Professor</b-badge>
                  </td>
                  <td class="width-200">
                    <b-button  variant="info" size="sm">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="deleteData(coordenador)" class="ml-3" variant="danger">
                      <i class="fa fa-trash" ></i>
                    </b-button>
                    <b-button :to="{ name: 'ProfessorCadeira', params: { idCoordenador: coordenador.id } }" class="ml-3" variant="success">
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
   
     <b-modal ref="novo" id="novo" size="lg" body-class="bg-white"  title="Novo Utilizador"  hide-footer>
        <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
      <b-form @submit.prevent="">
        <b-row>
         
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Nome"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Nome"
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
                v-model="nome"
              />
              <span class="text-danger" v-if="errors.has('Nome')">
                {{ errors.first("Nome") }}
              </span>
            </b-form-group>
          </b-col>

          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Apelido"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Apelido"
            >
              <input
                v-model="apelido"
                v-validate="'required|min:2|alpha_spaces'"
                name="Apelido"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Apelido'),
                }"
                type="text"
                id="Apelido"
              />
              <span class="text-danger" v-if="errors.has('Apelido')">
                {{ errors.first("Apelido") }}
              </span>
            </b-form-group>
          </b-col>
         <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Email"
              :label-cols="3"
              label-breakpoint="md"
              label-for="email"
            >
              <input
                v-model="email"
                v-validate="'required|email'"
                name="email"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('email'),
                }"
                type="text"
                id="email"
              />
              <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first("email") }}
              </span>
            </b-form-group>
          </b-col>
            <b-col md="6" cols="12" xs="12">

            
            <b-form-group
              horizontal
              label="Telefone"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Telefone"
            >
            <div class="form-group">
           
            <b-input-group>
                      
                       <b-input-group id="password-field">
                  <b-input-group-text slot="prepend">
                    +258
                  </b-input-group-text>
                  <input
                    v-validate="'required|numeric|max:9'" :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Telefone'),
                }" v-model="telefone" type="text" pattern="\d*"  name="username" maxlength="9">
                </b-input-group>
                    </b-input-group>
             <span class="text-danger" v-if="errors.has('telefone')">
                    {{ errors.first("telefone") }}
                  </span>
          </div>
            
                <!-- <input
                v-validate="'required|numeric|max:9'" :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Telefone'),
                }" v-model="contact" type="text" pattern="\d*"  name="username" maxlength="10">
              <span class="text-danger" v-if="errors.has('Telefone')">
                {{ errors.first("Telefone") }}
              </span> -->
            </b-form-group>
          </b-col>
         
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Cargo"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Cargo"
            >
            <select class="form-control" v-model="role">
              <option value="2">Coordenador</option>
              <option value="3">Professor</option>
              
            </select>
            
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


    <b-modal ref="new" id="new" size="lg" body-class="bg-white"  title="Novo Dador"  hide-footer>
        <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
      <b-form @submit.prevent="">
        <b-row>
          <b-col cols="12" md="12" xs="12">
            <legend>
              <i class="fa fa-address-card text-blood" ></i> Detalhes Pessoais
            </legend>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Nome"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Nome"
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
                v-model="name"
              />
              <span class="text-danger" v-if="errors.has('Nome')">
                {{ errors.first("Nome") }}
              </span>
            </b-form-group>
          </b-col>

          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Apelido"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Apelido"
            >
              <input
                v-model="surname"
                v-validate="'required|min:2|alpha_spaces'"
                name="Apelido"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Apelido'),
                }"
                type="text"
                id="Apelido"
              />
              <span class="text-danger" v-if="errors.has('Apelido')">
                {{ errors.first("Apelido") }}
              </span>
            </b-form-group>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-row>
              <b-form-group
                horizontal
                label="Gênero"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Gender"
                class="ml-3"
              ></b-form-group>
              <b-form-group class="radio abc-radio abc-radio-info">
                <input type="radio" name="gender" id="Masculino" class="ml-5" value="Masculino" v-model="gender"/>
                <label for="Masculino">Masculino</label>
              </b-form-group>
              <b-form-group class="radio abc-radio abc-radio-info">
                <input
                  class="mr-5"
                  type="radio"
                  name="gender"
                  id="Feminino"
                  value="Feminino"
                  v-model="gender"
                />
                <label for="Feminino">Feminino</label>
              </b-form-group>
            </b-row>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Data de Nascimento"
              :label-cols="3"
              label-breakpoint="md"
              label-for="birth date"
            >
              <input
                v-model="birthdate"
                name="birth date"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('birth date'),
                }"
                format="MM/DD/YYYY"
                type="date"
                id="birth date"
              />
              <span class="text-danger" v-if="errors.has('birth date')">
                {{ errors.first("birth date") }}
              </span>
            </b-form-group>
          </b-col>
           <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Tipo de documento"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Maritial State"
            >
              <v-select
                v-model="document_type"
                v-validade="'required'"
                class=""
                id="Maritial State"
                :options="['Bilhete de Identidade', 'Passaporte']"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Numero do Documento"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Numero"
            >
              <input
                v-model="document_number"
                v-validate="'required'"
                name="Numero"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Numero'),
                }"
                type="text"
                id="Numero"
              />
              <span class="text-danger" v-if="errors.has('Local de Emissão')">
                {{ errors.first("Local de Emissão") }}
              </span>
            </b-form-group>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Estado Civil"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Maritial State"
            >
              <v-select
                v-model="maritialState"
                v-validade="'required'"
                class=""
                id="Maritial State"
                :options="['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']"
              />
            </b-form-group>
          </b-col>
           <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Local de Emissão"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Local de Emissão"
            >
              <input
                v-model="arquivo"
                v-validate="'required|alpha_spaces'"
                name="Local de Emissão"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Local de Emissão'),
                }"
                type="text"
                id="Local de Emissão"
              />
              <span class="text-danger" v-if="errors.has('Local de Emissão')">
                {{ errors.first("Local de Emissão") }}
              </span>
            </b-form-group>
          </b-col>
           <b-col md="6" cols="12" xs="12">
            <b-row>
              <b-form-group
                horizontal
                label="Doador"
                :label-cols="3"
                label-breakpoint="md"
                label-for="doador"
                class="ml-3"
              ></b-form-group>
              <b-form-group class="radio abc-radio abc-radio-info">
                <input type="radio" name="doador" id="Repositor" class="ml-5" value="Repositor" v-model="tipo_doador"/>
                <label for="Repositor">Repositor</label>
              </b-form-group>
              <b-form-group class="radio abc-radio abc-radio-info">
                <input
                  class="mr-5"
                  type="radio"
                  name="doador"
                  id="Voluntario"
                  value="Voluntario"
                  v-model="tipo_doador"
                />
                <label for="Voluntario">Voluntario</label>
              </b-form-group>
            </b-row>
          </b-col>
<b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Profissão"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Profissão"
            >
              <input
                v-model="profission"
                v-validate="'required|min:2|alpha_spaces'"
                name="Profissão"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Profissão'),
                }"
                type="text"
                id="Profissão"
              />
              <span class="text-danger" v-if="errors.has('Profissão')">
                {{ errors.first("Profissão") }}
              </span>
            </b-form-group>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Tel. de Familiar"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Telefone"
            >
              <input
              maxlength="9"
                v-model="family_contact"
                v-validate="'required|numeric|max:9'"
                name="Contacto de Familiar"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Contacto de Familiar'),
                }"
                type="number"
                id="Contacto de Familiar"
              >
              <span class="text-danger" v-if="errors.has('Contacto de Familiar')">
                {{ errors.first("Contacto de Familiar") }}
              </span>
            </b-form-group>
          </b-col>
  
          <b-col md="6" cols="12" xs="12">

            
            <b-form-group
              horizontal
              label="Telefone"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Telefone"
            >
            <div class="form-group">
           
            <b-input-group>
                      
                       <b-input-group id="password-field">
                  <b-input-group-text slot="prepend">
                    +258
                  </b-input-group-text>
                  <input
                    v-validate="'required|numeric|max:9'" :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Telefone'),
                }" v-model="contact" type="text" pattern="\d*"  name="username" maxlength="9">
                </b-input-group>
                    </b-input-group>
             <span class="text-danger" v-if="errors.has('telefone')">
                    {{ errors.first("telefone") }}
                  </span>
          </div>
            
                <!-- <input
                v-validate="'required|numeric|max:9'" :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Telefone'),
                }" v-model="contact" type="text" pattern="\d*"  name="username" maxlength="10">
              <span class="text-danger" v-if="errors.has('Telefone')">
                {{ errors.first("Telefone") }}
              </span> -->
            </b-form-group>
          </b-col>
          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Email"
              :label-cols="3"
              label-breakpoint="md"
              label-for="email"
            >
              <input
                v-model="email"
                v-validate="'required|email'"
                name="email"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('email'),
                }"
                type="text"
                id="email"
              />
              <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first("email") }}
              </span>
            </b-form-group>
          </b-col>
   


          <b-col md="6" cols="12" xs="12">
            <b-form-group
              horizontal
              label="Bairro"
              :label-cols="3"
              label-breakpoint="md"
              label-for="city"
            >
              <input
                v-model="street"
                v-validate="'min:2|alpha_spaces'"
                name="city"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('Bairro'),
                }"
                type="text"
                id="Bairro"
              />
              <span class="text-danger" v-if="errors.has('Bairro')">
                {{ errors.first("Bairro") }}
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
      coordenadores:[],
      coordenador:[],
    };
  },

   created() {
    this.getData();
  },
  methods: {

     deleteData(coordenador) {
       this.coordenador = coordenador;
      
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
     
      setTimeout(function () {
      }, 1000);
      http
        .delete(`/usuario/${coordenador.id}`, config)
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
         nome:this.nome,
          apelido:this.apelido,
          telefone:this.telefone,
          email:this.email,
          role:this.role
      }
      setTimeout(function () {
      }, 1000);
      http
        .post("/newUser",data, config)
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
        .get("/cord", config)
        .then((result) => {
          this.coordenadores = result.data.data;

          this.newArray = result.data.data;

this.coordenadores = this.newArray.filter(function (el)
{
return el.role==3

}
);
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

 getCurrentUser(){
      let authUser = localStorage.getItem('user');
      var authUserObject = JSON.parse(authUser);
      let name   = authUserObject.name;
      let userId = authUserObject.id;
       this.name = name.slice(0,1).toUpperCase();
    },
 
  },
};
</script>

<style src="./Basic.scss" lang="scss" scoped />
