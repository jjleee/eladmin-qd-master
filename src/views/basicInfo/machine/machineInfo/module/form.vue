<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="400px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="代码">
        <el-input v-model="form.code" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="所在产线" prop="lineName">
        <el-select v-model="form.lineName" clearable placeholder="请选择">
          <el-option v-for="item in lineOptions" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区段" prop="sectionName">
        <el-select v-model="form.sectionName" clearable placeholder="请选择">
          <el-option v-for="item in sectionOptions" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="form.position" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="编辑者">
        <el-input v-model="form.creatorName" style="width: 190px;"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.available" style="width: 190px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/machineInfo';
import { getLineNames } from '@/api/lineInfo';
import { getSectionNames } from '@/api/section';
import { mapGetters } from "vuex";
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
        lineName: "",
        sectionName: "",
        position: "",
        creatorName: "",
        available: ""
      },
      lineOptions: [],
      sectionOptions: []
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
        })
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields()
      this.form = {
        id: '',
        name: '',
        code: '',
        description: '',
        lineName: '',
        sectionName: '',
        position: '',
        creatorName: '',
        createTime: '',
        available: ''
      };
    },
    initName() {
      getLineNames()
        .then(res => {
          this.lineOptions = res;
        })
        .catch(err => {
          console.error(err);
        });

      getSectionNames()
        .then(res => {
          this.sectionOptions = res;
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted() {
    this.initName();
  }
};
</script>

<style scoped>
</style>
