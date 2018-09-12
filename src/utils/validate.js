export function validate (arr) {
  const obj = []
  const rule = {
    required: {
      message: '是必填项',
      valid: function (value, param) {
        if (!param.check && typeof (param.check) !== 'undefined') return true
        return value && value.toString().trim().length
      }
    },
    minLength: {
      message: '至少输入{0}个字符',
      valid: function (value, param) {
        return !value || value.length >= param.check[0]
      }
    },
    maxLength: {
      message: '最多输入{0}个字符',
      valid: function (value, param) {
        return !value || value.length <= param.check[0]
      }
    },
    rangLength: {
      message: '输入{0}至{1}个字符',
      valid: function (value, param) {
        return !value || (value.length >= param.check[0] && value.length <= param.check[1])
      }
    },
    checkNoId: {
      message: '请输入正确的身份证号码',
      valid: function (value) {
        if (value === undefined || value === null || value.length === 0) return true
        const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
        const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2] // 校验码
        if (!/^\d{17}(\d|x)$/i.test(value.substr(0, 17))) {
          let sum = 0
          let idx
          for (let num = 0; num < value.length - 1; num++) {
            sum += parseInt(value.substr(num, 1), 10) * arrExp[num]
          }
          idx = sum % 11
          return arrValid[idx] === (value.substr(17, 1).toUpperCase() !== 'X' ? parseInt(value.substr(17, 1), 10) : 'X')
        }
        return false
      }
    },
    checkUserName: {
      message: '请输入正确的姓名',
      valid: function (value) {
        return !value || /^([\u4E00-\u9FA5]|[A-Za-z])*$/.test(value)
      }
    },
    checkMobile: {
      message: '请输入正确的手机号码',
      valid: function (value) {
        return !value || /^1[3|4|5|6|7|8]\d{9}$/.test(value)
      }
    },
    checkNumber: {
      message: '只能输入数字',
      valid: function (value) {
        return !value || /^([0-9])*$/.test(value)
      }
    },
    checkCHN: {
      message: '只能输入汉字',
      valid: function (value) {
        return !value || /^[\u4E00-\u9FA5]*$/.test(value)
      }
    },
    checkLetter: {
      message: '只能输入字母',
      valid: function (value) {
        return !value || /^[A-Za-z]*$/.test(value)
      }
    },
    checkPassport: {
      message: '只能输入数字和字母',
      valid: function (value) {
        return !value || /^([0-9]|[A-Za-z])*$/.test(value)
      }
    },
    checkDoc : {
      message: '只能输入包含字母和 .',
      valid: function (value) {
        return !value || /^[a-z.]+$/.test(value)
      }
    },
    checkStuNo: {
      message: '只能输入数字,汉字和字母',
      valid: function (value) {
        return !value || /^([0-9]|[\u4E00-\u9FA5]|[A-Za-z])*$/.test(value)
      }
    },
    checkDateBefore: {
      message: '不能晚于当天',
      valid: function (value) {
        return !value || !(new Date(value + ' 00:00:00'.replace(/\s+/g, 'T').concat('.000+08:00')).getTime() > new Date().getTime())
      }
    }
  }

  function getMessage (key, rules) {
    let msg = typeof (rules[key].message) === 'undefined' ? rule[key].message : rules[key].message
    // for (let len = 0; len < rules[key].check.length; len++) {
    //   msg = msg.replace(new RegExp('\\{' + len + '\\}', 'gm'), rules[key].check[len])
    // }
    return msg
  }
  (function () {
    for (let len = 0; len < arr.length; len++) {
      const item = arr[len]
      for (const key in item.rules) {
        if (!rule[key].valid(item.data, item.rules[key])) {
          obj.push({
            alias: item.alias,
            message: getMessage(key, item.rules)
          })
        }
      }
    }
  })()
  return obj
}

// 调用实例
// obj = validate([{
//     alias: 'invoiceTitle',
//     data: state.invoice.invoiceTitle,
//     rules: {
//       required: {
//         check: true,
//         message: '企业名称不能为空'
//       },
//       rangLength: {
//         check: [2, 50],
//         message: '您输入的企业名称不正确'
//       }
//     }
//   },
//   {
//     alias: 'taxpayerRegistrationNo',
//     data: state.invoice.taxpayerRegistrationNo,
//     rules: {
//       required: {
//         check: true,
//         message: '识别号不能为空'
//       },
//       rangLength: {
//         check: [15, 20],
//         message: '您输入的识别号不正确'
//       }
//     }
//   },
//   {
//     alias: 'registerAddress',
//     data: state.invoice.registerAddress,
//     rules: {
//       required: {
//         check: true,
//         message: '注册地址不能为空'
//       },
//       rangLength: {
//         check: [5, 85],
//         message: '您输入的注册地址不正确'
//       }
//     }
//   },
//   {
//     alias: 'registerPhone',
//     data: state.invoice.registerPhone,
//     rules: {
//       required: {
//         check: true,
//         message: '注册电话不能为空'
//       },
//       rangLength: {
//         check: [6, 14],
//         message: '您输入的注册电话不正确'
//       }
//     }
//   },
//   {
//     alias: 'depositBank',
//     data: state.invoice.depositBank,
//     rules: {
//       required: {
//         check: true,
//         message: '开户行不能为空'
//       },
//       rangLength: {
//         check: [4, 40],
//         message: '您输入的开户行不正确'
//       }
//     }
//   },
//   {
//     alias: 'depositBankAccount',
//     data: state.invoice.depositBankAccount,
//     rules: {
//       required: {
//         check: true,
//         message: '开户行账号不能为空'
//       },
//       rangLength: {
//         check: [9, 25],
//         message: '您输入的开户行账号不正确'
//       }
//     }
//   }
// ])
