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
        highLowVacuum: this.data.highLowVacuum,
        allTimeMin: this.data.allTimeMin,
        openVacuumTimeSec: this.data.openVacuumTimeSec,
        closeVacuumTimeSec: this.data.closeVacuumTimeSec,
        lastVacuumValue: this.data.lastVacuumValue,
        keepTimeMin: this.data.keepTimeMin,
        keepVacuumValue: this.data.keepVacuumValue,
        vacuumTolerance: this.data.vacuumTolerance,
        leakRate:this.data.leakRate,
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
