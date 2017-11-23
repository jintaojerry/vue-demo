<template>
    <div class="wrapper">
        <header>
            <div class="iconfont icon-back" @click="goBack"></div>
            <div class="title">信息</div>
        </header>
        <div class="main">
            <el-collapse v-model="activeName" accordion class="tablist">
                <el-collapse-item  name="1" >
                    <template slot="title">
                        <i class="iconfont icon-weidu"></i>
                        <span>未读的消息</span>
                        <el-badge class="mark" :value="hasnotReads.length" />
                    </template>
                    <ul>
                        <li class="item" v-for="hasnotRead in hasnotReads" :key="hasnotRead.id">
                            <p>
                                <span>来自</span>
                                <strong class="item-name">{{hasnotRead.author.loginname}}</strong>
                                <span class="item-time">{{hasnotRead.reply.create_at | formatDate}}</span>
                            </p>
                            <p>
                                <span class="item-title">回复了您的话题:  {{hasnotRead.topic.title}}</span>
                            </p>
                            <p class="replay">{{hasnotRead.reply.content}}</p>
                        </li>
                    </ul>
                    <div class="no-message" v-if="!hasnotReads.length">暂无消息</div>
                </el-collapse-item>
                <el-collapse-item  name="2" >
                    <template slot="title">
                        <i class="iconfont icon-yidu"></i>
                        <span>已读的消息</span>
                        <el-badge class="mark" :value="hasReads.length" />
                    </template>
                    <ul>
                        <li class="item" v-for="hasRead in hasReads" :key="hasRead.id">
                            <p>
                                <span>来自</span>
                                <strong class="item-name">{{hasRead.author.loginname}}</strong>
                                <span class="item-time">{{hasRead.reply.create_at | formatDate}}</span>
                            </p>
                            <p>
                                <span  class="item-title">回复了您的话题:  {{hasRead.topic.title}}</span>
                            </p>
                             <p class="replay">{{hasRead.reply.content}}</p>
                        </li>
                    </ul>
                    <div class="no-message" v-if="!hasReads.length">暂无消息</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                 activeName: '1',
                 hasReads:'',
                 hasnotReads:''
                 
            }
        },
        created() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                this.$router.push({
                    path:'../login'
                })
                return;
            } 
            this.$http({
                url:'https://www.vue-js.com/api/v1/messages',
                method:'get',
                params:{
                    accesstoken:user.accessToken
                }
            }).then((res) => {
                console.log(res)
                this.hasReads = res.data.data.has_read_messages;
                this.hasnotReads = res.data.data.hasnot_read_messages;
            }).catch((res) => {
                console.log(res)
            }) 
        },
        methods: {
            goBack() {
               this.$router.go(-1); 
            },
        },
    }
</script>

<style scoped lang="scss">
 @import url('../assets/font/iconfont.css');
    .wrapper{
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
            }
        }
        .main{
            position: absolute;
            top: 44px;
            bottom: 55px;
            width: 100%;
            overflow: auto;
            .tablist{
                padding:0 10px;
                .iconfont{
                   margin: 0 35px 0 10px;
                }
                .el-badge.mark{
                    float:right;
                    margin-right: 10px;
                }
                .no-message{
                    line-height: 35px;
                    text-align: center;
                    background: #eee;
                    margin-top: 10px;
                }
                .item{
                    padding: 6px 0;
                    border-bottom: 1px solid #ccc;
                    p:nth-child(1){
                       padding-bottom: 5px;
                    }
                    .item-name{
                        font-size: 16px;
                    }
                    .item-time{
                        float: right;
                        margin-right: 10px;
                    }
                    .item-title{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        display: inline-block;
                        width: 95%;
                    }
                    .replay{
                        color: #000;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>

<style scoped>
.tablist >>>.el-collapse-item__content{
   padding-bottom: 10px;
}
</style>
