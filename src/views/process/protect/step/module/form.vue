<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="模板名称">
        <el-input v-model="form.protectName" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="工步名称">
        <el-select v-model="form.stepName" clearable placeholder="请选择">
          <el-option v-for="item in stepOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="电流正跳变幅度">
        <el-input v-model="form.positiveIntervalCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="电流正跳变次数">
        <el-input v-model="form.positiveIntervalCurrentCount" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="电流负跳变幅度">
        <el-input v-model="form.negativeIntervalCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="电流负跳变次数">
        <el-input v-model="form.negativeIntervalCurrentCount" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="电压正跳变幅度">
        <el-input v-model="form.positiveIntervalVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="电压正跳变次数">
        <el-input v-model="form.positiveIntervalVoltageCount" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="电压负跳变幅度">
        <el-input v-model="form.negativeIntervalVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="电压负跳变次数">
        <el-input v-model="form.negativeIntervalVoltageCount" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="上限电流">
        <el-input v-model="form.upperLimitCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="下限电流">
        <el-input v-model="form.lowerLimitCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="上限电压">
        <el-input v-model="form.upperLimitVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="下限电压">
        <el-input v-model="form.lowerLimitVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="上限容量">
        <el-input v-model="form.upperLimitCapacity" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mAh</span>
      </el-form-item>
      <el-form-item label="下限容量">
        <el-input v-model="form.lowerLimitCapacity" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">mAh</span>
      </el-form-item>
      <el-form-item label="上限温度">
        <el-input v-model="form.upperLimitTemperature" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/><span style="padding-left: 10px">℃</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {add, edit} from '@/api/stepProtectParam'

  export default {
    props: {
      isAdd: {
        type: Boolean,
        required: true
      },
      sup_this: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        loading: false, dialog: false,
        form: {
          id: '',
          protectName: '',
          stepName: '',
          positiveIntervalCurrent: '',
          positiveIntervalCurrentCount: '',
          negativeIntervalCurrent: '',
          negativeIntervalCurrentCount: '',
          positiveIntervalVoltage: '',
          positiveIntervalVoltageCount: '',
          negativeIntervalVoltage: '',
          negativeIntervalVoltageCount: '',
          upperLimitCurrent: '',
          lowerLimitCurrent: '',
          upperLimitVoltage: '',
          lowerLimitVoltage: '',
          upperLimitCapacity: '',
          lowerLimitCapacity: '',
          upperLimitTemperature: ''
        },
        stepOptions: [
          {
            value: 'standing',
            label: '静置'
          },
          {
            value: 'CC',
            label: '恒流充电'
          },
          {
            value: 'DC',
            label: '恒流放电'
          },
          {
            value: 'CC-CV',
            label: '恒流恒压充电'
          },
          {
            value: 'DC-DV',
            label: '恒流恒压放电'
          }
        ]
      }
    },
    methods: {
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        this.loading = true
        if (this.isAdd) {
          this.doAdd()
        } else this.doEdit()
      },
      doAdd() {
        add(this.form).then(res => {
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.$parent.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      doEdit() {
        edit(this.form).then(res => {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.sup_this.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {
          id: '',
          stepName: '',
          positiveIntervalCurrent: '',
          positiveIntervalCurrentCount: '',
          negativeIntervalCurrent: '',
          negativeIntervalCurrentCount: '',
          positiveIntervalVoltage: '',
          positiveIntervalVoltageCount: '',
          negativeIntervalVoltage: '',
          negativeIntervalVoltageCount: '',
          upperLimitCurrent: '',
          lowerLimitCurrent: '',
          upperLimitVoltage: '',
          lowerLimitVoltage: '',
          upperLimitCapacity: '',
          lowerLimitCapacity: '',
          upperLimitTemperature: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
