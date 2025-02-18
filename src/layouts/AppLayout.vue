<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar />
    <app-sidebar />
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <app-footer />
    </div>
    <div class="layout-mask animate-fadein" />
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLayout } from '@/layouts/composables/layout';
import AppTopbar from '@/layouts/AppTopbar.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import AppFooter from '@/layouts/AppFooter.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<EventListenerOrEventListenerObject | null>(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive
  };
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: any) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event: any) {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(
      sidebarEl?.isSameNode(event.target) ||
      sidebarEl?.contains(event.target) ||
      topbarEl?.isSameNode(event.target) ||
      topbarEl?.contains(event.target)
  );
}
</script>

<style scoped>

</style>