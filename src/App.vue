<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  // data() {
  //   return {
  //     transitionName: 'slide'
  //   }
  // },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
html,body{
  width: 100%;
  height: 100%;
}
.wrapper{
  height: 100%;
  position: relative;
}
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.1);
}

/* 跳转页面动画 */
    	.slide-enter,
    	.slide_back-enter {
    		position: absolute;
    		width: 100%;
    	}
    	.slide-leave,
    	.slide_back-leave {
    		position: absolute;
    		width: 100%;
    	}
    	.slide-enter-active,
    	.slide_back-enter-active {
    		transition: all 0.3s linear;
    	}
    	.slide-leave-active {
    		position: absolute;
    		transition: all 0.3s linear;
    		transform: translate(-100%);
    	}
    	.slide-enter{
    		transform: translateX(100%);
    	}
    	.slide_back-leave-active {
    		position: absolute;
    		transition: all 0.3s linear;
    		transform: translate(100%);
    	}
    	.slide_back-enter {
    		transform: translateX(-100%);
    	}
</style>
