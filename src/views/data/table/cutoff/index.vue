<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" class="cutoffTable" :data="data" height="500" size="small" border style="width: 100%;"
              row-style="background-color: oldlace;" header-cell-style="background: #22113e;">
      <!--      <el-table-column v-if="show_bat" prop="batchNo" label="批次号"/>-->
      <!--      <el-table-column v-if="show_tra" prop="trayNo" label="托盘号"/>-->
      <el-table-column v-if="show_lin" prop="lineNo" label="产线"/>
      <el-table-column v-if="show_gui" prop="cabNo" label="柜号"/>
      <el-table-column v-if="show_cel" prop="cellNo" label="库位"/>
      <el-table-column v-if="show_cha" prop="channelNo" label="通道"/>
      <!--      <el-table-column v-if="show_bno" prop="batteryNo" label="电池编号"/>-->
      <el-table-column v-if="show_stt" width="100px" prop="stepType" label="工步类型">
        <template slot-scope="scope">
          <span v-if="scope.row.stepType===1">静置</span>
          <span v-if="scope.row.stepType===2">恒流充电</span>
          <span v-if="scope.row.stepType===3">恒压充电</span>
          <span v-if="scope.row.stepType===4">恒流恒压充电</span>
          <span v-if="scope.row.stepType===5">恒流放电</span>
          <span v-if="scope.row.stepType===6">恒压放电</span>
          <span v-if="scope.row.stepType===11">恒流恒压放电</span>
        </template>
      </el-table-column>
      <el-table-column v-if="show_sno" prop="stepNo" label="工步号"/>
      <el-table-column v-if="show_loo" prop="loopNo" label="循环号"/>
      <el-table-column v-if="show_plv" width="100px" prop="povl" label="功率线电压"/>
      <el-table-column v-if="show_vol" prop="voltage" label="电压"/>
      <el-table-column v-if="show_cur" prop="current" label="电流"/>
      <el-table-column v-if="show_cap" prop="capacity" label="容量"/>
      <el-table-column v-if="show_pow" prop="energy" label="能量"/>
      <el-table-column v-if="show_rat" prop="ratio" label="恒流比"/>
      <el-table-column v-if="show_tem" prop="batteryTemperature" label="电池温度"/>
      <el-table-column v-if="show_now" width="150px" prop="currentTime" label="当前时间">
        <template slot-scope="scope">
          <span>{{ parseTime(new Date(scope.row.currentTime*1000))}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      :page-sizes="[100,1000]"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>

</template>
<style>
  .cutoffTable td, .cutoffTable th {
    padding: 5px;
  }

  .cutoffTable th div {
    padding: 0;
  }

  .cutoffTable th {
    display: table-cell !important;
  }
</style>
<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import {parseTime} from '@/utils/index'
  import eHeader from './module/header'

  export default {
    components: {eHeader},
    mixins: [initData],

    data() {
      return {
        sup_this: this,
        show_lin: false,
        show_bat: false,
        show_cap: false,
        show_cur: false,
        show_pow: false,
        show_bno: false,
        show_tem: false,
        show_gui: false,
        show_rat: false,
        show_cel: false,
        show_cha: false,
        show_loo: false,
        show_plv: false,
        show_now: false,
        show_stt: false,
        show_sno: false,
        show_tra: false,
        show_vol: false
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })

    },
    methods: {
      parseTime,
      checkPermission,
      beforeInit() {
        this.url = 'api/cutoffData'
        const sort = 'currentTime,desc'
        this.params = {page: this.page, size: this.size, sort: sort}
        const query = this.query
        const lineNo = query.lineNo
        const cabNo = query.cabNo
        const cellNo = query.cellNo
        const channelNo = query.channelNo
        const recordDate = query.recordDate
        if (recordDate !== '' && recordDate !== null && recordDate !== undefined) {
          const time1 = parseTime(recordDate.slice(0, 1))
          const time2 = parseTime(recordDate.slice(1, 2))
          const longTime1 = new Date(time1).getTime() / 1000;
          const longTime2 = new Date(time2).getTime() / 1000;
          this.params['time1'] = longTime1;
          this.params['time2'] = longTime2
        }


        if (lineNo !== '' && lineNo !== null) {
          this.params['lineNo'] = lineNo
        }
        if (cabNo !== '' && cabNo !== null) {
          this.params['cabNo'] = cabNo
        }
        if (cellNo !== '' && cellNo !== null) {
          this.params['cellNo'] = cellNo
        }
        if (channelNo !== '' && channelNo !== null) {
          this.params['channelNo'] = channelNo
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>
