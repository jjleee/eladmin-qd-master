<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="1000px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="配方名称" prop="name">
            <el-input :disabled="!isAdd" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="创建者" prop="creatorName">
            <el-input :disabled="!isAdd" v-model="form.creatorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="更新者" prop="updaterName">
            <el-input :disabled="isAdd" v-model="form.updaterName"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="配方类型" prop="recipeType">
            <el-select v-model="form.recipeType" clearable placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item v-show="!isAdd" label="版本号" prop="version">
            <el-input :disabled="true" v-model="form.version"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="button" style="width:4%;float:right;">
            <p>
              <el-button class="el-icon-plus" type="success" @click.prevent="addRow()"/>
            </p>
          </div>
          <el-table :data="form.steps" border class="dcrTable" header-cell-style="background: #22113e;" row-style="background-color: oldlace;">
            <el-table-column
              sortable
              fixed="left"
              prop="stepNo"
              align="center"
              label="工步号"
            >
              <template slot-scope="scope">
                <el-input size="mini" type="number" v-model="scope.row.stepNo"/>
              </template>
            </el-table-column>
            <el-table-column fixed="left" align="center" label="工步名称">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.stepName" clearable placeholder="请选择">
                  <el-option v-for="item in stepOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="currentValue" label="电流值(mA)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stepName===''||scope.row.stepName==='standing'"
                          v-model="scope.row.currentValue"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="时长(s)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stepName===''"
                          v-model="scope.row.duration"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column prop="samplePoint" label="采样点(s)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stepName===''||scope.row.stepName==='standing'"
                          v-model="scope.row.samplePoint"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>
<style>
  .dcrTable {
    width: 95%;
    font-size: 12px;
  }
  body .el-table .el-input__inner {
    border: none;
    padding: 0px;
    margin: 0px;
    text-align: center;
  }

  .dcrTable td, .dcrTable th {
    padding: 1px;
  }

  .dcrTable .cell, .dcrTable th div {
    padding: 0px;
  }
  .dcrTable td, .dcrTable th {
    padding: 1px;
  }
  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
<script>
import { add, edit } from '@/api/dcrRecipe'

function DcrStep(){
  //this.id = '';
  this.stepNo = '';
  this.stepName = '';
  this.currentValue = '';
  this.duration = '';
  this.samplePoint = '';
}
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
       // id: '',
        name: '',
        recipeType:'',
        version:'',
        creatorName:'',
        updaterName:'',
        createTime:'',
        updateTime:'',
        steps:[]
      },
      typeOptions: [
        {
          value: 1,
          label: '生产工艺'
        },
        {
          value: 2,
          label: '调试工艺'
        },
        {
          value: 3,
          label: '实验工艺'
        }
      ],
      stepOptions: [
        {
          value: 'DC-1',
          label: '小电流放电'
        },
        {
          value: 'DC-2',
          label: '大电流放电'
        },
        {
          value: 'standing',
          label: '静置'
        },
        {
          value: 'CC-1',
          label: '小电流充电'
        },
        {
          value: 'CC-2',
          label: '大电流充电'
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
    addRow() {
      this.form.steps.push(new DcrStep())
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        //id: '',
        name: '',
        recipeType:'',
        version:'',
        creatorName:'',
        updaterName:'',
        createTime:'',
        updateTime:'',
        steps:[]
      }
    }
  }
}
</script>

<style scoped>

</style>
