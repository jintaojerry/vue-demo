<template>
    <div class="wrapper">
        <router-view class="content"></router-view>
        <index-footer class="footer"></index-footer>
    </div>
</template>

<script>
    import IndexFooter from '@/components/IndexFooter'
    export default {
        data() {
            return {
               
            }
        },
        components:{
            IndexFooter
        }
    }
</script>

<style scoped lang = "scss"> 
    .wrapper{
        .content{
            position: absolute;
            top: 0;
            bottom: 49px;
            width: 100%;
        }
        .footer{
            position: absolute;
            height: 49px;
            bottom: 0;
            width: 100%;
        }
    }
</style>