<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="800px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="140px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="方案名称">
            <el-input v-model="form.name" style="width: 150px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高低真空阀">
            <el-select v-model="form.highLowVacuum" clearable placeholder="请选择" style="width: 150px;">
              <el-option v-for="item in highLowOptions" :key="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="时长">
            <el-input v-model="form.allTimeMin" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> min</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="漏率">
            <el-input v-model="form.leakRate" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> kpa/min</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开真空时长">
            <el-input v-model="form.openVacuumTimeSec" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> s</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关真空时长">
            <el-input v-model="form.closeVacuumTimeSec" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> s</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最终真空度">
            <el-input v-model="form.lastVacuumValue" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> kpa</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保压时长(min)">
            <el-input v-model="form.keepTimeMin" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> min</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="保压值">
            <el-input v-model="form.keepVacuumValue" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> kpa</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="压力容错">
            <el-input v-model="form.vacuumTolerance" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" style="width: 150px;"/><span> kpa</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/vacuumPlan'
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
        highLowVacuum: '',
        allTimeMin: '',
        openVacuumTimeSec: '',
        closeVacuumTimeSec: '',
        lastVacuumValue: '',
        keepTimeMin: '',
        keepVacuumValue: '',
        vacuumTolerance: '',
        leakRate:'',
      },
      highLowOptions: [
        '高真空',
        '低真空'
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
        code: '',
        name: '',
        highLowVacuum: '',
        allTimeMin: '',
        openVacuumTimeSec: '',
        closeVacuumTimeSec: '',
        lastVacuumValue: '',
        keepTimeMin: '',
        keepVacuumValue: '',
        vacuumTolerance: '',
        leakRate:''
      }
    }
  }
}
</script>

<style scoped>

</style>
