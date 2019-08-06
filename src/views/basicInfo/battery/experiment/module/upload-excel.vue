<template>
  <el-dialog
    title="导入"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    width="50%">
    <div id="upload" class="app-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
      <el-table :data="tableData" height="250" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item"/>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import UploadExcelComponent from './index.vue'
  import {addExcel} from '@/api/experimentBattery'

  export default {
    name: 'UploadExcel',
    components: {UploadExcelComponent},
    data() {
      return {
        dialogVisible: false,
        loading: false,
        tableData: [],
        submitData:[],
        tableHeader: []
      }
    },
    methods: {
      cancel() {
        this.tableData=[];
        this.tableHeader=[];
        this.submitData=[];
        this.dialogVisible = false
      },
      transData(){
        this.tableData.forEach(item => {
          this.submitData.push(item.batteryCode)
        })
      },
      doSubmit() {
        this.loading = true;
        this.transData();
        addExcel(this.submitData).then(res => {
          alert(this.submitData);
          this.tableData=[];
          this.tableHeader=[];
          this.submitData=[];
          this.$notify({
            title: '导入成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false;
          this.$parent.$parent.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1

        if (isLt1M) {
          return true
        }

        this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
        });
        return false
      },
      handleSuccess({results, header}) {
        this.tableData = results
        this.tableHeader = header
      }
    }
  }
</script>
