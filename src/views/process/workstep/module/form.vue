<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="状态">
        <el-input v-model="form.available" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="电池型号">
        <el-input v-model="form.batteryNumber" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="编辑者">
        <el-input v-model="form.editorName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="配方名称">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="泄压时间">
        <el-input v-model="form.pressionReliefTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="配方类型">
        <el-input v-model="form.recipeType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="form.updateTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新者">
        <el-input v-model="form.updaterName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="高真空值">
        <el-input v-model="form.vacuumPression" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/formationRecipe'
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
        available: '',
        batteryNumber: '',
        createTime: '',
        description: '',
        editorName: '',
        name: '',
        pressionReliefTime: '',
        recipeType: '',
        updateTime: '',
        updaterName: '',
        vacuumPression: ''
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
        available: '',
        batteryNumber: '',
        createTime: '',
        description: '',
        editorName: '',
        name: '',
        pressionReliefTime: '',
        recipeType: '',
        updateTime: '',
        updaterName: '',
        vacuumPression: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
