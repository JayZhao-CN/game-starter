<template>
    <div id="app">
        <div class="top-bar">
            <el-row>
            <el-col :span="2">
                <div style="-webkit-app-region: drag;margin-left: -5px">
                    <el-button type="text" icon="el-icon-my-main" class="interval"></el-button>
                    <span style="margin-left: 5px">启动器</span>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="center-layout"></div>
            </el-col>
            <el-col :span="4">
                <div style="text-align: right; margin-right: 10px">
                    <el-button type="text" size="small" icon="el-icon-my-min" class="interval" @click="setWin('min')"></el-button>
                    <el-button type="text" icon="el-icon-my-close" class="interval" @click="setWin('close')"></el-button>
                </div>
            </el-col>
        </el-row>
        </div>
        <div class="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'App',
        components: {},
        methods: {
            setWin(type){
                window.electron.ipcRenderer.send(type)
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
        position:fixed;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
    .top-bar {
        position:fixed;
        top:-5px;
        left: 0;
        height: 30px;
        width: 100%;
        text-align: center;
    }

    .el-icon-my-min{
        background: url("./assets/minus-outline.png") no-repeat center;
        background-size: cover;
    }
    .el-icon-my-min:before{
        content: "替";
        font-size: 16px;
        visibility: hidden;
    }
    .el-icon-my-min{
        font-size: 16px;
    }
    .el-icon-my-min:before{
        content: "\e611";
    }

    .el-icon-my-close{
        background: url("./assets/close-outline.png") no-repeat center;
         background-size: cover;
    }
    .el-icon-my-close:before{
        content: "替";
        font-size: 16px;
        visibility: hidden;
    }
      .el-icon-my-close{
          font-size: 16px;
      }
    .el-icon-my-close:before{
        content: "\e611";
    }

    .el-icon-my-main{
        background: url("./assets/main_ico.png") no-repeat center;
        background-size: cover;
    }
    .el-icon-my-main:before{
        content: "替";
        font-size: 16px;
        visibility: hidden;
    }
    .el-icon-my-main{
        font-size: 16px;
    }
    .el-icon-my-main:before{
        content: "\e611";
    }

    .center-layout {
        -webkit-app-region: drag;
        height: 35px;
    }

    .main-content {
        top: 35px;
        width: 100%;
        height: 100%;
        background: url("./assets/background.jpg") no-repeat center;
        background-size: cover;
    }
</style>
