<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="配方名称"/>
      <el-table-column prop="editorName" label="编辑者"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本号"/>
      <el-table-column prop="recipeType" label="配方类型">
        <template slot-scope="scope">
          <span v-if="scope.row.recipeType===1">生产工艺</span>
          <span v-if="scope.row.recipeType===2">调试工艺</span>
          <span v-if="scope.row.recipeType===3">实验工艺</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"/>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','RECIPE_EDIT','RECIPE_ALL'])" :data="scope.row" :sup_this="sup_this"/>
          <eView v-else="checkPermission(['RECIPE_SELECT'])" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','RECIPE_EDIT','RECIPE_ALL'])"
            :ref="scope.row.id"
            placement="top"
            width="240">
            <p>请输入配方名称：</p>
            <el-input size="mini" v-model="copyName"></el-input>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="copyLoading" type="primary" size="mini" @click="subCopy(scope.row.id,copyName)">确定</el-button>
            </div>
            <el-button slot="reference" type="warning" size="mini">复制</el-button>
          </el-popover>
          <el-popover
            v-if="checkPermission(['ADMIN','RECIPE_ALL','RECIPE_DELETE'])"
            :ref="scope.row.name"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.name].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id,scope.row.name)">确定
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
  import {del} from '@/api/formationRecipe'
  import {copy} from '@/api/formationRecipe'
  import {parseTime} from '@/utils/index'
  import eHeader from './module/header'
  import edit from './module/edit'
  import eView from './module/view'

  export default {
    components: {eHeader, edit,eView},
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this, copyLoading: false,copyName:''
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
        this.url = 'api/formationRecipe'
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
      subDelete(id,name) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[name].doClose()
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
      },
      subCopy(id,name) {
        this.copyLoading = true;
        copy(id,name).then(res => {
          this.copyLoading = false;
          this.$refs[id].doClose();
          this.init();
          this.$notify({
            title: '复制成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.copyLoading = false;
          this.$refs[name].doClose();
          console.log(err.response.data.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>
