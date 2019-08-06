<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="1200px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="工艺名称">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="工艺代码">
            <el-input v-model="form.code"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="电池型号" prop="batteryNumber">
            <el-select v-model="form.batteryNumber" clearable placeholder="请选择" size="mini" >
              <el-option v-for="item in batteryOptions" :key="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="编辑者" prop="creatorName">
            <el-input v-model="form.creatorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="描述">
            <el-input v-model="form.description"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="30">
          <div class="button" style="width:4%;float:right;">
            <p>
              <el-button class="el-icon-plus" type="success" @click.prevent="addRow()"/>
            </p>
          </div>
          <el-table
            :data="form.processItems"
            border
            row-style="background-color: oldlace;"
            cell-style="padding: 1px;"
            header-cell-style="background-color: lightblue"
            style="width: 95%;font-size: 10px;"
          >
            <el-table-column fixed="left" type="index" label="序号"/>
            <el-table-column sortable prop="orderNo" label="排列序号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.orderNo" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="itemName" label="工序名称">
              <template slot-scope="scope">
                <el-select v-model="scope.row.itemName" size="mini" clearable placeholder="请选择">
                  <el-option v-for="item in itemOptions" :key="item" :value="item"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="itemTime" label="执行时长（h）">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.itemTime"
                  size="mini"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index)"
                >删除</el-button>
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
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="1">
            <el-step
              v-for="item in processItems1"
              :title="item.itemName"
              :description="'时长：'+item.itemTime+'h'"
            ></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/processRecipe"
import { getBatteryName } from "@/api/batteryInfo"
function ProcessItem() {
  this.itemName = ''
  this.itemTime = ''
  this.orderNo = ''
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
      loading: false,
      dialog: false,
      form: {
        code: '',
        creatorName: '',
        description: '',
        name: '',
        batteryNumber: '',
        processItems: []
      },
      batteryOptions: [],
      itemOptions: [
        '化成前高温静置',
        '负压化成',
        '定容',
        '定容后高温静置',
        '常温静置1',
        'OCV1/ACR1',
        '常温静置 2',
        'OCV2/ACR2',
        'OCV3/ACR3',
        'DCR'
      ]
    }
  },
  computed: {
    processItems1: function() {
      return this.sortKey(this.form.processItems, 'orderNo')
    }
  },
  mounted() {
    this.initName()
    if (!this.supForm) return
    this.form = Object.assign(this.form, this.supForm)
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
        this.dialog = false
      } else {
        this.doEdit()
        this.dialog = false
      }
    },

    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.$parent.init()
        })
        .catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
    },
    addRow() {
      this.form.processItems.unshift(new ProcessItem())
    },
    handleDelete(index) {
      const { processItems } = this.form
      processItems.splice(index, 1)
    },
    sortKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return x - y
      })
    },
    initName() {
      getBatteryName()
        .then(res => {
          console.log(res)
          this.batteryOptions = res
        })
        .catch(err => {
          console.error(err)
        })
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.sup_this.init()
        })
        .catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        code: '',
        creatorName: '',
        description: '',
        name: '',
        batteryNumber: '',
        processItems: []
      }
    }
  }
}
</script>

<style scoped>
</style>
