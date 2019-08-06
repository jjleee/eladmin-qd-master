<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="800px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="型号">
            <el-input v-model="form.number" style="width: 190px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="typeName">
            <el-select v-model="form.typeName" clearable placeholder="请选择">
              <el-option v-for="item in typeOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产线" prop="lineNames">
            <el-select v-model="form.lineNames" multiple clearable placeholder="请选择产线">
              <el-option v-for="item in lineOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="化成工艺" prop="formationRecipeName">
            <el-select v-model="form.formationRecipeName" clearable placeholder="请选择">
              <el-option v-for="item in formationOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分容工艺" prop="divisionRecipeName">
            <el-select v-model="form.divisionRecipeName" clearable placeholder="请选择">
              <el-option v-for="item in divisionOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调荷工艺" prop="chargeRecipeName">
            <el-select v-model="form.chargeRecipeName" clearable placeholder="请选择">
              <el-option v-for="item in chargeOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="OCV工艺" prop="ocvRecipeName">
            <el-select v-model="form.ocvRecipeName" clearable placeholder="请选择">
              <el-option v-for="item in ocvOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="DCR工艺" prop="dcrRecipeName">
            <el-select v-model="form.dcrRecipeName" clearable placeholder="请选择">
              <el-option v-for="item in dcrOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="保护参数" prop="protectParamName">
            <el-select v-model="form.protectParamName" clearable placeholder="请选择">
              <el-option v-for="item in protectOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分档规则" prop="binningRuleName">
            <el-select v-model="form.binningRuleName" clearable placeholder="请选择">
              <el-option v-for="item in binningOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="12">
          <el-form-item label="NG规则" prop="ngRuleName">
            <el-select v-model="form.ngRuleName" clearable placeholder="请选择">
              <el-option v-for="item in ngOptions" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建者">
            <el-input v-model="form.creatorName" style="width: 190px;"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {add, edit} from "@/api/batteryInfo";
  import {getTypeNames} from "@/api/batteryType";
  import {getLineNames} from "@/api/lineInfo";
  import {getFormationNames} from "@/api/formationRecipe";
  import {getDivisionNames} from "@/api/divisionRecipe";
  import {getDischargeNames} from "@/api/dischargeRecipe";
  import {getProtectNames} from "@/api/globalProtectParam";
  import {getOcvNames} from "@/api/ocvRecipe";
  import {getDcrNames} from "@/api/dcrRecipe";
  import {getBinningNames} from "@/api/binningRule";
  import {getNgNames} from "@/api/ngRule";

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
          number: "",
          typeName: "",
          lineNames: [],
          formationRecipeName: "",
          divisionRecipeName: "",
          ocvRecipeName: "",
          dcrRecipeName: "",
          chargeRecipeName: "",
          protectParamName: "",
          binningRuleName: "",
          ngRuleName: "",
          creatorName: "",
          createTime: "",
          available: ""
        },
        typeOptions: [],
        lineOptions: [],
        formationOptions: [],
        divisionOptions: [],
        ocvOptions: [],
        dcrOptions: [],
        chargeOptions: [],
        protectOptions: [],
        binningOptions: [],
        ngOptions: [],
        dcrCalOptions: []
      };
    },
    mounted() {
      this.initName()
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
            this.resetForm()
            this.$notify({
              title: "修改成功",
              type: "success",
              duration: 2500
            });
            this.loading = false;
            this.sup_this.init();
          })
          .catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {
          id: '',
          number: '',
          typeName: '',
          lineNames: '',
          formationRecipeName: '',
          divisionRecipeName: '',
          ocvRecipeName: '',
          dcrRecipeName: '',
          chargeRecipeName: '',
          protectParamName: '',
          binningRuleName: '',
          ngRuleName: '',
          creatorName: '',
          createTime: '',
          available: ''
        }
      },
      initName() {
        getTypeNames().then(res => {
          this.typeOptions = res
        }).catch(err => {
          console.error(err)
        })
        getLineNames().then(res => {
          this.lineOptions = res
        }).catch(err => {
          console.error(err)
        })
        getFormationNames().then(res => {
          this.formationOptions = res
        }).catch(err => {
          console.error(err)
        })

        getDivisionNames().then(res => {
          this.divisionOptions = res
        }).catch(err => {
          console.error(err)
        })
        getDischargeNames().then(res => {
          this.chargeOptions = res
        }).catch(err => {
          console.error(err)
        })
        getOcvNames().then(res => {
          this.ocvOptions = res
        }).catch(err => {
          console.error(err)
        })
        getDcrNames().then(res => {
          this.dcrOptions = res
        }).catch(err => {
          console.error(err)
        })

        getProtectNames().then(res => {
          this.protectOptions = res
        }).catch(err => {
          console.error(err)
        })

        getBinningNames().then(res => {
          this.binningOptions = res
        }).catch(err => {
          console.error(err)
        })
        getNgNames().then(res => {
          this.ngOptions = res
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style scoped>
</style>
