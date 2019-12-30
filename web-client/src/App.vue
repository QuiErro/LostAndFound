<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import {getUserInfo} from './service/api/index'
    import {mapActions} from 'vuex'

    export default {
      name: "App",
      mounted(){
        this.reqUserInfo();
      },
      methods: {
        ...mapActions(['synUserInfo']),

        // 获取session下的用户信息
        async reqUserInfo(){
          const result = await getUserInfo();
          if(result.status === 200){
            // 同步用户信息
            this.synUserInfo({
              userInfo: result.result.data
            })
          }
        }
      }
    }
</script>

<style>
	#app{
		width: 100%;
		height: 100%;
	}
</style>
