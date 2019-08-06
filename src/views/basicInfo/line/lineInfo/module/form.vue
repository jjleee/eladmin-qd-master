<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="400px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="名称">
        <el-input :disabled="!isAdd" v-model="form.name" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="代码">
        <el-input v-model="form.code" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="产线类型" prop="lineTypeName">
        <el-select v-model="form.lineTypeName" clearable placeholder="请选择">
          <el-option v-for="item in typeOptions" :key="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂" prop="factoryName">
        <el-select v-model="form.factoryName" clearable placeholder="请选择">
          <el-option v-for="item in factoryOptions" :key="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="编辑者" prop="creatorName">
        <el-input v-model="form.creatorName" style="width: 190px;"/>
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
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/lineInfo"
import { getFactoryName } from "@/api/factory"
import { getTypeName } from "@/api/lineType"
import { mapGetters } from "vuex"
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
        id: '',
        name: '',
        code: '',
        description: '',
        lineTypeName: '',
        factoryName: '',
        creatorName: '',
        createTime: '',
        updateTime: '',
        available: ''
      },
      typeOptions: [],
      factoryOptions: []
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd();
      } else this.doEdit();
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.sup_this.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        name: "",
        code: "",
        description: "",
        lineTypeName: "",
        factoryName: "",
        creatorName: "",
        createTime: "",
        updateTime: "",
        available: ""
      };
    },
    initName() {
      getFactoryName()
        .then(res => {
          this.factoryOptions = res;
        })
        .catch(err => {
          console.error(err);
        })

        getTypeName()
        .then(res => {
          this.typeOptions = res;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.initName();
  }
};
</script>

<style scoped>
</style>
