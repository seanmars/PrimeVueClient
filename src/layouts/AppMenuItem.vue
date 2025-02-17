<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { ItemLink } from '@/router/routeSet';

const route = useRoute();

const { layoutState, setActiveMenuItem, toggleMenu } = useLayout();

interface Props {
  item: ItemLink,
  index: number,
  root?: boolean,
  parentItemKey?: string | null
}

const {
  item = {} as ItemLink,
  index = 0,
  root = true,
  parentItemKey = null
} = defineProps<Props>();

const isActiveMenu = ref<boolean>(false);
const itemKey = ref<string | null>(null);

onBeforeMount(() => {
  itemKey.value = parentItemKey ? parentItemKey + '-' + index : String(index);
  const activeItem = layoutState.activeMenuItem;
  isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

watch(
    () => layoutState.activeMenuItem,
    (newVal) => {
      isActiveMenu.value = (newVal === itemKey.value || newVal?.startsWith(itemKey.value + '-')) ?? false;
    }
);

function itemClick(event: any, item: any, index: number) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
    toggleMenu();
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item });
  }

  const foundItemKey = item.items ? (isActiveMenu.value ? parentItemKey : itemKey) : itemKey.value;
  setActiveMenuItem(foundItemKey);
}

function checkActiveRoute(item: any) {
  return route.path === item.to;
}
</script>

<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">{{ item.label }}</div>
    <a
        v-if="(!item.to || item.items) && item.visible !== false"
        :href="item.url"
        :class="item.class"
        :target="item.target"
        tabindex="0"
        @click="itemClick($event, item, index)"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </a>
    <router-link
        v-if="item.to && !item.items && item.visible !== false"
        :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
        tabindex="0"
        :to="item.to"
        @click="itemClick($event, item, index)"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </router-link>
    <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <app-menu-item
            v-for="(child, i) in item.items" :key="JSON.stringify(child)"
            :index="i"
            :item="child"
            :parentItemKey="itemKey"
            :root="false"
        />
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>

</style>
