<script setup>
import footerIcon from '@/assets/images/footer.svg'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <a class="logo" href="javascript:;">
          <div class="pic"><img :src="footerIcon" alt="" /></div>
        </a>
        <ul class="row">
          <li>
            <router-link to="/news">
              <span>●</span>
              NEWS
            </router-link>
          </li>
          <li>
            <router-link to="/works">
              <span>●</span>
              WORKS
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span>●</span>
              ABOUT
            </router-link>
          </li>
          <li>
            <router-link to="/#service">
              <span>●</span>
              SERVICES
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="more lang"></div>
    <div class="copyright">
      <div class="container">
        <p>Copyright &copy; {{ new Date().getFullYear() }} 傑森全球整合行銷股份有限公司</p>
      </div>
    </div>
    <div class="gotop">
      <a class="pic" href="javascript:;" @click.prevent="scrollToTop"></a>
    </div>
  </footer>
</template>
