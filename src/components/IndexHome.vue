<template>
    <div class="home">
        <div class="header">
            <img src="../assets/vue.png" alt="vue"/>
            <span >Vue.js</span>
        </div>
        <div class="content"  >
            <ul id="titleList">
                <li v-for = "(titleList,index) in titleLists" 
                    :key = "index" 
                    :class = "{active:titleList.active}"
                    @click = "tabChange(titleList)">
                    {{titleList.name}}
                </li>
            </ul>
            <ul id = "list" ref="scrollContainer">
                <div id="top"></div>
                <li v-for="item in items" :key="item.id">
                    <div class="avatar_url" @click="loadUser(item.author.loginname)">
                        <img v-if="item.author" :src="item.author.avatar_url"/>
                    </div>
                    <div class = "detail" @click="loadTopic(item.id)">
                        <p>
                            <span class="put-top" v-if="item.top">置顶</span>
                            <span class="put-top" v-else-if="item.good">精华</span>
                            <span class="put" v-else-if="item.tab == 'share'">分享</span>
                            <span class="put" v-else-if="item.tab == 'ask'">问答</span>
                            <span class="put" v-else-if="item.tab == 'job'">招聘</span>
                            <span>{{item.title}}</span>
                        </p>
                        <p>
                            <span title="回复数"><i class="iconfont icon-xinxi"></i>{{item.reply_count}}</span>
                            <span title="点击数"><i class="iconfont icon-liulan"></i>{{item.visit_count}}</span>
                            <span class="time">8天前</span>
                        </p>
                    </div>
                </li>
            </ul>
           
        </div>
        <div class="loading-container" v-if="isLoad">
             <mu-circular-progress :size="40" color="#7e57c2" class="loading"/>
        </div>
        <a class="goTop" href="#top" v-if="isShow" @click="isShow = false">
            <i class="iconfont icon-top"></i>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titleLists: [
                    {name:'全部',active:true,tab:'all'},
                    {name:'精华',active:false,tab:'good'},
                    {name:'weex',active:false,tab:'weex'},
                    {name:'分享',active:false,tab:'share'},
                    {name:'问答',active:false,tab:'ask'},
                    {name:'招聘',active:false,tab:'job'}
                ],
                items:'',
                url:'https://www.vue-js.com/api/v1/topics?tab=all',
                limit:0,
                isLoad:false,
                isShow:false,
            }
        },
        created() {
           this.getData();
        },
        mounted() {
            this.$refs.scrollContainer.addEventListener('scroll',() =>{
                    this.scroll();
            })
        },
        methods: {
            tabChange(item) {
                this.titleLists.forEach(function(item) {
                    item.active = false;
                });
                item.active = true
                this.url = 'https://www.vue-js.com/api/v1/topics?tab='+item.tab;
                this.limit = 0;
                this.getData();
            },
            getData() {
                this.limit += 10;
                this.$http({
                    url:this.url,
                    params:{
                         limit:this.limit
                    }
                }).then((res) => {
                    this.items = res.data.data;
                }).catch((res) => {
                    console.log(res)
                })
            },
            scroll () {
                const sumH = this.$refs.scrollContainer.scrollHeight;
                const viewH =  this.$refs.scrollContainer.clientHeight;
                const scrollH = this.$refs.scrollContainer.scrollTop;
                if (viewH + scrollH === sumH) {
                    this.isLoad = true;
                    if (sumH > 800 && !this.isShow) {
                        this.isShow = true;
                    }
                    setTimeout(() => {
                        this.getData();
                        this.isLoad = false;
                    }, 1500);
                   
                }
            },
            loadTopic(id) {
                this.$router.push({path:'../topic',query:{id:id}})
            },
            loadUser(user) {
                this.$router.push({path:'../user',query:{user:user}})
            }

        },
    }
</script>

<style scoped lang="scss">
    @import '../assets/font/iconfont.css';
    $color:#7e57c2;
    .home{
        background: #e2e2e2;
         .header{
            position: absolute;
            top:0px;
            width: 100%;
            height: 44px;
            background: $color;
            line-height: 44px;
            text-align: center;
            img{
                float: left;
                width: 36px;
                height: 36px;
                margin-left: 15px;
                margin-top: 4px;
            }
            span{
                color: #fff;
                font-size: 24px;
                margin-left: -33px;
            }
        }
        .content{
            position: absolute;
            top:44px;
            bottom:0px;
            width:100%;
            background: #eee;
            #titleList{
                height: 44px;
                background: #fff;
                display: flex;
                margin-bottom: 6px;
                li{
                    flex: 1;
                    // color: #fff;
                    font-size: 15px;
                    line-height: 44px;
                    text-align: center;
                    box-sizing: border-box;
                }
                .active{
                   border-bottom: 2px solid  $color;
                }
            }
            #list{
                 overflow: auto;
                 position: absolute;
                 top: 50px;
                 bottom: 0;
                 width: 100%;
                li{
                    padding: 7px 0;
                    border-bottom: 1px solid #ccc;
                    overflow: hidden;
                    background: #fff;
                    .avatar_url{
                        width:20%;
                        float: left;
                        position: relative;
                        box-sizing: border-box;
                        text-align: center;
                        img{
                            display: inline-block;
                            margin: 8px auto;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                   
                    .detail{
                        float: left;
                        width:80%;
                        padding: 0px 10px;
                        box-sizing: border-box;
                        font-size: 14px;
                        p{
                            padding-bottom: 5px;
                            line-height: 1.5;
                            word-break: break-all;
                            i{
                                margin-right: 5px;
                                color: #000;
                            }
                           
                        }
                        .put-top{
                            background:  $color;
                            padding: 2px 8px;
                            border-radius: 3px;
                            color: #fff;
                        }
                        .put{
                            background: #e5e5e5;
                            padding: 2px 8px;
                            border-radius: 3px;
                            color: #999;
                        }
                        .time{
                            float: right;
                            margin-right: 15px;
                        }
                    }
                }
            }
           
           
        }
        .loading-container{
            position: absolute;
            left: 0px;
            bottom: 0px;
            width: 100%;
            height: 40px;
            background: #fff;
            z-index: 100;
            .loading{
                display: block;
                width: 40px;
                height: 40px;
                margin: 0 auto;
            }
        }
        .goTop{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            color:  $color;
            text-align: center;
            line-height: 60px;
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: #aaa;
            z-index: 999;
            .icon-top{
                font-size: 28px;
            }
        }
    }
</style>