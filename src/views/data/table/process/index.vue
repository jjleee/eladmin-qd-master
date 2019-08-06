<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" class="processTable" :data="data" size="small" border style="width: 100%;"
              row-style="background-color: oldlace;" header-cell-style="background: #22113e;">
      <el-table-column v-if="show_bat" prop="batchNo" label="批次号"/>
      <el-table-column v-if="show_tra" prop="trayNo" label="托盘号"/>
      <el-table-column v-if="show_gui" prop="cabinetNo" label="柜号"/>
      <el-table-column v-if="show_cel" prop="cellNo" label="库位"/>
      <el-table-column v-if="show_cha" prop="channelNo" label="通道"/>
      <el-table-column v-if="show_bno" prop="batteryNo" label="电池编号"/>
      <el-table-column v-if="show_stn" prop="stepName" label="工步名称"/>
      <el-table-column v-if="show_sno" prop="stepNo" label="工步号"/>
      <el-table-column v-if="show_loo" prop="loopNo" label="循环号"/>
      <el-table-column v-if="show_plv" prop="powerLineVoltage" label="功率线电压"/>
      <el-table-column v-if="show_vol" prop="voltage" label="电压"/>
      <el-table-column v-if="show_cur" prop="current" label="电流"/>
      <el-table-column v-if="show_cap" prop="capacity" label="容量"/>
      <el-table-column v-if="show_pow" prop="energy" label="能量"/>
      <el-table-column v-if="show_rat" prop="ccRatio" label="恒流比"/>
      <el-table-column v-if="show_bte" prop="batteryTemperature" label="电池温度"/>
      <el-table-column v-if="show_now" prop="recordTime" label="当前时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.recordTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="show_cte" prop="cellTemperature" label="库位温度"/>
      <el-table-column v-if="show_fco" prop="funcCode" label="功能码"/>
      <el-table-column v-if="show_rec" prop="recipeName" label="配方名称"/>
      <el-table-column v-if="show_res" prop="resistance" label="电阻"/>
      <el-table-column v-if="show_rus" prop="runState" label="运行状态"/>
      <el-table-column v-if="show_rut" prop="runTime" label="运行时长"/>
      <el-table-column v-if="show_sec" prop="stepErrorCode" label="工步错误代码"/>
      <el-table-column v-if="show_sum" prop="sumStep" label="累加工步"/>
      <el-table-column v-if="show_vac" prop="vacuumValue" label="真空值"/>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

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
        delLoading: false,
        sup_this: this,
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
        show_vol: false,
        show_bte: false,
        show_cte: false,
        show_fco: false,
        show_rec: false,
        show_res: false,
        show_rus: false,
        show_rut: false,
        show_sec: false,
        show_sum: false,
        show_vac: false
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
        this.url = 'api/processData'
        const sort = 'id,desc'
        this.params = {page: this.page, size: this.size, sort: sort}
        const query = this.query
        const type = query.type
        const value = query.value
        if (type && value) {
          this.params[type] = value
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .processTable td, .processTable th {
    padding: 5px;
  }

  .processTable th div {
    padding: 0;
  }

  .processTable th {
    display: table-cell !important;
  }
</style>
