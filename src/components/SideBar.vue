<template>
	<div class="side">
    <header>
    	<user-info :user-info="userInfo"></user-info>
    </header>
    <div class="topics">
      <ul>
        <li v-for="(item,index) in tabs" :class="[item.isActive ? 'active' : '']" @click="toogleTab(item, index)"><i :class="['iconfont', item.icon]"></i>{{item.label}}</li>
      </ul>
    </div>
    <footer>
      <ul>
      	<li @click="createTopic"><i class="iconfont icon-fabu"></i>发布</li>
        <li><i class="iconfont icon-messsage"></i>消息</li>
        <li><i class="iconfont icon-about"></i>关于</li>
      </ul>
    </footer>
  </div>
</template>

<script>
	import userInfo from './userInfo.vue'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			userInfo
		},
		computed: {
			...mapGetters([
				'tabs',
				'userInfo'
			]),
			//当前显示的tab索引
			activeTabIndex () {
				return this.tabs.findIndex(item => item.isActive);
			}
		},
		methods: {
			//切换tab
			toogleTab (item, index) {
				if (this.activeTabIndex === index) {
					return
				} else {
					this.$emit('hide');
					this.$store.dispatch('toogleTab', {
						tab: item.tab,
						current: this.activeTabIndex, 
						new: index
					});					
				}
			},
			//跳转到新建主题页
			createTopic () {
				this.$router.push({name: 'createTopic'});
			}
		}
	}
</script>

<style lang="less" scoped>
	.side {
	  position: relative;
	  height: 100%;
	  background: #fff;

	  header {
	    height: 30%;
	    background: linear-gradient(143deg, #4dc2c4,#69ddd3,#88e9d8,#69e1d4);
	  }
	  .topics {
	    margin: 5px 0;
	  }
	  li {
	    height: 40px;
	    line-height: 40px;
	    font-size: 16px;
	    color: #333;

	    i {
	      margin: 0 15px;
	    }
	  }
	  .active {
	    background: #eee;
	  }
	  footer {
	    border-top: 1px solid #eee;
	  }
	}
</style>