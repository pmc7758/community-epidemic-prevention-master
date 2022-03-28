<template>
  <div>

    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.19/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器脚本 -->
    <!-- <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"/> -->
    <remote-js src="https://g.alicdn.com/de/prismplayer/2.9.19/aliplayer-min.js"/>
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vodApi from '@/api/vod/vod'

export default{
  layout: 'video',

  components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }})
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },

  props: {
    vid: String,
    required: true
  }, // 应用video布局

  data() {
    return {
      playAuth: ''
    }
  },

  // 页面渲染之后
  mounted() {
    this.getData(this.vid)
    console.log(this.vid)

    new Aliplayer({
      id: 'J_prismPlayer',
      vid: this.vid, // 阿里云视频id
      playauth: this.getData(this.vid), // 播放凭证
      // encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
      width: '100%',
      height: '500px',

      // 以下可选设置
      cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
      qualitySort: 'asc', // 清晰度排序

      mediaType: 'video', // 返回音频还是视频
      autoplay: true, // 自动播放
      isLive: false, // 直播
      rePlay: false, // 循环播放
      preload: true,
      controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
      useH5Prism: true // 播放器类型：html5
    }, function(player) {
      console.log('播放器创建成功')
    })
  },

  methods: {
    getData(vid) {
      return vodApi.getPlayAuth(vid)
        .then(response => {
          this.playAuth = response.data
          console.log(this.playAuth)
        })
    }
  }
}
</script>
