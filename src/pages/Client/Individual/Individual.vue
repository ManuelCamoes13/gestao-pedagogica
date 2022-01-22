<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
    <h2 class="page-title"><span class="fw-semi-bold">Coordenadores</span></h2>
    </b-col>
    <b-col>
      <div class="d-flex">
              <b-button v-b-modal.novo variant="inverse" class="mr-3" size="sm"><i class="fa fa-plus"></i>   Novo</b-button>
              
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
                  <th class="hidden-sm-down">Nome</th>
                  <th class="hidden-sm-down">apelido</th>
                  <th class="hidden-sm-down">Telefone</th>
                  <th class="hidden-sm-down">email</th>
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
                  <td>
                  
                  </td>
                  <td class="width-150">
                    <!-- <b-button variant="success" size="sm">Activo</b-button> -->
                    <b-badge variant="success">Activo</b-badge>
                  </td>
                  <td class="width-150">
                    <b-button  to="/app/client/individual/detail" block variant="info" size="sm">
                      Visualizar
                    </b-button>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </Widget>
      </b-col>
      
    </b-row>
   
  <b-modal id="novo" size="lg" body-class="bg-white"  title="Novo cliente Individual" hide-header hide-footer>
       <b-form>
        <legend class="text-info">
         <h5> <i class="fa fa-user"></i> <strong class="pl-2">Novo Cliente</strong></h5>
        </legend>
        <b-row>
          <b-col md="4">
            <b-form-group label="Contador" label-for="contador">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Nome" label-for="search-field">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="2">
            <b-form-group label="NUIT" label-for="Nuit">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Telefone" label-for="telefone">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="8">
            <b-form-group label="Email" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Bairro" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Quarteirao" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Casa" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group horizontal>
              <b-button variant="gray" class="ml-0 mr-3">Cancelar</b-button>
              <b-button variant="success" type="submit">Registrar</b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
   </b-modal>
  </div>
</template>

<script>


import http from "../../../../http-common";
export default {
  name: 'Coordenadores',
  
  data() {
    return {
    nome: "",
      apelido: '',
      email: "",
      telefone: false,
      email: "",
      coordenadores:[],
    };
  },

   created() {
    this.getData();
  },
  methods: {


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
          console.log(result.data.data);
          console.log("000000000000000000000000000000000")
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },


    async saveData() {
      this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "authorization": token,
        },
      };
      const data = {
        nome: this.nome,
        apelido: this.apelido,
        telefone: this.telefone,
        email: this.email,
      };
      this.$validator.validateAll();
      await http
        .post("/atender/create", data, config)
        .then((success) => {
          success;
          this.$refs["add"].hide();
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
          this.process = false;
          this.err = true;
          this.msg = error.response.data.message;
        });
    },
  },
};
</script>

<style src="./Basic.scss" lang="scss" scoped />
