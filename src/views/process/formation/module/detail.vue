<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    title="详情"
    width="1400px"
  >
    <el-form ref="detail" size="mini" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="配方名称" prop="name">
            <el-input disabled="true" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="创建者" prop="editorName">
            <el-input disabled="true" v-model="form.editorName"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="更新者" prop="editorName">
            <el-input disabled="true" v-model="form.updaterName"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="配方类型" prop="recipeType">
            <el-select disabled="true" v-model="form.recipeType" clearable placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="采样频率" prop="frequency">
            <el-input disabled="true" v-model="form.frequency"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="描述" prop="description">
            <el-input disabled="true" v-model="form.description"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="版本号" prop="version">
            <el-input :disabled="true" v-model="form.version"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="button" style="width:4%;float:right;">
            <p>
              <el-button type="primary" style="margin-top: 10px" size="mini" @click="handleShow()">{{buttonValue}}
              </el-button>

            </p>
          </div>
          <el-table :data="form.workStepInfos" border class="formationTable" header-cell-style="background: #22113e;"
                    row-style="background-color: oldlace;">
            <el-table-column
              sortable
              fixed="left"
              prop="orderNumber"
              align="center"
              label="工步号"
            >
              <template slot-scope="scope">
                <span>{{scope.row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="left" align="center" label="工步名称">
              <template slot-scope="scope">
                <el-select disabled="true" size="mini" v-model="scope.row.stroke">
                  <el-option v-for="item in strokeOptions" :key="item.value" :label="item.label"
                             :value="item.value"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="voltage" label="电压(mV)">
              <template slot-scope="scope">
                <span>{{scope.row.voltage}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="current" label="电流(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.current}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offCurrent" label="截止电流(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.offCurrent}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offVoltage" label="截止电压(mV)">
              <template slot-scope="scope">
                <span>{{scope.row.offVoltage}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="offCapacity" label="截止容量(mAh)">
              <template slot-scope="scope">
                <span>{{scope.row.offCapacity}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="截止时间(min)">
              <template slot-scope="scope">
                <span>{{scope.row.offTimeMin}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="截止时间(s)">
              <template slot-scope="scope">
                <span>{{scope.row.offTimeSec}}</span>
              </template>
            </el-table-column>
            <el-table-column label="保护参数">
              <template prop="protectTemplate" slot-scope="scope">
                <span>{{scope.row.protectTemplate}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrent" label="正间隔电流变化量(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.positiveIntervalCurrent}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalCurrentCount" label="正间隔电流跳变次数">
              <template slot-scope="scope">
                <span>{{scope.row.positiveIntervalCurrentCount}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrent" label="负间隔电流变化量(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.negativeIntervalCurrent}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="negativeIntervalCurrentCount" label="负间隔电流跳变次数">
              <template slot-scope="scope">
                <span>{{scope.row.negativeIntervalCurrentCount}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltage" label="正间隔电压变化量(mV)">
              <template slot-scope="scope">
                <span>{{scope.row.positiveIntervalVoltage}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="positiveIntervalVoltageCount" label="正间隔电压跳变次数">
              <template slot-scope="scope">
                <span>{{scope.row.positiveIntervalVoltageCount}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltage" label="负间隔电压变化量(mV)">
              <template slot-scope="scope">
                <span>{{scope.row.negativeIntervalVoltage}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" width="130" prop="negativeIntervalVoltageCount" label="负间隔电压跳变次数">
              <template slot-scope="scope">
                <span>{{scope.row.negativeIntervalVoltageCount}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitVoltage" label="上限电压(mv)">
              <template slot-scope="scope">
                <span>{{scope.row.upperLimitVoltage}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitVoltage" label="下限电压(mv)">
              <template slot-scope="scope">
                <span>{{scope.row.lowerLimitVoltage}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCurrent" label="充电电流Max(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.upperLimitCurrent}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCurrent" label="放电电流Max(mA)">
              <template slot-scope="scope">
                <span>{{scope.row.lowerLimitCurrent}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitCapacity" label="充电容量Max(mAh)">
              <template slot-scope="scope">
                <span>{{scope.row.upperLimitCapacity}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="lowerLimitCapacity" label="放电容量Max(mAh)">
              <template slot-scope="scope">
                <span>{{scope.row.lowerLimitCapacity}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="upperLimitTemperature" label="上限温度(℃)">
              <template slot-scope="scope">
                <span>{{scope.row.upperLimitTemperature}}</span>
              </template>
            </el-table-column>
            <el-table-column label="真空方案">
              <template prop="vacuumPlan" slot-scope="scope">
                <span>{{scope.row.vacuumPlan}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cycleNumber" label="循环编号">
              <template slot-scope="scope">
                <span>{{scope.row.cycleNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cycleCount" label="循环次数">
              <template slot-scope="scope">
                <span>{{scope.row.cycleCount}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>

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

  body .el-table th.gutter {
    display: table-cell !important;
  }

</style>
<script>

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
      sup_this: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        delLoading: false,
        copyLoading: false,
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
    methods: {
      handleShow() {
        this.show = !this.show
        if (this.buttonValue === '<<<') {
          this.buttonValue = '>>>'
        } else {
          this.buttonValue = '<<<'
        }
      },

      sortKey(array, key) {
        return array.sort(function (a, b) {
          var x = a[key]
          var y = b[key]
          return x - y
        })
      },
    },
  };
</script>







