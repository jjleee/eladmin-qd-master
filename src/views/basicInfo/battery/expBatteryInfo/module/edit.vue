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
        number: this.data.number,
        typeName: this.data.typeName,
        lineNames: this.data.lineNames,
        formationRecipeName: this.data.formationRecipeName,
        divisionRecipeName: this.data.divisionRecipeName,
        dcrRecipeName: this.data.dcrRecipeName,
        chargeRecipeName: this.data.chargeRecipeName,
        protectParamName: this.data.protectParamName,
        ngRuleName: this.data.ngRuleName,
        creatorName: this.data.creatorName,
        createTime: this.data.createTime,
        available: this.data.available
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
