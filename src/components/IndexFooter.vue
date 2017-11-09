<template>
       <ul class="list">
           <li  v-for="(item,index) in items" @click="routerTo(item,index)"  :key="item.index" :class="{active:item.active}" >
               <span :class="item.class" class="iconfont"></span>
               <div class="item">{{item.name}}</div>
           </li>
       </ul>
</template>

<script>
    export default {
        data() {
            return {
               items:[
                   {path:'home',class:'icon-shouye',name:'首页',active:true},
                   {path:'message',class:'icon-xinxi',name:'信息',active:false},
                   {path:'my',class:'icon-wode',name:'我的',active:false},
                   {path:'more',class:'icon-gengduo',name:'更多',active:false},
               ]
            }
        },
        methods: {
            routerTo(item,index) {
                this.$router.push({path:item.path})
                this.items.forEach(function(item) {
                    item.active = false;
                });
                item.active = true;
            }
        },
    }
</script>

<style scoped lang = "scss">
    @import '../assets/font/iconfont.css';
    .list{
        display: flex;
        li{
            flex: 1;
            text-align:center;
            color:#666;
            .iconfont{
                font-size: 20px;
                font-weight: 900;
            }
            .item{
                font-size: 14px;
            }
            &.active{
                color:#007aff;
            }
        }
    }
</style>