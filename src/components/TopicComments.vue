<template>
    <div class="comments">
        <div class="comments-sum" v-if="comments">{{comments.length}}条评论</div>
        <ul>
            <li v-for="item in comments" :key="item.id">
                <div class="item">
                    <div class="author-img">
                        <img v-if="item.author" :src="item.author.avatar_url" :alt="item.author.loginname">
                    </div>
                    <div class="author-info">
                        <span v-if="item.author">{{item.author.loginname}}</span>
                        <span>{{item.create_at | formatDate}}</span>
                        <span class="iconfont icon-reply">
                           
                        </span>
                         <span class="iconfont icon-dianzan">
                              <sup v-if="item.ups">{{item.ups.length}}</sup>
                              <sup v-else>0</sup>
                        </span>
                    </div>
                </div>
                <p class="reply-text" v-html="item.content"></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            comments:{
                type:Array
            }
        }
    }
</script>

<style scoped lang = "scss">
    @import '../assets/font/iconfont.css';
    .comments{
        padding: 10px;
        .comments-sum{
            border-left: 4px solid #1c6132;
            text-indent: 4px;
            line-height: 2;
            border-bottom: 1px solid #ccc;
        }
        ul{
            li{
                font-size: 13px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
               .item{
                   height: 40px;
                  
                   .author-img{
                        float: left;
                        width: 15%;
                        img{
                            display: block;
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin: 5px;
                        }
                    }
                    .author-info{
                        float: left;
                        width: 85%;
                        height: 40px;
                        line-height: 40px;
                        .iconfont{
                            float: right;
                            margin-right: 10px;
                            height: 40px;
                            line-height: 40px;
                        }
                        .icon-reply{
                            margin-top: 5px;
                        }
                    }
               }
                .reply-text{
                    line-height: 1.5;
                    padding-left: 5px;
                }
            }
        }
    }
</style>