<template>
<div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard', 'sidebar-' + sidebarColorName, 'sidebar-' + sidebarType, 'navbar-' + navbarColorName]">
  <Sidebar />
  
  <div class="wrap">
    <Header />
    <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">
      <breadcrumb-history :exclude="['chat']"></breadcrumb-history>
      <transition name="router-animation">
        <router-view />
      </transition>
      <footer class="contentFooter">
        M-bills App- Made by <a href="https://pavulla.com" rel="nofollow noopener noreferrer" target="_blank">Pavulla, Lda.</a>
        </footer>
    </v-touch>
  </div>
  
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('layout');

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import BreadcrumbHistory from '@/components/BreadcrumbHistory/BreadcrumbHistory';


export default {
  name: 'Layout',
  components: { Sidebar, Header,  BreadcrumbHistory },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar', 'toggleHelper', 'applyTourStep']),
    handleWindowResize() {
      const width = window.innerWidth;

      if (width <= 768 && this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      }
    },
    tourContinueWithinThemeCustomizer(tour) {
      if (this.helperOpened) {
        tour.nextStep();
      } else {
        tour.stop();
        this.toggleHelper(true);
        setTimeout(() => {
          const tour = this.$tours['app-tour'];
          tour.options.startTimeout = 0;
          tour.start(4);
        }, 400);
      }
    },
    tourBackOutFromThemeCustomizer(tour) {
      if (!this.helperOpened) {
        tour.previousStep();
      } else {
        tour.stop();
        this.toggleHelper(false);
        setTimeout(() => {
          const tour = this.$tours['app-tour'];
          tour.options.startTimeout = 0;
          tour.start(3);
        }, 400);
      }
    },
    stopTour(tour) {
      tour.stop();
      this.applyTourStep(null);
    }
  },
  computed: {
    ...mapState(["sidebarClose", "sidebarStatic", "sidebarColorName", 'navbarColorName', "sidebarType", "helperOpened"]),
    
  
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }

    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  mounted() {
    // fixes issue when sidebar is closing on initial entrance but user is on another tab and then returns back
    // and sees that first tour step has been misplaced
  
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
