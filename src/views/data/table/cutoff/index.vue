<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" class="cutoffTable" :data="data" size="small" border style="width: 100%;"
              row-style="background-color: oldlace;" header-cell-style="background: #22113e;">
      <!--      <el-table-column v-if="show_bat" prop="batchNo" label="批次号"/>-->
      <!--      <el-table-column v-if="show_tra" prop="trayNo" label="托盘号"/>-->
      <el-table-column v-if="show_lin" prop="lineName" label="产线"/>
      <el-table-column v-if="show_gui" prop="cabinetNo" label="柜号"/>
      <el-table-column v-if="show_cel" prop="cellNo" label="库位"/>
      <el-table-column v-if="show_cha" prop="channel" label="通道"/>
      <!--      <el-table-column v-if="show_bno" prop="batteryNo" label="电池编号"/>-->
      <el-table-column v-if="show_stn" prop="stepName" label="工步名称"/>
      <el-table-column v-if="show_sno" prop="stepNo" label="工步号"/>
      <el-table-column v-if="show_loo" prop="loopNo" label="循环号"/>
      <el-table-column v-if="show_plv" width="100px" prop="powerLineVoltage" label="功率线电压"/>
      <el-table-column v-if="show_vol" prop="voltage" label="电压"/>
      <el-table-column v-if="show_cur" prop="batteryCurrent" label="电流"/>
      <el-table-column v-if="show_cap" prop="batteryCapacity" label="容量"/>
      <el-table-column v-if="show_pow" prop="batteryEnergy" label="能量"/>
      <el-table-column v-if="show_rat" prop="ccRatio" label="恒流比"/>
      <el-table-column v-if="show_tem" prop="batteryTemperature" label="电池温度"/>
      <el-table-column v-if="show_now" prop="recordTime" label="当前时间"/>
      <!--      <el-table-column v-if="show_now" width="150px" prop="recordTime" label="当前时间">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.recordTime) }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
    <!--分页组件-->
<!--    <el-pagination-->
<!--      :total="total"-->
<!--      style="margin-top: 8px;"-->
<!--      layout="total, prev, pager, next, sizes"-->
<!--      @size-change="sizeChange"-->
<!--      @current-change="pageChange"/>-->
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
        show_stn: false,
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
        const sort = 'id,desc'
        this.params = {page: this.page, size: this.size, sort: sort}
        const query = this.query
        const lineName = query.lineName
        const cabinetNo = query.cabinetNo
        const cellNo = query.cellNo
        const channel = query.channel

        const recordDate = this.query.recordDate
        if (recordDate !== '' && recordDate !== null&&recordDate!==undefined) {
          const time1 = parseTime(recordDate.slice(0,1))
          const time2 = parseTime(recordDate.slice(1,2))
          alert(time1)
          this.params['time1'] = time1
          this.params['time2'] = time2
        }


        if (lineName !== '' && lineName !== null) {
          this.params['lineName'] = lineName
        }
        if (cabinetNo !== '' && cabinetNo !== null) {
          this.params['cabinetNo'] = cabinetNo
        }
        if (cellNo !== '' && cellNo !== null) {
          this.params['cellNo'] = cellNo
        }
        if (channel !== '' && channel !== null) {
          this.params['channel'] = channel
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>
