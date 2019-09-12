<template>
  <div>
    <el-button size="mini" type="success" @click="to">查看</el-button>
    <eDetail ref="detail" :sup_this="sup_this"/>
  </div>
</template>
<script>

import eDetail from './detail'
export default {
  components: { eDetail },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.detail
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        editorName: this.data.editorName,
        recipeType: this.data.recipeType,
        description: this.data.description,
        createTime: this.data.createTime,
        updaterName: this.data.updaterName,
        updateTime: this.data.updateTime,
        frequency: this.data.frequency,
        valid:this.data.valid,
        version:this.data.version,
        workStepInfos: this.data.workStepInfos
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
