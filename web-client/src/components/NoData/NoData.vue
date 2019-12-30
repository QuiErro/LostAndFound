<template>
  <div id="no_data">
      <img src="./images/empty.png"/>
      <p>暂无数据~</p>
  </div>
</template>

<script>

  export default {
    name: "NoData",

  }
</script>

<style scoped lang="less" ref="stylesheet/less">
#no_data{
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 15rem;
        height: 15rem;
    }

    p{
        margin-top: 1rem;
        width: 100%;
        font-size: 16px;
        color: #666;
        text-align: center;
    }
}
</style>
