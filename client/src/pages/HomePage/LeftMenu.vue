<template>
  <el-col
    :class="fixed ? 'fixed' : 'absolute'"
    :style="{
      left: fixed ? `${left}px` : '0'
    }"
    :span="4"
  >
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      text-color="#888"
      active-text-color="#25bb9b"
      :unique-opened="true"
    >
      <el-submenu
        v-for="(menu, index) in menus"
        :key="index"
        :index="`${index + 1}`"
      >
        <template slot="title">
          <i :class="`el-icon-${menu.icon}`"></i>
          <span>{{menu.menuName}}</span>
        </template>
        <el-menu-item
          v-for="(item, indexItem) in menu.subMenu"
          :key="indexItem"
          :index="`${index + 1}-${indexItem + 1}`"
          @click="handleOpen(`${index + 1}-${indexItem + 1}`)"
        >{{item.subName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  props: ['menus', 'fixed', 'active', 'handleOpen'],
  data () {
    return {
      width: document.body.clientWidth
    }
  },
  computed: {
    left () {
      let left = (this.width - 1200) / 2
      if (left <= 0) left = 0
      return left
    }
  }
}
</script>

<style lang="scss" scoped>
.absolute {
  position: absolute;
  left: 0;
  top: 0;
}

.fixed {
  width: 200px;
  position: fixed;
  // left: 75px;
  top: 76px;
}

.el-submenu .el-menu-item {
  height: 38px;
  line-height: 38px;
}

.el-menu-vertical-demo /deep/ .el-submenu__title {
  height: 42px;
  line-height: 42px;
}
</style>
