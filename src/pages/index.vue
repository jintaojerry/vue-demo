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
        },
        created() {
            this.$http({
                url:'',
                params:{
                    Method:'get_user_Login',
                    Language:'zh',
                    Maptype:'zh',
                    loginType:0,
                    userName:'pzcs',
                    userPwd:666888
                },
                baseURL:'/api',
                method: 'post',
            }).then((res) => {
                console.log(res)
            }).catch((res) => {
                console.log(res);
            })
        }
    }    
</script>

<style scoped lang = "scss">
.wrapper {
  .content {
    position: absolute;
    top: 0;
    bottom: 49px;
    width: 100%;
  }
  .footer {
    position: absolute;
    height: 49px;
    bottom: 0;
    width: 100%;
  }
}
</style>