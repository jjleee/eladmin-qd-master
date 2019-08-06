<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="400px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="配方名称">
        <el-input v-model="form.name" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="测试方法">
        <el-input v-model="form.methodName" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="I1">
        <el-input v-model="form.currentFirst" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="T1(时长)">
        <el-input v-model="form.timeFirst" style="width: 200px;"/><span style="padding-left: 10px">s</span>
      </el-form-item>
      <el-form-item label="t1(采样点)">
        <el-input v-model="form.timeFirstDot" style="width: 200px;"/><span style="padding-left: 10px">s</span>
      </el-form-item>
      <el-form-item label="I2">
        <el-input v-model="form.currentSecond" style="width: 200px;"/><span style="padding-left: 10px">mA</span>
      </el-form-item>
      <el-form-item label="T2(时长)">
        <el-input v-model="form.timeSecond" style="width: 200px;"/><span style="padding-left: 10px">s</span>
      </el-form-item>
      <el-form-item label="t2(采样点)">
        <el-input v-model="form.timeSecondDot" style="width: 200px;"/><span style="padding-left: 10px">s</span>
      </el-form-item>
      <el-form-item label="上限电压">
        <el-input v-model="form.upperLimitVoltage" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
      <el-form-item label="下限电压">
        <el-input v-model="form.lowerLimitVoltage" style="width: 200px;"/><span style="padding-left: 10px">mv</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/dcrRecipe'
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
        methodName: '',
        currentFirst: '',
        currentSecond: '',
        timeFirst: '',
        timeSecond: '',
        timeFirstDot:'',
        timeSecondDot:'',
        upperLimitVoltage:'',
        lowerLimitVoltage:''
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
        methodName: '',
        currentFirst: '',
        currentSecond: '',
        timeFirst: '',
        timeSecond: '',
        timeFirstDot:'',
        timeSecondDot:'',
        upperLimitVoltage:'',
        lowerLimitVoltage:''
      }
    }
  }
}
</script>

<style scoped>

</style>
