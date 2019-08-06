<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
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
        name: this.data.name,
        methodName: this.data.methodName,
        currentFirst: this.data.currentFirst,
        currentSecond: this.data.currentSecond,
        timeFirst: this.data.timeFirst,
        timeSecond: this.data.timeSecond,
        timeFirstDot:this.data.timeFirstDot,
        timeSecondDot:this.data.timeSecondDot,
        upperLimitVoltage:this.data.upperLimitVoltage,
        lowerLimitVoltage:this.data.lowerLimitVoltage
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
