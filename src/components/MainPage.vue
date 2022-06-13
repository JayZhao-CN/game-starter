<template>
    <div style="height: 100%">
        <el-col :span="9">
            <div style="margin-top: 30%; margin-left: 10%">
                <el-card :body-style="{ padding: '0px' }" shadow="never" style="background-color: rgba(0,0,0,0.37)">
                    <el-carousel :interval="5000" arrow="always" class="box-card" :height="bannerHeight + 'px'">
                        <el-carousel-item v-for="item in imgList" :key="item.name">
                            <el-image :src="item.src" alt="图片加载失败" :title="item.title" fit="cover"/>
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </div>
        </el-col>
        <el-col :span="9">
            <div style="min-height: 35px;"></div>
            <div style="min-height: 35px;" class="footer">
                <span>Copyright © 2022 JayZhao. All rights reserved.</span>
            </div>
        </el-col>

        <el-col :span="6">
            <div style="margin-top: 45%; margin-left: 10%;margin-right: 5%">
                <el-card style="background-color: rgba(2,10,19,0.2);text-shadow: 2px 2px 10px #0d00ff;">
                    <span style="color: rgb(240,248,255);text-shadow: 2px 2px 10px #ffffff;">账号</span>
                    <el-input v-model="account" maxlength="11" spellcheck ="false"></el-input>
                    <span style="color: aliceblue">密码</span>
                    <el-input type="password" v-model="password" :show-password="true"></el-input>
                    <el-button class="boom" @click="openGame">进入游戏</el-button>
                </el-card>
            </div>
        </el-col>
    </div>


</template>

<script>
    export default {
        name: "MainPage",
        data() {
            return {
                bannerHeight: 100,//图片父容器的高度
                screenWidth: 0,//屏幕的宽度
                imgList: [
                    {
                        name: "lj",
                        src: require("@/assets/scrollBarImg/1102108.jpg"),
                        title: "这是lj.png"
                    },
                    {
                        name: "logo",
                        src: require("@/assets/scrollBarImg/1114939.jpg"),
                        title: "这是logo.png"
                    },
                    {
                        name: "bg",
                        src: require("@/assets/scrollBarImg/1115544.png"),
                        title: "这是bg.png"
                    }
                ],
                account: '',
                password: '',
            }
        },
        mounted: function () {
            this.screenWidth = window.innerWidth;
            this.setSize();
            window.onresize = () => {
                this.screenWidth = window.innerWidth;
                this.setSize();
            };
        },

        created() {
            //接收主进程发送的消息。
            window.electron.ipcRenderer.on('rrr', function(event, data) {
                console.log(data)
            })
        },

        destroyed() {
        },
        methods: {
            setSize: function () {
                // 通过屏幕宽度(图片宽度)计算高度
                this.bannerHeight = 18 / 100 * this.screenWidth;
            },
            openGame(){
                window.electron.ipcRenderer.send("asynchronous-message","保存的数据");
            },
        },
    }
</script>

<style scoped>
    .box-card {
        /*width: 40%;*/
    }
    .footer{
        position: fixed;
        bottom: 0;
    }

       /deep/.el-input__inner {
           /*background-color: transparent !important;*/
           margin-top: 10px;
           margin-bottom: 10px;
           background-color: rgba(0, 0, 0, 0.7);
           border: 1px solid #a7c1db;
           color: #e2faff;
       }

    .boom {
        background-color: #212149;
        color: #ffffce;
        position: relative;
        z-index: 1;
        margin-top: 10px;
        width: 100%;
    }

    .boom::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: 2px solid rgba(22, 160, 133, 0);
        transform-origin: center;
    }

    .boom:hover::before {
        transform: scale(1.25);
        transition: all ease-out .5s;
        border: 1px solid #96f3e0;
        opacity: 0;
    }
</style>