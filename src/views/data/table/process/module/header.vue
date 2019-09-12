<template>
  <div class="head-container">
    <div>
      <!-- 搜索 -->
      <el-select v-model="query.lineNo" clearable placeholder="产线" class="filter-item" style="width: 90px">
        <el-option v-for="item in lineNameOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="query.cabNo" clearable placeholder="柜号" class="filter-item" style="width: 90px">
        <el-option v-for="item in cabinetOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="query.cellNo" clearable placeholder="库位" class="filter-item" style="width: 90px">
        <el-option v-for="item in cellOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="query.channelNo" clearable placeholder="通道" class="filter-item" style="width: 90px">
        <el-option v-for="item in channelOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-date-picker
        v-model="query.recordDate"
        type="datetimerange"
        size="small"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']">
      </el-date-picker>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="download">导出
      </el-button>
    </div>
    <div>
      <el-checkbox-button :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
      </el-checkbox-button>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group size="small" v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission' // 权限判断函数
  import {parseTime} from '@/utils/index'

  const cityOptions = ['线号', '柜号', '库位', '通道', '工步类型', '工步号', '循环号',
    '功率线电压', '电压', '电流', '容量', '能量', '恒流比', '电池温度', '当前时间',
    '功能码', '运行状态', '运行时长', '累加工步'];

  export default {
    props: {
      query: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        downloadLoading: false,
        lineNameOptions: [
          {key: '1', display_name: '产线1'},
          {key: '2', display_name: '产线2'},
          {key: '3', display_name: '产线3'},
          {key: '4', display_name: '产线4'},
          {key: '5', display_name: '产线5'},
          {key: '6', display_name: '产线6'},
        ],
        cabinetOptions: [
          {key: '1', display_name: '柜1'},
          {key: '2', display_name: '柜2'},
          {key: '3', display_name: '柜3'},
          {key: '4', display_name: '柜4'},
          {key: '5', display_name: '柜5'},
          {key: '6', display_name: '柜6'},
          {key: '7', display_name: '柜7'},
          {key: '8', display_name: '柜8'},
          {key: '9', display_name: '柜9'},
          {key: '10', display_name: '柜10'}
        ],
        cellOptions: [
          {key: '1', display_name: '库1'},
          {key: '2', display_name: '库2'},
          {key: '3', display_name: '库3'},
          {key: '4', display_name: '库4'},
          {key: '5', display_name: '库5'},
          {key: '6', display_name: '库6'},
          {key: '7', display_name: '库7'},
          {key: '8', display_name: '库8'}
        ],
        channelOptions: [
          {key: '1', display_name: '通道1'},
          {key: '2', display_name: '通道2'},
          {key: '3', display_name: '通道3'},
          {key: '4', display_name: '通道4'},
          {key: '5', display_name: '通道5'},
          {key: '6', display_name: '通道6'},
          {key: '7', display_name: '通道7'},
          {key: '8', display_name: '通道8'},
          {key: '9', display_name: '通道9'},
          {key: '10', display_name: '通道10'},
          {key: '11', display_name: '通道11'},
          {key: '12', display_name: '通道12'},
          {key: '13', display_name: '通道13'},
          {key: '14', display_name: '通道14'},
          {key: '15', display_name: '通道15'},
          {key: '16', display_name: '通道16'},
          {key: '17', display_name: '通道17'},
          {key: '18', display_name: '通道18'},
          {key: '19', display_name: '通道19'},
          {key: '20', display_name: '通道20'},
          {key: '21', display_name: '通道21'},
          {key: '22', display_name: '通道22'},
          {key: '23', display_name: '通道23'},
          {key: '24', display_name: '通道24'},
          {key: '25', display_name: '通道25'},
          {key: '26', display_name: '通道26'},
          {key: '27', display_name: '通道27'},
          {key: '28', display_name: '通道28'},
          {key: '29', display_name: '通道29'},
          {key: '30', display_name: '通道30'},
          {key: '31', display_name: '通道31'},
          {key: '32', display_name: '通道32'},
          {key: '33', display_name: '通道33'},
          {key: '34', display_name: '通道34'},
          {key: '35', display_name: '通道35'},
          {key: '36', display_name: '通道36'},
          {key: '37', display_name: '通道37'},
          {key: '38', display_name: '通道38'},
          {key: '39', display_name: '通道39'},
          {key: '40', display_name: '通道40'},
          {key: '41', display_name: '通道41'},
          {key: '42', display_name: '通道42'},
          {key: '43', display_name: '通道43'},
          {key: '44', display_name: '通道44'},
          {key: '45', display_name: '通道45'},
          {key: '46', display_name: '通道46'},
          {key: '47', display_name: '通道47'},
          {key: '48', display_name: '通道48'}
        ],
        pickerOptions: {
          shortcuts: [{
            text: '最近1h',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 );
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近2h',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 2);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近3h',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 3);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    methods: {
      checkPermission,
      toQuery() {
        this.$parent.page = 0
        this.$parent.init()
      },
      // 导出
      download() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['线号', '柜号', '库位', '通道', '工步号',
            '工步类型', '循环号', '功率线电压', '电压', '电流', '容量', '能量', '恒流比', '电池温度',
            '当前时间', '功能码', '运行状态', '运行时长', '累加工步'];
          const filterVal = ['lineNo', 'cabNo', 'cellNo', 'channelNo', 'stepNo', 'stepType', 'loopNo',
            'povl', 'voltage', 'current', 'capacity', 'energy', 'ratio',
            'batteryTemperature', 'currentTime', 'funcCode', 'runState',
            'runTime', 'sumStep'];
          const data = this.formatJson(filterVal, this.$parent.data);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '化成过程数据' + parseTime(new Date())
          });
          this.downloadLoading = false
        })
      },
      // 数据转换
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'currentTime') {
            return parseTime(new Date(v[j] * 1000))
          } else if (j === 'stepType') {
            switch (v[j]) {
              case '1':
                return "静置"
              case '2':
                return "恒流充电"
              case '3':
                return "恒压充电"
              case '4':
                return "恒流恒压充电"
              case '5':
                return "恒流放电"
              case '6':
                return "恒压放电"
              case '11':
                return "恒流恒压放电"
              default:
                break;
            }
          } else if (j === 'current') {
            return Number(v[j])
          } else {
            return v[j]
          }
        }))
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        this.$parent.show_bat = val,
          this.$parent.show_cap = val,
          this.$parent.show_lin = val,
          this.$parent.show_cur = val,
          this.$parent.show_pow = val,
          this.$parent.show_bno = val,
          this.$parent.show_tem = val,
          this.$parent.show_gui = val,
          this.$parent.show_rat = val,
          this.$parent.show_cel = val,
          this.$parent.show_cha = val,
          this.$parent.show_loo = val,
          this.$parent.show_plv = val,
          this.$parent.show_now = val,
          this.$parent.show_stt = val,
          this.$parent.show_sno = val,
          this.$parent.show_tra = val,
          this.$parent.show_vol = val,
          this.$parent.show_bte = val,
          this.$parent.show_cte = val,
          this.$parent.show_fco = val,
          this.$parent.show_rec = val,
          this.$parent.show_res = val,
          this.$parent.show_rus = val,
          this.$parent.show_rut = val,
          this.$parent.show_sec = val,
          this.$parent.show_sum = val,
          this.$parent.show_vac = val
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.$parent.show_bat = value.indexOf('批次号') > -1;
        this.$parent.show_lin = value.indexOf('线号') > -1;
        this.$parent.show_cap = value.indexOf('容量') > -1;
        this.$parent.show_cur = value.indexOf('电流') > -1;
        this.$parent.show_cap = value.indexOf('容量') > -1;
        this.$parent.show_pow = value.indexOf('能量') > -1;
        this.$parent.show_bno = value.indexOf('电池编号') > -1;
        this.$parent.show_tem = value.indexOf('电池温度') > -1;
        this.$parent.show_gui = value.indexOf('柜号') > -1;
        this.$parent.show_rat = value.indexOf('恒流比') > -1;
        this.$parent.show_cel = value.indexOf('库位') > -1;
        this.$parent.show_cha = value.indexOf('通道') > -1;
        this.$parent.show_loo = value.indexOf('循环号') > -1;
        this.$parent.show_plv = value.indexOf('功率线电压') > -1;
        this.$parent.show_now = value.indexOf('当前时间') > -1;
        this.$parent.show_stt = value.indexOf('工步类型') > -1;
        this.$parent.show_sno = value.indexOf('工步号') > -1;
        this.$parent.show_tra = value.indexOf('托盘号') > -1;
        this.$parent.show_vol = value.indexOf('电压') > -1;
        this.$parent.show_bte = value.indexOf('电池温度') > -1;
        this.$parent.show_cte = value.indexOf('库位温度') > -1;
        this.$parent.show_fco = value.indexOf('功能码') > -1;
        this.$parent.show_rec = value.indexOf('配方名称') > -1;
        this.$parent.show_res = value.indexOf('电阻') > -1;
        this.$parent.show_rus = value.indexOf('运行状态') > -1;
        this.$parent.show_rut = value.indexOf('运行时长') > -1;
        this.$parent.show_sec = value.indexOf('工步错误代码') > -1;
        this.$parent.show_sum = value.indexOf('累加工步') > -1;
        this.$parent.show_vac = value.indexOf('真空值') > -1;
      }
    }
  }
</script>
