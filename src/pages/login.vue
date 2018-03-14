<template>
    <div class="my">
       <header>
            <div class="iconfont icon-back" @click="goBack"></div>
            <div class="title">登录</div>
            <div>
                <a href="https://www.vue-js.com/signup" class="register">注册</a>
            </div>
        </header>
        <div class="content">
            <mu-text-field  type="password" class="input" :errorText="error" hintText="请输入Access Token"  label="Access Token" :fullWidth="fullWidth"   v-model="accessToken" />
            <mu-raised-button  label="登录" class="demo-raised-button" :fullWidth="fullWidth"  primary @click="login"/>
            <div class="mu-card">
                <div class="mu-card-title-container">
                    <div class="mu-card-title"> AccessToken说明 </div>
                </div> 
                <div class="mu-card-text">
                    官方网站登录后，在设置页面可以看到自己的accessToken。将accessToken复制，粘贴到文本框，即可登录。
                </div>
            </div>
        </div>
            
    </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: '',
      fullWidth:true,
      error:''
    };
  },
  methods: {
    login() {
        // "f7c3eefc-166a-46a5-a04f-c6142fe08393"
        // deb24ad1-62ec-4f17-99c3-d5d9bdd1f48e
        this.$http({
            url: "https://www.vue-js.com/api/v1/accesstoken",
                method: "post",
                params: {
                    accesstoken: this.accessToken
                }
        }).then(res => {
          if(res.data) {
              localStorage.clear()
               let user = {
                'accessToken':this.accessToken,
                'userId':res.data.id,
                'loginname':res.data.loginname
                }
                localStorage.setItem('user',JSON.stringify(user));
                this.$router.push({
                    path:'index/my'
                })
          }
           
            
        }).catch(error => {
           if(!this.accessToken){
               this.error = 'accesstoken不能为空'
           }
           else{
                this.error = '输入错误，请重新输入'
           }
        });
    },
    goBack() {
        this.$router.push('index/home'); 
    },
  },
};
</script>

<style scoped lang="scss">
  @import url('../assets/font/iconfont.css');
$color: #7e57c2;
.my {
    header{
        width:100%;
        height: 44px;
        background: #7e57c2;
        overflow: hidden;
        position: fixed;
        z-index: 10000;
        div{
            float: left;
            height: 44px;
            line-height: 44px;
            text-align: center;
            color: #fff;
            &.iconfont{
                width:12%;
            }
            &.title{
                width: 76%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 16px;
            }
            .register{
                color: #fff;
            }
        }
    }
  .content {
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 15px;
    right: 15px;
    .input {
      margin-top: 30px;
    }
    .demo-raised-button{
         margin-top: 10px;
         margin-bottom: 50px;
    }
  }
}
</style>