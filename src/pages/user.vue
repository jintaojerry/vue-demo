<template>
    <div class="wrapper">
        <header>
            <div class="iconfont icon-back" @click="goBack"></div>
            <div class="title">个人中心</div>
            <div class="iconfont icon-xinxi"></div>
        </header>
        <div class="content">
            <div class="user">
                <div class="user-img">
                    <img  :src="userInfo.avatar_url" :alt="userInfo.loginname"/>
                </div>
                <div class="user-info">
                    <p>{{userInfo.loginname}}</p>
                    <p>积分：{{userInfo.score}}</p>
                    <p>注册时间：{{userInfo.create_at | formatDate}}</p>
                </div>
            </div>
            <div class="list-wrapper">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item  name="topic" >
                        <template slot="title">
                            <i class="iconfont icon-topic"></i>
                            <span>最近的话题</span>
                            <el-badge class="mark" :value="recentTopics.length" />
                        </template>
                        <ul class="cell-container">
                            <li class="cell" v-for="item in recentTopics" :key="item.id" @click="loadTopic(item.id)">
                                <div class="cell-avatar">
                                     <img v-if="item.author"  :src="item.author.avatar_url"/>
                                </div>
                                <div class="cell-title">{{item.title}}</div>
                                <div class="cell-time">{{item.last_reply_at | formatDate}}</div>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-collapse-item name="reply">
                        <template slot="title">
                            <i class="iconfont icon-reply"></i>
                            <span>最近的回复</span>
                            <el-badge class="mark" :value="recentReplies.length" />
                        </template>
                       <ul class="cell-container">
                            <li class="cell" v-for="item in recentReplies" :key="item.id" @click="loadTopic(item.id)">
                                <div class="cell-avatar">
                                     <img v-if="item.author"  :src="item.author.avatar_url"/>
                                </div>
                                <div class="cell-title">{{item.title}}</div>
                                <div class="cell-time">{{item.last_reply_at | formatDate}}</div>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-collapse-item  name="collect">
                         <template slot="title">
                            <i class="iconfont icon-collect"></i>
                            <span>收藏的话题</span>
                            <el-badge class="mark" :value="collectTopics.length" />
                        </template>
                        <ul class="cell-container">
                            <li class="cell" v-for="item in collectTopics" :key="item.id" @click="loadTopic(item.id)">
                                <div class="cell-avatar" @click="loadUser(item.author.loginname)">
                                     <img v-if="item.author"  :src="item.author.avatar_url"/>
                                </div>
                                <div class="cell-title">{{item.title}}</div>
                                <div class="cell-time">{{item.last_reply_at | formatDate}}</div>
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               userInfo:'',
               activeName: 'topic',
               recentTopics:'',
               recentReplies:'',
               collectTopics:''
            }
        },
        created() {
            this.$http({
                url:`https://www.vue-js.com/api/v1/user/${this.$route.query.user}`,
                method:'get'
            }).then((res) => {
                console.log(res);
                this.userInfo = res.data.data;
                this.recentTopics = res.data.data.recent_topics;
                this.recentReplies = res.data.data.recent_replies;
                this.collectTopics = res.data.data.collect_topics;
            }).catch((res) => {
                console.log(res)
            })
        },
        methods: {
            goBack() {
               this.$router.go(-1); 
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

<style scoped lang = "scss">
    @import url('../assets/font/iconfont.css');
    .wrapper{
        header{
            width:100%;
            height: 44px;
            background: #1c6132;
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
                    width:10%;
                }
                &.title{
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 16px;
                }
            }
        }
        .content{
            padding-top: 44px;
            .user{
                overflow: hidden;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
                .user-img{
                    float: left;
                    width: 20%;
                    img{
                        display: block;
                        width: 60px;
                        height: 60px;
                        padding-left: 10px;
                    }
                   
                }
                .user-info{
                    float: left;
                    width: 80%;
                    p{
                        line-height: 1.5;
                        font-size: 13px;
                        padding-left: 15px;
                        &:nth-child(1){
                            font-weight: 900;
                            font-size: 16px;
                        }
                    }
                }
            }
            .list-wrapper{
                padding: 10px;
                .el-collapse-item__content{
                    padding-bottom: 10px;
                }
                .iconfont{
                   margin: 0 35px 0 10px;
                }
                .el-badge.mark{
                    float:right;
                    margin-right: 10px;
                }
                .cell{
                    padding: 10px 0;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #ccc;
                    overflow: hidden;
                }
                .cell-avatar{
                    float:left;
                    width: 10%;
                    img{
                        width:30px;
                        height: 30px;
                        display: block;
                        margin-top: 5%;
                    }
                   
                }
                .cell-title{
                    float:left;
                    width: 72%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .cell-time{
                    float:right;
                    width:18%;
                    text-align: center;
                }
            }
        }
    }
</style>

