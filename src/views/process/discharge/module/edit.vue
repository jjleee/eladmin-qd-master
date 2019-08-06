<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
  import eForm from './form'

  export default {
    components: {eForm},
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
        const _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          recipeName: this.data.recipeName,
          editorName: this.data.editorName,
          createTime: this.data.createTime,
          updaterName: this.data.updaterName,
          updateTime: this.data.updateTime,
          frequency: this.data.frequency,
          recipeVersion: this.data.recipeVersion,
          description: this.data.description,
          valid: this.data.valid,
          recipeType: this.data.recipeType,
          workStepInfos: this.data.workStepInfos
        }
        _this.dialog = true
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline-block;
    margin-right: 3px;
  }
</style>
