<template>
    <div>
        
        <div>
            <ul id="lista" v-for="user in users" :key="user['.key']">
                <li >Nombre: {{user.nombre}}  -- Email: {{user.email}} </li> 
                <button @click="delUser(user)">X</button>
            </ul>
        </div>

        <div>
            <input type="text" v-model="name" placeholder="Nombre">
            <input type="text" v-model="mail" placeholder="Email">
            <input type="submit" @click="addUser">
        </div>

        <ul class="error">
            <li v-show="!validation.name">El campo no puede estar vacío.</li>
            
            <li v-show="!validation.mail">Por favor ingrese un email válido.</li>
        </ul>
          
    </div>
</template>

<script>

import { db } from '@/plugins/db'

export default {
    
    data() {
    return {
        users: [],
        name: "",
        mail: "",
        validation: {
            name: true,
            mail: true
        }
        }
    },

    firebase: {
        users: db.ref('users'),
    },
    computed: {
        verificarNombre() {
            return this.name.length > 0;
        },
        verificarEmail() {
            const emailRegExp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            return emailRegExp.test(this.mail);
        },
    },
    methods: {
        addUser(){
            //validar
            this.validation.name = this.verificarNombre;
            this.validation.mail = this.verificarEmail;

            if (this.validation.mail && this.validation.name){
                let newUser = {nombre: this.name, email: this.mail}
                // agregar a firebase
                db.ref('users').push(newUser)
            }
            //borrar datos
            this.name = "";
            this.mail = "";
        },
        delUser(del_users){
            // eliminar de firebase
            db.ref('users').child(del_users['.key']).remove()
        },
        
    }

}
</script>

<style>
    #lista{
        display: flex;
        flex-direction: row;
    }
    button{
        margin-left: 1em;
    }
    .error {
    color: #f00;
}
</style>