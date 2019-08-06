<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="800px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工艺名称">
            <el-input :disabled="!isAdd" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工艺代码">
            <el-input v-model="form.code"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="版本号" prop="version">
            <el-input :disabled="true" v-model="form.version"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="编辑者" prop="creatorName">
            <el-input v-model="form.creatorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"/>
          </el-form-item>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <el-form-item label="状态" prop="valid">-->
<!--            <el-switch-->
<!--              v-model="form.valid"-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              active-text="启用"-->
<!--              inactive-text="禁用"-->
<!--              active-value="true"-->
<!--            ></el-switch>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="button" style="width:8%;float:right;">
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
            style="width: 90%;font-size: 10px;"
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
                  <el-option v-for="item in itemOptions" :key="item.value" :label="item.label" :value="item.value"/>
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
                >删除
                </el-button>
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
<style>
  body .el-table .el-input__inner {
    border: none;
    padding: 0px;
    margin: 0px;
    background-color: oldlace;
    text-align: center;
  }
</style>
<script>
  import { add, edit } from "@/api/processRecipe";
  import { getBatteryName } from "@/api/batteryInfo";

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
          name: '',
          code: '',
          description: '',
          createTime: '',
          creatorName: '',
          version: '',
          valid: '',
          processItems: []
        },
        batteryOptions: [],
        itemOptions: [
          {
            value:'HTA1',
            label:'化成前高温静置'
          },
          {
            value:'formation',
            label:'负压化成'
          },
          {
            value:'divide',
            label:'定容'
          },
          {
            value:'HTA2',
            label:'定容后高温静置'
          },
          {
            value:'NTA1',
            label:'常温静置1'
          },
          {
            value:'OCV1/ACR1',
            label:'OCV1/ACR1'
          },
          {
            value:'NTA2',
            label:'常温静置2'
          },
          {
            value:'OCV2/ACR2',
            label:'OCV2/ACR2'
          },
          {
            value:'charge',
            label:'调荷'
          },
          {
            value:'NTA3',
            label:'常温静置3'
          },
          {
            value:'DCR',
            label:'DCR'
          },
          {
            value:'OCV3/ACR3',
            label:'OCV3/ACR3'
          },
          {
            value:'grade',
            label:'分组'
          }
        ]
      }
    },
    computed: {
      processItems1: function () {
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
        this.form.processItems.push(new ProcessItem())
      },
      handleDelete(index) {
        const {processItems} = this.form
        processItems.splice(index, 1)
      },
      sortKey(array, key) {
        return array.sort(function (a, b) {
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
          name: '',
          code: '',
          description: '',
          createTime: '',
          creatorName: '',
          version: '',
          valid: '',
          processItems: []
        }
      }
    }
  }
</script>

<style scoped>
</style>
