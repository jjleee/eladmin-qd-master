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
          name: this.data.name,
          chargeVoltage: this.data.chargeVoltage,
          chargeCurrent: this.data.chargeCurrent,
          chargeCapacity: this.data.chargeCapacity,
          dischargeVoltage: this.data.dischargeVoltage,
          dischargeCurrent: this.data.dischargeCurrent,
          dischargeCapacity:this.data.dischargeCapacity,
          upperLimitTemperature: this.data.upperLimitTemperature,
          dcLimit: this.data.dcLimit,
          reverseProtect: this.data.reverseProtect,
          voltageFluctuation: this.data.voltageFluctuation,
          currentFluctuation: this.data.currentFluctuation,
          loopImpedance:this.data.loopImpedance,
          ohm: this.data.ohm,
          ocd: this.data.ocd,
          ovd: this.data.ovd
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
