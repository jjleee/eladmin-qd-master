<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="1400px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="配方名称" prop="name">
            <el-input :disabled="!isAdd" v-model="form.recipeName"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="编辑者" prop="editorName">
            <el-input v-model="form.editorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="采样频率" prop="frequency">
            <el-input v-model="form.frequency"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="配方类型" prop="recipeType">
            <el-select v-model="form.recipeType" clearable placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item v-show="!isAdd" label="版本号" prop="version">
            <el-input :disabled="true" v-model="form.recipeVersion"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="button" style="width:4%;float:right;">
            <p>
              <el-button class="el-icon-plus" type="success" @click.prevent="addRow()"></el-button>
              <br/>
              <el-button type="primary" style="margin-top: 10px" size="mini" @click="handleShow()">{{buttonValue}}
              </el-button>

            </p>
          </div>
          <el-table :data="form.workStepInfos" border class="formationTable" row-style="background-color: oldlace;" header-cell-style="background: #22113e;">
            <el-table-column fixed="left" type="index" label="序号"></el-table-column>
            <el-table-column
              fixed="left"
              width="90"
              align="center"
              sortable="true"
              label="工步号"
            >
              <template slot-scope="scope">
                <el-input size="mini" type="number" v-model="scope.row.orderNumber"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="left" align="center" label="工步名称">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.stroke" @change="stepChange(scope.row.stroke,scope.row)"
                           clearable placeholder="请选择">
                  <el-option v-for="item in strokeOptions" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="voltage" label="电压(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV')"
                  v-model="scope.row.voltage"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="current" label="电流(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.current"
                />
              </template>
            </el-table-column>
            <el-table-column prop="offCurrent" label="截止电流(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV')"
                  v-model="scope.row.offCurrent"
                  class="input-with-select"
                >
                  <el-select :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV')"
                             v-model="scope.row.offCurrentLogic" slot="prepend" placeholder="请选择">
                    <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="offVoltage" label="截止电压(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.offVoltage"
                  class="input-with-select"
                >
                  <el-select
                    :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                    v-model="scope.row.offVoltageLogic" slot="prepend" placeholder="请选择">
                    <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-input>
              </template>
            </el-table-column>

            <el-table-column prop="offCapacity" label="截止容量(mWh)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.offCapacity"
                  class="input-with-select"
                >
                  <el-select
                    :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                    slot="prepend" v-model="scope.row.offCapacityLogic" placeholder="请选择">
                    <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="截止时间(s)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          class="input-with-select" v-model="scope.row.offTime">
                  <el-select :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                             v-model="scope.row.offTimeLogic" slot="prepend" placeholder="请选择">
                    <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrent" label="正间隔电流变化量(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalCurrent"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrentCount" label="正间隔电流跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalCurrentCount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrent" label="负间隔电流变化量(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalCurrent"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrentCount" label="负间隔电流跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalCurrentCount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltage" label="正间隔电压变化量(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalVoltage"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltageCount" label="正间隔电压跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalVoltageCount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltage" label="负间隔电压变化量(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalVoltage"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltageCount" label="负间隔电压跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='standing'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='vacuum'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalVoltageCount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitVoltage" label="上限电压(mv)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.upperLimitVoltage"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitVoltage" label="下限电压(mv)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.lowerLimitVoltage"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCurrent" label="上限电流(mA)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.upperLimitCurrent"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCurrent" label="下限电流(mA)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.lowerLimitCurrent"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCapacity" label="上限容量(mWh)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.upperLimitCapacity"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCapacity" label="下限容量(mWh)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''"
                          v-model="scope.row.lowerLimitCapacity"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitTemperature" label="上限温度(℃)">
              <template slot-scope="scope">
                <el-input size="mini" :disabled="scope.row.stroke===''||scope.row.stroke==='vacuum'"
                          v-model="scope.row.upperLimitTemperature"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="vacuumValue" label="真空值">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.vacuumValue"
                  :disabled="!(scope.row.stroke==='vacuum')"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="cycleNumber" label="循环编号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.cycleNumber"
                  :disabled="!(scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end')"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="cycleCount" label="循环次数">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.cycleCount"
                  :disabled="!(scope.row.stroke==='cycle-start')"
                  size="mini"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" width="100" label="操作">
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
      <el-button :loading="loading" type="primary" @click="doSubmit()">确认</el-button>
    </div>
  </el-dialog>
</template>
<style>
  body .formationTable .el-input__inner {
    border: none;
    padding: 0px;
    margin: 0px;
    text-align: center;
  }
  .formationTable{
    width: 95%;
    font-size: 12px;
  }
  .formationTable td, .formationTable th {
    padding: 1px;
  }

  .formationTable .cell, .formationTable th div {
    padding: 0px;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
<script>
  import {add, edit} from "@/api/dischargeRecipe";
  import {getByStroke} from "@/api/stepProtectParam"

  function WorkStepInfo() {
    this.id = '';
    this.stroke = '';
    this.orderNumber = '';
    this.current = '';
    this.voltage = '';
    this.offCapacity = '';
    this.offCurrent = '';
    this.offVoltage = '';
    this.offTime = '';
    this.offCapacityLogic = '';
    this.offCurrentLogic = '';
    this.offTimeLogic = '';
    this.offVoltageLogic = '';
    this.positiveIntervalCurrent = '';
    this.positiveIntervalCurrentCount = '';
    this.negativeIntervalCurrent = '';
    this.negativeIntervalCurrentCount = '';
    this.positiveIntervalVoltage = '';
    this.positiveIntervalVoltageCount = '';
    this.negativeIntervalVoltage = '';
    this.negativeIntervalVoltageCount = '';
    this.upperLimitVoltage = '';
    this.lowerLimitVoltage = '';
    this.upperLimitCurrent = '';
    this.lowerLimitCurrent = '';
    this.upperLimitCapacity = '';
    this.lowerLimitCapacity = '';
    this.upperLimitTemperature = '';
    this.cycleNumber = '';
    this.cycleCount = '';
    this.vacuumValue = '';
  }

  export default {
    props: {
      supForm: Object,
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
        show: false,
        buttonValue: '>>>',
        form: {
          id: '',
          recipeName: '',
          editorName: '',
          createTime: '',
          updaterName: '',
          updateTime: '',
          frequency: '',
          recipeVersion: '',
          recipeType: '',
          description: '',
          valid: '',
          workStepInfos: []
        },
        rules: {
          recipeName: [{required: true, message: "请输入配方名", trigger: "blur"}],
          editorName: [
            {required: true, message: "请输入编辑者名称", trigger: "blur"},
            {min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur"}
          ],
          orderNumber: [
            {required: true, message: "请输入排序号", trigger: "blur"}
          ]
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
        logicOptions: [
          {
            value: 1,
            label: '≥    '
          },
          {
            value: 2,
            label: '≤    '
          }
        ],
        strokeOptions: [
          {
            value: 'vacuum',
            label: '真空设置'
          },
          {
            value: 'standing',
            label: '静置'
          },
          {
            value: 'cycle-start',
            label: '循环开始'
          },
          {
            value: 'cycle-end',
            label: '循环结束'
          },
          {
            value: 'CC',
            label: '恒流充电'
          },
          {
            value: 'DC',
            label: '恒流放电'
          },
          {
            value: 'CC-CV',
            label: '恒流恒压充电'
          },
          {
            value: 'DC-DV',
            label: '恒流恒压放电'
          }
        ]
      };
    },
    methods: {
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.isAdd) {
              this.doAdd();
            } else this.doEdit();
          } else {
            return false;
          }
        });
      },
      doAdd() {
        add(this.form)
          .then(res => {
            this.resetForm();
            this.$notify({
              title: "添加成功",
              type: "success",
              duration: 2500
            });
            this.loading = false;
            this.$parent.$parent.init();
          })
          .catch(err => {
            this.loading = false;
            console.log(err.response.data.message);
          });
      },
      doEdit() {
        edit(this.form)
          .then(res => {
            this.resetForm();
            this.$notify({
              title: "修改成功",
              type: "success",
              duration: 2500
            });
            this.loading = false;
            this.sup_this.init();
          })
          .catch(err => {
            this.loading = false;
            console.log(err.response.data.message);
          });
      },
      resetForm() {
        this.dialog = false
        this.$refs["form"].resetFields()
        this.form = {
          id: '',
          recipeName: '',
          editorName: '',
          createTime: '',
          updaterName: '',
          updateTime: '',
          frequency: '',
          recipeVersion: '',
          description: '',
          valid: '',
          workStepInfos: []
        };
      },
      addRow() {
        this.form.workStepInfos.unshift(new WorkStepInfo());
      },
      handleShow() {
        this.show = !this.show
        if (this.buttonValue === '<<<') {
          this.buttonValue = '>>>'
        } else {
          this.buttonValue = '<<<'
        }
      },
      handleDelete(index) {
        const {workStepInfos} = this.form;
        workStepInfos.splice(index, 1);
      },
      stepChange(a, b) {
        if (a === 'CC' || a === 'DC' || a === 'CC-CV' || a === 'DC-DV') {
          getByStroke(a).then(res => {
            b.positiveIntervalCurrent = res.positiveIntervalCurrent;
            b.positiveIntervalCurrentCount = res.positiveIntervalCurrentCount;
            b.negativeIntervalCurrent = res.negativeIntervalCurrent;
            b.negativeIntervalCurrentCount = res.negativeIntervalCurrentCount;
            b.positiveIntervalVoltage = res.positiveIntervalVoltage;
            b.positiveIntervalVoltageCount = res.positiveIntervalVoltageCount;
            b.negativeIntervalVoltage = res.negativeIntervalVoltage;
            b.negativeIntervalVoltageCount = res.negativeIntervalVoltageCount;
            b.upperLimitCurrent = res.upperLimitCurrent;
            b.lowerLimitCurrent = res.lowerLimitCurrent;
            b.upperLimitVoltage = res.upperLimitVoltage;
            b.lowerLimitVoltage = res.lowerLimitVoltage;
            b.upperLimitCapacity = res.upperLimitCapacity;
            b.lowerLimitCapacity = res.lowerLimitCapacity;
            b.upperLimitTemperature = res.upperLimitTemperature;
          }).catch(err => {
            console.error(err)
          })
        }else {
          b.positiveIntervalCurrent = ''
          b.positiveIntervalCurrentCount = '';
          b.negativeIntervalCurrent = '';
          b.negativeIntervalCurrentCount = '';
          b.positiveIntervalVoltage = '';
          b.positiveIntervalVoltageCount = '';
          b.negativeIntervalVoltage = '';
          b.negativeIntervalVoltageCount = '';
          b.upperLimitCurrent = '';
          b.lowerLimitCurrent = '';
          b.upperLimitVoltage = '';
          b.lowerLimitVoltage = '';
          b.upperLimitCapacity = '';
          b.lowerLimitCapacity = '';
          b.upperLimitTemperature = '';
        }
      }
    },
  };
</script>







