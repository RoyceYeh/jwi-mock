<script setup>
import { ref, onMounted } from 'vue'

// 引入圖片
import homeImg from '@/assets/images/home.svg'
import industryImg from '@/assets/images/industry.svg'
import allianceImg from '@/assets/images/alliance.svg'
import aboutImg from '@/assets/images/about.svg'
import promotionImg from '@/assets/images/promotion.svg'
import tourismImg from '@/assets/images/tourism.svg'
// 引入品牌圖片
import brand1Img from '@/assets/images/brand1.png'
import brand2Img from '@/assets/images/brand2.png'
import brand3Img from '@/assets/images/brand3.png'
import brand4Img from '@/assets/images/brand4.png'
import brand5Img from '@/assets/images/brand5.png'
import brand6Img from '@/assets/images/brand6.png'
import brand7Img from '@/assets/images/brand7.png'
import brand8Img from '@/assets/images/brand8.png'
import brand9Img from '@/assets/images/brand9.png'
import brand10Img from '@/assets/images/brand10.png'
import brand11Img from '@/assets/images/brand11.png'
import brand12Img from '@/assets/images/brand12.png'
import brand13Img from '@/assets/images/brand13.png'
import brand14Img from '@/assets/images/brand14.png'
import brand15Img from '@/assets/images/brand15.png'
import brand16Img from '@/assets/images/brand16.png'
import brand17Img from '@/assets/images/brand17.png'
import brand18Img from '@/assets/images/brand18.png'
import brand19Img from '@/assets/images/brand19.png'
import brand20Img from '@/assets/images/brand20.png'
import brand21Img from '@/assets/images/brand21.png'

// 引入商業單元圖片
import unit1Img from '@/assets/images/unit1.png'
import unit2Img from '@/assets/images/unit2.png'
import unit3Img from '@/assets/images/unit3.png'
import unit4Img from '@/assets/images/unit4.png'
import unit5Img from '@/assets/images/unit5.png'
import unit6Img from '@/assets/images/unit6.png'
import unit7Img from '@/assets/images/unit7.png'
import unit8Img from '@/assets/images/unit8.png'

import stage1Img from '@/assets/images/stage1.png'
import stage2Img from '@/assets/images/stage2.png'
import stage3Img from '@/assets/images/stage3.png'

// 品牌圖片陣列
const brandImages = [
  { id: 1, image: brand1Img, link: 'https://www.instagram.com/liontravelhr/', target: '_blank' },
  { id: 2, image: brand2Img, link: 'javascript:;' },
  { id: 3, image: brand3Img, link: 'javascript:;' },
  { id: 4, image: brand4Img, link: 'https://www.liontravel.com/category/zh-tw/index', target: '_blank' },
  { id: 5, image: brand5Img, link: 'https://www.lionexpress.com.tw/', target: '_blank' },
  { id: 6, image: brand6Img, link: 'javascript:;' },
  { id: 7, image: brand7Img, link: 'https://www.gounitravel.com/category/zh-tw/index', target: '_blank' },
  { id: 8, image: brand8Img, link: 'https://www.xinflight.com/category/zh-tw/index', target: '_blank' },
  { id: 9, image: brand9Img, link: 'https://www.jctravel.com.tw/category/zh-tw/index', target: '_blank' },
  { id: 10, image: brand10Img, link: 'https://www.jwimarketing.com/', target: '_blank' },
  { id: 11, image: brand11Img, link: 'javascript:;' },
  { id: 12, image: brand12Img, link: 'https://www.ttnmedia.com/', target: '_blank' },
  { id: 13, image: brand13Img, link: 'javascript:;' },
  { id: 14, image: brand14Img, link: 'https://www.xinmedia.com/', target: '_blank' },
  { id: 15, image: brand15Img, link: 'https://www.facebook.com/gonnacafe/?locale=zh_TW', target: '_blank' },
  { id: 16, image: brand16Img, link: 'javascript:;' },
  { id: 17, image: brand17Img, link: 'https://www.fontrip.com/', target: '_blank' },
  { id: 18, image: brand18Img, link: 'javascript:;' },
  { id: 19, image: brand19Img, link: 'https://www.lionselect.com/', target: '_blank' },
  { id: 20, image: brand20Img, link: 'javascript:;' },
  { id: 21, image: brand21Img, link: 'https://www.liontech.com.tw/zh-tw/index', target: '_blank' },
]

// 商業單元圖片陣列
const unitImages = [
  { id: 1, image: unit1Img, classes: 'move short righttop' },
  { id: 2, image: unit2Img, classes: 'rightbottom' },
  { id: 3, image: unit3Img, classes: 'move lefttop' },
  { id: 4, image: unit4Img, classes: 'short leftbottom' },
  { id: 5, image: unit5Img, classes: 'move short righttop' },
  { id: 6, image: unit6Img, classes: 'rightbottom' },
  { id: 7, image: unit7Img, classes: 'move lefttop' },
  { id: 8, image: unit8Img, classes: 'leftbottom short' },
]
// 階段圖片
const stageImages = [
  { id: 1, title: '服務升級', image: stage1Img },
  { id: 2, title: '品牌行銷', image: stage2Img },
  { id: 3, title: '入境市場', image: stage3Img },
]

