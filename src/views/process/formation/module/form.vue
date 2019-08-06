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
            <el-input :disabled="!isAdd" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="编辑者" prop="editorName">
            <el-input v-model="form.editorName"/>
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
          <el-form-item label="采样频率" prop="frequency">
            <el-input v-model="form.frequency"
                      onkeypress="return event.keyCode>=48&&event.keyCode<=57"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"/>
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
              <el-button class="el-icon-plus" type="success" @click.prevent="addRow()"></el-button>
              <br/>
              <el-button type="primary" style="margin-top: 10px" size="mini" @click="handleShow()">{{buttonValue}}
              </el-button>

            </p>
          </div>
          <el-table :data="form.workStepInfos" border class="formationTable" header-cell-style="background: #22113e;" row-style="background-color: oldlace;">
<!--            <el-table-column fixed="left" type="index" label="序号"></el-table-column>-->
            <el-table-column
              sortable
              fixed="left"
              prop="orderNumber"
              align="center"
              label="工步号"
            >
              <template slot-scope="scope">
                <el-input size="mini" type="number" v-model="scope.row.orderNumber"/>
              </template>
            </el-table-column>
            <el-table-column fixed="left" align="center" label="工步名称">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.stroke" @change="stepChange(scope.row.stroke,scope.row)"
                           clearable placeholder="请选择">
                  <el-option v-for="item in strokeOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="voltage" label="电压(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV')"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                  v-model="scope.row.voltage"
                />
              </template>
            </el-table-column>
            <el-table-column prop="current" label="电流(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV'||scope.row.stroke==='CC'||scope.row.stroke==='DC')"
                  v-model="scope.row.current"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column prop="offCurrent" label="截止电流(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV')"
                  v-model="scope.row.offCurrent"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column prop="offVoltage" label="截止电压(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC'||scope.row.stroke==='DC')"
                  v-model="scope.row.offVoltage"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>

            <el-table-column prop="offCapacity" label="截止容量(mAh)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="!(scope.row.stroke==='CC-CV'||scope.row.stroke==='DC-DV'||scope.row.stroke==='CC'||scope.row.stroke==='DC')"
                  v-model="scope.row.offCapacity"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="截止时间(min)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'"
                          v-model="scope.row.offTimeMin"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="截止时间(s)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'"
                          v-model="scope.row.offTimeSec"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column label="保护参数">
              <template prop="protectTemplate" slot-scope="scope">
                <el-select v-if="scope.row.stroke === 'CC'" @change="templateChange(scope.row.protectTemplate,scope.row)"
                           size="mini" v-model="scope.row.protectTemplate" clearable
                           placeholder="请选择">
                  <el-option v-for="item in CCOptions" :key="item" :value="item"/>
                </el-select>
                <el-select v-else-if="scope.row.stroke === 'DC'" @change="templateChange(scope.row.protectTemplate,scope.row)"
                           size="mini" v-model="scope.row.protectTemplate"
                           clearable placeholder="请选择">
                  <el-option v-for="item in DCOptions" :key="item" :value="item"/>
                </el-select>
                <el-select v-else-if="scope.row.stroke === 'CC-CV'" @change="templateChange(scope.row.protectTemplate,scope.row)"
                           size="mini"
                           v-model="scope.row.protectTemplate" clearable placeholder="请选择">
                  <el-option v-for="item in CCCVOptions" :key="item" :value="item"/>
                </el-select>
                <el-select v-else-if="scope.row.stroke === 'DC-DV'" @change="templateChange(scope.row.protectTemplate,scope.row)"
                           size="mini" v-model="scope.row.protectTemplate"
                           clearable placeholder="请选择">
                  <el-option v-for="item in DCDVOptions" :key="item" :value="item"/>
                </el-select>
                <el-select v-else-if="scope.row.stroke === 'standing'" @change="templateChange(scope.row.protectTemplate,scope.row)"
                           size="mini"
                           v-model="scope.row.protectTemplate"
                           clearable placeholder="请选择">
                  <el-option v-for="item in standingOptions" :key="item" :value="item"/>
                </el-select>
                <el-input v-else size="mini" disabled v-model="scope.row.protectTemplate"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrent" label="正间隔电流变化量(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalCurrent"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrentCount" label="正间隔电流跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalCurrentCount"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrent" label="负间隔电流变化量(mA)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalCurrent"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrentCount" label="负间隔电流跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalCurrentCount"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltage" label="正间隔电压变化量(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalVoltage"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltageCount" label="正间隔电压跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.positiveIntervalVoltageCount"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltage" label="负间隔电压变化量(mV)">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalVoltage"
                  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltageCount" label="负间隔电压跳变次数">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  :disabled="scope.row.stroke==='cycle-start'||scope.row.stroke==='cycle-end'||scope.row.stroke==='pump'||scope.row.stroke==='leak'||scope.row.stroke===''"
                  v-model="scope.row.negativeIntervalVoltageCount"
                  onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitVoltage" label="上限电压(mv)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.upperLimitVoltage"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitVoltage" label="下限电压(mv)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.lowerLimitVoltage"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCurrent" label="上限电流(mA)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.upperLimitCurrent"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCurrent" label="下限电流(mA)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.lowerLimitCurrent"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCapacity" label="上限容量(mAh)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.upperLimitCapacity"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCapacity" label="下限容量(mAh)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.lowerLimitCapacity"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitTemperature" label="上限温度(℃)">
              <template slot-scope="scope">
                <el-input size="mini"
                          :disabled="scope.row.stroke===''||scope.row.stroke==='pump'||scope.row.stroke==='leak'"
                          v-model="scope.row.upperLimitTemperature"
                          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
              </template>
            </el-table-column>
            <el-table-column label="真空方案">
              <template prop="vacuumPlan" slot-scope="scope">
                <el-select v-if="scope.row.stroke === 'pump'" size="mini"
                           :disabled="!(scope.row.stroke === 'pump'||scope.row.stroke === 'leak')"
                           v-model="scope.row.vacuumPlan" clearable placeholder="请选择">
                  <el-option v-for="item in vacuumOptions" :key="item" :value="item"></el-option>
                </el-select>
                <el-select v-else="scope.row.stroke === 'leak'" size="mini"
                           :disabled="!(scope.row.stroke === 'pump'||scope.row.stroke === 'leak')"
                           v-model="scope.row.vacuumPlan" clearable placeholder="请选择">
                  <el-option v-for="item in leakOptions" :key="item" :value="item"></el-option>
                </el-select>
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
            <el-table-column fixed="right" align="center" width="180" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.id === ''"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index)"
                >删除
                </el-button>
                <el-popover
                  v-else
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="handleDelete(scope.$index,scope.row.id)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </el-popover>
                <el-popover
                  v-if="scope.row.stroke!==''&&scope.row.orderNumber!==''"
                  :ref="scope.row.orderNumber"
                  placement="top"
                  width="180">
                  <p>确定复制本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.orderNumber].doClose()">取消</el-button>
                    <el-button :loading="copyLoading" type="primary" size="mini" @click="handleCopy(scope.$index,scope.row.orderNumber)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="warning" size="mini" icon="el-icon-sold-out">复制</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>

      <el-popover
        ref="subDialog"
        placement="top"
        width="180">
        <p v-if="isAdd">确任保存新增吗？</p>
        <p v-else>确任保存修改吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="$refs.subDialog.doClose()">取消</el-button>
          <el-button :loading="loading" type="primary" size="mini" @click="doSubmit()">确定</el-button>
        </div>
        <el-button slot="reference" type="primary" >确认</el-button>
      </el-popover>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="1">
            <el-step
              v-for="item in workStepInfos1"
              :title="item.stroke">
            </el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<style>
  .formationTable {
    width: 95%;
    font-size: 12px;
  }
  body .el-table .el-input__inner {
    border: none;
    padding: 0px;
    margin: 0px;
    text-align: center;
  }

  .formationTable td, .formationTable th {
    padding: 1px;
  }

  .formationTable .cell, .formationTable th div {
    padding: 0px;
  }
  .formationTable td, .formationTable th {
    padding: 1px;
  }
  body .el-table th.gutter {
    display: table-cell !important;
  }

</style>
<script>
  import {add, edit} from "@/api/formationRecipe";
  import {getByStroke} from "@/api/stepProtectParam"
  import {getByName} from "@/api/stepProtectParam"
  import {getVacuums} from "@/api/vacuumPlan";
  import {getLeakNames} from "@/api/leakVacuum";

  function WorkStepInfo() {
    this.id = '';
    this.stroke = '';
    this.orderNumber = '';
    this.current = '';
    this.voltage = '';
    this.offCapacity = '';
    this.offCurrent = '';
    this.offVoltage = '';
    this.offTimeMin = '';
    this.offTimeSec = '';
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
    this.vacuumPlan = '';
    this.protectTemplate = '';
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
        delLoading:false,
        copyLoading:false,
        loading: false,
        dialog: false,
        show: false,
        buttonValue: '>>>',
        form: {
          id: '',
          name: '',
          editorName: '',
          frequency: '',
          version: '',
          description: '',
          recipeType: '',
          workStepInfos: []
        },
        rules: {
          name: [{required: true, message: "请输入配方名", trigger: "blur"}],
          editorName: [
            {required: true, message: "请输入编辑者名称", trigger: "blur"},
            {min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur"}
          ],
          recipeType: [
            {required: true, message: '请选择配方类型', trigger: "blur"}
          ],
          frequency: [
            {required: true, message: "请填写采样频率", trigger: "blur" }
          ],
          orderNumber: [
            {required: true, message: "请输入排序号", trigger: "blur"}
          ]
        },
        vacuumOptions: [],
        leakOptions: [],
        CCOptions: [],
        DCOptions: [],
        CCCVOptions: [],
        DCDVOptions: [],
        standingOptions: [],
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

        strokeOptions: [
          {
            value: 'pump',
            label: '抽真空'
          },
          {
            value: 'leak',
            label: '泄真空'
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
    computed: {
      workStepInfos1: function () {
        return this.sortKey(this.form.workStepInfos, 'orderNumber')
      }
    },
    mounted() {
      this.initOptions()
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
            this.$refs.subDialog.doClose()
            this.$parent.$parent.init();
          })
          .catch(err => {
            this.loading = false;
            this.$refs.subDialog.doClose()
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
            this.$refs.subDialog.doClose()
            this.sup_this.init();
          })
          .catch(err => {
            this.loading = false;
            this.$refs.subDialog.doClose()
            console.log(err.response.data.message);
          });
      },
      resetForm() {
        this.dialog = false
        this.$refs["form"].resetFields()
        this.form = {
          name: '',
          editorName: '',
          frequency: '',
          version: '',
          description: '',
          recipeType: '',
          workStepInfos: []
        };
      },
      addRow() {
        this.form.workStepInfos.push(new WorkStepInfo())
      },
      handleShow() {
        this.show = !this.show
        if (this.buttonValue === '<<<') {
          this.buttonValue = '>>>'
        } else {
          this.buttonValue = '<<<'
        }
      },
      handleDelete(index,id) {
        this.delLoading = true;
        const {workStepInfos} = this.form;
        workStepInfos.splice(index, 1);
        this.delLoading = false;
        this.$refs[id].doClose()
      },
      handleCopy(index,orderNumber) {
        this.delLoading = true;
        const {workStepInfos} = this.form;
        let stepInfo1=workStepInfos.slice(index,index+1)[0]
        const stepInfo=new WorkStepInfo();
        stepInfo.stroke=stepInfo1.stroke;
        stepInfo.current=stepInfo1.current;
        stepInfo.voltage=stepInfo1.voltage;
        stepInfo.offCapacity=stepInfo1.offCapacity;
        stepInfo.offCurrent=stepInfo1.offCurrent;
        stepInfo.offVoltage=stepInfo1.offVoltage;
        stepInfo.offTimeMin=stepInfo1.offTimeMin;
        stepInfo.offTimeSec=stepInfo1.offTimeSec;
        stepInfo.cycleNumber=stepInfo1.cycleNumber;
        stepInfo.cycleCount=stepInfo1.cycleCount;
        stepInfo.vacuumPlan=stepInfo1.vacuumPlan;
        stepInfo.positiveIntervalCurrent=stepInfo1.positiveIntervalCurrent;
        stepInfo.positiveIntervalCurrentCount=stepInfo1.positiveIntervalCurrentCount;
        stepInfo.negativeIntervalCurrent=stepInfo1.negativeIntervalCurrent;
        stepInfo.negativeIntervalCurrentCount=stepInfo1.negativeIntervalCurrentCount;
        stepInfo.positiveIntervalVoltage=stepInfo1.positiveIntervalVoltage;
        stepInfo.positiveIntervalVoltageCount=stepInfo1.positiveIntervalVoltageCount;
        stepInfo.negativeIntervalVoltage=stepInfo1.negativeIntervalVoltage;
        stepInfo.negativeIntervalVoltageCount=stepInfo1.negativeIntervalVoltageCount;
        stepInfo.upperLimitVoltage=stepInfo1.upperLimitVoltage;
        stepInfo.lowerLimitVoltage=stepInfo1.lowerLimitVoltage;
        stepInfo.upperLimitCurrent=stepInfo1.upperLimitCurrent;
        stepInfo.lowerLimitCurrent=stepInfo1.lowerLimitCurrent;
        stepInfo.upperLimitCapacity=stepInfo1.upperLimitCapacity;
        stepInfo.lowerLimitCapacity=stepInfo1.lowerLimitCapacity;
        stepInfo.upperLimitTemperature=stepInfo1.upperLimitTemperature;
        stepInfo.protectTemplate=stepInfo1.protectTemplate;
        workStepInfos.push(stepInfo);
        this.delLoading = false;
        this.$refs[orderNumber].doClose()
      },
      sortKey(array, key) {
        return array.sort(function (a, b) {
          var x = a[key]
          var y = b[key]
          return x - y
        })
      },
      templateChange(a, b) {
        if(a!==null&&a!==''&&a!==undefined){
          getByName(a).then(res => {
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
        }else{
          b.positiveIntervalCurrent = '';
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
      },
      stepChange(a, b) {
        b.current = '';
        b.voltage = '';
        b.offCapacity = '';
        b.offCurrent = '';
        b.offVoltage = '';
        b.offTimeMin = '';
        b.offTimeSec = '';
        b.cycleNumber = '';
        b.cycleCount = '';
        b.vacuumPlan = '';
        b.protectTemplate = '';
        b.positiveIntervalCurrent = '';
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
      },
      initOptions() {
        getVacuums().then(res => {
          this.vacuumOptions = res
        }).catch(err => {
          console.error(err)
        });
        getByStroke("CC").then(res => {
          this.CCOptions = res
        }).catch(err => {
          console.error(err)
        });
        getByStroke("DC").then(res => {
          this.DCOptions = res
        }).catch(err => {
          console.error(err)
        });
        getByStroke("CC-CV").then(res => {
          this.CCCVOptions = res
        }).catch(err => {
          console.error(err)
        });
        getByStroke("DC-DV").then(res => {
          this.DCDVOptions = res
        }).catch(err => {
          console.error(err)
        });
        getByStroke("standing").then(res => {
          this.standingOptions = res
        }).catch(err => {
          console.error(err)
        });
        getLeakNames().then(res => {
          this.leakOptions = res
        }).catch(err => {
          console.error(err)
        })
      },
    },
  };
</script>







