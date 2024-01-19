<template>
    <div class="estilos">
        <header>
            <div class="menu">
                <NovoMenu v-if="!$route.meta.hideMenu"></NovoMenu>
            </div>
        </header>
            <div class="router">
            <br><br><br>
            <router-view />
        </div>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import NovoMenu from "@/components/Menu/NovoMenu.vue"
import FooterComponent from "@/components/Footer/FooterComponent"

export default {
    data() {
        return {

        }
    },

    components: {
        NovoMenu: NovoMenu,
        FooterComponent: FooterComponent,
    }
}
</script>

<style>
:root {
    --dark-color: #292A2A;
    --botao: #F89E31;
    --botao-hover: #FBBF77;
    --botao-secondary: #AAAAAA;
    --botao-secondary-hover: #C2BFBF;
    --botao-portfolio: #3B373B;
    --botao-portfolio-hover: #5f5f5f;
    --menu-lateral-background: #333;
    --menu-lateral-botao: #444;
    --menu-lateral-borda: #555;
}

.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}

.estilos {
    font-family: 'montserrat', sans-serif;
}

.router {
    margin-left: 300px;
    margin-bottom: 100px;
}

.footer {
    position: absolute;
}

.button-default {
    width: 100%;
    background-color: var(--botao) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-default:hover {
    background-color: var(--botao-hover) !important;
}

.button-cancel {
    background-color: #fff !important;
    color: var(--dark-color) !important;
    margin: 6px 0 !important;
    border: solid !important;
    border-color: var(--botao) !important;
    border-width: 1px !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-cancel:hover {
    background-color: var(--botao-hover) !important;
}

.btn-primary {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
}

.btn-secondary {
    background-color: var(--botao-portfolio) !important;
    margin: 6px 0 !important;
    border: none !important;
}

.btn-secondary:hover {
    background-color: var(--botao-portfolio-hover) !important;
    margin: 6px 0 !important;
    border: none !important;
}

.btn-filter {
    background-color: var(--botao) !important;
    margin: 0 !important;
    border: none !important;
    color: #fff;
}

.btn-filter:hover {
    background-color: var(--botao-hover) !important;
}

.btn-primary:hover {
    background-color: var(--botao-hover) !important;
}

.button-cadastrar {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
    width: 150px;
    height: 40px;
    border: none !important;
    border-radius: 6px !important;
    color: white;
}

.button-cadastrar:hover {
    background-color: var(--botao-hover) !important;
}

.button-cancelar {
    color: white !important;
    background-color: var( --botao-secondary) !important;
}

.button-cancelar:hover {
    background-color: var(--botao-secondary-hover) !important;
}

.button-visita {
    background-color: var(--botao);
    color: white;
    border: none;
    border-radius: 2px !important;
}

.button-visita:hover {
    background-color: var(--botao-hover) !important;
}

header {
    width: 100vw;
    margin-top: 0;
    background-color: var( --dark-color);
    padding: 0px;
}

thead {
    text-align: center;
}

.menu {
    position: absolute;
    z-index: 1;
    width: 100%;
}
</style>