// 初始化圖庫
const initGallery = () => {
  const galleryContent = document.querySelector('.gallery-content')
  if (galleryContent) {
    for (let i = 0; i < 8; i++) {
      galleryContent.appendChild(galleryContent.children[i].cloneNode(true))
    }
  }
}

onMounted(() => {
  // 初始化圖庫
  initGallery()

  // 初始化 AOS 動畫 (如果有使用)
  if (window.AOS) {
    window.AOS.init()
  }
})
</script>

<template>
  <div>
    <section class="aboutPage">
      <div class="title">
        <div class="container lock">
          <h2>
            <span v-for="(letter, index) in 'ABOUT'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
              {{ letter }}
            </span>
          </h2>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">關於我們</p>
        </div>
        <div class="breadcrumb">
          <div class="container">
            <div class="pic">
              <img :src="homeImg" alt="Home" />
            </div>
            <router-link to="/">
              <p>首頁</p>
            </router-link>
            <i>/</i>
            <router-link to="/about">
              <span>關於我們</span>
            </router-link>
          </div>
        </div>
        <div class="content">
          <div class="container">
            <p>
              傑森全球整合行銷用科技領先創新、用知識掌握趨勢、用文創詮釋品味。我們的團隊承接各種跨產業、跨通路、跨媒介的行銷案，如今我們服務的客戶不僅從台灣跨足兩岸，更遍及全球。
              <br />
              從旅遊產業至休閒生活產業，我們致力於運用內容(Content)、社群(Community)、商務(Commerce)之3C營運模式，提供全方位整合行銷資源，為客戶創造價值，傳遞更全面、美好的生活體驗。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="brands">
      <div class="title">
        <h2>
          <span v-for="(letter, index) in 'Brands'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
            {{ letter }}
          </span>
        </h2>
        <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">旅遊生活品牌生態系</p>
      </div>
      <div class="cubes">
        <!-- 第一個立方體 -->
        <div class="cube">
          <div class="half lion">
            <a :href="brandImages[0].link" :target="brandImages[0].target">
              <div class="pic" :style="{ backgroundImage: `url(${brandImages[0].image})` }"></div>
            </a>
          </div>
          <div class="half">
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[1].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[1].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[2].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[2].image})` }"></div>
                </a>
              </div>
            </div>
            <div class="quarter">
              <a :href="brandImages[3].link" :target="brandImages[3].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[3].image})` }"></div>
              </a>
            </div>
          </div>
        </div>

        <!-- 第二個立方體 -->
        <div class="cube mobile">
          <div class="half">
            <div class="quarter">
              <a :href="brandImages[4].link" :target="brandImages[4].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[4].image})` }"></div>
              </a>
            </div>
            <div class="quarter">
              <a :href="brandImages[5].link">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[5].image})` }"></div>
              </a>
            </div>
          </div>
          <div class="half">
            <div class="quarter">
              <a :href="brandImages[6].link" :target="brandImages[6].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[6].image})` }"></div>
              </a>
            </div>
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[7].link" :target="brandImages[7].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[7].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[8].link" :target="brandImages[8].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[8].image})` }"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 第三個立方體 -->
        <div class="cube offset">
          <div class="half">
            <div class="quarter">
              <a :href="brandImages[9].link" :target="brandImages[9].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[9].image})` }"></div>
              </a>
            </div>
            <div class="quarter">
              <a :href="brandImages[10].link">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[10].image})` }"></div>
              </a>
            </div>
          </div>
          <div class="half">
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[11].link" :target="brandImages[11].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[11].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[12].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[12].image})` }"></div>
                </a>
              </div>
            </div>
            <div class="quarter">
              <a :href="brandImages[13].link" :target="brandImages[13].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[13].image})` }"></div>
              </a>
            </div>
          </div>
        </div>

        <!-- 第四個立方體 -->
        <div class="cube offset">
          <div class="half">
            <div class="quarter">
              <a :href="brandImages[14].link" :target="brandImages[14].target">
                <div class="pic" :style="{ backgroundImage: `url(${brandImages[14].image})` }"></div>
              </a>
            </div>
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[15].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[15].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[16].link" :target="brandImages[16].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[16].image})` }"></div>
                </a>
              </div>
            </div>
          </div>
          <div class="half">
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[17].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[17].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[18].link" :target="brandImages[18].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[18].image})` }"></div>
                </a>
              </div>
            </div>
            <div class="quarter">
              <div class="oneeight">
                <a :href="brandImages[19].link">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[19].image})` }"></div>
                </a>
              </div>
              <div class="oneeight">
                <a :href="brandImages[20].link" :target="brandImages[20].target">
                  <div class="pic" :style="{ backgroundImage: `url(${brandImages[20].image})` }"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="market">
      <div class="container">
        <div class="title">
          <div class="text">
            <h2>
              <span v-for="(letter, index) in 'Market'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
                {{ letter }}
              </span>
            </h2>
            <h2>
              <span v-for="(letter, index) in 'Advantage'" :key="`adv-${index}`" :data-aos="'fade-up-right'" :data-aos-delay="(index + 7) * 100" :data-aos-duration="500">
                {{ letter }}
              </span>
            </h2>
          </div>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">市場優勢</p>
        </div>
      </div>

      <div class="slogan">
        <div class="container">
          <div class="text text1" data-aos="fade-left" data-aos-delay="400" data-aos-duration="500">
            <p>
              客戶服務產業龍頭
              <span>客戶滿意度為台灣業界最高</span>
            </p>
          </div>
          <div class="text text2" data-aos="fade-left" data-aos-delay="100" data-aos-duration="500">
            <p>
              優質服務與在地深根
              <span>在亞洲、北美、澳洲與大洋洲皆有據點，</span>
              <span>無論在何地皆可提供最完善的服務與滿足顧客需求</span>
            </p>
          </div>
          <div class="text text3" data-aos="fade-left" data-aos-delay="700" data-aos-duration="500">
            <p>
              台灣旅遊生活業最大市場占比
              <span>▪每年20萬outbound雄獅旅客從台灣出發</span>
              <span>▪每月平均2000成團，約50000名旅客</span>
              <span>▪每月平均70000名自由行旅客利用雄獅旅遊</span>
            </p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="title fontempty">
          <div class="text">
            <h2>
              <span v-for="(letter, index) in 'Business'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
                {{ letter }}
              </span>
            </h2>
            <h2>
              <span v-for="(letter, index) in 'Unit'" :key="`unit-${index}`" :data-aos="'fade-up-right'" :data-aos-delay="(index + 9) * 100" :data-aos-duration="500">
                {{ letter }}
              </span>
            </h2>
          </div>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">3C模式供生事業體</p>
        </div>
      </div>

      <div class="gallery">
        <ul class="gallery-content">
          <li v-for="(unit, index) in unitImages" :key="index" :class="unit.classes">
            <p>{{ String(index + 1).padStart(2, '0') }}</p>
            <div class="pic" :style="{ backgroundImage: `url(${unit.image})` }"></div>
          </li>
        </ul>
      </div>
    </section>

    <section class="slogan">
      <div class="industry">
        <img :src="industryImg" alt="Industry" />
      </div>
      <div class="alliance">
        <img :src="allianceImg" alt="Alliance" />
      </div>
      <div class="container">
        <div class="title">
          <p class="subtitle" data-aos="fade-up-right" data-aos-delay="100" data-aos-duration="500">SLOGAN</p>
          <h2>
            <span class="slim" data-aos="fade-up-right" data-aos-delay="200" data-aos-duration="500">整</span>
            <span class="slim" data-aos="fade-up-right" data-aos-delay="300" data-aos-duration="500">合</span>
            <span data-aos="fade-up-right" data-aos-delay="400" data-aos-duration="500">產</span>
            <span data-aos="fade-up-right" data-aos-delay="500" data-aos-duration="500">業</span>
            <span data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">聯</span>
            <span data-aos="fade-up-right" data-aos-delay="700" data-aos-duration="500">盟</span>
          </h2>
        </div>
        <div class="title">
          <h2>
            <span class="empty" data-aos="fade-up-right" data-aos-delay="700" data-aos-duration="500">推</span>
            <span class="empty" data-aos="fade-up-right" data-aos-delay="800" data-aos-duration="500">動</span>
            <span data-aos="fade-up-right" data-aos-delay="900" data-aos-duration="500">觀</span>
            <span data-aos="fade-up-right" data-aos-delay="1000" data-aos-duration="500">光</span>
            <span data-aos="fade-up-right" data-aos-delay="1100" data-aos-duration="500">聯</span>
            <span data-aos="fade-up-right" data-aos-delay="1200" data-aos-duration="500">盟</span>
          </h2>
        </div>
        <p class="text">整合數位與服務資源，並密切與產業巨擘合作，提供公部門、旅遊局處、旅遊同業最即時的市場洞悉報告與最佳解決方案；透過整合相關資源、將預算最有效運用，實現服務升級、品牌行銷，最終擴大目的地永續經營之入境旅遊市場。</p>
      </div>

      <div class="container">
        <div class="four">
          <div class="graphics">
            <div class="pic">
              <img :src="aboutImg" alt="About" />
            </div>
          </div>
        </div>
      </div>

      <div class="stage">
        <div class="row">
          <div v-for="(stage, index) in stageImages" :key="index" class="box">
            <span>STAGE {{ index + 1 }}</span>
            <p>{{ stage.title }}</p>
            <div class="pic" :style="{ backgroundImage: `url(${stage.image})` }"></div>
          </div>
        </div>
      </div>

      <div class="industry promotion">
        <img :src="promotionImg" alt="Promotion" />
      </div>
      <div class="tourism">
        <img :src="tourismImg" alt="Tourism" />
      </div>
    </section>
  </div>
</template>
