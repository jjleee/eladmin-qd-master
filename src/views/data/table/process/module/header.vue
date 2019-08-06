<template>
  <div class="head-container">
    <div>
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item"
                @keyup.enter.native="toQuery"/>
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button
        v-if="checkPermission(['ADMIN'])"
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
  import { parseTime } from '@/utils/index'

  const cityOptions = ['批次号', '托盘号', '柜号', '库位', '通道', '电池编号', '工步名称',
    '工步号', '循环号', '功率线电压', '电压', '电流', '容量', '能量', '恒流比', '电池温度',
    '当前时间', '库位温度', '功能码', '配方名称', '电阻', '运行状态', '运行时长', '工步错误代码', '累加工步', '真空值'];

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
        queryTypeOptions: [
          {key: 'batteryNo', display_name: '电池编号'}
        ],
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
          const tHeader = ['批次号', '托盘号', '柜号', '库位', '通道', '电池编号', '工步名称',
            '工步号', '循环号', '功率线电压', '电压', '电流', '容量', '能量', '恒流比', '电池温度',
            '当前时间', '库位温度', '功能码', '配方名称', '电阻', '运行状态', '运行时长', '工步错误代码', '累加工步', '真空值'];
          const filterVal = ['batchNo', 'trayNo', 'cabinetNo', 'cellNo', 'channelNo', 'batteryNo', 'stepName',
            'stepNo', 'loopNo', 'powerLineVoltage', 'voltage', 'current', 'capacity', 'energy', 'ccRatio',
            'batteryTemperature', 'recordTime', 'cellTemperature', 'funcCode', 'recipeName', 'resistance', 'runState',
            'runTime', 'stepErrorCode', 'sumStep', 'vacuumValue']
          const data = this.formatJson(filterVal, this.$parent.data)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '化成过程数据'+parseTime(new Date())
          })
          this.downloadLoading = false
        })
      },
      // 数据转换
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'recordTime') {
            return parseTime(v[j])
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
          this.$parent.show_stn = val,
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
        this.$parent.show_stn = value.indexOf('工步名称') > -1;
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
