<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称">
        <el-input :disabled="!isAdd" v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="代码">
        <el-input v-model="form.code" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="编辑者">
        <el-input  v-model="form.creatorName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.available"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/factory"
import { mapGetters } from 'vuex'
export default {
  props: {
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
      loading: false,
      dialog: false,
      form: {
        id: "",
        name: "",
        code: "",
        description: "",
        creatorName: "",
        createTime: "",
        updateTime: "",
        available: ""
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm()
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false
          this.$parent.$parent.init();
        })
        .catch(err => {
          this.loading = false
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm()
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false
          this.sup_this.init()
        })
        .catch(err => {
          this.loading = false
          console.log(err.response.data.message);
        })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        name: '',
        code: '',
        description: '',
        creatorName: '',
        createTime: '',
        updateTime: '',
        available: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
