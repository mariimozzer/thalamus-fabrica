<template>
  <div class="container">
      
      <div class="col-sm-12" style="text-align: center;">
          <h2 class="titulo">Portfólio</h2>
          <hr>
      </div>

      <div class="row mb-5">
          <div class="col-lg-2">
              <label class="control-label nowrap" for="dataInicial">Data Inicial</label>
              <input type="date" v-model="filtro.inicial" id="dataInicial" class="form-control col-12" />
          </div>

          <div class="col-lg-2">
              <label class="nowrap" for="dataFinal">Data Final</label>
              <input type="date" v-model="filtro.final" ref="dataFinal" id="dataFinal" class="form-control col-12" />
          </div>

          <div class="col-lg-1">
              <label class="control-label" for="visitante">Visitante</label>
              <select v-model="filtro.visitante" id="visitante" class="form-control form-select col-12">
                  <option>Sim</option>
                  <option>Não</option>
              </select>
          </div>

          <div class="col-lg-3">
              <label class="nowrap" for="pessoa">Nome Completo</label>
              <input type="text" v-model="filtro.nome" id="nome" class="form-control col-12" />
          </div>

          <div class="col-lg-2">
              <label for="setor">Setor</label>
              <select v-model="setorSelecionado" id="setor" class="form-control form-select col-12">
                  <option v-for="setor in listaSetores" :key="setor.id" :value="setor.id">
                      {{ setor.nome }}
                  </option>
              </select>
          </div>

          <div class="col-lg-2">
              <label for="local">Local</label>
              <select class="form-control form-select col-12" v-model="localSelecionado">
                  <option v-for="local in localLista" :key="local.id" :value="local.id">{{ local.local_nome }}
                  </option>
              </select>
          </div>
      </div>

      <div class="row justify-content-center mb-5">
          <div class="col-md-3 ml-2">
              <button @click="pesquisar" class="btn btn-primary col-12">Pesquisar&nbsp;<i
                      class="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <div class="col-md-3">
              <button @click="limparCampos" class="btn btn-primary col-12">Limpar&nbsp;</button>
          </div>
      </div>

      <div class="table-responsive">
          <table v-if="dadosFiltro && dadosFiltro.length > 0" class="table" id="tabela-acessos">
              <thead>
                  <tr style="text-align: center;">
                      <th>Nome</th>
                      <th>Data/Hora Acesso</th>
                      <th>Entrada/Saída</th>
                      <th>Local</th>
                      <th>Setor</th>
                      <th>Visitante</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in dadosFiltro" :key="item.id" style="text-align: center;">
                      <td>{{ item.nomeCompleto }}</td>
                      <td>{{ formatarDataHora(item.created_at) }}</td>
                      <td>
                          <span v-if="item.sentido === 'e'" class="material-symbols-outlined"
                              style="color:#388E3C">login</span>
                          <span v-if="item.sentido === 's'" class="material-symbols-outlined"
                              style="color: #E53935;">logout</span>
                      </td>
                      <td>{{ item.local_nome }}</td>
                      <td>{{ item.setor_nome }}</td>
                      <td>{{ item.tipo_pessoa }}</td>
                  </tr>
              </tbody>
          </table>
      </div>

     

      <div v-if="!filtroVazio" style="text-align: center;">
          <p>Total de registros: {{ totalResultado }}</p>
      </div>
      <div v-if="filtroVazio" style="text-align: center;">
          <p style="font-size: 20px; color: brown;">Não há dados</p>
      </div>
      <br><br><br><br>
  </div>
</template>

<script>

import api from '../../services/api';
import moment from 'moment-timezone';

export default {

  name: "PesquisaView",

  components: {
      MenuLSGP,
  },

  data() {
      return {
          filtro: {
              inicial: null,
              final: null,
              visitante: null,
              nome: null,
              setor: null,
              local: null,
          },
          dadosFiltro: [],
          listaSetores: [],
          setorSelecionado: null,
          localLista: [],
          localSelecionado: null,
          pagina: 1,
          totalPaginas: 1,
          filtroVazio: false,
          totalResultado: null,
      };
  },

  mounted() {
      this.dataAtual();
  },

  methods: {

      formatarDataHora(valor) {
          if (valor) {

              const dataHoraGTM3 = moment.utc(valor).tz('America/Sao_Paulo');

              return dataHoraGTM3.format('DD/MM/YYYY HH:mm:ss');
          }
          return '';
      },

      dataAtual() {
          const hoje = new Date();
          const dd = String(hoje.getDate()).padStart(2, "0");
          const mm = String(hoje.getMonth() + 1).padStart(2, "0");
          const yyyy = hoje.getFullYear();

          const dataFormatada = `${yyyy}-${mm}-${dd}`;

          this.filtro.final = dataFormatada;
      },

    

      pesquisar() {
          this.filtro.visitante = this.filtro.visitante === "Sim" ? "1" : this.filtro.visitante === "Não" ? "0" : null;
          this.filtro.local = this.localSelecionado;
          this.filtro.setor = this.setorSelecionado || null;

          this.dadosFiltro = []; 

          console.log('filtro enviado', this. dadosFiltro)

          const dadosFiltro = (page) => {
              const params = {
                  params: { ...this.filtro, page },
              };

              api.get('/acesso/filtro', params)
                  .then(response => {
                      this.dadosFiltro = this.dadosFiltro.concat(response.data);
                      console.log('filtro', params)

                      if (page < response.data.last_page) {
                         
                          dadosFiltro(page + 1);

                      } else {
                         
                          this.totalPaginas = response.data.last_page;

                          if (this.dadosFiltro.length === 0) {
                              this.filtroVazio = true;
                               
                          }
                          this.totalResultado = this.dadosFiltro.length;
                      }
                  })
                  .catch(error => {
                      console.error("Erro ao buscar dados:", error);
                  });
          };

          dadosFiltro(1); 
         
      },

      

      
      limparCampos() {
          this.filtro = {
              inicial: "",
              final: "",
              nome: "",
              setor: null,
              local: null,
              visitante: null,
          };
          this.dadosFiltro = [];
          this.setorSelecionado = null;
          this.localSelecionado = null;
          this.pagina = 1;
          this.totalPaginas = 1;
          this.filtroVazio = false;
          this.totalResultado = null;
      },

  }
}
</script>

<style>
.nowrap{
  white-space: nowrap;
}
</style>