<template>
  <div class="main">
    <div class="main-content">
      <div
        class="form-content"
        v-if="!hasRegister"
      >
        <!-- <div>欢迎登录</div> -->
        <el-form
          ref="loginForm"
          label-width="80px"
          class="form-box"
          :model="loginForm"
        >
          <el-form-item
            label=""
            class="title"
          >
            <div>注册账号</div>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="tel"
            :rules="[
              { required: true, message: '请输入手机号'},
              {
                validator: (rule, value, callback) => { validateTel(rule, value, callback) },
                trigger: ['blur']
              }
            ]"
          >
            <el-input
              v-model="loginForm.tel"
              placeholder="请输入手机号码"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            class="code"
            prop="verCode"
            :rules="[
              { required: true, message: '请输入验证码' },
              {
                validator: this.validateCode,
                trigger: ['blur']
              }
            ]"
          >
            <el-input
              v-model="loginForm.verCode"
              class="get-code-inp"
              placeholder="请输入验证码"
            ></el-input>
            <el-button
              type="success"
              plain
              class="get-code-btn"
              size="small"
              :disabled="codeDisabled"
              @click.stop="getCode"
            >{{codeWord}}{{typeof codeWord === 'number' ? 's' : ''}}</el-button>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码'}
            ]"
          >
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="重输密码"
            prop="rePassword"
            :rules="[
              { required: true, message: '请再次输入密码'},
              {
                validator: (rule, value, callback) => { validatePsd(rule, value, callback) },
                trigger: ['blur']
              }
            ]"
          >
            <el-input
              v-model="loginForm.rePassword"
              type="password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="类型"
            class="user-type"
            prop="accountType"
            :rules="[
              { required: true, message: '请选择注册类型'}
            ]"
          >
            <el-radio
              v-model="loginForm.accountType"
              label="student"
            >学生</el-radio>
            <el-radio
              v-model="loginForm.accountType"
              label="company"
            >公司</el-radio>
          </el-form-item>
          <el-form-item
            label=""
            class="login-btn"
          >
            <el-button
              type="primary"
              class="btn"
              @click="register"
            >立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="user-info"
        v-if="hasRegister && loginForm.accountType === 'student'"
      >
        <div class="user-info-content">
          <div class="head">
            <span>个人信息填写</span>
            <div class="uploader">
              <el-upload
                class="avatar-uploader"
                :action="domain"
                :http-request="handleUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="newUserInfo.studentImgUrl"
                  :src="newUserInfo.studentImgUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>
          <div class="base-info">
            <el-form
              label-position="right"
              label-width="100px"
              :model="newUserInfo"
              ref="studentInfoForm"
            >
              <el-form-item
                label="我的昵称"
                prop="studentName"
                :rules="[
                  { required: true, message: '昵称不能为空' }
                ]"
              >
                <el-input
                  v-model="newUserInfo.studentName"
                  placeholder="请输入昵称"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="我的性别"
                class="sex"
                prop="sex"
                :rules="[
                  { required: true, message: '请选择性别'}
                ]"
              >
                <div>
                  <el-radio
                    v-model="newUserInfo.sex"
                    label="male"
                  >男</el-radio>
                  <el-radio
                    v-model="newUserInfo.sex"
                    label="female"
                  >女</el-radio>
                </div>
              </el-form-item>
              <el-form-item
                label="我的简介"
                class="intro"
                prop="introduction"
                :rules="[
                  { required: true, message: '请填写简历'}
                ]"
              >
                <el-input
                  v-model="newUserInfo.introduction"
                  type="textarea"
                  placeholder="我这个人很懒，什么也没留下"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="我居住地"
                prop="address"
                :rules="[
                  { required: true, message: '请输入居住地'}
                ]"
              >
                <el-input
                  v-model="newUserInfo.address"
                  placeholder="请输入居住地"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="毕业年份"
                prop="graduateTime"
                :rules="[
                  { required: true, message: '请输入毕业年份'}
                ]"
              >
                <el-input
                  v-model="newUserInfo.graduateTime"
                  placeholder="请输入毕业年份"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="我的学历"
                prop="education"
                :rules="[
                  { required: true, message: '请输入学历'}
                ]"
              >
                <el-input
                  v-model="newUserInfo.education"
                  placeholder="请输入学历"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="我的学校"
                prop="school"
                :rules="[
                  { required: true, message: '请输入学校'}
                ]"
              >
                <el-input
                  v-model="newUserInfo.school"
                  placeholder="请输入学校"
                ></el-input>
              </el-form-item>
              <el-form-item label="感兴趣的公司">
                <el-select
                  v-model="newUserInfo.interestedCompany"
                  filterable
                  allow-create
                  default-first-option
                  multiple
                  placeholder="请选择公司，或自己输入按回车添加"
                  style="width: 436px"
                >
                  <el-option
                    v-for="item in companyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="感兴趣的工作"
                prop="interestedClassify"
              >
                <div>
                  <el-select
                    v-model="newUserInfo.interestedClassify"
                    placeholder="请选择方向"
                  >
                    <el-option
                      v-for="item in classifyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="newUserInfo.interestedPost"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择职位，或者自己添加"
                  >
                    <el-option
                      v-for="item in postOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button
                @click="updateStudentInfo"
                type="primary"
              >保存信息</el-button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="company-info"
        v-if="hasRegister && loginForm.accountType === 'company'"
      >
        <div class="company-info-content">
          <div class="head">
            <span>企业信息填写</span>
            <div class="uploader">
              <el-upload
                class="avatar-uploader"
                :action="domain"
                :http-request="handleUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="newCompanyInfo.companyImgUrl"
                  :src="newCompanyInfo.companyImgUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>
          <div class="base-info">
            <el-form
              label-position="right"
              label-width="100px"
              ref="companyInfoForm"
              :model="newCompanyInfo"
              :rules="companyInfoRules"
            >
              <el-form-item
                label="公司名称"
                prop="companyName"
              >
                <el-input
                  v-model="newCompanyInfo.companyName"
                  placeholder="请输入公司名称"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="公司简介"
                class="intro"
                prop="companyProfile"
              >
                <el-input
                  v-model="newCompanyInfo.companyProfile"
                  type="textarea"
                  placeholder="请输入公司简介"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="所在城市"
                prop="companyAddress"
              >
                <el-input
                  v-model="newCompanyInfo.companyAddress"
                  placeholder="请输入公司所在城市，多个城市请用空车分隔"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="需招职位"
                prop="recuritPosts"
              >
                <el-input
                  v-model="newCompanyInfo.recuritPosts"
                  placeholder="请输入职位名称，多个职位请用空格分隔"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="薪酬福利"
                prop="companyWelfare"
              >
                <el-input
                  v-model="newCompanyInfo.companyWelfare"
                  placeholder="请输入公司薪酬福利情况"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="业务体系"
                class="business"
                prop="companyBusiness"
              >
                <el-input
                  v-model="newCompanyInfo.companyBusiness"
                  type="textarea"
                  placeholder="请输入公司业务体系"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button
                @click="updateCompanyInfo"
                type="primary"
              >保存信息</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterAccount',
  data () {
    return {
      domain: 'https://upload.qiniup.com',
      qiniuaddr: 'cdn.zouhaohao.xyz',
      loginForm: {
        verCode: '', // 验证码
        tel: '',
        password: '',
        rePassword: '',
        accountType: '',
        automaticLogin: true
      },
      codeDisabled: true,
      codeWord: '获取验证码',
      hasRegister: false,
      cacheUrl: '',
      newUserInfo: {
        studentId: '',
        studentImgUrl: '',
        studentName: '',
        sex: '',
        introduction: '',
        address: '',
        graduateTime: '',
        education: '',
        school: '',
        interestedCompany: '', // []
        interestedClassify: '',
        interestedPost: '', // []
        attentionSchedule: [],
        resume: {},
        followCampus: []
      },
      newCompanyInfo: {
        companyId: '',
        companyName: '',
        companyImgUrl: '',
        companyProfile: '', // 公司简介
        companyWelfare: '', // 薪酬福利
        companyAddress: '', // 公司所在地
        companyBusiness: '', // 主页业务体系
        recuritPosts: '' // 需招职位
      },
      companyInfoRules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyImgUrl: [{ required: true, message: '请上传公司图片' }],
        companyProfile: [
          { required: true, message: '请输入公司简介', trigger: 'blur' }
        ],
        companyWelfare: [
          { required: true, message: '请输入薪酬福利', trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: '请输入公司所在城市', trigger: 'blur' }
        ],
        companyBusiness: [
          { required: true, message: '请输入公司主页业务体系', trigger: 'blur' }
        ],
        recuritPosts: [
          { required: true, message: '请输入需要招聘的职位', trigger: 'blur' }
        ]
      },
      studentInfoRules: {
        studentName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        introduction: [
          { required: true, message: '请输入个人简介', trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入居住地', trigger: 'blur' }],
        graduateTime: [
          { required: true, message: '请输入毕业时间', trigger: 'blur' }
        ],
        education: [{ required: true, message: '请输入学历', trigger: 'blur' }],
        school: [{ required: true, message: '请输入学校', trigger: 'blur' }]
      },
      companyOptions: [
        {
          label: '字节跳动',
          value: '字节跳动'
        },
        {
          label: '腾讯',
          value: '腾讯'
        },
        {
          label: '百度',
          value: '百度'
        },
        {
          label: '阿里巴巴',
          value: '阿里巴巴'
        },
        {
          label: '滴滴',
          value: '滴滴'
        },
        {
          label: '美团',
          value: '美团'
        },
        {
          label: '唯品会',
          value: '唯品会'
        },
        {
          label: '携程旅行',
          value: '携程旅行'
        },
        {
          label: 'Shopee',
          value: 'Shopee'
        },
        {
          label: '网易',
          value: '网易'
        },
        {
          label: '深信服',
          value: '深信服'
        }
      ],
      classifyOptions: [
        {
          label: '技术（软件）/信息技术类',
          value: 'software'
        },
        {
          label: '技术（硬件）/电子技术类',
          value: 'hardware'
        }
      ],
      postOptions: [
        {
          label: '前端工程师',
          value: '前端工程师'
        },
        {
          label: 'Java工程师',
          value: 'Java工程师'
        },
        {
          label: 'C++工程师',
          value: 'C++工程师'
        }
      ]
    }
  },
  watch: {
    'loginForm.tel' (tel) {
      if (tel.length === 11 && typeof this.codeWord === 'string') {
        this.findTel({ tel }).then(result => {
          if (!result.message) this.codeDisabled = false
        })
      } else {
        this.codeDisabled = true
      }
    }
  },
  computed: {},
  mounted () {},
  methods: {
    ...mapActions([
      'addStudentList',
      'addCompanyList',
      'fetchCompanyList',
      'addAccount',
      'findTel',
      'uploadImg',
      'verifyCodeToNomal',
      'sendCode'
    ]),
    register () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          const result = await this.addAccount({
            tel: this.loginForm.tel,
            password: this.loginForm.password,
            accountType: this.loginForm.accountType
          })
          await this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.hasRegister = true
          console.info('---注册成功---')
          console.info(result)
          if (result.accountType === 'student') {
            this.newUserInfo.studentId = result._id
          } else {
            this.newCompanyInfo.companyId = result._id
          }
        } else {
          return false
        }
      })
    },
    // 验证二次密码
    validatePsd (rule, value, callback) {
      if (this.loginForm.password !== value) {
        return callback(new Error('两次密码不一致'))
      }
      return callback()
    },
    // 验证手机号
    async validateTel (rule, value, callback) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不正确'))
      } else {
        const result = await this.findTel({ tel: value })
        if (result.message) return callback(new Error(result.message))
      }
      return callback()
    },
    updateStudentInfo () {
      this.$refs['studentInfoForm'].validate(async valid => {
        console.info(valid)
        if (!valid) {
          return false
        } else {
          if (!this.cacheUrl) return this.$message.error('请上传头像')
          await this.addStudentList(this.newUserInfo)
          this.$router.replace({
            name: 'login',
            params: {
              tel: this.loginForm.tel
            }
          })
        }
      })
    },
    updateCompanyInfo () {
      this.$refs['companyInfoForm'].validate(async valid => {
        console.info(valid)
        if (!valid) {
          return false
        } else {
          if (!this.cacheUrl) return this.$message.error('请上传头像')
          await this.addCompanyList(this.newCompanyInfo)
          this.$router.replace({
            name: 'login',
            params: {
              tel: this.loginForm.tel
            }
          })
        }
      })
    },
    handleAvatarSuccess (res, file) {
      if (this.loginForm.accountType === 'student') {
        this.newUserInfo.studentImgUrl = this.cacheUrl
      } else if (this.loginForm.accountType === 'company') {
        this.newCompanyInfo.companyImgUrl = this.cacheUrl
      }
    },
    beforeAvatarUpload (file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    },
    async handleUpload (req) {
      const result = await this.uploadImg({
        file: req.file,
        domain: this.domain,
        qiniuaddr: this.qiniuaddr
      })
      this.cacheUrl = result
    },
    async validateCode (rule, value, callback) {
      if (!/^\d{6}$/.test(value)) {
        return callback(new Error('请输入六位数字'))
      }
      const result = await this.verifyCodeToNomal({
        inputCode: value
      })
      if (result.code) {
        return callback(new Error('验证码错误'))
      }
      return callback()
    },
    getCode () {
      this.codeDisabled = true
      this.setCodeTime()
      this.sendCode({ tel: this.loginForm.tel })
    },
    setCodeTime () {
      this.codeWord = 60
      const timer = setInterval(() => {
        this.codeWord -= 1
        if (this.codeWord < 1) {
          this.codeDisabled = false
          this.codeWord = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 61px;
  .main-content {
    display: flex;
    justify-content: center;
    // align-items: center;
    height: 780px;
    background: url('http://static.nowcoder.com/images/res/infoComplete/bg.jpg')
      no-repeat;
    background-size: 100% 100%;
    .form-content {
      padding: 30px 80px 70px;
      width: 400px;
      // height: 300px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.8);
      margin: 60px auto 0;
      border: 1px solid #eee;
      height: 360px;
      display: flex;
      justify-content: center;
      // flex-direction: column;
      align-content: center;
      .form-box {
        margin-left: -40px;
        width: 80%;
        .title {
          text-align: center;
        }
        .title div {
          margin-left: -20px;
          font-size: 20px;
          // color: #909090;
        }
        .code {
          .get-code-inp {
            width: 54%;
          }
          .get-code-btn {
            width: 40%;
            margin-left: 6px;
          }
        }
        .user-type {
          margin: -10px 0 0px;

          & >>> .el-form-item__error {
            margin-top: -5px !important;
          }
        }
        .forgot-bth {
          padding-left: 76px;
        }
        .login-btn {
          margin-top: 15px;
          margin-bottom: 0;
          .btn {
            width: 100%;
          }
        }
        .register-btn {
          padding-left: 94px;
        }
      }
    }
  }
}

.user-info {
  background: #fff;
  padding: 20px 30px 100px 30px;
  margin: 20px 0 20px 0;
  .user-info-content {
    .head {
      border-bottom: 1px solid #d4d4d4;
      padding-bottom: 10px;
      font-weight: bold;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .uploader {
        width: 50px;
        height: 50px;
        background: #eee;
        border-radius: 50%;
      }
    }
    .base-info {
      padding-left: 30px;
      .el-form-item div {
        color: #999;
      }
      .sex {
        margin-top: -10px;
        & >>> .el-form-item__error {
          margin-top: -5px !important;
        }
      }
      .intro {
        margin-top: -10px;
      }
      .el-input {
        width: 50%;
      }
      .footer-btn {
        display: flex;
        justify-content: center;
        padding: 15px 0;
      }
      .btn {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}

.company-info {
  width: 627px;
  height: 560px;
  background: #fff;
  padding: 20px 30px 10px 30px;
  margin: 20px 0 20px 0;
  .company-info-content {
    .head {
      border-bottom: 1px solid #d4d4d4;
      padding-bottom: 10px;
      font-weight: bold;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .uploader {
        width: 50px;
        height: 50px;
        background: #eee;
        border-radius: 50%;
      }
    }
    .base-info {
      padding-left: 30px;
      .el-form-item div {
        color: #999;
      }
      .sex {
        margin-top: -10px;
      }
      .el-input {
        width: 100%;
      }
      .footer-btn {
        display: flex;
        justify-content: center;
        padding: 15px 0;
      }
      .business {
        margin-bottom: 30px;
      }
      .btn {
        text-align: center;
      }
    }
  }
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  // width: 178px;
  // height: 178px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  // width: 178px;
  // height: 178px;
  // width: 50px;
  // height: 50px;
  width: 100%;
  display: block;
  border-radius: 50%;
}
</style>
