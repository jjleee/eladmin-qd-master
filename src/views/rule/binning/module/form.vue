<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="1000px">
    <el-dialog
      width="800px"
      title="规则表达式编辑"
      :visible.sync="innerVisible"
      append-to-body>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="button" style="width:4%;float:right;">
            <p>
              <el-button class="el-icon-plus" type="warning" @click.prevent="addExpress()"/>
            </p>
          </div>
          <el-table :data="expresses" border>
            <el-table-column align="center" label="And/Or">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.and_or" clearable placeholder="请选择">
                  <el-option v-for="item in andOrOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="(">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.left_c" clearable placeholder="请选择">
                  <el-option v-for="item in leftOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Param_1">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.param_name_1"  clearable placeholder="请选择">
                  <el-option v-for="item in paramOptions" :key="item" :label="item" :value="item"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Param_2">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.param_name_2" clearable placeholder="请选择">
                  <el-option v-for="item in paramOptions" :key="item" :label="item"
                             :value="item"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Operator">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.operator_name" clearable placeholder="请选择">
                  <el-option v-for="item in operateOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Value1">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value_1"/>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Value2">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value_2"/>
              </template>
            </el-table-column>
            <el-table-column align="center" label=")">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.right_c" clearable placeholder="请选择">
                  <el-option v-for="item in rightOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div>
        <span v-for="item of expresses">
        <span v-if="item.param_name_2===''">
         <span v-if="item.operator_name==='between'">
           {{item.and_or+item.left_c+item.value_1+'≤'+item.param_name_1+'≤'+item.value_2+item.right_c}}
         </span>
         <span v-if="item.operator_name==='≤'||item.operator_name==='≥'">
           {{item.and_or+item.left_c+item.param_name_1+item.operator_name+item.value_1+item.right_c}}
         </span>
        </span>
        <span v-if="item.param_name_2!==''">
          <span v-if="item.operator_name==='between'">
            {{item.and_or+item.left_c+item.value_1+'≤'+item.param_name_1+'+'+item.param_name_2+'≤'+item.value_2+item.right_c}}
          </span>
          <span v-if="item.operator_name==='≤'||item.operator_name==='≥'">
            {{item.and_or+item.left_c+item.param_name_1+item.operator_name+item.value_1+item.right_c}}
          </span>
        </span>
      </span>
      </div>
    </el-dialog>
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input v-model="form.planName"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批次号">
            <el-select size="mini" v-model="form.batteryNumber" @change="paramChange(form.batteryNumber)" clearable placeholder="请选择">
              <el-option v-for="item in batteryOptions" :key="item" :label="item"
                         :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建人">
            <el-input v-model="form.creatorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="更新人">
            <el-input v-model="form.updaterName"/>
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
          <el-table :data="form.rules" border class="ruleTable" header-cell-style="background: #22113e;"
                    row-style="background-color: oldlace;">
            <el-table-column align="center" width="150px" label="等级">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.grade" clearable placeholder="请选择">
                  <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="expression" label="判定条件">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.expression">
                  <el-button slot="append" icon="el-icon-edit" @click="innerVisible=true"></el-button>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" width="180" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.planId === ''||scope.row.planId === undefined"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index)"
                >删除
                </el-button>
                <el-popover
                  v-else
                  :ref="scope.row.planId"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.planId].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini"
                               @click="handleDelete(scope.$index,scope.row.planId)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </el-popover>

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

<script>
  import {add, edit} from '@/api/binningPlan'
  import {getBatteryName} from "@/api/batteryInfo"
  import {getStepName} from "@/api/binningPlan"

  function Rule() {
    this.grade = '';
    this.expression = '';
  }

  function Express() {
    this.and_or = '';
    this.left_c = '';
    this.right_c = '';
    this.param_name_1 = '';
    this.param_name_2 = '';
    this.operator_name = '';
    this.value_1 = '';
    this.value_2 = '';
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
        loading: false, dialog: false, delLoading: false, copyLoading: false, innerVisible: false,
        form: {
          planId: '',
          planName: '',
          creatorName: '',
          createTime: '',
          updaterName: '',
          updateTime: '',
          batteryNumber: '',
          rules: []
        },
        resultString: '',
        expresses: [],
        gradeOptions: [
          {
            value: 'A',
            label: '等级A'
          },
          {
            value: 'B',
            label: '等级B'
          },
          {
            value: 'C',
            label: '等级C'
          },
          {
            value: 'D',
            label: '等级D'
          },
          {
            value: 'E',
            label: '等级E'
          },
          {
            value: 'F',
            label: '等级F'
          },
          {
            value: 'G',
            label: '等级G'
          }
        ],
        batteryOptions: [],
        andOrOptions: [
          {
            value: 'AND',
            label: 'AND'
          },
          {
            value: 'OR',
            label: 'OR'
          },
          {
            value: '',
            label: 'null'
          }
        ],
        leftOptions: [
          {
            value: '(',
            label: '('
          },
          {
            value: '',
            label: 'null'
          }
        ],
        rightOptions: [
          {
            value: ')',
            label: ')'
          },
          {
            value: '',
            label: 'null'
          }
        ],
        operateOptions: [
          {
            value: 'between',
            label: 'between'
          },
          {
            value: '≥',
            label: '≥'
          },
          {
            value: '≤',
            label: '≤'
          }
        ],
        paramOptions: [
          'OCV1',
          'OCV2',
          'ACR1',
          'ACR2',
          'DCR1',
          'DCR2',
          'K1',
        ],
      }
    },
    mounted() {
      this.initName()
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
          planId: '',
          planName: '',
          creatorName: '',
          createTime: '',
          updaterName: '',
          updateTime: '',
          batteryNumber: '',
          rules: []
        }
      },
      addRow() {
        this.form.rules.push(new Rule())
      },
      addExpress() {
        this.expresses.push(new Express())
      },
      handleDelete(index, id) {
        alert(index)
        alert(id)
        this.delLoading = true;
        this.form.rules.splice(index, 1);
        this.delLoading = false;
        this.$refs[id].doClose()
      },
      initName() {
        getBatteryName().then(res => {
          this.batteryOptions = res
        }).catch(err => {
          console.error(err)
        });
      },
      paramChange(number){
        if (number!=''){
          getStepName(number).then(res => {
            this.paramOptions.push.apply(this.paramOptions,res)
          }).catch(err => {
            console.error(err)
          })
        }
      }
    },
  }
</script>

<style scoped>
  .ruleTable {
    width: 95%;
    font-size: 12px;
  }

  body .el-table .el-input__inner {
    border: none;
    padding: 0px;
    margin: 0px;
    text-align: center;
  }

  .ruleTable td, .ruleTable th {
    padding: 1px;
  }

  .ruleTable .cell, .ruleTable th div {
    padding: 0px;
  }

  .ruleTable td, .ruleTable th {
    padding: 1px;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
