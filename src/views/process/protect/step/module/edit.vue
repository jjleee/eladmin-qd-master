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
          protectName:this.data.protectName,
          stepName: this.data.stepName,
          positiveIntervalCurrent: this.data.positiveIntervalCurrent,
          positiveIntervalCurrentCount: this.data.positiveIntervalCurrentCount,
          negativeIntervalCurrent: this.data.negativeIntervalCurrent,
          negativeIntervalCurrentCount: this.data.negativeIntervalCurrentCount,
          positiveIntervalVoltage: this.data.positiveIntervalVoltage,
          positiveIntervalVoltageCount: this.data.positiveIntervalVoltageCount,
          negativeIntervalVoltage: this.data.negativeIntervalVoltage,
          negativeIntervalVoltageCount: this.data.negativeIntervalVoltageCount,
          upperLimitCurrent: this.data.upperLimitCurrent,
          lowerLimitCurrent: this.data.lowerLimitCurrent,
          upperLimitVoltage: this.data.upperLimitVoltage,
          lowerLimitVoltage: this.data.lowerLimitVoltage,
          upperLimitCapacity: this.data.upperLimitCapacity,
          lowerLimitCapacity: this.data.lowerLimitCapacity,
          upperLimitTemperature: this.data.upperLimitTemperature
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
