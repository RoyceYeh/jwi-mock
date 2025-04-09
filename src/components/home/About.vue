<script setup>
const aboutItems = [
  { id: 1, title: 'Commerce', subTitle: '商務', className: 'about_en1-1' },
  { id: 2, title: 'Content', subTitle: '內容', className: 'about_en1-2' },
  { id: 3, title: 'JWI', subTitle: '傑森整合行銷', className: 'about_en1-3' },
  { id: 4, title: 'Lion', subTitle: '雄獅集團', className: 'about_en1-4' },
  { id: 5, title: 'Community', subTitle: '社群', className: 'about_en1-5' },
]
</script>

<template>
  <section class="about">
    <div class="marquee">
      <div class="track">
        <span class="content">Tourism-branding business models customized for business and government sector.</span>
        <span class="content">Tourism-branding business models customized for business and government sector.</span>
      </div>
    </div>
    <div class="about_content">
      <div class="title">
        <h2>
          <span v-for="(letter, index) in 'ABOUT'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
            {{ letter }}
          </span>
        </h2>
        <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">關於傑森</p>
      </div>
      <p class="text">
        傑森全球整合行銷用科技領先創新、用知識掌握趨勢、用文創詮釋品味。
        <br />
        我們的團隊承接各種跨產業、跨通路、跨媒介的行銷案，
        <br />
        如今我們服務的客戶不僅從台灣跨足兩岸，更遍及全球。
        <br />
        從旅遊產業至休閒生活產業，
        <br />
        我們致力於運用內容(Content)、社群(Community)、商務(Commerce)之3C營運模式，
        <br />
        提供全方位整合行銷資源，為客戶創造價值，傳遞更全面、美好的生活體驗。
      </p>
      <div class="animate_box">
        <div class="about_zu_ttl">
          <span>3C營運模式</span>
          <p>全方位資源整合</p>
        </div>
        <div class="about_box">
          <div v-for="item in aboutItems" :key="item.id" class="about_en1" :class="item.className">
            <p>
              {{ item.title }}
              <span>{{ item.subTitle }}</span>
            </p>
            <i></i>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee marquee1">
      <div class="track track1">
        <span class="content">JWI Marketing · JWI Marketing ·</span>
        <span class="content">JWI Marketing · JWI Marketing ·</span>
      </div>
    </div>
  </section>
</template>
