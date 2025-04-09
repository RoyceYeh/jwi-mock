<template>
  <div class="title">
    <div class="container lock">
      <h2>
        <span v-for="(char, index) in 'NEWS'" :key="index" data-aos="fade-up-right" :data-aos-delay="(index + 1) * 100" data-aos-duration="500">
          {{ char }}
        </span>
      </h2>
      <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">最新消息</p>
    </div>
    <div class="breadcrumb">
      <div class="container">
        <div class="pic">
          <img src="@/assets/images/home.svg" alt="首頁" />
        </div>
        <router-link to="/">
          <p>首頁</p>
        </router-link>
        <i>/</i>
        <router-link class="grey" to="/news">
          <span>最新消息</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
