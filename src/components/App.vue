<template>
<div>
    <table>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Mark</th>
                    <th>PR is Done</th>
                </tr>
                <tr v-for="stud in students" v-bind:key="stud._id">
                    <td><img v-bind:src="stud.photo" width="50px"></td>
                    <td v-bind:style="stud.name.indexOf(search)>-1 && search.length >0  ? 'background-color:#CA2C2C' : 'background-color:#fff'">{{stud.name}}</td>
                    <td>{{stud.group}}</td>
                    <td>{{stud.mark}}</td>
                    <td><input type="checkbox" v-bind:checked="stud.isDonePr"></td>
                </tr>
            </table>

            <br>Enter amount: <input type="number" value="100" v-model="start_value">
            <br>Convert from 
            <br><input type="radio" value="USD" name="value"  v-model="start_ccy"><label for="USD">USD</label>
            <br><input type="radio" value="EUR" name="value" v-model="start_ccy"><label for="EUR">EUR</label>
            <br><input type="radio" value="RUR" name="value" v-model="start_ccy"><label for="RUR">RUR</label>
            <br>to
            <br><input type="radio" value="USD" name="Convert" v-model="end_ccy"><label for="USD">USD</label>
            <br><input type="radio" value="EUR" name="Convert" v-model="end_ccy"><label for="EUR">EUR</label>
            <br><input type="radio" value="RUR" name="Convert" v-model="end_ccy"><label for="RUR">RUR</label>
            <button v-on:click="convert">Convert</button>
            <br>{{result}}
</div>

</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
    data: function() {
           return {
            students: [],
            currency:[],
            search:"",
            start_ccy:"",
            start_ccy_r:false,
            start_ccy_u:false,
            start_ccy_e:false,
            end_ccy:"",
            end_ccy_r:false,
            end_ccy_u:false,
            end_ccy_e:false,
            sell:0,
            buy:0,
            start_value:0,
            end_value:0,
            result:"",
        }},  
   methods:
    {
        deletePeople:function (id) {
            this. people =  this. people.filter(elem => elem.id!=id)
          }
        
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
        })
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
    methods:{
        deleteRow:function(id){
             this.students =  this.students.filter(stud => stud.id!=id)
        },
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " = " + this.end_value + " " + this.end_ccy;
            
        }
     }
}
</script>
<style scoped>

</style>