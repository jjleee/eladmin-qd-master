<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="线号">
        <el-input v-model="form.line" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="柜号">
        <el-input v-model="form.cabinet" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="库位">
        <el-input v-model="form.cell" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="通道">
        <el-input v-model="form.channel" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="父功能码">
        <el-input v-model="form.funcCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="子功能码">
        <el-input v-model="form.subFuncCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误码">
        <el-input v-model="form.errorCode" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="警告信息">
        <el-input v-model="form.message" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="产生时间">
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/powerWarning'
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
        line: '',
        cabinet: '',
        cell: '',
        channel: '',
        funcCode: '',
        subFuncCode: '',
        errorCode: '',
        message: '',
        createTime: ''
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
        line: '',
        cabinet: '',
        cell: '',
        channel: '',
        funcCode: '',
        subFuncCode: '',
        errorCode: '',
        message: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
