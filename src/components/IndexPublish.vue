<template>
    <div class="wrapper">
        <header>
            <div class="iconfont icon-back" @click="goBack"></div>
            <div class="title">发布帖子</div>
        </header>
        <div class="main">
            <ul id="titleList">
                <li v-for = "(titleList,index) in titleLists" 
                    :key = "index" 
                    :class = "{active:titleList.active}"
                    @click = "tabChange(titleList)">
                    {{titleList.name}}
                </li>
            </ul>
            <div class="content">
                <div class="edit" v-if="titleLists[0].active">
                    <mu-select-field v-model="tab" fullWidth label="请选择模块" :errorText="errorText">
                        <mu-menu-item value="ask" title="回答"/>
                        <mu-menu-item value="share" title="分享"/>
                        <mu-menu-item value="job" title="招聘"/>
                    </mu-select-field>
                    <mu-text-field label="请写标题" v-model="title" fullWidth labelFloat/><br/>
                    <mu-text-field v-model="editorText" label="正文" hintText="建议使用 Markdown 语法" multiLine :rows="10" :rowsMax="12" 
                                    :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
                </div>
                <div class="preview" v-else v-html="editorText"></div>
            </div>
            <mu-raised-button  label="发布" class="demo-raised-button publish"   primary @click="publishText" />
            <mu-dialog :open="canPublish" title="温馨提示：">
                {{tipMsg}}
                <mu-flat-button label="确定" slot="actions" primary @click="close" />
            </mu-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titleLists: [
                    {name:'编辑',active:true,tab:'edit'},
                    {name:'预览',active:false,tab:'preview'},
                ],
                tab:'ask',
                editorText:'',
                title:'',
                tipMsg:'',
                canPublish:false,
                accessToken:''
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
            this.accessToken = user.accessToken;
        },
        computed: {
            errorText() {
                return this.tab ? '' : '这是必选项';
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            tabChange(item) {
                this.titleLists.forEach(function(item) {
                    item.active = false;
                });
                item.active = true
            },
            close() {
                this.canPublish = false;
            },
            publishText() {
                if (this.title.length < 10) {
                    this.canPublish = true;
                    this.tipMsg = '标题最少要10个字以上哦！'
                }
                else if (!this.editorText) {
                    this.canPublish = true;
                    this.tipMsg = '文章内容不能为空！'
                }
                else{
                    //发布
                    this.$http.post('https://www.vue-js.com/api/v1/topics', {
                        accesstoken: this.accessToken,
                        title: this.title,
                        tab: this.tab,
                        content: this.editorText
                    })
                    .then(function(response) {
                        this.canPublish = true
                        this.tipMsg = "发布成功！"
                        setTimeout(() => {
                            this.canPublish = false;
                        }, 2000);
                    })
                    .catch(function(error) {
                    console.log(error);
                    })
                }
            }
        },
    }
</script>

<style scoped lang="scss">
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
            bottom: 49px;
            width: 100%;
            overflow: auto;
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
                   border-bottom: 2px solid  #7e57c2;
                }
            }
            .content{
                padding: 0 10px;
            }
            .publish{
                position: absolute;
                bottom: 10px;
                left:10px;
                right: 10px;
                width:95%;
            }
        }
    }
</style>