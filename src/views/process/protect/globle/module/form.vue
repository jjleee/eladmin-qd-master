<script>
  import {add, edit} from '@/api/globalProtectParam'

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
          name: '',
          chargeVoltage: '',
          chargeCurrent: '',
          chargeCapacity: '',
          dischargeVoltage: '',
          dischargeCurrent: '',
          upperLimitTemperature: '',
          reverseProtect: '',
          voltageFluctuation: '',
          currentFluctuation: '',
          ohm: '',
          ocd: '',
          ovd: '',
          dcLimit: ''
        }
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
          name: '',
          chargeVoltage: '',
          chargeCurrent: '',
          chargeCapacity: '',
          dischargeVoltage: '',
          dischargeCurrent: '',
          dischargeCapacity: '',
          upperLimitTemperature: '',
          reverseProtect: '',
          voltageFluctuation: '',
          currentFluctuation: '',
          ohm: '',
          loopImpedance: '',
          ocd: '',
          ovd: '',
          dcLimit: ''
        }
      }
    }
  }
</script>

<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="充电保护电压">
        <el-input v-model="form.chargeVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="充电保护电流">
        <el-input v-model="form.chargeCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="充电保护容量">
        <el-input v-model="form.chargeCapacity" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mAh</span>
      </el-form-item>
      <el-form-item label="放电保护电压">
        <el-input v-model="form.dischargeVoltage" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="放电保护电流">
        <el-input v-model="form.dischargeCurrent" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="放电保护容量">
        <el-input v-model="form.dischargeCapacity" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mAh</span>
      </el-form-item>
      <el-form-item label="上限温度">
        <el-input v-model="form.upperLimitTemperature" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">℃</span>
      </el-form-item>
      <el-form-item label="直流上限">
        <el-input v-model="form.dcLimit" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="反接保护">
        <el-input v-model="form.reverseProtect" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="电压波动">
        <el-input v-model="form.voltageFluctuation" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="电流波动">
        <el-input v-model="form.currentFluctuation" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="接触阻抗">
        <el-input v-model="form.ohm" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mΩ</span>
      </el-form-item>
      <el-form-item label="回路阻抗">
        <el-input v-model="form.loopImpedance" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mΩ</span>
      </el-form-item>
      <el-form-item label="电流超差保护">
        <el-input v-model="form.ocd" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="电压超差保护">
        <el-input v-model="form.ovd" onkeyup="if(isNaN(value))execCommand('undo')"
                  onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 200px;"/>
        <span style="padding-left: 10px">mv</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>
<style scoped>

</style>
