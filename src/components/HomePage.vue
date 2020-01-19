<template>
  <div style="height:100%">
    <div>
      <a-carousel style="height:250px" autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel>
    </div>
    <div>
      <a-card
        title="公告"
        style="width: 500px;text-align:left;position:absolute;"
      >
        <a href="#" slot="extra">更多</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
      <a-card
        title="公告"
        style="width: 500px;text-align:left;position: absolute;left: 700px;"
      >
        <a href="#" slot="extra">更多</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
