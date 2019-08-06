<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="400px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="140px">
      <el-form-item label="方案名称">
        <el-input v-model="form.name" style="width: 150px;"/>
      </el-form-item>
      <el-form-item label="泄真空开时长">
        <el-input v-model="form.leakOpenTime" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/>
        <span> s</span>
      </el-form-item>
      <el-form-item label="泄真空关时长">
        <el-input v-model="form.leakCloseTime" style="width: 150px;" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
        <span> s</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {add, edit} from '@/api/leakVacuum'

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
          leakOpenTime: '',
          leakCloseTime: ''
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
          leakOpenTime: '',
          leakCloseTime: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
