<template>
    <div class="container">
    
        <div class="col-sm-12" style="text-align: center;">
            <h2 class="titulo">Portfólio de Processos</h2>
            <hr>
        </div>
    
        <div class="row mb-5" >
            <div class="col-lg-2">
                <label class="control-label nowrap" for="cliente">Cliente</label>
                <select v-model="filtro.cliente" id="cliente" class="form-control form-select col-12">
                                          <!-- <option v-for="setor in listaSetores" :key="setor.id" :value="setor.id">
                                              {{ setor.nome }}
                                          </option> -->
                                      </select> </div>
    
            <div class="col-lg-2">
                <label class="nowrap" for="produto">Produto</label>
                <select v-model="filtro.produto" id="produto" class="form-control form-select col-12">
                    
                                          <!-- <option v-for="setor in listaSetores" :key="setor.id" :value="setor.id">
                                              {{ setor.nome }}
                                          </option> -->
                                      </select> </div>
    
            <div class="col-lg-2">
                <label class="control-label" for="dataInicial">Data Início</label>
                <input type="date" v-model="filtro.inicial" id="dataInicial" class="form-control col-12" />
    
    
            </div>
    
            <div class="col-lg-2">
                <label class="nowrap" for="dataFinal">Data Fim</label>
                <input type="date" v-model="filtro.final" id="dataInicial" class="form-control col-12" />
            </div>
    
            <div class="col-lg-2">
                <label for="ordem">Ordem de Produção</label>
                <input type="text" v-model="filtro.OP" id="ordem" class="form-control col-12" />
    
            </div>
    
            <div class="col-lg-2">
    
                <input type="checkbox" id="incluir" v-model="checked" />
                <label for="incluir">&nbsp;Incluir Concluídas</label>
    
    
            </div>
            <div class="col-lg-2">
    
    
    
    
            </div>
        </div>
    
        <div class="row justify-content-center mb-5">
            <div class="col-md-3 ml-2">
                <button @click="pesquisar" class="btn btn-secondary col-12">Pesquisar&nbsp;&nbsp;<i
                                              class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="col-md-3">
                <button @click="limparCampos" class="btn btn-secondary col-12">Limpar&nbsp;</button>
            </div>
        </div>
    
        <div class="table-responsive">
            <!-- <table v-if="dadosFiltro && dadosFiltro.length > 0" class="table" id="tabela-acessos"> -->
            <table class="table" id="tabela-portifolio">
    
                <thead>
    
                    <tr style="text-align: center; ">
                        <th>OP</th>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Data Inicio</th>
                        <th>Data Prevista</th>
                        <th>Obs</th>
                        <th>Progresso</th>
                        <th>OTIF</th>
    
    
    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dadosFiltro" :key="item.id" style="text-align: center;">
                        <td>{{ item.OP }}</td>
                        <td>{{ item.cliente }}</td>
                        <td>{{ item.produto }}</td>
                        <td>{{ item.quantidade }}</td>
                        <td>{{ formatarDataHora(item.created_at) }}</td>
                        <td>{{ formatarDataHora(item.created_at) }}</td>
                        <td>{{ item.observacao }}</td>
                        <td>{{ item.progresso }}</td>
                        <td>{{ item.OITF }}</td>
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
// import api from '../../services/api';
import moment from 'moment-timezone';

export default {

    name: "PortfolioComponent",

    components: {

    },

    data() {
        return {
            filtro: {
                inicial: null,
                final: null,
                nome: null,

            },
            dadosFiltro: [],

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
            // this.filtro.visitante = this.filtro.visitante === "Sim" ? "1" : this.filtro.visitante === "Não" ? "0" : null;
            // this.filtro.local = this.localSelecionado;
            // this.filtro.setor = this.setorSelecionado || null;

            // this.dadosFiltro = []; 

            // console.log('filtro enviado', this. dadosFiltro)

            // const dadosFiltro = (page) => {
            //     const params = {
            //         params: { ...this.filtro, page },
            //     };

            //     api.get('/acesso/filtro', params)
            //         .then(response => {
            //             this.dadosFiltro = this.dadosFiltro.concat(response.data);
            //             console.log('filtro', params)

            //             if (page < response.data.last_page) {

            //                 dadosFiltro(page + 1);

            //             } else {

            //                 this.totalPaginas = response.data.last_page;

            //                 if (this.dadosFiltro.length === 0) {
            //                     this.filtroVazio = true;

            //                 }
            //                 this.totalResultado = this.dadosFiltro.length;
            //             }
            //         })
            //         .catch(error => {
            //             console.error("Erro ao buscar dados:", error);
            //         });
            // };

            // dadosFiltro(1); 

            if (this.dadosFiltro.length === 0) {
                this.filtroVazio = true;

            }
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
.nowrap {
    white-space: nowrap;
}
</style>