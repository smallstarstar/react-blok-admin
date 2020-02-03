const rulesValidator = {
    userName: [
        {
            required: true, message: '请输入用户名', trigger: 'blur'
        }
    ],
    password: [
        {
            required: true, message: '请输入密码', trigger: 'blur'
        }
    ],
    typeId: [
        {
            required: true, message: '请选择类型', trigger: 'blur'
        }
    ],
    subTypeId: [
        {
            required: true, message: '请选择子类型', trigger: 'blur'
        }
    ],
    articleName: [
        {
            required: true, message: '请输入标题', trigger: 'blur'
        }
    ],
    desc: [
        {
            required: true, message: '请添加描述', trigger: 'blur'
        }
    ],
}

export default rulesValidator;

