  <template>
    <div class="wrapper">
        <header>
            <div class="iconfont icon-back" @click="goBack"></div>
            <div class="title">{{content.title}}</div>
            <div class="iconfont icon-more"></div>
        </header>
        <div class="content">
            <div class="content-tip">
                <span class="put-top" v-if="content.top">置顶</span>
                <span class="put-top" v-else-if="content.good">精华</span>
                <span class="put" v-else-if="content.tab == 'share'">分享</span>
                <span class="put" v-else-if="content.tab == 'ask'">问答</span>
                <span class="put" v-else-if="content.tab == 'job'">招聘</span>
                <strong>{{content.title}}</strong>
            </div>
            <div class="content-author">
                <div class="author-img">
                    <img v-if="content.author" :src = "content.author.avatar_url" @click="loadUser(content.author.loginname)"/>
                </div>
                <div class="author-info">
                    <p>作者：{{content.loginname}}</p>
                    <p>发表时间：{{content.create_at | formatDate}}</p>
                </div>
                <div class="author-info">
                    <p>最后回复：{{content.last_reply_at | formatDate}}</p>
                    <p>浏览量：{{content.visit_count}}</p>
                </div>
            </div>
            <div class="content-text" v-html="content.content"></div>

           <!-- 评论组件 -->
           <!-- 父组件做检测函数toUser提供给紫组件访问 -->
           <topic-comments :comments="content.replies" v-on:toUser="loadUser"></topic-comments>
        </div>

       

    </div>
</template>

<script>
    import TopicComments from '../components/TopicComments'
    export default {
       data() {
           return {
               content:'',
           }
       },
       created() {
           this.$http({
               url:`https://www.vue-js.com/api/v1/topic/${this.$route.query.id}`,
               method:'get'
           }).then((res) => {
               this.content = res.data.data;
               console.log(res)
           }).catch((res) => {
               console.log(res);
           })
       },
       methods: {
            goBack () {
               this.$router.go(-1);
            },
            loadUser(user) {
                this.$router.push({path:'../user',query:{user:user}})
            },
       },
       components: {
           TopicComments
       }
    }
</script>

<style scoped lang = "scss">
    @import '../assets/font/iconfont.css';
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
        .content{
            padding-top: 44px;
            .content-tip{
                padding: 10px 15px;
                font-size: 12px;
                line-height: 1.5;
                border-bottom: 1px solid #ccc;
                 .put-top{
                    background: #7e57c2;
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
                strong{
                     font-size: 15px;
                }
            }
            .content-author{
                padding:  10px 0;
                overflow: hidden;
                border-bottom: 1px solid #ccc;
                .author-img{
                    float: left;
                    width: 20%;
                    position: relative;
                    img{
                        display: block;
                        width:40px;
                        height: 40px;
                        margin: 0 auto;
                        border-radius: 50%;
                    }
                }
                .author-info{
                    float:left;
                    width: 40%;
                    p{
                        line-height: 1.8;
                        font-size: 13px;
                    }
                }
            }
            .content-text{
                padding: 20px;
                border-bottom: 1px solid #ccc;
            }
        }
       
    }
</style>

<style scoped>
    .content-text >>>.markdown-text{
        font-size: 13px;
        line-height: 1.4;
        width: 100%;
        overflow: hidden;
    }
    .content-text >>> h1,h2,h3,h4,h6,h6{
         margin: 15px 0;
    }
    .content-text >>> p{
        padding-bottom: 10px;
    }
     .content-text >>> img{
         display: block;
         width: 100%;
     }
</style>
