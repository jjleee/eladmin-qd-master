<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="chargeVoltage" label="充电保护电压(mv)"/>
      <el-table-column prop="chargeCurrent" label="充电保护电流(mA)"/>
      <el-table-column prop="chargeCapacity" label="充电保护容量(mAh)"/>
      <el-table-column prop="dischargeVoltage" label="放电保护电压(mv)"/>
      <el-table-column prop="dischargeCurrent" label="放电保护电流(mA)"/>
      <el-table-column prop="dischargeCapacity" label="放电保护容量(mAh)"/>
      <el-table-column prop="upperLimitTemperature" label="上限温度(℃)"/>
      <el-table-column prop="dcLimit" label="直流输出上限(mA)"/>
      <el-table-column prop="reverseProtect" label="反接保护(mA)"/>
      <el-table-column prop="voltageFluctuation" label="电压波动(mv)"/>
      <el-table-column prop="currentFluctuation" label="电流波动(mA)"/>
      <el-table-column prop="ohm" label="接触阻抗(Ω)"/>
      <el-table-column prop="loopImpedance" label="回路阻抗(Ω)"/>
      <el-table-column prop="ocd" label="电流超差保护(mA)"/>
      <el-table-column prop="ovd" label="电压超差保护(mv)"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
              </el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
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
  import {del} from '@/api/globalProtectParam'
  import eHeader from './module/header'
  import edit from './module/edit'

  export default {
    components: {eHeader, edit},
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      checkPermission,
      beforeInit() {
        this.url = 'api/globalProtectParam'
        const sort = 'id,desc'
        this.params = {page: this.page, size: this.size, sort: sort}
        const query = this.query
        const type = query.type
        const value = query.value
        if (type && value) {
          this.params[type] = value
        }
        return true
      },
      subDelete(id) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          this.$refs[id].doClose()
          console.log(err.response.data.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>
