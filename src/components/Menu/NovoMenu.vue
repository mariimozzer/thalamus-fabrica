<template>
    <div class="menu " id="menu">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; ">
            <a class="navbar-brand" @click="logo">
                <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo"
                    style="width: 75%; ">
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <button v-for="menu in menus" :key="menu.id" @mouseover="activateMenu(menu)"
                        class="btn menu-block text-white mb-2 mr-2" :class="{ 'active': menu === activeMenu }"
                        :style="{ backgroundColor: menu === activeMenu ? '' : '#343537' }">
                        &nbsp; &nbsp;{{ menu.nome }}
                    </button>
                </ul>
                <div>
                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right style="color: white;">
                            <template v-slot:button-content><i style="color: white;" class="fa-solid fa-circle-user"></i>
                                <span class="username" style="color: white;">&nbsp; Olá, {{ userName }}</span>
                            </template>
                            <b-dropdown-item style="color: black" @click="configuracoesUsuario()">
                                <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Configurações</span>
                            </b-dropdown-item>
                            <hr>
                            <b-dropdown-item style="color: black" @click="alterarSenha">
                                <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar
                                    Senha</span>
                            </b-dropdown-item>
                            <hr>
                            <b-dropdown-item style="color: black" @click="logout">
                                <span style="color: black;"><i class="fa-solid fa-right-from-bracket"></i>&nbsp;
                                    Logout</span>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                </div>
            </div>
        </nav>
        <!-- <div v-if="activeMenu " class="content" :style="{ backgroundColor: activeMenu.color} " @mouseleave="closeContent">
            <div v-for="submenu in activeMenu.filho" :key="submenu.id" class="submenu-columns ">

            <div v-if="submenu.filho.length > 0 " class="submenu-column">

                <h6 style="color: rgb(0, 0, 0);">{{ submenu.nome }}</h6>
                    <a class="submenu-link" v-for="subsubmenu in submenu.filho" :key="subsubmenu.id"
                        style="text-decoration: none; color: rgb(0, 0, 0);">
                        {{ subsubmenu.nome }}
                    </a>
                </div>
            </div>
        </div> -->
        <div v-if="activeMenu" class="menunovo" @mouseleave="closeContent">
            <div v-for="submenu in activeMenu.filho" :key="submenu.id">
                <h6 style="color: #fff">{{ submenu.nome }}</h6>
                <ul style="list-style-type: none;">
                    <li v-for="subsubmenu in submenu.filho" :key="subsubmenu.id">
                        <a :href="subsubmenu.url" style="text-decoration: none; color: #fff; " class="submenu-link">
                            {{ subsubmenu.nome }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
//import axios from 'axios'
import Menu from '@/models/Menu.js'
import api from '../../services/api';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {
    name: "TesteMenuView",

    data() {
        return {
            activeMenu: '',
            home: '',
            estruturaCortada: '',
            botoes: '#343537',
            menus: '',
            adm: '',
            fabrica: '',
            gestao: '',

            localData: [],
            localSelecionado: null,
            apiUrl: api.defaults.baseURL,

        }
    },

    methods: {
        logo(){
            this.$router.push({name: "HomeView"});
        },

        getAllHome() {
            // axios.get(`http://192.168.0.6:8000/api/menu/home`)
            api.get(`/menu/home`)
                .then(response => {
                    this.home = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllEstrutura() {
            //axios.get(`http://192.168.0.6:8000/api/menu/estrutura`)
            api.get(`/menu/estrutura`)
                .then(response => {
                    this.menus = response.data.data.map((p) => new Menu(p));
                })
        },


        getAllAdm() {
            //axios.get(`http://192.168.0.6:8000/api/menu/estrutura/25`)
            api.get(`/menu/estrutura/25`)
                .then(response => {
                    this.adm = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllFab() {
            // axios.get(`http://192.168.0.6:8000/api/menu/estrutura/44`)
            api.get(`/menu/estrutura/44`)
                .then(response => {
                    this.fabrica = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllGestao() {
            // axios.get(`http://192.168.0.6:8000/api/menu/estrutura/52`)
            api.get(`/menu/estrutura/52`)
                .then(response => {
                    this.gestao = response.data.data.map((p) => new Menu(p));
                })
        },

        activateMenu(menu) {

            this.activeMenu = menu;
            this.menus.forEach((m) => {
                m.active = m === menu;
            });

            if (menu.submenus && menu.submenus.length > 0) {
                this.activateSubMenu(menu.submenus[0]);


            } else {
                this.showSidebar = false;
                this.sideBarMenus = [];
            }

        },

        logout() {
            const token = sessionStorage.getItem('token')
            // axios.post('http://192.168.0.6:8000/api/logout', {}, {
            api.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    this.$router.push('/');
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('userName')
                    sessionStorage.removeItem('LoggedUser')
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        },
        closeContent() {
            this.activeMenu = null;
        },

        async buscaLocal() {
            try {
                const response = await fetch(`${this.apiUrl}/local`);
                this.localData = await response.json();
            } catch (error) {
                console.error('Error ao buscar empresas', error);
                toaster.show(`Erro buscar empresa`, { type: "error" });
            }
        },

       /*  salvarLocalSelecionado() {
            localStorage.setItem('localSelecionado', this.localSelecionado);
            window.location.reload();

        }, */
       /*  selectLocal(selectedLocal) {
            this.localSelecionado = selectedLocal;
            this.salvarLocalSelecionado();
        }, */
         configuracoesUsuario() {
            this.$router.push({ name: "Configuracao" })
        },

        alterarSenha() {
            this.$router.push({name:  "AlterarSenha"})
        }


    },

    created() {
        this.userName = sessionStorage.getItem('userName')

    },

    mounted() {
        this.getAllHome()
        this.getAllEstrutura()
        //this.getAllAdm()
        // this.getAllFab()
        // this.getAllGestao()
        this.buscaLocal();

        if (localStorage.local) {
            this.local = localStorage.local
        }
    }
}
</script>
  
<style>
.teste:hover {
    color: white !important
}

.menunovo {
    background-color: #3b373b;
    display: flex;
    flex-flow: row-reverse;
    justify-content: space-around;
    padding: 1rem;
}

#menu {
    position: fixed;
    z-index: 1;
    width: 100%;
    margin-left: 0px;
    margin-top: 0;
}

.submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
}

navbar {
    padding: 100%;
    width: 100%;
    top: 100px;
    cursor: pointer;
    height: 100px;
    position: fixed;
    z-index: 2;
}

.container {
    padding-top: 70px;
    cursor: pointer;
}

.menu-block.active {
    background-color: #f8f9fa;
}

.menu-block {
    background-color: #6c757d;
}

.menu-block:hover {
    background-color: #f8f9fa;
}

.content {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
}

submenu {
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
}

.submenu h5 {
    /* font-size: 14px; */
    margin-bottom: 5px;
    color: #333;
}

.submenu-container {
    border: 2px solid;
    border-radius: 5px;
    margin-bottom: 10px;
}

.submenu ul {
    list-style: none;
    padding: 0;
    color: rgb(255, 255, 255) !important;
}

submenu a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

.submenu li a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

.submenu-link:hover {
    color: rgb(131, 131, 131) !important;
}

.icons {
    display: flex;
    align-items: center;
}

.icons a {
    margin-left: 10px;
    cursor: pointer;
    color: white
}
</style>
  